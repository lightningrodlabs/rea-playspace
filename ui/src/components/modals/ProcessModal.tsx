import { AgentProfile } from '@holochain-open-dev/profiles';
import { SlButton, SlDropdown, SlCheckbox, SlDivider, SlIcon, SlInput, SlMenu, SlMenuItem, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import { Guid } from 'guid-typescript';
import React, { useEffect, useRef, useState } from 'react';
import { XYPosition } from 'react-flow-renderer';
import getDataStore from '../../data/DataStore';
import { PathedData } from '../../data/models/PathedData';
import { Agent, ProcessSpecification } from '../../data/models/Valueflows/Knowledge';
import { Process } from "../../data/models/Valueflows/Plan";
import { getProfilesService } from '../../data/ProfilesStore';

const useConstructor = (callBack = () => {}) => {
  const hasBeenCalled = useRef(false);
  if (hasBeenCalled.current) return;
  callBack();
  hasBeenCalled.current = true;
}

const initialState = {
  name: '',
  finished: false,
  note: '',
  classifiedAs: '',
  inScopeOf: '',
  basedOn: ''
}

interface Props {
  processSpecificationPath: string;
  closeModal: () => void;
  handleAddNode: (item: PathedData) => void;
}

const ProcessModal: React.FC<Props> = ({
  processSpecificationPath,
  closeModal, 
  handleAddNode
}) => {
  const [
    {name, finished, note, classifiedAs, inScopeOf, basedOn}, setState
  ] = useState(initialState);
  const [agentMap, setAgentMap] = useState<Map<string, JSX.Element>>(new Map());
  const [loading, setLoading] = useState<boolean>(true);

  useConstructor(() => {
    console.log("only once?");
    fetchAgents().then((agentsMap) => {
      setAgentMap(agentsMap);
    });
  });

  useEffect(()=>{
    let processSpec: ProcessSpecification = getDataStore().getCursor(processSpecificationPath);
    setState(prevState => ({ ...prevState, name: processSpec.name, note:processSpec.note }));
  },[]);

  useEffect(() => {
    setLoading(false);
  }, [agentMap]); // Only re-run the effect if agents changes

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSelect = e => {
    const agentName = e.detail.item.innerHTML;
    setState(prevState => ({ ...prevState, inScopeOf: agentName }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const store = getDataStore();
    const plannedWithin = store.getCursor('root.planId');
    const process: Process = new Process(
      {name, plannedWithin, finished, note, classifiedAs, inScopeOf, basedOn}
    );
    await store.set(process);
    handleAddNode(process);

    clearState();
    closeModal();
  }

  async function fetchAgents() {
    const profiles: AgentProfile[] = await getProfilesService().getAllProfiles();
    const agents: Agent[] = getDataStore().getAgents();

    const agentList: Array<string> = [];
    profiles.forEach((profile) => {
      agentList.push(profile.profile.nickname);
    });
    agents.forEach((agent) => {
      agentList.push(agent.name);
    });

    const dropdownList: Map<string, JSX.Element> = new Map(agentList.map((agent) => {
      return [agent, <SlMenuItem key={Guid.raw()}>{agent}</SlMenuItem>];
    }));

    return dropdownList;
  }
  
  function buttonText() {
    console.log('in scope of: ', inScopeOf);
    return inScopeOf == '' ? 'In Scope Of' : inScopeOf;
  }

  if (loading) {
    return (<p>Loading...</p>);
  } else {
    return (
      <>
        <form onSubmit={handleSubmit}>
          <br />
          <SlInput
            required
            label="Name"
            name="name"
            // @ts-ignore
            onSlInput={onChange}
            value={name}

          />
          <br />
          <SlCheckbox
            name="finished"
            // @ts-ignore
            onSlInput={onChange}
            checked={finished}
          >Finished</SlCheckbox> 
          <br />
          <br />
          <SlDropdown>
            <SlButton slot="trigger" caret>
              {buttonText()}
            </SlButton>
            <SlMenu onSlSelect={handleSelect}>
              {agentMap.values}
            </SlMenu>
          </SlDropdown>
          <br />
          <br />
          <SlInput
            label="Based On"
            name="basedOn"
            // @ts-ignore
            onSlInput={onChange}
            value={basedOn}
          />
          <br />
          <SlTextarea
            label='Note'
            name='note'
            // @ts-ignore
            onSlInput={onChange}
            value={note}
          />
          <br />
          <SlButton type="submit" variant="primary">
            Create
          </SlButton>
        </form>
      </>
    );
  }
}

export default ProcessModal;