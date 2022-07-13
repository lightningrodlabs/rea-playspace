import React from "react";
import { getMyProfile } from "../../data/ProfilesStore";
import { AgentAvatar } from "../../elements";
import { getAgentPubKey } from "../../hcWebsockets";
import { SlButton } from '@shoelace-style/shoelace/dist/react';
import { Link } from 'react-router-dom';

export type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {

  return (
    <div className="header">
      <Link to="/">
        <SlButton variant="primary">Flow</SlButton>
      </Link>
      <Link to="/events">
        <SlButton variant="primary"outline >Ledger</SlButton>
      </Link>
      <div>
        <AgentAvatar size={32} agentPubKey={getAgentPubKey().toString()} >
         </AgentAvatar> 
        {" "}
        {getMyProfile().profile.nickname.slice(0, 8)}
      </div>
    </div>
  );
};

export default Header;