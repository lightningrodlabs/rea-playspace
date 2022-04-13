import React, {useState} from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import MainPanelHeader from "../../layout/MainPanelHeader";
import ResourceSpecificationList from "./ResourceSpecificationList";
import HoloService from "../../../service";

export type ResourceSpecificationProps = {
  service: HoloService
}

const ResourceSpecification: React.FC<ResourceSpecificationProps> = ({service}) => {
  const [listSize, setListSize] = useState<number>()

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
      <ResourceSpecificationList service={service}/>
    </>
  );
};

export default ResourceSpecification;