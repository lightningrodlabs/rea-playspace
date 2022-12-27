import { SlIconButton } from "@shoelace-style/shoelace/dist/react/index";
import React, { useEffect, useState } from "react";
import { getDataStore } from "../data/DataStore";
import {
  Agent,
  ProcessSpecification,
  ResourceSpecification,
  EconomicResource,
  Process,
  ResourceSpecificationIndex,
  simulateAccounting
} from "valueflows-models";
import { usePath } from "yaati";
import Table from "../components/layout/Table";

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
    const resourceSpecifications: ResourceSpecificationIndex = store.getCursor('root.resourceSpecification');
    // merge processes from all plans
    const processes: Record<string, Process> = {};
    const plans = Object.keys(store.getCursor('root.plan'));
    plans.forEach((planId) => {
      const currProcessRecords = store.getCursor(`root.plan.${planId}.process`);
      if (currProcessRecords) {
        for (let key in currProcessRecords) {
          console.log(key)
          processes[key] = currProcessRecords[key];
        }
      }
    });

    const economicResourceValues = Object.values(economicResources);
    const economicEventValues = Object.values(economicEvents);

    setEconomicResourcesList(
      Object.values(
        simulateAccounting(
          resourceSpecifications,
          economicResourceValues,
          processes,
          economicEventValues,
          store.getActions()
        )
      )
    );
  }, [economicEvents, economicResources]);

  const fieldDescriptors = {
    'name': "Name"
  }

  const RenderResources = (): JSX.Element => {
    if (economicResourcesList.length === 0) {
      return(
        <>
          <div>No Resources</div>
        </>
      );
    } else {
      return (
        <Table
          datas={economicResourcesList}
          fieldDescriptors={fieldDescriptors}>
        </Table>
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