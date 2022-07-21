import { SlCard } from "@shoelace-style/shoelace/dist/react";
import React, { useEffect, useState } from "react";
import getDataStore from "../../data/DataStore";
import { getProfileNameById } from "../../data/ProfilesStore";
import { ActionShape, AgentShape, EconomicEventShape, ProcessShape, ResourceSpecificationShape } from "../../types/valueflows";

export type Props = {
  economicEvent: EconomicEventShape
};

const EventLedgerTableRow: React.FC<Props> = ({economicEvent}) => {
  const [
    { 
      id,
      created,
      action,
      provider, 
      receiver, 
      resourceConformsTo,
      resourceQuantity,
      effortQuantity,
      inputOf, 
      outputOf}, setState
  ] = useState<EconomicEventShape>(economicEvent);

  useEffect(()=>{
    getNamesForId();
  },[]);
  
  const getNamesForId = async (): Promise<void> => {
    const dataStore = getDataStore();

    if (action) {
      const actionObj = await getProfileNameById(action as string);
      setState(prevState => ({ ...prevState, action: actionObj}));
    }

    if (provider) {
      const providerObj = await getProfileNameById(provider as string);
      setState(prevState => ({ ...prevState, provider: providerObj}));
    }

    if (receiver) {
      const receiverObj = await getProfileNameById(receiver as string);
      setState(prevState => ({ ...prevState, receiver: receiverObj}));
    } 

    if (resourceConformsTo) {
      const resourceConformsToObj = await dataStore.getById(resourceConformsTo as string);
      setState(prevState => ({ ...prevState, resourceConformsTo: resourceConformsToObj}));
    }

    if (inputOf) {
      const inputOfObj = await dataStore.getById(inputOf as string);
      setState(prevState => ({ ...prevState, inputOf: inputOfObj}));
    } 

    if (outputOf) {
      const outputOfObj = await dataStore.getById(outputOf as string);
      setState(prevState => ({ ...prevState, outputOf: outputOfObj}));
    }
  }

  const assembleCard = () => {
    let body: string = '';
    body += (`Date: ${new Date(created).toISOString().split('T')[0]} `);
    if (resourceQuantity && resourceQuantity.hasNumericalValue) {
      body += (`, ${(action as ActionShape).label}: `);
      body += (`${resourceQuantity.hasNumericalValue} ${resourceQuantity.hasUnit} of ${(resourceConformsTo as ResourceSpecificationShape).name}  `);
    }
    if (effortQuantity && effortQuantity.hasNumericalValue) {
      body += (`, ${(action as ActionShape).label}: `);
      body += (`${effortQuantity.hasNumericalValue} ${effortQuantity.hasUnit} of ${(resourceConformsTo as ResourceSpecificationShape).name} `);
    }
    if (provider) {
      body += (`, Provider: ${(provider as AgentShape).name} `);
    }
    if (receiver) {
      body += (`, Receiver: ${(receiver as AgentShape).name} `);
    }
    if (inputOf) {
      body += (`, Input Of: ${(inputOf as ProcessShape).name} `);
    }
    if (outputOf) {
      body += (`, Output Of: ${(outputOf as ProcessShape).name}`);
    }
    return body;
  }

  return (
    <>
      <SlCard key={id} className="card-basic">
        {assembleCard()}
      </SlCard>
    </>
  );
}

export default EventLedgerTableRow;