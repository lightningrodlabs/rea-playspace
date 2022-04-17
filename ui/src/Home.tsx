import React, { useEffect, useState } from "react";
import FlowCanvas from "./components/layout/FlowCanvas";
import Pallet from "./components/layout/Pallet";
import { Agent, Plan, ProcessSpecification, ResourceSpecification } from "./types/valueflows";
import DataStore from "./data/store"

interface Props {}

const Home: React.FC<Props> = () => {
  const [resourceSpecifications, setResourceSpecifications] = useState<ResourceSpecification[]>([]);
  const [processSpecifications, setProcessSpecifications] = useState<ProcessSpecification[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [store, setStore] = useState<DataStore>();

  useEffect(()=>{
    const store = new DataStore();
    setStore(store);
    store.getOrCreateRoot().then(()=>{
      setResourceSpecifications(store.getResourceSpecifications());
      setProcessSpecifications(store.getProcessSpecifications());
      setAgents(store.getAgents());
    });
  }, []);

  return(
    <div style={{display:"flex"}}>
      <Pallet
        store={store}
        resourceSpecifications={resourceSpecifications}
        processSpecifications={processSpecifications}
        agents={agents}
      />
      <FlowCanvas store={store} />
    </div>
  )
}

export default Home;