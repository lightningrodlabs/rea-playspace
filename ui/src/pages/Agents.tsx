import { SlAvatar, SlIconButton } from "@shoelace-style/shoelace/dist/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDataStore } from "../data/DataStore";
import { Agent } from "valueflows-models";
import { usePath } from "Yaati";
import { Pathed } from "data-providers";
import { Root } from "../data/models/Application/Root";
import Table from "../components/layout/Table";

export type Props = {};

const Agents: React.FC<Props> = () => {
  const store = getDataStore();
  const agentRecords = usePath<'root', Root, Pathed<Agent>>('root.agent', store)
  const [agents, setAgents] = useState<Array<Pathed<Agent>>>([]);

  useEffect(()=>{
    setAgents(Object.values(agentRecords));
  },[agentRecords]);

  const fieldDescriptors = {
    'action': "",
    'image': "",
    'name': "Name",
    'primaryLocation': "Primary Location",
    'notes': "Notes"
  }
  const synthetic = {
    'action': (data: Pathed<Agent>) => [`/agents/edit/${data.id}`]
  }
  const decorators = {
    'action': (data: any) => <><Link to={data[0]}>Edit</Link></>,
    'image': (data: any) => {
      return (<>
        <span style={{paddingRight: "10px"}}>
          <SlAvatar image={data} ></SlAvatar>
        </span>
      </>);
    }
  }

  const RenderAgents = (): JSX.Element => {
    if (agents.length === 0) {
      return(
        <>
          <div>No Agents</div>
        </>
      );
    } else {
      return (
        <Table
          datas={agents}
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