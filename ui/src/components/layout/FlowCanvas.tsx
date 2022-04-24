import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  ReactFlowInstance,
  XYPosition,
  applyNodeChanges
} from 'react-flow-renderer';
import AgentModal from '../modals/AgentModal';
import ProcessModal from '../modals/ProcessModal';
import ResourceModal from '../modals/ResourceModal';
import AgentNode from '../nodes/AgentNode';
import ResourceSpecificationNode from '../nodes/ResourceSpecificationNode';
import getDataStore from "../../data/DataStore";
import ModalContainer from '../modals/ModalContainer';
import { DisplayNode } from "../../data/models/Application/Display";
import { ObjectTransformations, ObjectTypeMap } from "../../data/models/ObjectTransformations";
import ProcessSpecificationNode from '../nodes/ProcessSpecificationNode';
import { PathedData } from '../../data/models/PathedData';
import { Guid } from 'guid-typescript';

interface Props {};

const FlowCanvas: React.FC<Props> = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | undefined>(undefined);
  const [type, setType] = useState<string>();
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [currentNodeName, setCurrentNodeName] = useState<string>();
  const [currentPosition, setCurrentPosition] = useState<XYPosition>();
  const onConnect = (params: Connection) => setEdges((eds) => addEdge(params, eds));

  const nodeTypes = useMemo(() => ({
    processSpecification: ProcessSpecificationNode,
    resourceSpecification: ResourceSpecificationNode,
    agent: AgentNode
  }), []);

  useEffect(() => {
    let element: HTMLElement = document.getElementsByClassName('react-flow__container')[0] as HTMLElement;
    element.style.position = "relative";
  }, []);

  const onInit = async (reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);

    let store = await getDataStore();
    const planId = await store.getCursor('root.planId');
    const displayNodes: DisplayNode[] = store.getDisplayNodes(planId);
    console.log(displayNodes);
    //const displayEdges: DisplayEdge[] = store.getDisplayEdges(planId);
    const nodes = displayNodes.map((node) => {
      return {
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data,
      };
    });
    setNodes(nodes);
    //setEdges(displayEdges);
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

  const onNodesChange = useCallback(
    async (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds))
      const store = getDataStore();
      if (changes[0].type === 'remove') {
        // use its ID to get a handle on it
        const planId = store.getCurrentPlanId();
        const displayNodes: Array<DisplayNode> = store.getDisplayNodes(planId);
        const nodeToDelete = displayNodes.find((obj) => obj.id === changes[0].id);
        // get the paths
        const vfPath: string = nodeToDelete.vfPath;
        const nodePath: string = nodeToDelete.path;
        await store.delete(vfPath);
        await store.delete(nodePath);
  
        // delete the data at the VF path and the DisplayNodes path
        // delete links?
        // delete path terminus link
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
          const store = await getDataStore();
          const planId = store.getCursor('root.planId');
          const nodeToUpdate = store.getCursor(DisplayNode.getPath(planId, changes[0].id));
          nodeToUpdate.position = position as XYPosition;

          store.set(nodeToUpdate);

          resetPosition();
        }
      }
    },
    [setNodes]
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

  const onDrop = useCallback(
    async (event) => {
      event.preventDefault();
      if (reactFlowWrapper && reactFlowWrapper.current) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

        const {item, type} = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const T = ObjectTypeMap[type];
        const transformer = ObjectTransformations[type];
        const data: typeof T = transformer(item);

        // check if the dropped element is valid
        if (typeof data.name === 'undefined' || !data.name) {
          return;
        }

        if (reactFlowInstance) {
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          });
          setCurrentPosition(position);
          setCurrentNodeName(data.name);
          //setCurrentPath(data.path);
          setType(type);
          openModal();
        }
      }
    },
    [reactFlowInstance]
  );

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

  async function handleAddNode(item: PathedData) {
    // Item is from the form entered in the modal
    // and has already been stored on the DHT by this point

    // TODO: if we had an interface with a `name` property, we wouldn't need this.
    const T = ObjectTypeMap[type];
    const transformer = ObjectTransformations[type];
    const data: typeof T = transformer(item);

    // Create react flow node object
    const id = Guid.raw();
    const node = {
      id: id,
      vfPath: data.path,
      type,
      position: currentPosition,
      // TODO: The is wrong for process, since it ends up saying "ProcessSpecification"
      data: { id: id, label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`, name: data.name }
    };
    // Create an HDK entry version of the node
    const newNode = new DisplayNode(node);
    // Persist to DHT
    const store = await getDataStore();
    store.set(newNode);

    // Add to local state to render new node on canvas
    setNodes((nds) => nds.concat(node as any));

    // reset node state
    setCurrentNodeName("");
    setCurrentPosition(undefined);
  }

  const layoutStyle = {
    border: "black 1px solid",
    height: "800px",
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

