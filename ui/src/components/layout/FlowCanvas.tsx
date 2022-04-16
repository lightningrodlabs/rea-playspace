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
import BlankAddModal from '../modals/BlankAddModal';
import AgentNode from '../nodes/AgentNode';
import ProcessNode from '../nodes/ProcessNode';
import ResourceSpecificationNode from '../nodes/ResourceSpecificationNode';

let id = 0;
const getId = () => `node_${id++}`;

interface Props {
}

const FlowCanvas: React.FC<Props> = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | undefined>(undefined);
  const [addingNode, setAddingNode] = useState(false);
  const [currentNodeName, setCurrentNodeName] = useState<string>();
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

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    async (event) => {
      event.preventDefault();
      console.log('drop');
      if (reactFlowWrapper && reactFlowWrapper.current) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        //console.log(data.type);

        // check if the dropped element is valid
        if (typeof data.name === 'undefined' || !data.name) {
          return;
        }        

        if (reactFlowInstance) {
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          });

          //console.log(data.name, data.type);
          // create and persist node
          await persistNode(data);
          
          const newNode = {
            id: getId(),
            type: data.type,
            position:position!,
            data: { label: (<>{data.name}</>), name: data.name },
          };

          setNodes((nds) => nds.concat(newNode));
      }
    }
  },
    [reactFlowInstance]
  );

  const persistNode = async (data: any) => {
    console.log(data);

    if (data.type === 'resourceSpecification') {

    }

    if (data.type === 'agent') {

    }

    if (data.type === 'process') {
      console.log(data.type);
      toggleModal();
      // const newProcess: Process = {
      //   id: '',
      //   name: string,
      //   finished: boolean,
      //   note?: string,
      //   classifiedAs?: string,
      //   inScopeOf?: string,
      //   basedOn: ProcessSpecification
      // }
      
    }
  }
	
  // on flow view click
  const handleSetPosition = async (event:any) => {
      event.preventDefault();
      if (reactFlowWrapper && reactFlowWrapper.current) {
        const reactFlowBounds: DOMRect = reactFlowWrapper.current!.getBoundingClientRect();
        if (reactFlowInstance) {
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left + 10,
            y: event.clientY - reactFlowBounds.top + 10
          });
          await setCurrentPosition(position);
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
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            // uncomment to allow for click to create resource
            // onPaneClick={(event:any) => handleSetPosition(event)}
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
        >{}</BlankAddModal>
    </div>
  );
}

export default FlowCanvas;