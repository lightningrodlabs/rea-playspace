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
import BlankAddModal from './modals/BlankAddModal';
import ProcessNode from './nodes/ProcessNode';
import CreateEconomicResource from './CreateEconomicResource';
import { nodes as initialNodes, edges as initialEdges } from '../data/initial-elements';

let id = 0;
const getId = () => `node_${id++}`;

interface Props {
  myAgentId: string;
}

interface NodeData {
  data: {
    label: Element
  }
}

const FlowLayout: React.FC<Props> = (props) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | undefined>(undefined);
  const [addingNode, setAddingNode] = useState(false);
  const [currentNodeName, setCurrentNodeName] = useState<string>();
  const [currentPosition, setCurrentPosition] = useState<XYPosition>();
  const onConnect = (params: Connection) => setEdges((eds) => addEdge(params, eds));

  const nodeTypes = useMemo(() => ({ processNode: ProcessNode, }), []); 

  useEffect(() => {
    let element: HTMLElement = document.getElementsByClassName('react-flow__container')[0] as HTMLElement;
    element.style.position = "relative";
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    console.log('dragover');
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      console.log('drop');
      if (reactFlowWrapper && reactFlowWrapper.current) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const name = event.dataTransfer.getData('application/reactflow');

        // check if the dropped element is valid
        if (typeof name === 'undefined' || !name) {
          return;
        }
        if (reactFlowInstance) {
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          });
          const newNode = {
            id: getId(),
            position:position!,
            data: { label: (<>{name}</>) },
          };

          setNodes((nds) => nds.concat(newNode));
    }
    }
  },
    [reactFlowInstance]
  );

  // click viewport -> get location
  // open modal
  // enter data
  // save name to state
  // submit to graphql
  // close modal
  // generate node with location
	
  // on flow view click
  const handleSetPosition = (event:any): void => {
      event.preventDefault();
      if (reactFlowWrapper && reactFlowWrapper.current) {
        const reactFlowBounds: DOMRect = reactFlowWrapper.current!.getBoundingClientRect();
        if (reactFlowInstance) {
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top
          });
          setCurrentPosition(position);
          toggleModal();
        }
      }
    }

  // gets called when modal closes. Uses name and position state to generate new node
  function handleAddNode() {
    //const type: string = 'processNode';
    const newNode = {
      id: getId(),
      position: currentPosition!,
      data: { 
        label:( <>Resource name: {currentNodeName}</>)
      }
    }
    setNodes((nds) => nds.concat(newNode));
    setCurrentNodeName("");
    setCurrentPosition(undefined);
  }

  function toggleModal() {
    setAddingNode(!addingNode);
  }

  const layoutStyle = {
    margin: "30px",
    border: "black 1px solid",
    height: "500px",
    width: "1200px"
  };
  return (
    <div style={{flex:5}}>
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
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            // uncomment to allow for click to create resource
            //onPaneClick={(event:any) => handleSetPosition(event)}
            zoomOnDoubleClick={false}
            fitView
            attributionPosition="top-right"
            style={layoutStyle}>
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <BlankAddModal 
        isOpen={addingNode} 
        toggleModal={toggleModal} 
        handleAddNode={handleAddNode} 
        >  
        <CreateEconomicResource 
          myAgentId={props.myAgentId} 
          setCurrentNodeName={setCurrentNodeName} 
          closeModal={toggleModal}/>
        </BlankAddModal>
    </div>
  );
}

export default FlowLayout;