import React, { useEffect, useState } from "react";
import getDataStore from "../../data/DataStore";
import { SlCard } from '@shoelace-style/shoelace/dist/react';
import { EconomicEvent } from "../../data/models/Valueflows/Observation";

export type EventLedgerProps = {};

const EventLedger: React.FC<EventLedgerProps> = ({}) => {
  const [economicEvents, setEconomicEvents] = useState<Array<EconomicEvent>>([]);

  const store = getDataStore();

  useEffect(()=>{
    fetchEvents().then();
  },[]);

  const fetchEvents = async () => {
    const events = await store.fetchAllEconomicEvents();
    setEconomicEvents(events);
    console.log(events);
  }


  const assembleCard = (econEvent: EconomicEvent) => {
    const body = `Date: ${econEvent.created}. ${econEvent.action}: ${econEvent.resourceQuantity.hasNumericalValue} ${econEvent.resourceQuantity.hasUnit} of ${econEvent.resourceConformsTo}. From: ${econEvent.provider}, To: ${econEvent.receiver}`;

    return body;
  }

  const RenderEvents = (): JSX.Element | JSX.Element[] => {
    if (economicEvents.length === 0) {
      return(
        <>
          <div>No Events to display</div>
        </>
      );
    } else {
      const eventCards: JSX.Element[] = economicEvents.map(econEvent => {
        return(        
          <SlCard key={econEvent.id} className="card-basic">
            {assembleCard(econEvent)}
          </SlCard>);
      });
      console.log(eventCards);
      return eventCards;
    }
  }

  return (
    <>
      <h1>Event Ledger</h1>
      <div style={{display: 'flex', flexDirection:'column'}}>
        <RenderEvents />
        {/* <SlCard className="card-basic">
          Agent 1 - use: 1 cup water
        </SlCard>
        <SlCard className="card-basic">
          Agent 2 - consume: 1 hour amaranth
        </SlCard>
        <SlCard className="card-basic">
          Agent 3 - cite: valueflows.pdf
        </SlCard> */}
      </div>
    </>
  );
  
  
  

};

export default EventLedger;