import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  ReactFlowInstance,
  XYPosition
} from 'react-flow-renderer';
import AgentModal from '../modals/AgentModal';
import ProcessModal from '../modals/ProcessModal';
import ResourceModal from '../modals/ResourceModal';
import AgentNode from '../nodes/AgentNode';
import ProcessNode from '../nodes/ProcessNode';
import ResourceSpecificationNode from '../nodes/ResourceSpecificationNode';
import getDataStore, { DataStore } from "../../data/store";
import ModalContainer from '../modals/ModalContainer';
import { Process, DisplayNode, DisplayEdge, PathedData, ObjectTransformations, ObjectTypeMap } from "../../types/valueflows";

let id = 0;

interface Props {};

const FlowCanvas: React.FC<Props> = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | undefined>(undefined);
  const [type, setType] = useState<string>();
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [currentNodeName, setCurrentNodeName] = useState<string>();
  const [currentPath, setCurrentPath] = useState<string>();
  const [currentPosition, setCurrentPosition] = useState<XYPosition>();
  const onConnect = (params: Connection) => setEdges((eds) => addEdge(params, eds));

  const nodeTypes = useMemo(() => ({
    process: ProcessNode,
    resourceSpecification: ResourceSpecificationNode,
    agent: AgentNode
  }), []);

  useEffect(() => {
    let element: HTMLElement = document.getElementsByClassName('react-flow__container')[0] as HTMLElement;
    element.style.position = "relative";
  }, []);

  const onInit = async (reactFlowInstance) => {
    setReactFlowInstance(reactFlowInstance);

    let store = getDataStore();
    await store.fetchOrCreateRoot();

    const planId = (await store.getRoot())['planId']; // undefined
    const displayNodes: DisplayNode[] = store.getDisplayNodes(planId);
    const displayEdges: DisplayEdge[] = store.getDisplayEdges(planId);

    const nodes = displayNodes.map((node) => {
      const type = node.path.split('.').at(-2);
      console.log('node! ', node);
      const vfObject = store.getCursor(node.vfPath);
      return {
        id: node.id,
        type: type,
        position: node.position,
        data: { label: (<>{vfObject.name}</>), name: vfObject.name},
      };
    });

    setNodes(nodes);
    setEdges(displayEdges);
  };

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
        console.log(type, item, transformer);

        const data: typeof T = transformer(item);

        console.log(data);
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
          setCurrentPath(data.path);
          setType(data.type);
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

  function handleAddNode() {
    const store = getDataStore();

    const currentObject = store.getCursor(currentPath);
    const currentPlanId = store.getRoot()['planID'];

    let newObject = currentObject;

    // TODO: NEed to pipe in data from modal form
    if (type === 'processSpecification') {
      newObject = new Process({
        name: currentNodeName,
        finished: false,
        basedOn: currentObject.id,
        plannedWithin: currentPlanId
      });
    }

    const node = {
      vfPath: currentPath,
      type: type,
      position: currentPosition,
      data: { label: (<>{currentNodeName}</>), name: currentNodeName }
    };

    store.set(new DisplayNode(node));

    setNodes((nds) => nds.concat(node as any));
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

