import React from 'react';
import { gql, useQuery} from '@apollo/client';

const DefaultLayout = () => {
  const DEFAULT_QUERY = gql`
    query getAgent {
      myAgent {
        id
        name
      }
    }
   `;
   
  function Agent() {
    const { loading, error, data } =  useQuery(DEFAULT_QUERY);
    if (loading) return <p>Loading...</p>;
    if (error) {
      console.error(error);
      return <p>Error :(</p>;
      }
    return <div>
            <p><strong>AgentID:</strong> {data.myAgent.id}</p>
            <p><strong>Agent Name: </strong>{data.myAgent.name}</p>
          </div>;
  }

  return (
    <div>
      <h1>Hello from Holo-REA!</h1>
      <Agent />
    </div>
);
}

export default DefaultLayout;