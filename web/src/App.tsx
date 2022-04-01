import React, { useEffect, useState } from "react";
import "@shoelace-style/shoelace/dist/themes/light.css";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { SchemaLink } from "@apollo/client/link/schema";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import bindSchema, { autoConnect } from "@valueflows/vf-graphql-holochain";
import "./App.css";
import EconomicResourceList from "./EconomicResourceList";
import CreateEconomicResource from "./CreateEconomicResource";
import Header from "./Header";
import LeftScreenNavMenu from "./LeftScreenNavMenu";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { WHO_AM_I } from "./graphql/queries";
import MyAgentId from "./MyAgentId";
import Resources from "./routes/Resources";
import NewResource from "./routes/NewResource";
import ResourceTransfer from "./routes/ResourceTransfer";
import FlowLayout from "./routes/FlowLayout";

setBasePath(
  "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.70/dist/"
);

interface Props {}

const App: React.FC<Props> = () => {
  const [myAgentId, setMyAgentId] = useState<string>();
  const [schema, setSchema] = useState();
  const [link, setLink] = useState();
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  const connect = async () => {
    let { dnaConfig, conductorUri } = await autoConnect();
    const schema = await bindSchema({ dnaConfig, conductorUri });
    const link = new SchemaLink({ schema });
    const cache = new InMemoryCache();

    const client = new ApolloClient({
      cache: cache,
      link: link,
    });

    // @ts-ignore
    setSchema(schema);
    // @ts-ignore
    setLink(link);
    // @ts-ignore
    setClient(client);
  };

  useEffect(() => {
    connect();
  }, []);

  if (!client) {
    return <div>Making websocket connection...</div>;
  }

  if (!myAgentId) {
    return (
      <ApolloProvider client={client}>
        <MyAgentId setMyAgentId={setMyAgentId} />
      </ApolloProvider>
    );
  }

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="container">
          <Header name={myAgentId} />
          <div className="below-header">
            <LeftScreenNavMenu />

            <div className="main-panel">
                <Routes>
                  <Route
                    path="/flow"
                    element={<FlowLayout myAgentId={myAgentId}/>}
                  />
                  <Route
                    path="/resources"
                    element={<Resources myAgentId={myAgentId} />}
                  />
                  <Route
                    path="/resources/transfer"
                    element={<ResourceTransfer myAgentId={myAgentId} />}
                  />
                  <Route
                    path="/resources/new"
                    element={<NewResource myAgentId={myAgentId} />}
                  />
                </Routes>
            </div>
          </div>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
};

export default App;