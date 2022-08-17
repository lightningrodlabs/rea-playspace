import { SlIconButton } from "@shoelace-style/shoelace/dist/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getDataStore from "../../data/DataStore";
import { AgentShape } from "../../types/valueflows";
import AgentTableRow from "./AgentTableRow";

export type Props = {};

const Agents: React.FC<Props> = () => {
  const [agents, setAgents] = useState<Array<AgentShape>>([]);

  const store = getDataStore();

  useEffect(()=>{
    fetchAgents().then();
  },[]);

  const fetchAgents = async () => {
    const agents = await store.getAgents();
    setAgents(agents);
  }

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
      </div>
      <div style={{display: 'flex', flexDirection:'column'}}>
        <RenderAgents />
      </div>
    </>
  );
}

export default Agents;