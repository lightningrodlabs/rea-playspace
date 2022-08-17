import React, { useEffect, useState } from "react";
import FlowCanvas from "./components/layout/FlowCanvas";
import Pallet from "./components/layout/Pallet";
import { Agent, ProcessSpecification, ResourceSpecification } from "./data/models/Valueflows/Knowledge";
import getDataStore from "./data/DataStore"

interface Props {
  setEdit: (entity: any) => void;
}

const Home: React.FC<Props> = ({setEdit}) => {
  const [resourceSpecifications, setResourceSpecifications] = useState<ResourceSpecification[]>([]);
  const [processSpecifications, setProcessSpecifications] = useState<ProcessSpecification[]>([]);

  useEffect(()=>{
    const store = getDataStore();
    setResourceSpecifications(store.getResourceSpecifications());
    setProcessSpecifications(store.getProcessSpecifications());
  }, []);

  function updateDisplayState(id: string, type: string): void {
      if (type === 'resourceSpecification') {
        setResourceSpecifications(resourceSpecifications.filter(resource => resource.id !== id));
      }
      if (type === 'processSpecification') {
        setProcessSpecifications(processSpecifications.filter(process => process.id !== id));
      }
  }

  return(
    <div style={{display:"flex"}}>
      <Pallet
        resourceSpecifications={resourceSpecifications}
        processSpecifications={processSpecifications}
        updateDisplayState={updateDisplayState}
        setEdit={setEdit}
      />
      <FlowCanvas />
    </div>
  )
}

export default Home;