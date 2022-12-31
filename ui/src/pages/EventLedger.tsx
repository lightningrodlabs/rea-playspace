import { SlIconButton } from "@shoelace-style/shoelace/dist/react/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDataStore } from "../data/DataStore";
import { Action, Agent, EconomicEvent, EconomicResource, Process, ResourceSpecification, Unit } from "valueflows-models";
import { usePath } from "yaati";
import { Pathed } from "data-providers";
import { Root } from "../data/models/Application/Root";
import Table from "../components/layout/Table";

export type Props = {};

const EventLedger: React.FC<Props> = () => {
  const store = getDataStore();
  const eventRecords = usePath<'root', Root, Pathed<EconomicEvent>>('root.economicEvent', store);
  const [events, setEvents] = useState<Array<Pathed<EconomicEvent>>>([]);

  function getTime(e: EconomicEvent): Date {
    const times = [e.hasPointInTime, e.hasBegining, e.hasEnd, e.created];
    return times.find((t) => t && t != null);
  }

  useEffect(()=>{
    const sortedEvents = Object.values(eventRecords).sort((a, b) => +getTime(a) - +getTime(b))
    setEvents(sortedEvents);
  },[eventRecords]);

  const fieldDescriptors = {
    'created': "Created",
    'date': "Date",
    'action': "Action",
    'resourceConformsTo': "Conforms To",
    'resourceInventoriedAs': "Inventoried As",
    'resourceUsed': "Resource Quantity",
    'effortUsed': "Effort",
    'provider': "Provider",
    'receiver': "Receiver",
    'inputOf': "Input of",
    'outputOf': "Output of"
  }
  const decorators = {
    'created': (created: Date) => <>{`${created ? new Date(created).toISOString().split('T')[0] : ''}`}</>,
    'date': (created: Date) => <>{`${created ? new Date(created).toISOString().split('T')[0] : ''}`}</>,
    'action': (actionKey: string) => <>{store.getById<Action>(actionKey).label}</>,
    'resourceConformsTo': (resourceConformsTo: string) => <>{resourceConformsTo ? store.getById<ResourceSpecification>(resourceConformsTo).name : ''}</>,
    'resourceInventoriedAs': (resourceInventoriedAs: string) => <>{resourceInventoriedAs ? store.getById<EconomicResource>(resourceInventoriedAs).name : ''}</>,
    'provider': (agentKey: string) => <>{store.getById<Agent>(agentKey).name}</>,
    'receiver': (agentKey: string) => <>{store.getById<Agent>(agentKey).name}</>,
    'inputOf': (processKey: string) => <>{processKey ? store.getById<Process>(processKey).name : ''}</>,
    'outputOf': (processKey: string) => <>{processKey ? store.getById<Process>(processKey).name : ''}</>,
  }
  const synthetic = {
    'date': (data: EconomicEvent) => getTime(data),
    'resourceUsed': (data: EconomicEvent) => {
      if (data && data.resourceQuantity && data.resourceQuantity.hasNumericalValue && data.resourceQuantity.hasUnit) {
        const unit = store.getById<Unit>(data.resourceQuantity.hasUnit);
        return `${data.resourceQuantity.hasNumericalValue} ${unit.symbol}`;
      } else {
        return '';
      }
    },
    'effortUsed': (data: EconomicEvent) => {
      if (data && data.effortQuantity && data.effortQuantity.hasNumericalValue && data.effortQuantity.hasUnit) {
        const unit = store.getById<Unit>(data.effortQuantity.hasUnit);
        return `${data.effortQuantity.hasNumericalValue} ${unit.symbol}`;
      } else {
        return '';
      }
    },
  }

  const RenderEvents = (): JSX.Element => {
    if (events.length === 0) {
      return(
        <>
          <div>No Events</div>
        </>
      );
    } else {
      return (
        <Table
          datas={events}
          fieldDescriptors={fieldDescriptors}
          syntheticFields={synthetic}
          fieldDecorators={decorators}>
        </Table>
      );
    }
  }

  return (
    <>
      <div style={{display: "flex"}}>
        <h1>Events</h1>
        <div style={{paddingTop: "8px"}}>
          <Link to="/agents/new">
            <SlIconButton name="plus-square-fill" label="Settings" />
          </Link>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection:'column'}}>
        <RenderEvents />
      </div>
    </>
  );
}

export default EventLedger;