import React, { useContext, useEffect, useReducer, useState } from "react";
import FlowCanvas from "./components/layout/FlowCanvas";
import Pallet from "./components/layout/Pallet";
import { Agent, ProcessSpecification, ResourceSpecification } from "./data/models/Valueflows/Knowledge";
import { reducer as rReducer } from "./store/resourceSpecification/state";
import { reducer as pReducer } from "./store/processSpecification/state";

interface Props {
  setEdit: (entity: any) => void;
}

const Home: React.FC<Props> = ({setEdit}) => {
  const [resourceSpecifications, setResourceSpecifications] = useState<ResourceSpecification[]>([]);
  const [processSpecifications, setProcessSpecifications] = useState<ProcessSpecification[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  const [{resourceSpecification}, rdispatch] = useReducer(rReducer, {
    resourceSpecification: {},
    isLoading: false,
    hasError: false
  });

  // const [{processSpecification}, pdispatch] = useReducer(pReducer, {
  //   processSpecification: {},
  //   isLoading: false,
  //   hasError: false
  // });

  console.log('resourceSpecification', resourceSpecification);
  console.log('processSpecification', processSpecification);

  useEffect(()=>{
    //refreshFromDataStore();
  }, []);

  function updateDisplayState(id: string, type: string): void {
      if (type === 'resourceSpecification') {
        setResourceSpecifications(resourceSpecifications.filter(resource => resource.id !== id));
      }
      if (type === 'processSpecification') {
        setProcessSpecifications(processSpecifications.filter(process => process.id !== id));
      }
      if (type === 'agent') {
        setAgents(agents.filter(agent => agent.id !== id));
      }
  }

  return(
    <div style={{display:"flex"}}>
      <Pallet
        resourceSpecifications={Object.values(resourceSpecification)}
        processSpecifications={Object.values(processSpecification)}
        agents={agents}
        updateDisplayState={updateDisplayState}
        setEdit={setEdit}
      />
      <FlowCanvas />
    </div>
  )
}

export default Home;