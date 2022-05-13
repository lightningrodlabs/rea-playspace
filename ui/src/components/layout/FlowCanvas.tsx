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
  applyEdgeChanges
} from 'react-flow-renderer';
import AgentModal from '../modals/AgentModal';
import ProcessModal from '../modals/ProcessModal';
import ResourceModal from '../modals/ResourceModal';
import AgentNode from '../nodes/AgentNode';
import ResourceSpecificationNode from '../nodes/ResourceSpecificationNode';
import getDataStore from "../../data/DataStore";
import ModalContainer from '../modals/ModalContainer';
import { DisplayEdge, DisplayEdgeShape, DisplayNode } from "../../data/models/Application/Display";
import ProcessNode from '../nodes/ProcessNode';
import { getAlmostLastPart, PathedData } from '../../data/models/PathedData';
import { NamedData } from '../../data/models/NamedData';

interface Props {};

const FlowCanvas: React.FC<Props> = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | undefined>(undefined);
  const [type, setType] = useState<string>();
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<XYPosition>();

  const nodeTypes = useMemo(() => ({
    process: ProcessNode,
    resourceSpecification: ResourceSpecificationNode,
    agent: AgentNode
  }), []);

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

  // need a variable outside of the onNodesChange callback below. useState too async-y
  const position: XYPosition = {
    x: 0,
    y: 0
  };

  function resetPosition() {
    position.x = 0;
    position.y = 0;
  }

  /**
   * This is what tracks the DisplayNodes and updates them if they change.
   *
   * TODO: We're assuming that changes is always of length 1, we should probably
   * check that or batch through all the changes.
   * TODO: Sometimes, the ability to delete an item will depend on a whole Vf
   * graph, so we'll need to add a business logic library.
   */
  const onNodesChange = useCallback(
    async (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds))
      const store = getDataStore();
      if (changes[0].type === 'remove') {
        // use its ID to get a handle on it
        const planId = store.getCurrentPlanId();
        const nodeId = changes[0].id;
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
       * track position change on every event while dragging node
       * hold on to it outside of this callback because this will
       * fire dozens of time per second. We need the last position the node
       * had before its state changes from dragging=true to dragging=false
      */
      if (changes[0].type ==='position') {
        if (changes[0].dragging) {
          position.x = changes[0].position.x,
          position.y = changes[0].position.y
        } else {
          /**
           * when dragging == false then we can use the last save position
           * and set that to the DisplayNode.position property.
           * Then persist to DHT.
          */
          const planId = store.getCurrentPlanId();
          const nodeToUpdate = store.getCursor(DisplayNode.getPath(planId, changes[0].id));
          nodeToUpdate.position = position as XYPosition;
          store.set(nodeToUpdate);

          resetPosition();
        }
      }
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    async (changes) => {
      const store = getDataStore();
      for (let edge of store.getDisplayEdges(store.getCurrentPlanId())) {
        if (edge.id == changes[0].id ) {
          store.delete(edge.path)
        }
      }
      setEdges((edges) => applyEdgeChanges(changes, edges));
      console.log(changes);
    },
    [setEdges]
  );

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

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
   * At any rate, we'll need to be able to specify an exiting object to pass into
   * the modal to be edited.
   */
  const selectModalComponent = () => {
    switch (type) {
      case 'processSpecification':
        return <ProcessModal position={currentPosition} closeModal={closeModal} handleAddNode={handleAddNode}/>;
      case 'resourceSpecification':
        return <ResourceModal />;
      case 'agent':
        return <AgentModal />;
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
   * This is called each time a connection is made between two nodes.
   */
  const onConnect = async (params: Connection) => {
    const {source, sourceHandle, target, targetHandle} = params;
    const store = getDataStore();

    // Validate objects can be connected
    const validSourceTargets = {
      'agent': [
        'process'
      ],
      'resourceSpecification': [
        'process'
      ],
      'process': [
        'agent',
        'resourceSpecification'
      ]
    };

    // Grab the paths to the objects by their ID and grab the type of their vfPath
    const sourceNode: DisplayNode = store.getCursor(store.lookUpPath(source));
    const sourceType = getAlmostLastPart(sourceNode.vfPath);
    const targetNode: DisplayNode = store.getCursor(store.lookUpPath(target));
    const targetType = getAlmostLastPart(targetNode.vfPath);

    if (validSourceTargets[sourceType].indexOf(targetType) >= 0) {
      // If we need user input for this connection, we should get it.

      // If our our conditions are met, add the edge
      const edge = new DisplayEdge({source, target, planId: store.getCurrentPlanId()} as DisplayEdgeShape);
      await store.set(edge);
      setEdges((eds) => eds.concat(edge));
    }
  };

  const layoutStyle = {
    border: "black 1px solid",
    height: "87vh",
    width: "auto"
  };

  const style = {
    flexGrow:23
  }

  return (
    <div style={style}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            id="flow-canvas"
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
            fitView
            attributionPosition="top-right"
            style={layoutStyle}>
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

