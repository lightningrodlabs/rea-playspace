import { SlCard } from "@shoelace-style/shoelace/dist/react";
import React, { useState } from "react";
import { Agent, ResourceSpecification } from "../../data/models/Valueflows/Knowledge";
import { EconomicResource } from "../../data/models/Valueflows/Observation";

export type Props = {
  economicResource: EconomicResource
  agents: Record<string, Agent>
  resourceSpecifications: Record<string, ResourceSpecification>
};

const ResourceLedgerTableRow: React.FC<Props> = ({economicResource, agents, resourceSpecifications}) => {
  const [
    { 
      id,
      created,
      name,
      conformsTo,      // ResourceSpecification
      primaryAccountable, // Agent ID of the accountable party
      trackingIndentifier,
      onhandQuantity,
      accountingQuantity,
      currentLocation,
      note,
      classifiedAs,
      image,
      unitOfEffort,
      state,
      stage,            // ProcessSpecification ID
      containedIn,      // EconomicResource ID
      lot
    }, setState
  ] = useState<EconomicResource>(economicResource);

  const assembleCardText = () => {
    let body: string = '';
    body += (`Name: ${name}. `);
    if (primaryAccountable) {
      body += (`Primary Accountable: ${agents[primaryAccountable].name}. `);
    }
    body += (`Accounting Quantity: ${accountingQuantity.hasNumericalValue}. `);
    body += (`Onhand Quantity: ${onhandQuantity.hasNumericalValue}. `);
    if (conformsTo) {
      body += (`Conforms To: ${resourceSpecifications[conformsTo].name}.`)
    }
    return body;
  }

  return (
    <>
      <SlCard key={id} className="card-basic">
        {assembleCardText()}
      </SlCard>
    </>
  );
}

export default ResourceLedgerTableRow;