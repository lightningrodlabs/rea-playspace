import { SlIconButton } from "@shoelace-style/shoelace/dist/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDataStore } from "../../data/DataStore";
import {
  Agent,
  ProcessSpecification,
  ResourceSpecification,
  EconomicResource
} from "valueflows-models";
import { usePath } from "yaati";
import { simulateAccounting } from "../../logic/accounting";
import ResourceLedgerTableRow from "./ResourceLedgerTableRow";

export type ResourceLedgerProps = {};

const ResourceLedger: React.FC<ResourceLedgerProps> = ({}) => {
  const [economicResourcesList, setEconomicResourcesList] = useState<Array<EconomicResource>>([]);

  const store = getDataStore();
  const economicResources = usePath(`root.economicResource`, store);
  const economicEvents = usePath(`root.economicEvent`, store);
  const agents: Record<string, Agent> = usePath('root.agent', store);
  const resourceSpecifications: Record<string, ResourceSpecification> = usePath('root.resourceSpecification', store);
  const processSpecifications: Record<string, ProcessSpecification> = usePath('root.processSpecification', store);

  useEffect(() => {
    setEconomicResourcesList(Object.values(simulateAccounting(Object.values(economicResources), Object.values(economicEvents))));
  }, [economicEvents, economicResources]);

  const RenderResources = (): JSX.Element => {
    if (economicResourcesList.length === 0) {
      return(
        <>
          <div>No Resources</div>
        </>
      );
    } else {
      const ResourceRows: JSX.Element[] = economicResourcesList.map(econResource => {
        return(
        <ResourceLedgerTableRow
        key={econResource.id} economicResource={econResource}
        agents={agents}
        resourceSpecifications={resourceSpecifications}
        processSpecifications={processSpecifications} />)
      });

      return (
        <>
          {ResourceRows}
        </>
      );
    }
  }

  return (
    <>
      <div style={{display: "flex"}}>
        <h1>Resources</h1>
        <div style={{paddingTop: "8px"}}>
        <SlIconButton name="plus-square-fill" label="Settings" onClick={()=>alert("TODO")}/>
          {/* <Link to="/resources/new">
            <SlIconButton name="plus-square-fill" label="Settings" />
          </Link> */}
        </div>
      </div>
      <div style={{display: 'flex', flexDirection:'column'}}>
        <RenderResources />
      </div>
    </>
  );
};

export default ResourceLedger;