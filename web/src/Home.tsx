import React from "react";
import FlowCanvas from "./components/layout/FlowCanvas";
import Pallet from "./components/layout/Pallet";
import { getAgentPubKey } from "./hcWebsockets";

interface Props {}

const Home: React.FC<Props> = () => {

  return(
    <div style={{display:"flex"}}>
      <Pallet />
      <FlowCanvas myAgentId={getAgentPubKey()}/>
    </div>
  )
}

export default Home;