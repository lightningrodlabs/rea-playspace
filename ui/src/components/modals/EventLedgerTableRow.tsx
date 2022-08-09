import { SlCard } from "@shoelace-style/shoelace/dist/react";
import React, { useEffect, useState } from "react";
import getDataStore from "../../data/DataStore";
import { Action, Unit } from "../../data/models/Valueflows/Knowledge";
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
      outputOf
    }, setState
  ] = useState<EconomicEventShape>(economicEvent);

  const dataStore = getDataStore();

  useEffect(()=>{
    getNamesForId();
  },[]);
  
  const getNamesForId = (): void => {
    
    const stateCopy = { 
      id,
      created,
      action,
      provider, 
      receiver, 
      resourceConformsTo,
      resourceQuantity,
      effortQuantity,
      inputOf, 
      outputOf
    };
    
    const actions: Action[] = dataStore.getActions();
    // Get the action

    if (action && action != undefined) {
      stateCopy.action = actions.find((a) => a.id == action);
    }

    if (provider && provider != undefined) {
      stateCopy.provider = dataStore.getById(provider as string);
    }

    if (receiver && receiver != undefined) {
      stateCopy.receiver = dataStore.getById(receiver as string);
    } 

    if (resourceConformsTo && resourceConformsTo != undefined) {
      stateCopy.resourceConformsTo = dataStore.getById(resourceConformsTo as string);
    }

    if (inputOf && inputOf != undefined) {
      stateCopy.inputOf = dataStore.getById(inputOf as string);
    } 

    if (outputOf && outputOf != undefined) {
      stateCopy.outputOf = dataStore.getById(outputOf as string);
    }

    setState(stateCopy);
  }

  const assembleCard = () => {
    let resourceQuantityUnit: Unit, effortQuantityUnit: Unit;
    const units = dataStore.getUnits();
    if (resourceQuantity && resourceQuantity != undefined && resourceQuantity.hasUnit && resourceQuantity.hasUnit != undefined) {
      resourceQuantityUnit = units.find((unit) => unit.id == resourceQuantity.hasUnit);
    }

    if (effortQuantity && effortQuantity != undefined && effortQuantity.hasUnit && effortQuantity.hasUnit != undefined) {
      effortQuantityUnit = units.find((unit) => unit.id == effortQuantity.hasUnit);
    }
    let body: string = '';
    body += (`Date: ${new Date(created).toISOString().split('T')[0]} `);
    if (resourceQuantity && resourceQuantity.hasNumericalValue) {
      body += (`, ${(action as ActionShape).label}: `);
      body += (`${resourceQuantity.hasNumericalValue} ${resourceQuantityUnit.name} of ${(resourceConformsTo as ResourceSpecificationShape).name}`);
    }
    if (effortQuantity && effortQuantity.hasNumericalValue) {
      body += (`, ${(action as ActionShape).label}: `);
      body += (`${effortQuantity.hasNumericalValue} ${effortQuantityUnit.name} of ${(resourceConformsTo as ResourceSpecificationShape).name}`);
    }
    if (provider) {
      body += (`, Provider: ${(provider as AgentShape).name}`);
    }
    if (receiver) {
      body += (`, Receiver: ${(receiver as AgentShape).name}`);
    }
    if (inputOf) {
      body += (`, Input Of: ${(inputOf as ProcessShape).name}`);
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