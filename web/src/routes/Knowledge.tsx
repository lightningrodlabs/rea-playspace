import { SlTab, SlTabGroup, SlTabPanel } from '@shoelace-style/shoelace/dist/react';
import React from "react";
import ProcessSpecification from '../components/knowledge/processSpecification/ProcessSpecification';
import ResourceSpecification from "../components/knowledge/resourceSpecification/ResourceSpecification";
import HoloService from "../service";

interface Props {
  service: HoloService;
}

const Knowledge: React.FC<Props> = ({service}) => {

  return(
    <>
  <SlTabGroup>
    <SlTab slot="nav" panel="resSpec">
      Resource Specifications
    </SlTab>
    <SlTab slot="nav" panel="procSpec">
      Process Specifications
    </SlTab>

    <SlTabPanel name="resSpec">
      <ResourceSpecification service={service}/>
    </SlTabPanel>
    <SlTabPanel name="procSpec">
      <ProcessSpecification service={service}/>
    </SlTabPanel>
  </SlTabGroup>
  </>
      // 
  )
}

export default Knowledge;