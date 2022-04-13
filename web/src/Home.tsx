import React from "react";
import FlowCanvas from "./components/layout/FlowCanvas";
import Pallet from "./components/plan/Pallet";
import HoloService from "./service";

interface Props {
  myAgentId: string,
  service: HoloService,
}

const Home: React.FC<Props> = ({myAgentId, service}) => {

  return(
    <div style={{display:"flex"}}>
      <Pallet myAgentId={myAgentId} service={service}/>
      <FlowCanvas myAgentId={myAgentId}/>
    </div>
  )
}

export default Home;