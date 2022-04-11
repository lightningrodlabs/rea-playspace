import React from "react";
import FlowLayout from "../components/layout/FlowLayout";
import Pallet from "../components/layout/Pallet";

interface Props {
  myAgentId: string
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