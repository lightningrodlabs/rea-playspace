import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import CreateEconomicResource from "../CreateEconomicResource";
import MainPanelHeader from "../components/MainPanelHeader";

export type NewResourceProps = {
  myAgentId: string;
};

const NewResource: React.FC<NewResourceProps> = ({ myAgentId }) => {
  return (
    <>
      <MainPanelHeader>
        <h2>New Resource</h2>
        <Link to="/resources">
          <SlButton variant="primary">View Resources</SlButton>
        </Link>
      </MainPanelHeader>
      {/* <CreateEconomicResource myAgentId={myAgentId} /> */}
    </>
  );
};

export default NewResource;