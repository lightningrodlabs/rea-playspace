import { ProfilesService } from "@holochain-open-dev/profiles";
import React from "react";
import { getMyProfile, getProfilesService } from "../../data/ProfilesStore";
import { AgentAvatar } from "../../elements";
import { getAgentPubKey } from "../../hcWebsockets";

export type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {

  return (
    <div className="header">
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