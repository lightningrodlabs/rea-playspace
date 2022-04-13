import React from "react";
import ResourceSpecification from "../components/knowledge/ResourceSpecification";
import HoloService from "../service";

interface Props {
  service: HoloService;
}

const Knowledge: React.FC<Props> = ({service}) => {

  return(
    <div>
      <ResourceSpecification service={service}/>
    </div>
  )
}

export default Knowledge;