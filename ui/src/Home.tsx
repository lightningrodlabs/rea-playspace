import React, { useContext, useEffect, useReducer, useState } from "react";
import FlowCanvas from "./components/layout/FlowCanvas";
import Pallet from "./components/layout/Pallet";
import { Agent, ProcessSpecification, ResourceSpecification } from "./data/models/Valueflows/Knowledge";
import { reducer as rReducer } from "./store/resourceSpecification/state";
import { reducer as pReducer } from "./store/processSpecification/state";

// import { globalStateContext } from "./data/DataStoreBase";

interface Props {
}

const Home: React.FC<Props> = () => {
  // const [resourceSpecifications, setResourceSpecifications] = useState<ResourceSpecification[]>([]);
  // const [processSpecifications, setProcessSpecifications] = useState<ProcessSpecification[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  const [{resourceSpecification}, rdispatch] = useReducer(rReducer, {
    resourceSpecification: {},
    isLoading: false,
    hasError: false
  });

  const [{processSpecification}, pdispatch] = useReducer(pReducer, {
    processSpecification: {},
    isLoading: false,
    hasError: false
  });

  console.log('resourceSpecification', resourceSpecification);
  console.log('processSpecification', processSpecification);

  useEffect(()=>{
    refreshFromDataStore();
  }, []);

  const refreshFromDataStore = (): void => {
    // setProcessSpecifications(Object.values(root.processSpecification));
    // setAgents(Object.values(root.agent));
  }

  return(
    <div style={{display:"flex"}}>
      <Pallet
        resourceSpecifications={Object.values(resourceSpecification)}
        processSpecifications={Object.values(processSpecification)}
        agents={agents}
      />
      <FlowCanvas />
    </div>
  )
}

export default Home;