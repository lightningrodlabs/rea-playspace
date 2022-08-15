import React from "react";
import { getZomeApi } from "../../hcWebsockets";
import { SlButton } from '@shoelace-style/shoelace/dist/react';
import { Link } from 'react-router-dom';

export type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {

  const putSignalCall = async (): Promise<void> => {
    const zomeApi = getZomeApi();
    try {
      await zomeApi.signal_call('put.path', 'put');
    } catch (e) { 
      console.error(e)
    }
  }

  const deleteSignalCall = async (): Promise<void> => {
    const zomeApi = getZomeApi();
    try {
      await zomeApi.signal_call('delete.path', 'delete');
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
      <SlButton variant="primary"outline onClick={putSignalCall}>Tigger Put Signal Call</SlButton>
      <SlButton variant="primary"outline onClick={deleteSignalCall}>Tigger Delete Signal Call</SlButton>
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