import React from "react";
import FlowLayout from "../components/layout/FlowLayout";
import Pallet from "../components/plan/Pallet";
import HoloService from "../service";

interface Props {
  myAgentId: string,
  service: HoloService,
}

const Plan: React.FC<Props> = ({myAgentId, service}) => {

  return(
    <div style={{display:"flex"}}>
      <Pallet myAgentId={myAgentId} service={service}/>
      <FlowLayout myAgentId={myAgentId}/>
    </div>
  )
}

export default Plan;