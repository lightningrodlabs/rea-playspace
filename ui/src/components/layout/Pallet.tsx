import { SlAlert, SlIcon, SlIconButton } from '@shoelace-style/shoelace/dist/react';
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Agent, ProcessSpecification, ResourceSpecification } from "../../data/models/Valueflows/Knowledge";
import { getLastPart, PathedData } from "../../data/models/PathedData";
import PalletNode from '../PalletNode';
import getDataStore from '../../data/DataStore';
import { DisplayNode } from '../../data/models/Application/Display';
import { Process } from '../../data/models/Valueflows/Plan';
interface Props {
  resourceSpecifications: Array<ResourceSpecification>,
  processSpecifications: Array<ProcessSpecification>,
  agents: Array<Agent>,
  updateDisplayState: (id: string, type: string) => void,
  setEdit: () => void
}

const Pallet: React.FC<Props> = ({
  resourceSpecifications,
  processSpecifications,
  agents,
  updateDisplayState,
  setEdit
}) => {

  const [open, setOpen] = useState(false);
  const [dependentCount, setDependentCount] = useState<number>();

  const navigate = useNavigate();

  /**
   * When we drag an item from here to the FlowCanvas, create an object with a
   * path in it. We'll use that to get a cursor to the object.
   */
  const onDragStart = (event:DragEvent, item: PathedData) => {
    const data = { path: item.path };
    event.dataTransfer!.setData('application/reactflow', JSON.stringify(data));
    event.dataTransfer!.effectAllowed = 'move';
  };

  const errorMessage = (): string => {
    return `Cannot delete as it is has ${dependentCount} dependent nodes.`;
  }

  function pickStyle(type: string) {
    if (type === 'resourceSpecification') return 'resource-specification-pallet-node';
    if (type === 'processSpecification') return 'process-specification-pallet-node';
    if (type === 'agent') return 'agent-pallet-node';
  }

  function renderNodes(list, type) {
    if (list.length > 0) {
      return (list.map((item: any) => (
        <div
        key={item.id}
        onDragStart={(event: any) => onDragStart(event, item)}
        draggable
        className={'pallet-node ' + pickStyle(type)}>
          <PalletNode
            thing={item}
            onClick={palletNodeDeleteHandler}
            onDoubleClick={palletNodeEditHandler}
            type={type}
          />
        </div>
      )));
    }
    if (type === 'resourceSpecification') {
      return (<p style={{textAlign: "center", color: '#9E9E9E'}}>Click [+] to begin</p>);
    }
    return (<><br></br></>);
  }

  function renderAgents(list: Array<any>, type: string) {
    if (list.length > 0) {
      return (list.map((item: any) => (
        <div
        key={item.id}
        className={'pallet-node ' + pickStyle(type)}>
          <PalletNode
            thing={item}
            onClick={palletNodeDeleteHandler}
            onDoubleClick={palletNodeEditHandler}
            type={type}
          />
        </div>
      )));
    }
    return (<></>);
  }

  function palletNodeEditHandler(event, id: string, type: string) {
    const store = getDataStore();
    if (event.detail === 2) {
      console.log('doubleclick');
      // set edit state in App.tsx
      let entity = store.getById(id);
      setEdit(entity);
      navigate('/resources/edit');
    }
  }

  function palletNodeDeleteHandler(event, id: string, type: string) {
    const store = getDataStore();
    if (event.altKey) {
      // check to see if it is in use
      let displayNodes: DisplayNode[] = store.getDisplayNodes(store.getCurrentPlanId());
      let matchedNodes: DisplayNode[] = [];
      displayNodes.forEach((node, index) => {
        // resource specs
        let referenceId = '';
        if (type === 'resourceSpecification') {
          referenceId = getLastPart(node.vfPath); // get ID from end of path
          console.log(`vfId of ${node.name}: `, referenceId);
        }

        if (type === 'processSpecification') {
          const process: Process =  store.getCursor(node.vfPath);
          referenceId = process.basedOn;
        }

        if (referenceId === id) {
          matchedNodes.push(node);
        }
      });

      if (matchedNodes.length === 0) {
        store.delete(store.lookUpPath(id));
        updateDisplayState(id, type);

      } else {
        setDependentCount(matchedNodes.length);
        setOpen(true);
      }
    }
  }

  return (
    <aside className='pallet-styles'>
      <SlAlert variant="danger" duration={2000} open={open} closable onSlAfterHide={() => setOpen(false)}>
        <SlIcon slot="icon" name="info-circle" />
          {errorMessage()}
      </SlAlert>
      <div className='category-styles'>
      <h2>
        <Link to="/resources/new">
          <SlIconButton name="plus-square-fill" label="Settings" />
        </Link>
        Resource Specifications
      </h2>
      </div>
      {renderNodes(resourceSpecifications, 'resourceSpecification')}
      <br/>
      <div className='category-styles'>
        <h2>
          <Link to="/processes/new">
          <SlIconButton name="plus-square-fill" label="Settings"/>
          </Link>
          Process Specifications
        </h2>
      </div>
      {renderNodes(processSpecifications, 'processSpecification')}
      <br/>
      <div className='category-styles'>
        <h2>
          <Link to="/agents/new">
            <SlIconButton name="plus-square-fill"   label="Settings" />
          </Link>
          Agents
        </h2>
      </div>
      {renderAgents(agents, 'agent')}
      <br/>
    </aside>
  )
}

export default Pallet;