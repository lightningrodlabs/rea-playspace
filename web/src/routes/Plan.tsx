import React from "react";
import FlowLayout from "../components/FlowLayout";
import Pallet from "../components/Pallet";

interface Props {
  myAgentId: string;
}

const Plan: React.FC<Props> = ({myAgentId}) => {

  return(
    <div style={{display:"flex"}}>
      <Pallet myAgentId={myAgentId}/>
      <FlowLayout myAgentId={myAgentId}/>
    </div>
  )
}

export default Plan;