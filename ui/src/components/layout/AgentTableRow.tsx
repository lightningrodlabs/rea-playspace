import { SlAvatar, SlCard } from "@shoelace-style/shoelace/dist/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AgentShape } from "../../types/valueflows";

export type Props = {
  agent: AgentShape
};

const AgentTableRow: React.FC<Props> = ({agent}) => {
  const [
    { 
      id,
      name,
      image,
      primaryLocation
    }, setState
  ] = useState<AgentShape>(agent);

  const navigate = useNavigate();

  const doubleClickHandler = (id: string) => {
    navigate(`/agents/edit/${id}`);
  }

  const assembleCardText = () => {
    let body: string = '';
    body += (`Name: ${name} `);
    if (primaryLocation) {
      body += (`Location: ${location} `);
    }
    return body;
  }

  return (
    <>
      <SlCard key={id} className="card-basic" onDoubleClick={() => doubleClickHandler(id)}>
        <span style={{paddingRight: "10px"}}>
          <SlAvatar image={image} ></SlAvatar>
        </span>
        {assembleCardText()}
      </SlCard>
    </>
  );
}

export default AgentTableRow;