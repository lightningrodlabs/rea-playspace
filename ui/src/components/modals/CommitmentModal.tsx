import { SlButton, SlInput, SlMenuItem, SlSelect, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { getAlmostLastPart, PathedData } from '../../data/models/PathedData';
import { ActionShape, AgentShape, CommitmentShape } from '../../types/valueflows';
import { Commitment, Process } from '../../data/models/Valueflows/Plan';
import getDataStore from '../../data/DataStore';
import { DisplayNode } from '../../data/models/Application/Display';
import { Agent, ResourceSpecification } from '../../data/models/Valueflows/Knowledge';
import { ObjectTransformations, ObjectTypeMap } from '../../data/models/ObjectTransformations';

interface Props {
  sourcePath: string,
  targetPath: string,
  closeModal: () => void;
  handleAddEdge: (item: PathedData) => void;
}

const initialState = {
  plannedWithin: '',          // Needed: Plan ID
  action: null,               // Needed: Action ID
  provider: null,             // Needed: Agent ID
  receiver: null,             // Needed: Agent ID
  inputOf: null,              // Process ID
  outputOf: null,             // Process ID
  resourceInventoriedAs: '',  // EconomicResource ID,  not yet implemented, but will be soon
  resourceConformsTo: '',     // ResourceSpecification ID
  resourceQuantity: 0,        // Need to have one of these that match the ResourceSpecification.
  effortQuantity: 0,          // ''
  resourceClassifiedAs: '',   // General classification or grouping
  hasBegining: null,          // Datetime
  hasEnd: null,               // Datetime
  hasPointInTime: null,       // Datetime
  due: null,                  // Datetime
  independentDemandOf: null,  // Not implementing this yet
  finished: false,
  inScopeOf: null,
  note: '',
  agreedIn: '',
  atLocation: null,
  state: null
} as CommitmentShape;

const CommitmentModal: React.FC<Props> = ({sourcePath, targetPath, closeModal, handleAddEdge}) => {

  const [
    {action, provider, receiver, inputOf, outputOf, resourceConformsTo, resourceQuantity, effortQuantity, note}, setState
  ] = useState(initialState);

  const [actions, setActions] = useState<ActionShape[]>([]);
  const [agents, setAgents] = useState<AgentShape[]>([]);


  const setUpInputCommitment = (sourceType: string, sourceVfNode: PathedData, targetType: string, targetVfNode: PathedData) => {
    const transformer1 = ObjectTransformations[sourceType];
    const resource: ResourceSpecification = transformer1(sourceVfNode);
    setState(prevState => ({ ...prevState, ['resourceConformsTo']: resource.id }));
    const transformer2 = ObjectTransformations[targetType];
    const process: Process = transformer2(targetVfNode);
    setState(prevState => ({ ...prevState, ['inputOf']: process.id }));
  }

  const setUpOuputCommitment = (sourceType: string, sourceVfNode: PathedData, targetType: string, targetVfNode: PathedData) => {
    const transformer1 = ObjectTransformations[sourceType];
    const process: Process = transformer1(sourceVfNode);
    setState(prevState => ({ ...prevState, ['outputOf']: process.id }));
    const transformer2 = ObjectTransformations[targetType];
    const resource: ResourceSpecification = transformer2(targetVfNode);
    setState(prevState => ({ ...prevState, ['resourceConformsTo']: resource.id }));
  }

  const setUpTransferCommitment = (sourceType: string, sourceVfNode: PathedData, targetType: string, targetVfNode: PathedData) => {
    const transformer1 = ObjectTransformations[sourceType];
    const provider: Agent = transformer1(sourceVfNode);
    setState(prevState => ({ ...prevState, ['provider']: provider.id }));
    const transformer2 = ObjectTransformations[targetType];
    const receiver: Agent = transformer2(targetVfNode);
    setState(prevState => ({ ...prevState, ['receiver']: receiver.id }));
  }

  useEffect(() => {
    const store = getDataStore();

    // Grab the paths to the objects by their ID and grab the type of their vfPath
    const sourceNode: DisplayNode = store.getCursor(store.lookUpPath(sourcePath));
    const sourceVfNode: PathedData = store.getCursor(sourceNode.vfPath);
    const sourceType = getAlmostLastPart(sourceVfNode.path);
    const targetNode: DisplayNode = store.getCursor(store.lookUpPath(targetPath));
    const targetVfNode: PathedData = store.getCursor(targetNode.vfPath)
    const targetType = getAlmostLastPart(targetVfNode.path);

    // based on the flows in the commitment, let's set up some sensible defaults
    switch (`${sourceType}-${targetType}`) {
      // This is an inputOf
      case 'resourceSpecification-process':
        setUpInputCommitment(sourceType, sourceVfNode, targetType, targetVfNode);
        break;
      // this is an output 
      case 'process-resourceSpecification':
        setUpOuputCommitment(sourceType, sourceVfNode, targetType, targetVfNode);
        break;
      // This is a transfer, set up the flow between the agents. User must select a resource.
      case 'agent-agent':
        setUpTransferCommitment(sourceType, sourceVfNode, targetType, targetVfNode);
        break;
    }

    setActions(store.getActions());
    setAgents(store.getAgents());
  }, []);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const store = getDataStore();
    const plannedWithin = store.getCursor('root.planId');
    const commitment: Commitment = new Commitment(
      {plannedWithin, action, provider, receiver, inputOf, outputOf, resourceConformsTo, resourceQuantity, effortQuantity, note}
    );
    await store.set(commitment);
    handleAddEdge(commitment);

    clearState();
    closeModal();
  }

  const inputOrOutputOf = () => {
    if (inputOf) {
      return (<SlInput disabled label="Input of" name="inputOf" value={inputOf}></SlInput>)
    } else if (outputOf) {
      return (<SlInput disabled label="Output of" name="outputOf" value={outputOf}></SlInput>)
    } else {
      return (<p>This is a transfer.</p>)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <SlSelect label="Action" name='action' value={action} onSlChange={onChange} required>
          {actions.map((act) => (<SlMenuItem key={`action_${act.id}`} value={act.id}>{act.label}</SlMenuItem>))}
        </SlSelect>
        <br/>
        <SlSelect label="Provider" name='provider' value={provider} onSlChange={onChange} required>
          {agents.map((agent) => (<SlMenuItem key={`provider_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
        </SlSelect>
        <br/>
        <SlSelect label="Receiver" name='receiver' value={receiver} onSlChange={onChange} required>
          {agents.map((agent) => (<SlMenuItem key={`receiver_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
        </SlSelect>
        <br/>
        {inputOrOutputOf()}
        <br/>
        <SlInput disabled label="Resource conforms to" name="resourceConformsTo" value={resourceConformsTo}></SlInput>
        <br />
        <SlInput label="Resource quantity" type="number" name="resourceQuantity" onSlInput={onChange} valueAsNumber={resourceQuantity}></SlInput>
        <br />
        <SlInput label="Effort quantity" type="number" name="effortQuantity" onSlInput={onChange} valueAsNumber={effortQuantity}></SlInput>
        <br />
        <SlTextarea
          label='Note'
          name='note'
          // @ts-ignore
          onSlInput={onChange}
          value={note}
        />
        <SlButton type="submit" variant="primary">Create</SlButton>
      </form>
    </>
  );
}

export default CommitmentModal;