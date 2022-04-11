import React from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import MainPanelHeader from "../layout/MainPanelHeader";
import ResourceSpecificationList from "./ResourceSpecificationList";

export type ResourceSpecificationProps = {}

const ResourceSpecification: React.FC<ResourceSpecificationProps> = () => {
  return (
    <>
      <MainPanelHeader>
        <h2>Resource Specifications</h2>
        <div>
          <Link to="/resources/new">
            <SlButton variant="primary">Add</SlButton>
          </Link>
        </div>
      </MainPanelHeader>
      <ResourceSpecificationList />
    </>
  );
};

export default ResourceSpecification;