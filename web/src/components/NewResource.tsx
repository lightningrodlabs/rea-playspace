import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import CreateEconomicResource from "./CreateEconomicResource";
import MainPanelHeader from "./MainPanelHeader";

export type NewResourceProps = {}

const NewResource: React.FC<NewResourceProps> = () => {
  return (
    <>
      <MainPanelHeader>
        <h2>New Resource</h2>
        <Link to="/resources">
          <SlButton variant="primary">View Resources</SlButton>
        </Link>
      </MainPanelHeader>
      <CreateEconomicResource />
    </>
  );
};

export default NewResource;