import React, { useEffect, useState } from "react";
import getDataStore from "../../data/DataStore";
import { SlCard } from '@shoelace-style/shoelace/dist/react';
import { DisplayEconomicEvent } from "../../data/models/Application/Display";

export type EventLedgerProps = {};

const EventLedger: React.FC<EventLedgerProps> = ({}) => {
  const [displayEconomicEvents, setDisplayEconomicEvents] = useState<Array<DisplayEconomicEvent>>([]);

  const store = getDataStore();

  useEffect(()=>{
    fetchEvents().then();
  },[]);

  const fetchEvents = async () => {
    const events = await store.fetchAllEconomicEvents();
    const displayEvents: Array<DisplayEconomicEvent> = [];
    // loop through events and get names from IDs
    for (const event of events) {
      let displayEvent = new DisplayEconomicEvent(event);
      await displayEvent.getNamesForId(event);
      displayEvents.push(displayEvent);
    }
    setDisplayEconomicEvents(displayEvents);
  }

  const assembleCard = (econEvent: DisplayEconomicEvent) => {
    console.log('econEvent', econEvent); 
    let body: string = '';
    body += (`Date: ${new Date(econEvent.created).toISOString().split('T')[0]} || `);
    if (econEvent.resourceQuantity && econEvent.resourceQuantity.hasNumericalValue) {
      body += (`${econEvent.action}: `);
      body += (`${econEvent.resourceQuantity.hasNumericalValue} ${econEvent.resourceQuantity.hasUnit} of ${econEvent.resourceConformsTo} || `);
    }
    if (econEvent.effortQuantity && econEvent.effortQuantity.hasNumericalValue) {
      body += (`${econEvent.action}: `);
      body += (`${econEvent.effortQuantity.hasNumericalValue} ${econEvent.effortQuantity.hasUnit} of ${econEvent.resourceConformsTo} || `);
    }
    if (econEvent.provider) {
      body += (`Provider: ${econEvent.provider} || `);
    }
    if (econEvent.receiver) {
      body += (`Receiver: ${econEvent.receiver} || `);
    }
    if (econEvent.inputOf) {
      body += (`Input Of: ${econEvent.inputOf} `);
    }
    if (econEvent.outputOf) {
      body += (`Output Of: ${econEvent.outputOf}`);
    }
    return body;
  }

  const RenderEvents = (): JSX.Element => {
    if (displayEconomicEvents.length === 0) {
      return(
        <>
          <div>No Events to display</div>
        </>
      );
    } else {
      const eventCards: JSX.Element[] = displayEconomicEvents.map(econEvent => {
        return(        
          <SlCard key={econEvent.id} className="card-basic">
            {assembleCard(econEvent)}
          </SlCard>);
      });
      return (
        <>
          {eventCards}
        </>
      );
    }
  }

  return (
    <>
      <h1>Event Ledger</h1>
      <div style={{display: 'flex', flexDirection:'column'}}>
        <RenderEvents />
      </div>
    </>
  );
};

export default EventLedger;