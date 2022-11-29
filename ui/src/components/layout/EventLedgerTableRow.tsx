import { SlCard } from "@shoelace-style/shoelace/dist/react";
import React, { useEffect, useState } from "react";
import { getDataStore } from "../../data/DataStore";
import {
  EconomicEventShape,
  Action,
  Unit,
  Agent,
  ResourceSpecification,
  Process
} from "valueflows-models";


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
  const actions: Action[] = dataStore.getActions();
  const units: Unit[] = dataStore.getUnits();

  const getHydratedState = () => {
    return {
      id,
      created,
      action: (action && action != undefined) ? actions.find((a) => a.id == action) : undefined,
      provider: (provider && provider != undefined) ? dataStore.getById<Agent>(provider) : undefined,
      receiver: (receiver && receiver != undefined) ? dataStore.getById<Agent>(receiver) : undefined,
      resourceConformsTo: (resourceConformsTo && resourceConformsTo != undefined) ? dataStore.getById<ResourceSpecification>(resourceConformsTo) : undefined,
      resourceQuantity: {
        hasNumericalValue: (resourceQuantity && resourceQuantity != undefined  && resourceQuantity.hasUnit && resourceQuantity.hasNumericalValue != undefined) ? resourceQuantity.hasNumericalValue: undefined,
        hasUnit: (resourceQuantity && resourceQuantity != undefined && resourceQuantity.hasUnit && resourceQuantity.hasUnit != undefined) ? units.find((unit) => unit.id == resourceQuantity.hasUnit) : undefined,
      },
      effortQuantity: {
        hasNumericalValue: (effortQuantity && effortQuantity != undefined  && effortQuantity.hasUnit && effortQuantity.hasNumericalValue != undefined) ? effortQuantity.hasNumericalValue: undefined,
        hasUnit: (effortQuantity && effortQuantity != undefined && effortQuantity.hasUnit && effortQuantity.hasUnit != undefined) ? units.find((unit) => unit.id == effortQuantity.hasUnit) : undefined,
      },
      inputOf: (inputOf && inputOf != undefined) ? dataStore.getById<Process>(inputOf) : undefined,
      outputOf: (outputOf && outputOf != undefined) ? dataStore.getById<Process>(outputOf) : undefined
    };
  }

  const assembleCard = () => {
    const hydrated = getHydratedState();
    
    let body: string = '';
    body += (`Date: ${new Date(created).toISOString().split('T')[0]} `);
    if (hydrated.resourceQuantity && hydrated.resourceQuantity.hasNumericalValue) {
      body += (`, ${(hydrated.action).label}: `);
      body += (`${hydrated.resourceQuantity.hasNumericalValue} ${hydrated.resourceQuantity.hasUnit.name} of ${(hydrated.resourceConformsTo).name}`);
    }
    if (effortQuantity && effortQuantity.hasNumericalValue) {
      body += (`, ${(hydrated.action).label}: `);
      body += (`${hydrated.effortQuantity.hasNumericalValue} ${hydrated.effortQuantity.hasUnit.name} of ${(hydrated.resourceConformsTo).name}`);
    }
    if (provider) {
      body += (`, Provider: ${(hydrated.provider).name}`);
    }
    if (receiver) {
      body += (`, Receiver: ${(hydrated.receiver).name}`);
    }
    if (inputOf) {
      body += (`, Input Of: ${(hydrated.inputOf).name}`);
    }
    if (outputOf) {
      body += (`, Output Of: ${(hydrated.outputOf).name}`);
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