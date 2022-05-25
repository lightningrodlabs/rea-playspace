import React, {useState, useCallback, useRef, useEffect, useMemo, SyntheticEvent} from 'react';
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
  MiniMap,
  Controls,
  Edge,
  Node,
  updateEdge
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
import { ObjectTypeMap } from '../../data/models/ObjectTransformations';
import { ResourceSpecification } from '../../data/models/Valueflows/Knowledge';
import { Commitment, Process } from '../../data/models/Valueflows/Plan';
import { CommitmentShape } from '../../types/valueflows';

interface Props {};

const FlowCanvas: React.FC<Props> = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  let actionFiber = Promise.resolve();
  // Execute each deletion in serial fashion, so each one is based on the right Holochain head
  const scheduleActions = (actions: Array<()=>Promise<void>>) => {
    actionFiber = actions.reduce((chain: Promise<void>, curr) => chain.then(curr), actionFiber);
  }

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
  const [commitmentState, setCommitmentState] = useState<CommitmentShape>();
  const [source, setSource] = useState<string>();
  const [target, setTarget] = useState<string>();
  const [selectedDisplayEdge, setSelectedDisplayEdge] = useState<string>();
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
    setEdges(displayEdges.map((node: DisplayEdge) => node.toEdge()));
  };

  // NODE HANDLERS

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * This handles our `onDrop` event. When a node is dragged over from the side
   * pallet, this deserializes it and gets user input if needed.
   */
  const onDrop = useCallback(
    (event) => {
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
              handleAddNode(item, position);
              break;
          }
        }
      }
    },
    [reactFlowInstance]
  );

  /**
   * Adds a display node corresponding to a Valueflows object.
   *
   * vfPath refers to the Valueflows object.
   */
   const handleAddNode = (item: PathedData & NamedData, position?: XYPosition) => {
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
    scheduleActions([
      async () => store.set(newNode),
      async () => {
        // Add to local state to render new node on canvas
        setNodes((nds) => nds.concat(newNode));
        // reset state
        setType(null);
        setCurrentPosition(undefined);
      }
    ]);
  }

  const onNodeEdit = (event: SyntheticEvent, node: Node) => { console.log(event, node, "Hiyii!")}

  /**
   * Track position change on every event while dragging node.
   *
   * Hold on to position outside of this callback because this will
   * fire dozens of time per second. We need the last position the node
   * had before its state changes from dragging=true to dragging=false
   */
   const onDragNode = (change) => {
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
      nodeToUpdate.position = {...position as XYPosition};
      scheduleActions([
        async () => store.set(nodeToUpdate),
        async () => resetPosition()
      ]);
    }
  }

  /**
   * Removes a Node and its corresponding VF data.
   */
   const onRemoveNode = (change) => {
    const store = getDataStore();
    // use its ID to get a handle on it
    const planId = store.getCurrentPlanId();
    const nodeId = change.id;
    const nodeToDelete = store.getCursor(DisplayNode.getPath(planId, nodeId));
    // get the paths
    const nodePath: string = nodeToDelete.path;
    const vfPath: string = nodeToDelete.vfPath;

    // Compute edges to delete
    const edgesToDelete: Array<DisplayEdge> = [];
    for (let edge of store.getDisplayEdges(planId)) {
      if (edge.source == nodeId || edge.target == nodeId) {
        edgesToDelete.push(edge);
      }
    }
    const type = getAlmostLastPart(vfPath);

    // Create an array of promise returning functions to serialize execution of deletions
    scheduleActions([
      async () => store.delete(nodePath),
      ...edgesToDelete.map((edge) => (async () => store.delete(edge.path))),
      // We don't want to delete the `Agents` or `ResourceSpecifications`
      async () => { if (type == 'process') store.delete(vfPath)},
      async() => setEdges((store.getDisplayEdges(store.getCurrentPlanId())).map((node: DisplayEdge) => node.toEdge()))
    ]);
  }

  // EDGE BUSINESS LOGIC
  const commitmentDefaults = {
    // This is an input
    'resourceSpecification-process': (resource: ResourceSpecification, process: Process): CommitmentShape => {
      const store = getDataStore();
      return {
        plannedWithin: store.getCurrentPlanId(),
        resourceConformsTo: resource.id,
        provider: null,
        receiver: process.inScopeOf,
        action: 'use',
        inputOf: process.id
      };
    },
    // this is an output
    'process-resourceSpecification': (process: Process, resource: ResourceSpecification): CommitmentShape => {
      const store = getDataStore();
      return {
        plannedWithin: store.getCurrentPlanId(),
        resourceConformsTo: resource.id,
        provider: process.inScopeOf,
        receiver: null,
        action: 'use',
        outputOf: process.id
      };
    },
    // This is a transfer, set up the flow between the agents. User must select a resourceSpecification.
    'resourceSpecification-resourceSpecification': (source: ResourceSpecification, target: ResourceSpecification): CommitmentShape => {
      const store = getDataStore();
      return {
        plannedWithin: store.getCurrentPlanId(),
        resourceConformsTo: source.id,
        provider: null,
        receiver: null,
        action: 'transfer'
      };
    }
  }

  /**
   * Validate if a connection can happen
   */
  const validateConnection = (sourceType: string, targetType: string): boolean => {
    const validSourceTargets = {
      'resourceSpecification': [
        'process',
        'resourceSpecification'
      ],
      'process': [
        'resourceSpecification'
      ]
    };
    return validSourceTargets[sourceType]?.indexOf(targetType) >= 0
  }

  // EDGE HANDLERS

  /**
   * This is called each time a connection is made between two nodes.
   */
   const onConnect = (params: Connection) => {
    const {source, target} = params;
    const store = getDataStore();

    // Grab the paths to the objects by their ID and grab the type of their vfPath
    const sourceNode: DisplayNode = store.getById(source);
    const sourceType = getAlmostLastPart(sourceNode.vfPath);
    const T = ObjectTypeMap[sourceType];
    const sourceVfNode: typeof T = store.getCursor(sourceNode.vfPath);

    const targetNode: DisplayNode = store.getById(target);
    const targetType = getAlmostLastPart(targetNode.vfPath);
    const U = ObjectTypeMap[sourceType];
    const targetVfNode: typeof U = store.getCursor(targetNode.vfPath);

    // based on the flows in the commitment, let's set up some sensible defaults
    const initial: CommitmentShape = commitmentDefaults[`${sourceType}-${targetType}`](sourceVfNode, targetVfNode);

    // If the connection is valid, open the commitment modal
    if (validateConnection(sourceType, targetType)) {
      setType('commitment');
      setCommitmentState(initial);
      setSource(source);
      setTarget(target);
      openModal();
    }
  };

 /**
   * Adds a DisplayEdge and React Flow Edge corresponding to a commitment
   */
  const afterAddCommitment = (commitment: Commitment) => {
    const store = getDataStore();
    // Add the edge
    const edge = new DisplayEdge({
      source,
      target,
      label: commitment.action,
      vfPath: commitment.path,
      planId: store.getCurrentPlanId()
    } as DisplayEdgeShape);
    scheduleActions([
      async () => store.set(edge),
      async () => {
        setEdges((eds) => eds.concat(edge.toEdge()));
        setType(null);
        setCommitmentState(null);
        setSource(null);
        setTarget(null);
      }
    ]);
  }

  /**
   * Update an edge when it's dragged to a new node.
   *
   * TIL: In React Flows an edge is uniquely defined by:
   *   `reactflow__edge-${source}${sourceHandle || ''}-${target}${targetHandle || ''}`
   * I do not like this. -JB
   */
  const onEdgeUpdate = (edge: Edge, newConnection: Connection) => {
    const store = getDataStore();

    // Get types
    const sourceNode: DisplayNode = store.getById(newConnection.source);
    const sourceType = getAlmostLastPart(sourceNode.vfPath);

    const targetNode: DisplayNode = store.getById(newConnection.target);
    const targetType = getAlmostLastPart(targetNode.vfPath);

    // Check if it's allowed
    if (validateConnection(sourceType, targetType)) {
      const dEdge: DisplayEdge = store.getById(edge.data.id);
      dEdge.source = newConnection.source;
      dEdge.target = newConnection.target;
      dEdge.sourceHandle = newConnection.sourceHandle;
      dEdge.targetHandle = newConnection.targetHandle;
      // TODO: We should probably update the commitment and display the edit dialog
      scheduleActions([
        async () => store.set(dEdge),
        async () => setEdges((egs): Edge[] => updateEdge(edge, newConnection, egs))
      ]);
    }
  }

  /**
   * Edit an edge when it's double clicked
   */
  const onEdgeEdit = (event: SyntheticEvent, edge: Edge) => {
    const store = getDataStore();
    const vfEdge = store.getById(edge.data.id) as DisplayEdge;
    const vfCommitment = store.getCursor(vfEdge.vfPath);
    setCommitmentState(vfCommitment);
    setSelectedDisplayEdge(vfEdge.id);
    setType('updateCommitment');
    openModal();
  }

  /**
   * Updates the DisplayEdge and Edge (React Flow) object after an edit
   */
  const afterEdgeEdit = (commitment: Commitment) => {
    const store = getDataStore();
    const displayEdge: DisplayEdge = store.getById(selectedDisplayEdge) as DisplayEdge;
    displayEdge.label = commitment.action;
    scheduleActions([
      async () => store.set(commitment),
      async () => store.set(displayEdge),
      async () => {
        const newEdge = displayEdge.toEdge();
        setEdges((es) => {
          const i = es.findIndex((edge) => edge.id === newEdge.id);
          es[i] = newEdge;
          return es;
        });
      },
      async () => {
        setCommitmentState(null);
        setSelectedDisplayEdge(null);
        setType(null);
      }
    ]);
  }

  /**
   * Removes an edge and its commitment.
   */
  const onRemoveEdge = (change) => {
    console.log('on remove edge', {change}, {edges})
    const edgeArray = edges.filter((e: Edge) => {
      console.log(e.id, change.id)
      return e.id == change.id
    });
    // If we don't have an edge, don't do it. It probably got deleted by onRemoveNode or this function.
    if (edgeArray.length == 1) {
      const edgeId = edgeArray[0].data.id;
      // use its ID to get a handle on it
      const store = getDataStore();
      const planId = store.getCurrentPlanId();
      const edgeToDelete = store.getCursor(DisplayEdge.getPath(planId, edgeId));
      const edgePath: string = edgeToDelete.path;
      const vfPath: string = edgeToDelete.vfPath;
      console.log(edgePath, vfPath);
      // Delete the edge and commitment
      scheduleActions([
        async () => store.delete(edgePath),
        async () => vfPath? store.delete(vfPath) : null,
        async () => setEdges((es) => applyEdgeChanges([change], es))
      ]);
    }
  }

  // DISPATCHING EVENTS

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
    [setNodes, setEdges]
  );

  /**
   * Dispatches changes related to edges
   */
  const onEdgesChange = useCallback(
    async (changes) => {
      changes.forEach(change => {
        switch (change.type) {
          case 'remove':
            onRemoveEdge(change);
            break;
          default:
            setEdges((es) => applyEdgeChanges(changes, es));
            break;
        }
      });
    },
    [setEdges, edges]
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
        return <CommitmentModal commitmentState={{...commitmentState}} closeModal={closeModal} afterward={afterAddCommitment} />;
      case 'updateCommitment':
        return <CommitmentModal commitmentState={{...commitmentState}} closeModal={closeModal} afterward={afterEdgeEdit}/>;
    }
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
            onEdgeUpdate={onEdgeUpdate}
            onConnect={onConnect}
            onInit={onInit}
            onDrop={onDrop}
            onDragOver={onDragOver}
            zoomOnDoubleClick={false}
            onEdgeDoubleClick={onEdgeEdit}
            onNodeDoubleClick={onNodeEdit}
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
