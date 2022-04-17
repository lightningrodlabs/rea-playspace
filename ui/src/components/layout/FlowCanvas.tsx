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
import ZomeApi from '../../api/zomeApi';
import { getZomeApi } from '../../hcWebsockets';
import { RustNode } from '../../types/holochain';
import { Process } from '../../types/valueflows';
import { buildTree } from '../../utils';
import AgentModal from '../modals/AgentModal';
import ModalContainer from '../modals/ModalContainer';
import ProcessModal from '../modals/ProcessModal';
import ResourceModal from '../modals/ResourceModal';
import AgentNode from '../nodes/AgentNode';
import ProcessNode from '../nodes/ProcessNode';
import ResourceSpecificationNode from '../nodes/ResourceSpecificationNode';

let id = 0;
const getId = () => `node_${id++}`;

interface Props {}

const FlowCanvas: React.FC<Props> = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | undefined>(undefined);
  const [type, setType] = useState<string>();
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [currentNodeName, setCurrentNodeName] = useState<string>();
  const [currentPosition, setCurrentPosition] = useState<XYPosition>();
  const onConnect = (params: Connection) => setEdges((eds) => addEdge(params, eds));

  const zomeApi: ZomeApi = getZomeApi();

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
    const result: Array<RustNode> = await zomeApi.get_thing('root.plan.p1.process');
    const jsTree = buildTree(result, result[0]);
    const nodes = jsTree.children.map((e) => {
      return JSON.parse(e.val.data) as Process;
    });
    nodes.forEach((node) => {
      const position = reactFlowInstance.project({
        x: Math.floor(Math.random() * 1100),
        y: Math.floor(Math.random() * 800)
      });

      const newNode = {
        id: node.id,
        type: 'process',
        position: position,
        data: { label: (<>{node.name}</>), name: node.name},
      };
      setNodes((nds) => nds.concat(newNode));
    });
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
        const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));

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
          setCurrentNodeName(data.name)
          setType(data.type);
          openModal();
        }
      }
    },[reactFlowInstance]
    );

  const selectModalComponent = () => {
    switch (type) {
      case 'process':
        return <ProcessModal closeModal={closeModal} handleAddNode={handleAddNode}/>;
      case 'resourceSpecification':
        return <ResourceModal />;
      case 'agent':
        return <AgentModal />;
    }
  }

  function handleAddNode() {
    const newNode = {
      id: getId(),
      type,
      position: currentPosition,
      data: { label: (<>{currentNodeName}</>), name: currentNodeName },
    };
    setNodes((nds) => nds.concat(newNode));
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