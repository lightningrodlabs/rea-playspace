import React, { useEffect, useState } from "react";
import getDataStore from "../../data/DataStore";
import { SlCard } from '@shoelace-style/shoelace/dist/react';
import { EconomicEvent } from "../../data/models/Valueflows/Observation";
import { EconomicEventShape } from "../../types/valueflows";
import EventLedgerTableRow from "../modals/EventLedgerTableRow";

export type EventLedgerProps = {};

const EventLedger: React.FC<EventLedgerProps> = ({}) => {
  const [economicEvents, setEconomicEvents] = useState<Array<EconomicEventShape>>([]);

  const store = getDataStore();

  useEffect(()=>{
    fetchEvents().then();
  },[]);

  const fetchEvents = async () => {
    const events = await store.fetchAllEconomicEvents();
    setEconomicEvents(events);
  }

  const RenderEvents = (): JSX.Element => {
    if (economicEvents.length === 0) {
      return(
        <>
          <div>No Events</div>
        </>
      );
    } else {
      const eventRows: JSX.Element[] = economicEvents.map(econEvent => {
        return(<EventLedgerTableRow key={econEvent.id} economicEvent={econEvent} />)
      });

      return (
        <>
          {eventRows}
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