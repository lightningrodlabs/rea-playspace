import './App.css';
import React, { useState, useEffect } from 'react';
import DefaultLayout from './layout/DefaultLayout';
import { ApolloProvider } from '@apollo/client'
import autoConnect from '@vf-ui/graphql-client-holochain'

const App = () => {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState(); 
  const options = {
    conductorUri: 'ws://localhost:4000'
  };

  useEffect(() => {
    async function initConnection() {
      setClient(await autoConnect(options));
      setLoading(false);
    }
    initConnection();
  }, [])
  
  function renderLayout() {
    return (
      client 
      ? <ApolloProvider client={client}>               
          <DefaultLayout />
        </ApolloProvider>
      : <p>Womp! no client</p>
    ); 
  }
  
  function handleLoad() {
    return (
      loading 
      ? <div>Loading...</div> 
      : <div>{renderLayout()}</div>
    );  
  }

  return (
      <div>
        <h2>App</h2>
        {handleLoad()}
      </div>
  );
}

export default App;