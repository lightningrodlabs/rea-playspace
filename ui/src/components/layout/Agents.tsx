import { SlIconButton } from "@shoelace-style/shoelace/dist/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDataStore } from "../../data/DataStore";
import { Agent, AgentShape } from "valueflows-models";
import AgentTableRow from "./AgentTableRow";
import { usePath } from "Yaati";
import { Pathed } from "data-providers";
import { Root } from "../../data/models/Application/Root";

export type Props = {};

const Agents: React.FC<Props> = () => {
  const store = getDataStore();
  const agentRecords = usePath<'root', Root, Pathed<Agent>>('root.agent', store)
  const [agents, setAgents] = useState<Array<Pathed<Agent>>>([]);

  

  useEffect(()=>{
    setAgents(Object.values(agentRecords));
  },[agentRecords]);

  const RenderAgents = (): JSX.Element => {
    if (agents.length === 0) {
      return(
        <>
          <div>No Agents</div>
        </>
      );
    } else {
      const eventRows: JSX.Element[] = agents.map(agent => {
        return(<AgentTableRow key={agent.id} agent={agent} />)
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
      <div style={{display: "flex"}}>
        <h1>Agents</h1>
        <div style={{paddingTop: "8px"}}>
          <Link to="/agents/new">
            <SlIconButton name="plus-square-fill" label="Settings" />
          </Link>
        </div>
        <p>(double click to edit agents)</p>
      </div>
      <div style={{display: 'flex', flexDirection:'column'}}>
        <RenderAgents />
      </div>
    </>
  );
}

export default Agents;