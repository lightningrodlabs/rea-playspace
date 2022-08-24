import { SlAlert, SlIcon, SlIconButton } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getLastPart, PathedData } from "../../data/models/PathedData";
import PalletNode from '../PalletNode';
import getDataStore from '../../data/DataStore';
import { DisplayNode } from '../../data/models/Application/Display';
import { Process } from '../../data/models/Valueflows/Plan';
import { ModelType } from '../../data/models/ModelConstructors';
import { usePath } from '../../data/YatiReactHook';
import { ProcessSpecification, ResourceSpecification } from '../../data/models/Valueflows/Knowledge';
interface Props {
  setEdit: (entity: any) => void
}

const Pallet: React.FC<Props> = () => {
  const resourceSpecifications = usePath('root.resourceSpecification', getDataStore());
  const processSpecifications = usePath('root.processSpecification', getDataStore());
  const [resourceList, setResourceList] = useState<ResourceSpecification[]>([]);
  const [processList, setProcessList] = useState<ProcessSpecification[]>([]);
  const [open, setOpen] = useState(false);
  const [dependentCount, setDependentCount] = useState<number>();

  const navigate = useNavigate();

  useEffect(()=>{
    setResourceList(Object.values(resourceSpecifications));
  }, [resourceSpecifications]);

  useEffect(()=>{
    setProcessList(Object.values(processSpecifications));
  }, [processSpecifications]);

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

  function pickStyle(type: ModelType) {
    if (type === 'resourceSpecification') return 'resource-specification-pallet-node';
    if (type === 'processSpecification') return 'process-specification-pallet-node';
  }

  function renderNodes(list, type: ModelType) {
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

  function palletNodeEditHandler(event, id: string, type: ModelType) {
    event.preventDefault();
    if (event.detail === 2) {
      switch (type) {
        case 'resourceSpecification':
          navigate(`/resources/edit/${id}`);
          break;
        case 'processSpecification':
          navigate(`/processes/edit/${id}`);
          break;
      }
    }
  }

  function palletNodeDeleteHandler(event, id: string, type: ModelType) {
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
      {renderNodes(resourceList, 'resourceSpecification')}
      <br/>
      <div className='category-styles'>
        <h2>
          <Link to="/processes/new">
          <SlIconButton name="plus-square-fill" label="Settings"/>
          </Link>
          Process Specifications
        </h2>
      </div>
      {renderNodes(processList, 'processSpecification')}
      <br/>
    </aside>
  )
}

export default Pallet;