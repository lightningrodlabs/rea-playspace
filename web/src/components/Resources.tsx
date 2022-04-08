import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import EconomicResourceList from "./EconomicResourceList";
import MainPanelHeader from "../components/MainPanelHeader";

export type ResourcesProps = {}

const Resources: React.FC<ResourcesProps> = () => {
  return (
    <>
      <MainPanelHeader>
        <h2>Resources</h2>
        <div>
          <Link to="/resources/transfer">
            <SlButton variant="primary">Transfer</SlButton>
          </Link>
          {' '}
          <Link to="/resources/new">
            <SlButton variant="primary">Add Resource</SlButton>
          </Link>
        </div>
      </MainPanelHeader>
      {/* <EconomicResourceList myAgentId={myAgentId} /> */}
    </>
  );
};

export default Resources;