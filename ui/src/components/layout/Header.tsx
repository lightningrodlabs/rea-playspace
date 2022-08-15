import React from "react";
import { getZomeApi } from "../../hcWebsockets";
import { SlButton } from '@shoelace-style/shoelace/dist/react';
import { Link } from 'react-router-dom';

export type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {

  const signalCall = async (): Promise<void> => {
    const zomeApi = getZomeApi();
    try {
      await zomeApi.signal_call('path');
    } catch (e) { 
      console.error(e)
    }
  }

  return (
    <div className="header">
      <Link to="/">
        <SlButton variant="primary">Flow</SlButton>
      </Link>
      <Link to="/events">
        <SlButton variant="primary"outline >Ledger</SlButton>
      </Link>
      <SlButton variant="primary"outline onClick={signalCall}>Tigger Signal Call</SlButton>
      <div>
        {/* <AgentAvatar size={32} agentPubKey={getAgentPubKey().toString()} >
         </AgentAvatar>  */}
        {" "}
        {/* {getMyProfile().profile.nickname.slice(0, 8)} */}
      </div>
    </div>
  );
};

export default Header;