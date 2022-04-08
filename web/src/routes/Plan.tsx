import React from "react";
import FlowLayout from "../components/FlowLayout";
import Pallet from "../components/Pallet";

interface Props {}

const Plan: React.FC<Props> = () => {

  return(
    <div>
      <p>Plan</p>
    </div>
    // <div style={{display:"flex"}}>
    //   <Pallet myAgentId={myAgentId}/>
    //   <FlowLayout myAgentId={myAgentId}/>
    // </div>
  )
}

export default Plan;