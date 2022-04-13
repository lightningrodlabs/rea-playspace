import React, {useState} from "react";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import MainPanelHeader from "../../layout/MainPanelHeader";
import ProcessSpecificationList from "./ProcessSpecificationList";
import HoloService from "../../../service";

export type ProcessSpecificationProps = {
  service: HoloService
}

const ProcessSpecification: React.FC<ProcessSpecificationProps> = ({service}) => {
  const [listSize, setListSize] = useState<number>()

  return (
    <>
      <MainPanelHeader>
        <h2>Process Specifications</h2>
        <div>
          <Link to="/processes/new">
            <SlButton variant="primary">Add</SlButton>
          </Link>
        </div>
      </MainPanelHeader>
      <ProcessSpecificationList service={service}/>
    </>
  );
};

export default ProcessSpecification;