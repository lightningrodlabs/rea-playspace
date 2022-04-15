import { SlIconButton } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ZomeApi from '../../api/zomeApi';
import { getZomeApi } from '../../hcWebsockets';
import { Content, RustNode, Tree } from '../../types/holochain';
import { Agent, ProcessSpecification, ResourceSpecification } from '../../types/valueflows';
import { buildTree } from '../../utils';
import PalletNode from '../PalletNode';

interface Props {}

const Pallet: React.FC<Props> = () => {

  const [resources, setResources] = useState<ResourceSpecification[]>([]);
  const [processes, setProcesses] = useState<ProcessSpecification[]>([]);
  const [agents, setAgents] = useState<Agent[]>([])

  const zomeApi: ZomeApi = getZomeApi();

  const onDragStart = (event:DragEvent, name: string, type: string) => {
    const data = {name, type};
    event.dataTransfer!.setData('application/reactflow', JSON.stringify(data));
    event.dataTransfer!.effectAllowed = 'move';
  };

  useEffect(()=>{
    const getResources = async () => {
      try {
        const result: Array<RustNode> = await zomeApi.get_thing('resourceSpecification');
        console.log('result', result);
        const jsTree = buildTree(result, result[0]);
        const resources = jsTree.children.map((e) => {
          return JSON.parse(e.val.data) as ResourceSpecification;
        });
        setResources(resources);
    } catch (e) {
      console.error(e);
    }
    }
  
    const getProcesses = async () => {
      const result = await zomeApi.get_thing('processSpecification');
      const jsTree = buildTree(result, result[0]);
      const processes = jsTree.children.map((e) => {
        return JSON.parse(e.val.data) as ProcessSpecification;
      });
      setProcesses(processes);
    }

    const getAgents = async () => {
      const result = await zomeApi.get_thing('agent');
      const jsTree = buildTree(result, result[0]);
      const agents = jsTree.children.map((e) => {
        return JSON.parse(e.val.data) as Agent;
      });
      setAgents(agents);
    }

    getResources();
    getProcesses();
    getAgents();
  }, []);

const resourcePalletNodeStyles = {
    border: "1px solid green",
    background: "lightgreen",
    margin: "5px",
    borderRadius: "10px"
}

const processPalletNodeStyles = {
  border: "1px solid orange",
  background: "rgb(255, 213, 128)",
  margin: "5px",
  borderRadius: "10px"
}

const agentPalletNodeStyles = {
  border: "1px solid blue",
  background: "lightblue",
  margin: "5px",
  borderRadius: "10px"
}

function pickStyle(type: string) {
  if (type === 'resource') return resourcePalletNodeStyles;
  if (type === 'process') return processPalletNodeStyles;
  if (type === 'agent') return agentPalletNodeStyles;
}

function renderNodes(list, type) {
  if (list.length > 0) {
    return (list.map((item: any) => (
      <div 
      onDragStart={(event: any) => onDragStart(event, item.name, type)} 
      draggable
      style={pickStyle(type)}>
        <PalletNode
          key={item.id}
          thing={item}
        />
      </div>
    )));
  }
  return (<p style={{textAlign: "center"}}>No items</p>);
}


  const palletStyles = {
    flexGrow:1,
    border: "1px solid black"
  }

  const categoryStyles = {
    border: "1px solid black",
    background: "lightgray",
    padding: "5px"
  }


  return (
    <aside style={palletStyles}>
      <div style={categoryStyles}>
      <h2>Resources
        <Link to="/resources/new">
          <SlIconButton name="plus-square-fill" label="Settings" />
        </Link>
      </h2>
      </div>
      {renderNodes(resources, 'resource')}
      <br/>
      <div style={categoryStyles}>
        <h2>Processes
        <Link to="/processes/new">
          <SlIconButton name="plus-square-fill" label="Settings"/>
        </Link>
        </h2>
      </div>
      {renderNodes(processes, 'process')}
      <div style={categoryStyles}>
        <h2>Agents
        <Link to="/agents/new">
          <SlIconButton name="plus-square-fill" label="Settings" />
        </Link>
        </h2>
      </div>
      {renderNodes(agents, 'agent')}
    </aside>
  )
}

export default Pallet;