import React, {useState} from 'react';
import { gql, useQuery} from '@apollo/client';
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { nodes as initialNodes, edges as initialEdges } from './initial-elements';
import AddProcessModal from '../components/AddProcessModal';

const onInit = (reactFlowInstance) => console.log('flow loaded:', reactFlowInstance);

const DefaultLayout = () => {
  const [isProcessOpen, setIsProcessOpen] = useState(false);
  const [isCommitmentOpen, setIsCommitmentOpen] = useState(false);

  const DEFAULT_QUERY = gql`
    query getAgent {
      myAgent {
        id
        name
      }
    }
   `;

   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
   const onConnect = (params) => setEdges((eds) => addEdge(params, eds));
   
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

  function toggleProcessModal() {
    setIsProcessOpen(!isProcessOpen);
  }
  function toggleCommitmentModal() {
    console.log("close commitment");
    setIsCommitmentOpen(!isCommitmentOpen);
  }

  return (
    <div>
      <button style={{marginLeft: "30px"}} onClick={toggleProcessModal}>Add Process</button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={onInit}
        fitView
        attributionPosition="top-right"
        style={layoutStyle}>
        <Background color="#aaa" gap={16} />
      </ReactFlow>
      <AddProcessModal isProcessOpen={isProcessOpen} toggleProcessModal={toggleProcessModal} isCommitmentOpen={isCommitmentOpen} toggleCommitmentModal={toggleCommitmentModal}/>
    </div>
  );
}

export default DefaultLayout;