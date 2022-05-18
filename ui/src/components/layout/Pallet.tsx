import { SlIconButton } from '@shoelace-style/shoelace/dist/react';
import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Agent, ProcessSpecification, ResourceSpecification } from "../../data/models/Valueflows/Knowledge";
import { PathedData } from "../../data/models/PathedData";
import PalletNode from '../PalletNode';

interface Props {
  resourceSpecifications: Array<ResourceSpecification>,
  processSpecifications: Array<ProcessSpecification>,
  agents: Array<Agent>
}

const Pallet: React.FC<Props> = ({
  resourceSpecifications,
  processSpecifications,
  agents
}) => {

  /**
   * When we drag an item from here to the FlowCanvas, create an object with a
   * path in it. We'll use that to get a cursor to the object.
   */
  const onDragStart = (event:DragEvent, item: PathedData, type: string) => {
    const data = { path: item.path };
    event.dataTransfer!.setData('application/reactflow', JSON.stringify(data));
    event.dataTransfer!.effectAllowed = 'move';
  };

  const resourceSpecificationPalletNodeStyles = {
      border: "1px solid green",
      background: "lightgreen",
      margin: "5px",
      borderRadius: "10px"
  }

  const processSpecificationPalletNodeStyles = {
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
    if (type === 'processSpecification') return processSpecificationPalletNodeStyles;
    if (type === 'agent') return agentPalletNodeStyles;
  }

  function renderNodes(list, type) {
    if (list.length > 0) {
      return (list.map((item: any) => (
        <div
        key={item.id}
        onDragStart={(event: any) => onDragStart(event, item, type)}
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

  function renderAgents(list, type) {
    if (list.length > 0) {
      return (list.map((item: any) => (
        <div
        key={item.id}
        style={pickStyle(type)}>
          <PalletNode
            thing={item}
          />
        </div>
      )));
    }
    return (<p style={{textAlign: "center"}}>No items</p>);
  }

  const palletStyles: CSSProperties = {
    flexGrow: 1,
    marginRight: "10px",
    overflowY: "scroll",
    maxHeight: "85vh"
  }

  const categoryStyles: CSSProperties = {
    border: "1px solid black",
    background: "lightgray",
    padding: "5px",
    margin: "10px"
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
      {renderNodes(processSpecifications, 'processSpecification')}
      <br/>
      <div style={categoryStyles}>
        <h2>Agents
        <Link to="/agents/new">
          <SlIconButton name="plus-square-fill" label="Settings" />
        </Link>
        </h2>
      </div>
      {renderAgents(agents, 'agent')}
      <br/>
    </aside>
  )
}

export default Pallet;