import React, { useState, useCallback, useRef, useEffect, useMemo, SyntheticEvent } from 'react';
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
  updateEdge,
  NodeRemoveChange,
  EdgeRemoveChange,
  NodeChange,
  EdgeChange
} from 'react-flow-renderer';
import FlowModal from '../modals/FlowModal';
import ProcessModal from '../modals/ProcessModal';
import ResourceSpecificationNode from '../nodes/ResourceSpecificationNode';
import { getDataStore } from "../../data/DataStore";
import ModalContainer from '../modals/ModalContainer';
import { DisplayEdge, DisplayEdgeShape, DisplayNode, Position } from "../../data/models/Application/Display";
import ProcessNode from '../nodes/ProcessNode';
import { Pathed, PathFunctor } from 'data-providers';
import { Flow, ProcessShape, Process, ResourceSpecification, Commitment, EconomicEvent} from 'valueflows-models';
import { flowUpdates, displayEdgeToEdge, getDisplayNodeBy, validateFlow as validateFlow, displayNodeToNode } from '../../logic/flows';
import { getAlmostLastPart, assignFields } from 'typed-object-tweezers';
import { usePath } from 'yaati';
import { Root } from '../../data/models/Application/Root';
import { useParams } from 'react-router-dom';

interface Props {};

const FlowCanvas: React.FC<Props> = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const store = getDataStore();

  let { id: planId } = useParams();

  // STATE MANAGEMENT

  const displayNodes = usePath<'root', Root, DisplayNode>(`root.plan.${planId}.displayNode`, store);
  const displayEdges = usePath<'root', Root, DisplayEdge>(`root.plan.${planId}.displayEdge`, store);
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
   *   + type (flow: Commitment, EconomicEvent)
   * + dragging
   *   + position
   */
  const [type, setType] = useState<string>();
  const [processState, setProcessState] = useState<ProcessShape>();
  const [source, setSource] = useState<string>();
  const [sourceHandle, setSourceHandle] = useState<string>();
  const [target, setTarget] = useState<string>();
  const [targetHandle, setTargetHandle] = useState<string>();
  const [selectedDisplayEdge, setSelectedDisplayEdge] = useState<string>();
  const [selectedDisplayNode, setSelectedDisplayNode] = useState<string>();
  const [currentPosition, setCurrentPosition] = useState<XYPosition>();
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
  };

  /**
   * These use effect calls are not firing when there's a remote update. I'm not sure why.
   */
  useEffect(() => {
    if (displayNodes) {
      setNodes(Object.values(displayNodes).map((node: DisplayNode) => displayNodeToNode(node)));
    }
  }, [displayNodes]);

  useEffect(() => {
    if (displayEdges) {
      setEdges(Object.values(displayEdges).map((edge: DisplayEdge) => displayEdgeToEdge(edge)));
    }
  }, [displayEdges]);

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
          console.error(e);
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
          const item: Pathed<ResourceSpecification | Process> = store.getCursor(path);

          /**
           * Choose the action that will happen based on the object type.
           * Currently, ProcessSpecification is the most unique situation.
           */
          switch (type) {
            case 'processSpecification':
              // Set the state, then open the dialog
              const process: ProcessShape = {
                name: item.name,
                basedOn: item.id,
                plannedWithin: planId
              } as ProcessShape;
              console.log(process);
              setCurrentPosition(position);
              setType(type);
              setProcessState(process);
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
   const handleAddNode = (item: Pathed<ResourceSpecification | Process>, position?: XYPosition) => {
    // Item is from the form entered in the modal
    // and has already been stored on the DHT by this point

    // Create an HDK entry version of the node
    const newNode = new DisplayNode({
      name: item.name,
      vfPath: item.path,
      planId,
      type: getAlmostLastPart(item.path),
      position: position ? position : currentPosition
    });
    const pathedNode = PathFunctor(newNode, `root.plan.${newNode.planId}.displayNode.${newNode.id}`);
    console.log(pathedNode);

    // reset state
    setType(null);
    setCurrentPosition(undefined);

    // Add to local state to render new node on canvas
    setNodes((nds) => nds.concat(displayNodeToNode(pathedNode)));

    // Persist to DHT
    store.set(pathedNode);
  }

  /**
   * Edit a Node when it's double clicked
   */
   const onNodeEdit = (event: SyntheticEvent, node: Node) => {
    const vfNode: DisplayNode = store.getById(node.id);
    const vfType = getAlmostLastPart(vfNode.vfPath);
    if(vfType == 'process') {
      const vfProcess = store.getCursor(vfNode.vfPath) as Process;
      setProcessState(vfProcess);
      setSelectedDisplayNode(vfNode.id);
      setType('updateProcess');
      openModal();
    }
  }

  /**
   * Updates the DisplayNode object after an edit
   */
  const afterProcessEdit = (process: Process) => {
    const displayNode: DisplayNode = store.getById(selectedDisplayNode);
    displayNode.name = process.name;
    const newNode = new DisplayNode(displayNode);
    const pathedNode = PathFunctor(newNode, `root.plan.${newNode.planId}.displayNode.${newNode.id}`);

    setProcessState(null);
    setSelectedDisplayNode(null);
    setType(null);

    /**
     * When we use the `applyNodeChanges` function, it filters the array and adds
     * back the changes. We can't use applyNodeChanges here, because this is our
     * own event to update the name (and maybe other properties in the future).
     *
     * https://github.com/wbkd/react-flow/blob/ea6247f4a14bc24f4f21d4272de51c20aa73e083/src/utils/changes.ts#L52
     *
     * React internally uses object identity to verify if any changes have taken
     * place, so we need to make sure we pass in a new object so that it actually
     * re-renders our nodes.
     *
     * See: https://blog.bitsrc.io/understanding-referential-equality-in-react-a8fb3769be0
     */
    setNodes((ns) => {
      const nsNew = ns.filter((node) => node.id !== displayNode.id);
      nsNew.push(displayNodeToNode(pathedNode));
      return nsNew;
    });

    store.set(pathedNode);
  }


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
      const path = `root.plan.${planId}.displayNode.${change.id}`;
      const nodeToUpdate = store.getCursor<Pathed<DisplayNode>>(path);
      nodeToUpdate.position = new Position(position);

      resetPosition();

      store.set(nodeToUpdate);
    }
  }

  /**
   * Removes one or more Nodes and corresponding VF data.
   *
   * TIL (the hard way): we will have to validate if nodes can be deleted in both
   * this function and the the onRemoveNode method. Both methods are called when
   * any number of nodes are deleted. In fact, onRemoveNode can be called multiple
   * times with the same data for some weird bug deep inside React Flow. This
   * handler is always called with a unique set of nodes.
   */
   const onRemoveNodes = (nodes: Node[]) => {
    nodes.forEach((node) => {
      const nodeToDelete = store.getById<Pathed<DisplayNode>>(node.id);
      const nodePath: string = nodeToDelete.path;
      const vfPath: string = nodeToDelete.vfPath;
      const vfType = getAlmostLastPart(vfPath);

      // Hmm, this should kick of a rerender with a new snapshot
      store.delete(nodePath);
      // We don't want to delete the `Agents` or `ResourceSpecifications`
      (vfType == 'process') ? store.delete(vfPath) : Promise.resolve();
    });
  }

  /**
   * Removes a node from the FlowCanvas.
   */
  const onRemoveNode = (change: NodeRemoveChange) => {
    // Run the same validation check as above before running this
    //setNodes((nds) => applyNodeChanges([change], nds))
  }

  // EDGE HANDLERS

  /**
   * This is called each time a connection is made between two nodes.
   */
  const onConnect = (params: Connection) => {
    const {source, sourceHandle, target, targetHandle} = params;

    // Grab vfTypes and vfNodes off the DisplayNodes
    const { vfType: sourceVfType, vfNode: sourceVfNode } = getDisplayNodeBy(source);
    const { vfType: targetVfType, vfNode: targetVfNode } = getDisplayNodeBy(target);

    // If the connection is valid, open the flow modal
    if (validateFlow(sourceVfType, targetVfType)) {
      setType('flow');
      setSource(source);
      setSourceHandle(sourceHandle);
      setTarget(target);
      setTargetHandle(targetHandle);
      openModal();
    }
  };

 /**
   * Adds a DisplayEdge and React Flow Edge corresponding to a set of flows
   */
  const afterAddFlow = (flows: Pathed<Commitment | EconomicEvent>[]) => {
    // Only add the edge if we have a set of flows
    if (flows.length > 0) {
      // Add the edge
      const newEdge = new DisplayEdge({
        source,
        sourceHandle,
        target,
        targetHandle,
        vfPath: flows.map((flow) => flow.path),
        planId
      } as DisplayEdgeShape);
      const pathedEdge = PathFunctor(newEdge, `root.plan.${newEdge.planId}.displayEdge.${newEdge.id}`);
      store.set(pathedEdge);
    }
    setType(null);
    setSource(null);
    setSourceHandle(null);
    setTarget(null);
    setTargetHandle(null);
  }

  /**
   * Update an edge when it's dragged to a new node.
   *
   * TIL: In React Flows an edge is uniquely defined by:
   *   `reactflow__edge-${source}${sourceHandle || ''}-${target}${targetHandle || ''}`
   * I do not like this. -JB
   */
  const onEdgeUpdate = (edge: Edge, newConnection: Connection) => {
    const {source, sourceHandle, target, targetHandle} = newConnection;

    // Grab vfTypes and vfNodes off the DisplayNodes
    const { vfType: sourceVfType, vfNode: sourceVfNode } = getDisplayNodeBy(source);
    const { vfType: targetVfType, vfNode: targetVfNode } = getDisplayNodeBy(target);

    // Check if it's allowed
    if (validateFlow(sourceVfType, targetVfType)) {
      setEdges((egs): Edge[] => updateEdge(edge, newConnection, egs))

      // Update display edge params
      const vfEdge: DisplayEdge = store.getById(edge.data.id);
      vfEdge.source = newConnection.source;
      vfEdge.target = newConnection.target;
      vfEdge.sourceHandle = newConnection.sourceHandle;
      vfEdge.targetHandle = newConnection.targetHandle;

      // Update each flow to point to the correct new objects
      const updatedFlows: Pathed<Flow>[] = vfEdge.vfPath.map((path: string) => {
        const vfFlow: Pathed<Flow> = store.getCursor(path);
        const updates = flowUpdates[`${sourceVfType}-${targetVfType}`](vfFlow, sourceVfNode, targetVfNode);
        assignFields<Flow, Flow>(updates, vfFlow);
        return vfFlow;
      })

      // Persist the changes
      store.set(vfEdge);
      updatedFlows.forEach((flow) => {
        store.set(flow);
      })

      // Show the flow modal
      setSelectedDisplayEdge(vfEdge.id);
      setSource(source);
      setSourceHandle(sourceHandle);
      setTarget(target);
      setTargetHandle(targetHandle);
      setType('updateFlow');
      openModal();
    }
  }

  /**
   * Edit an edge when it's double clicked
   */
  const onEdgeEdit = (event: SyntheticEvent, edge: Edge) => {
    const vfEdge = store.getById(edge.data.id) as DisplayEdge;
    setSelectedDisplayEdge(vfEdge.id);
    setSource(vfEdge.source);
    setSourceHandle(vfEdge.sourceHandle);
    setTarget(vfEdge.target);
    setTargetHandle(vfEdge.targetHandle);
    setType('updateFlow');
    openModal();
  }

  /**
   * Updates the DisplayEdge and Edge (React Flow) object after an edit
   *
   * TIL: The comment in `afterProcessEdit` should apply here, too.
   */
  const afterFlowEdit = (items: Pathed<Commitment | EconomicEvent>[]) => {
    const displayEdge: DisplayEdge = store.getById(selectedDisplayEdge) as DisplayEdge;
    displayEdge.vfPath = items.map((item) => item.path);
    store.set(displayEdge);

    const newEdge = displayEdgeToEdge(displayEdge);
    setEdges((es) => {
      const newNodes = es.filter((edge) => edge.id !== newEdge.id);
      newNodes.push(newEdge);
      return newNodes;
    });

    setSelectedDisplayEdge(null);
    setType(null);
    setSource(null);
    setSourceHandle(null);
    setTarget(null);
    setTargetHandle(null);
  }

  /**
   * Removes one or more Edges and corresponding VF data.
   *
   * TIL (the hard way): we will have to validate if edges can be deleted in both
   * this function and the the onRemoveEdge method. Both methods are called when
   * any number of edges are deleted. In fact, onRemoveEdge can be called multiple
   * times with the same data for some weird bug deep inside React Flow. This
   * handler is always called with a unique set of edges.
   */
  const onRemoveEdges = (edges: Edge[]) => {
    edges.forEach((edge) => {
      const edgeId = edge.data.id;
      const edgeToDelete = store.getById<Pathed<DisplayEdge>>(edgeId);
      // Do we have an actual edge?
      if (edgeToDelete) {
        const edgePath: string = edgeToDelete.path;
        if (Array.isArray(edgeToDelete.vfPath)) {
          edgeToDelete.vfPath.forEach((flow: string) => store.delete(flow))
        } else {
          const vfPath: string = edgeToDelete.vfPath;
          store.delete(vfPath);
        }
        store.delete(edgePath);
      }
    });
  }

  /**
   * Removes the edge from the Flow Canvas
   */
  const onRemoveEdge = (change: EdgeRemoveChange) => {
    // Run the same validation check as above before running this
    setEdges((es) => applyEdgeChanges([change], es));
  }

  // DISPATCHING EVENTS

  /**
   * Dispatches changes related to nodes
   */
  const onNodesChange = useCallback(
    async (changes: NodeChange[]) => {
      changes.forEach((change: NodeChange) => {
        switch (change.type) {
          case 'remove':
            onRemoveNode(change);
            break;
          case 'position':
            onDragNode(change);
            setNodes((nds) => applyNodeChanges([change], nds));
            break;
          default:
            setNodes((nds) => applyNodeChanges([change], nds));
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
    async (changes: EdgeChange[]) => {
      changes.forEach((change: EdgeChange) => {
        switch (change.type) {
          case 'remove':
            onRemoveEdge(change);
            break;
          default:
            setEdges((es) => applyEdgeChanges([change], es));
            break;
        }
      });
    },
    [setEdges, edges]
  );

  /**
   * This returns the forms that go in the modal when an action is taken on the screen.
   */
  const selectModalComponent = () => {
    switch (type) {
      case 'processSpecification':
        return <ProcessModal processState={processState} closeModal={closeModal} afterward={handleAddNode}/>;
      case 'updateProcess':
        return <ProcessModal processState={processState} closeModal={closeModal} afterward={afterProcessEdit}/>;
      case 'flow':
        return <FlowModal source={source} target={target} planId={planId} closeModal={closeModal} afterward={afterAddFlow} />;
      case 'updateFlow':
        return <FlowModal vfPath={store.getById<Pathed<DisplayEdge>>(selectedDisplayEdge).vfPath} source={source} target={target} planId={planId} closeModal={closeModal} afterward={afterFlowEdit}/>;
      default:
        return <></>
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
            onEdgesDelete={onRemoveEdges}
            onNodesDelete={onRemoveNodes}
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
            <MiniMap 
              nodeStrokeColor={(n) => {
                if (n.type === 'resourceSpecification') return '#71bffc';
                if (n.type === 'process') return '#F7E594';
              }}
              nodeColor={(n) => {
                if (n.type === 'resourceSpecification') return '#71bffc';
                if (n.type === 'process') return '#F7E594';
              }}/>
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
