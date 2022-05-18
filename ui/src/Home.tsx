import React, { useEffect, useState } from "react";
import FlowCanvas from "./components/layout/FlowCanvas";
import Pallet from "./components/layout/Pallet";
import { Agent, ProcessSpecification, ResourceSpecification } from "./data/models/Valueflows/Knowledge";
import getDataStore from "./data/DataStore"

interface Props {}

const Home: React.FC<Props> = () => {
  const [resourceSpecifications, setResourceSpecifications] = useState<ResourceSpecification[]>([]);
  const [processSpecifications, setProcessSpecifications] = useState<ProcessSpecification[]>([]);
  // const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(()=>{
    const store = getDataStore();
    setResourceSpecifications(store.getResourceSpecifications());
    setProcessSpecifications(store.getProcessSpecifications());
    // setAgents(store.getAgents());
  }, []);

  return(
    <div style={{display:"flex"}}>
      <Pallet
        resourceSpecifications={resourceSpecifications}
        processSpecifications={processSpecifications}
      />
      <FlowCanvas />
    </div>
  )
}

export default Home;