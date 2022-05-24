import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  ReactFlowInstance,
  XYPosition,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
  MiniMap,
  Controls,
} from 'react-flow-renderer';
import AgentModal from '../modals/AgentModal';
import CommitmentModal from '../modals/CommitmentModal';
import ProcessModal from '../modals/ProcessModal';
import ResourceModal from '../modals/ResourceModal';
import ResourceSpecificationNode from '../nodes/ResourceSpecificationNode';
import getDataStore from "../../data/DataStore";
import ModalContainer from '../modals/ModalContainer';
import { DisplayEdge, DisplayEdgeShape, DisplayNode } from "../../data/models/Application/Display";
import ProcessNode from '../nodes/ProcessNode';
import { getAlmostLastPart, PathedData } from '../../data/models/PathedData';
import { NamedData } from '../../data/models/NamedData';
import { Commitment } from '../../data/models/Valueflows/Plan';

interface Props {};

const FlowCanvas: React.FC<Props> = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // STATE MANAGEMENT

  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | undefined>(undefined);
  /**
   * we should probably add a more sophisticated state machine for this since we have:
   * + add or edit node
   *   + position
   *   + type
   * + add or edit edge
   *   + source
   *   + target
   *   + type (Commitment, InputCommittment, and OutputCommitment)
   * + dragging
   *   + position
   */
  const [type, setType] = useState<string>();
  const [source, setSource] = useState<string>();
  const [target, setTarget] = useState<string>();
  const [currentPosition, setCurrentPosition] = useState<XYPosition>();
  const [currentPath, setCurrentPath] = useState<string>();
  const [isModelOpen, setIsModalOpen] = useState(false);

  // need a variable outside of the onNodesChange callback below. useState too async-y
  const position: XYPosition = {
    x: 0,
    y: 0
  };

  function resetPosition() {
    position.x = 0;
    position.y = 0;
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const nodeTypes = useMemo(() => ({
    process: ProcessNode,
    resourceSpecification: ResourceSpecificationNode
  }), []);

  // INITIALIZATION

  useEffect(() => {
    let element: HTMLElement = document.getElementsByClassName('react-flow__container')[0] as HTMLElement;
    element.style.position = "relative";
  }, []);

  /**
   * Load everything needed to display this panel.
   */
  const onInit = async (reactFlowInstance: ReactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);

    const store = getDataStore();
    const planId = store.getCursor('root.planId');
    const displayNodes: DisplayNode[] = store.getDisplayNodes(planId);
    const displayEdges: DisplayEdge[] = store.getDisplayEdges(planId);
    setNodes(displayNodes);
    setEdges(displayEdges);
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * This handles our `onDrop` event. When a node is dragged over from the side
   * pallet, this deserializes it and gets user input if needed.
   */
  const onDrop = useCallback(
    async (event) => {
      event.preventDefault();
      // Grab the path and coords asap
      // If an async function depends on the data from the event, we need to make a closure
      const { path } = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const xCoord = event.clientX;
      const yCoord = event.clientY;

      if (reactFlowWrapper && reactFlowWrapper.current) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const store = getDataStore();
        // check if the dropped element is valid, if it isn't, this will fail spectacularly
        try {
          store.getCursor(path);
        } catch(e) {
          console.log(e);
          return;
        }

        if (reactFlowInstance) {
          // Get the position for the object
          const position = reactFlowInstance.project({
            x: xCoord - reactFlowBounds.left,
            y: yCoord - reactFlowBounds.top,
          });

          // Get the type and the item
          const type = getAlmostLastPart(path);
          const item = store.getCursor(path);
          console.log(type, path, item, position)

          /**
           * Choose the action that will happen based on the object type.
           * Currently, ProcessSpecification is tha most unique situation.
           */
          switch (type) {
            case 'processSpecification':
              // Set the state, then open the dialog
              setCurrentPosition(position);
              setType(type);
              setCurrentPath(path);
              openModal();
              break;
            default:
              // Nothing special just put the node where we need it, no user input
              await handleAddNode(item, position);
              break;
          }
        }
      }
    },
    [reactFlowInstance]
  );

  /**
   * This is called each time a connection is made between two nodes.
   */
   const onConnect = async (params: Connection) => {
    const {source, sourceHandle, target, targetHandle} = params;
    const store = getDataStore();

    // Validate objects can be connected
    const validSourceTargets = {
      'resourceSpecification': [
        'process'
      ],
      'process': [
        'resourceSpecification'
      ],
      'agent': [
        'agent'
      ]
    };

    // Grab the paths to the objects by their ID and grab the type of their vfPath
    const sourceNode: DisplayNode = store.getCursor(store.lookUpPath(source));
    const sourceType = getAlmostLastPart(sourceNode.vfPath);
    const targetNode: DisplayNode = store.getCursor(store.lookUpPath(target));
    const targetType = getAlmostLastPart(targetNode.vfPath);

    // If the connection is valid, open the commitment modal
    if (validSourceTargets[sourceType].indexOf(targetType) >= 0) {
      setType('commitment');
      setSource(source);
      setTarget(target);
      openModal();
    }
  };

  /**
   * Track position change on every event while dragging node.
   *
   * Hold on to position outside of this callback because this will
   * fire dozens of time per second. We need the last position the node
   * had before its state changes from dragging=true to dragging=false
   */
  const onDragNode = async (change) => {
    if (change.dragging) {
      position.x = change.position.x,
      position.y = change.position.y
    } else {
      /**
       * when dragging == false then we can use the last save position
       * and set that to the DisplayNode.position property.
       * Then persist to DHT.
       */
      const store = getDataStore();
      const planId = store.getCurrentPlanId();
      const nodeToUpdate = store.getCursor(DisplayNode.getPath(planId, change.id));
      nodeToUpdate.position = position as XYPosition;
      store.set(nodeToUpdate);

      resetPosition();
    }
  }

  /**
   * Removes a Node and its corresponding VF data.
   */
   const onRemoveNode = async (change) => {
    const store = getDataStore();
    // use its ID to get a handle on it
    const planId = store.getCurrentPlanId();
    const nodeId = change.id;
    const nodeToDelete = store.getCursor(DisplayNode.getPath(planId, nodeId));

    // Compute edges to delete
    const edgesToDelete: Array<DisplayEdge> = [];
    for (let edge of store.getDisplayEdges(planId)) {
      if (edge.source == nodeId || edge.target == nodeId) {
        edgesToDelete.push(edge);
      }
    }
    // Create an array of promise returning functions to serialize execution of deletions
    const deleteFuncs = edgesToDelete.map((edge) => (async () => store.delete(edge.path)));

    // get the paths
    const nodePath: string = nodeToDelete.path;
    const vfPath: string = nodeToDelete.vfPath;

    /**
     * We don't want to delete the `Agents` or `ResourceSpecifications`, so
     * let's add in some logic to handle special cases.
     *
     * TODO: Map out the various kinds of behaviours we need.
     */
    const type = getAlmostLastPart(vfPath);
    switch (type) {
      case 'process':
        await store.delete(nodePath);
        await store.delete(vfPath);
        // Execute each deletion in serial fashion, so each one is based on the right Holochain head
        deleteFuncs.reduce((chain, curr) => chain.then(curr), Promise.resolve());
        break;
      default:
        await store.delete(nodePath);
        // Execute each deletion in serial fashion, so each one is based on the right Holochain head
        deleteFuncs.reduce((chain, curr) => chain.then(curr), Promise.resolve());
        break;
    }
  }

  /**
   * Removes an edge and its commitment.
   */
  const onRemoveEdge = async (change) => {
    const store = getDataStore();
    // use its ID to get a handle on it
    const planId = store.getCurrentPlanId();
    const edgeId = change.id;
    const edgeToDelete = store.getCursor(DisplayEdge.getPath(planId, edgeId));

    // delete the edge
    const edgePath: string = edgeToDelete.path;
    await store.delete(edgePath);

    // Guard this for now while data isn't consistent
    // Delete the commitment
    if(edgeToDelete.vfPath && (edgeToDelete.vfPath != undefined || edgeToDelete.vfPath != '')) {
      const vfPath: string = edgeToDelete.vfPath;
      await store.delete(vfPath);
    }
  }

  /**
   * Dispatches changes related to nodes
   */
  const onNodesChange = useCallback(
    async (changes) => {
      // TODO: move this call into the functions below when we add custom logic to determine if a node can be removed
      setNodes((nds) => applyNodeChanges(changes, nds))
      changes.forEach(change => {
        switch (change.type) {
          case 'remove':
            onRemoveNode(change);
            break;
          case 'position':
            onDragNode(change)
            break;
        }
      });
    },
    [setNodes]
  );

  /**
   * Dispatches changes related to edges
   */
  const onEdgesChange = useCallback(
    async (changes) => {
      // TODO: move this call into the functions below when we add custom logic to determine if a edge can be removed
      setEdges((edges) => applyEdgeChanges(changes, edges));
      console.log(changes);
      changes.forEach(change => {
        switch (change.type) {
          case 'remove':
            onRemoveEdge(change);
          default:
            break;
        }
      });
    },
    [setEdges]
  );

  /**
   * This returns the forms that go in the modal that open on the page when
   * something is dropped on the screen.
   *
   * Currently, only processSpecification needs a dialog that lets a user create
   * a new process. The other components just use things already created by the
   * user through other means.
   *
   * At some point, we'll need to be able to open an existing node and edit it.
   * However, we need to decide how things are edited. Are the objects in the
   * side panel only editable through the side panel? Can we edit them by
   * clicking on any instance of them (with the exception of the
   * ProcessSpecification?) Or should only specific instances of objects in the
   * flow diagram be editable?
   *
   * At any rate, we'll need to be able to specify an existing object to pass
   * into the modal to be edited.
   */
  const selectModalComponent = () => {
    switch (type) {
      case 'processSpecification':
        return <ProcessModal processSpecificationPath={currentPath} closeModal={closeModal} handleAddNode={handleAddNode}/>;
      case 'resourceSpecification':
        return <ResourceModal />;
      case 'agent':
        return <AgentModal />;
      case 'commitment':
        return <CommitmentModal sourcePath={source} targetPath={target} closeModal={closeModal} handleAddEdge={handleAddEdge} />;
    }
  }

  /**
   * Adds a display node corresponding to a Valueflows object.
   *
   * vfPath refers to the Valueflows object.
   */
  async function handleAddNode(item: PathedData & NamedData, position?: XYPosition) {
    // Item is from the form entered in the modal
    // and has already been stored on the DHT by this point
    const store = getDataStore();

    // Create an HDK entry version of the node
    const newNode = new DisplayNode({
      name: item.name,
      vfPath: item.path,
      planId: store.getCurrentPlanId(),
      type: getAlmostLastPart(item.path),
      position: position ? position : currentPosition
    });

    // Persist to DHT
    store.set(newNode);

    // Add to local state to render new node on canvas
    setNodes((nds) => nds.concat(newNode));

    // reset node state
    setCurrentPosition(undefined);
  }

  /**
   * Adds an edge corresponding to a commitment
   */
  async function handleAddEdge(item: PathedData & NamedData) {
    const store = getDataStore();
    const thing = store.getCursor(item.path) as Commitment;
    // Add the edge
    const edge = new DisplayEdge({
      source,
      target,
      label: thing.action,
      labelBgStyle: { fill: '#fff', color: '#fff', fillOpacity: 0.7 },
      vfPath: item.path,
      planId: store.getCurrentPlanId(),
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    } as DisplayEdgeShape);
    await store.set(edge);
    setEdges((eds) => eds.concat(edge));
  }

  return (
    <div className='rf-provider-container'>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            id="flow-canvas"
            className='rea-flow-canvas'
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            zoomOnDoubleClick={false}
            deleteKeyCode='AltLeft+Backspace'
            fitView
            attributionPosition="top-right">
            <MiniMap />
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <ModalContainer
        isOpen={isModelOpen}
        closeModal={closeModal}
        >{selectModalComponent()}</ModalContainer>
    </div>
  );
}

export default FlowCanvas;

