import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import { gql, useQuery} from '@apollo/client';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import ProcessNode from '../components/nodes/ProcessNode';

let id = 0;
const getId = () => `node_${id++}`;

const DefaultLayout = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const nodeTypes = useMemo(() => ({ processNode: ProcessNode, }), []); 

  useEffect(() => {
    let element = document.getElementsByClassName('react-flow__container')[0];
    // element.addEventListener("dblclick", clickToAddProcess);
    element.style.position = "relative";
  }, []);
	
  const addProcess = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();  
      console.log(reactFlowBounds);
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      });

      const type = 'processNode'
      const newNode = {
        id: getId(),
        type,
        position,
        data: { 
          label: `Process node`
        }
      };

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance]
  );

  // const DEFAULT_QUERY = gql`
  //   query getAgent {
  //     myAgent {
  //       id
  //       name
  //     }
  //   }
  //  `;
   
  // function Agent() {
  //   const { loading, error, data } =  useQuery(DEFAULT_QUERY);
  //   if (loading) return <p>Loading...</p>;
  //   if (error) {
  //     console.error(error);
  //     return <p>Error :(</p>;
  //     }
  //   return <div>
  //           <p><strong>AgentID:</strong> {data.myAgent.id}</p>
  //           <p><strong>Agent Name: </strong>{data.myAgent.name}</p>
  //         </div>;
  // }

  const layoutStyle = {
    margin: "30px",
    border: "black 1px solid",
    height: "500px",
    width: "1500px"
  };


  return (
    <div>
      <ReactFlowProvider>
        <ReactFlow
          id="flow-canvas"
          className="reactflow-wrapper"
          ref={reactFlowWrapper}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onPaneClick={addProcess}
          zoomOnDoubleClick={false}
          fitView
          attributionPosition="top-right"
          style={layoutStyle}>
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default DefaultLayout;