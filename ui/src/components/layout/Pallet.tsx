import { SlIconButton } from '@shoelace-style/shoelace/dist/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Agent, ProcessSpecification, ResourceSpecification } from '../../types/valueflows';
import PalletNode from '../PalletNode';
import { DataStore } from "../../data/store";

interface Props {
  store: DataStore,
  resourceSpecifications: Array<ResourceSpecification>,
  processSpecifications: Array<ProcessSpecification>,
  agents: Array<Agent>
}

const Pallet: React.FC<Props> = ({
  store,
  resourceSpecifications,
  processSpecifications,
  agents}) => {

  const onDragStart = (event:DragEvent, name: string, type: string) => {
    const data = {name, type};
    event.dataTransfer!.setData('application/reactflow', JSON.stringify(data));
    event.dataTransfer!.effectAllowed = 'move';
  };

  const resourceSpecificationPalletNodeStyles = {
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
    if (type === 'resourceSpecification') return resourceSpecificationPalletNodeStyles;
    if (type === 'process') return processPalletNodeStyles;
    if (type === 'agent') return agentPalletNodeStyles;
  }

  function renderNodes(list, type) {
    if (list.length > 0) {
      return (list.map((item: any) => (
        <div
        key={item.id}
        onDragStart={(event: any) => onDragStart(event, item.name, type)}
        draggable
        style={pickStyle(type)}>
          <PalletNode
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
      <h2>Resource Specifications
        <Link to="/resources/new">
          <SlIconButton name="plus-square-fill" label="Settings" />
        </Link>
      </h2>
      </div>
      {renderNodes(resourceSpecifications, 'resourceSpecification')}
      <br/>
      <div style={categoryStyles}>
        <h2>Processes
        <Link to="/processes/new">
          <SlIconButton name="plus-square-fill" label="Settings"/>
        </Link>
        </h2>
      </div>
      {renderNodes(processSpecifications, 'process')}
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