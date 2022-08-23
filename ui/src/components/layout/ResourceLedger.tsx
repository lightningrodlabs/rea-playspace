import { SlIconButton } from "@shoelace-style/shoelace/dist/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getDataStore from "../../data/DataStore";
import { Agent, ResourceSpecification } from "../../data/models/Valueflows/Knowledge";
import { EconomicResource } from "../../data/models/Valueflows/Observation";
import { usePath } from "../../data/YatiReactHook";
import { applyActionResourceEffect } from "../../logic/accounting";
import ResourceLedgerTableRow from "./ResourceLedgerTableRow";

export type ResourceLedgerProps = {};

const ResourceLedger: React.FC<ResourceLedgerProps> = ({}) => {
  const [economicResourcesList, setEconomicResourcesList] = useState<Array<EconomicResource>>([]);

  const store = getDataStore();
  const economicResources = usePath(`root.economicResource`, store);
  const economicEvents = usePath(`root.economicEvent`, store);
  const agents = usePath('root.agent', store);
  const resourceSpecifications = usePath('root.resourceSpecification', store);

  useEffect(() => {
    setEconomicResourcesList(Object.values(applyActionResourceEffect(Object.values(economicResources), Object.values(economicEvents))));
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
        agents={(agents as unknown) as Record<string, Agent>}
        resourceSpecifications={(resourceSpecifications as unknown) as Record<string, ResourceSpecification>} />)
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