import { SlInput, SlMenuItem, SlSelect, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import MeasurementInput from './Measurement';
import { DateToInputValueString, slChangeConstructor } from '../util';
import { inputOrOutputOf } from './shared';
import { usePath } from 'yaati';
import { CommitmentShape, ResourceSpecificationShape, Action, Agent, Unit } from "valueflows-models";
import { getAllowedActions } from '../../logic/flows';
import { getDataStore } from '../../data/DataStore';

interface Props {
  commitmentState: CommitmentShape;
  readonlyFields?: string[];
  conformingResource: ResourceSpecificationShape;
  name: string;
  onChange?: (event: {}) => void;
}

const initialState: CommitmentShape = {
  id: '',
  plannedWithin: '',          // Needed: Plan ID
  action: 'use',              // Needed: Action ID
  provider: '',               // Needed: Agent ID
  receiver: '',               // Needed: Agent ID
  inputOf: '',                // Process ID
  outputOf: '',               // Process ID
  resourceInventoriedAs: '',  // EconomicResource ID
  resourceConformsTo: '',     // ResourceSpecification ID
  resourceQuantity: null,     // Need to have one of these (either resourceQuantity or effortQuantity) that match the ResourceSpecification.
  effortQuantity: null,
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
};

const CommitmentInput: React.FC<Props> = ({
  commitmentState,
  conformingResource,
  name,
  onChange
}) => {
  const [
    {
      action,
      provider,
      receiver,
      inputOf,
      outputOf,
      resourceQuantity,
      effortQuantity,
      note,
      due
    }, setState
  ] = useState({ ...initialState });

  const [resourceQuantityVisible, setresourceQuantityVisible] = useState<boolean>(false);
  const [effortQuantityVisible, setEffortQuantityVisible] = useState<boolean>(false);
  const [units, setUnits] = useState<Unit[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  const store = getDataStore();
  const actionMap = usePath('root.action', store);
  const unitMap = usePath('root.unit', store);
  const agentMap = usePath('root.agent', store);

  useEffect(() => {
    setState(prevState => {
      return {...prevState, ...commitmentState };
    });
  }, []);

  useEffect(() => {
    setActions(getAllowedActions(commitmentState, Object.values(actionMap)));
  }, [actionMap]);

  useEffect(() => {
    setAgents(Object.values(agentMap));
  }, [agentMap]);

  useEffect(() => {
    setUnits(Object.values(unitMap));
  }, [unitMap]);

  useEffect(() => {
    action === 'work' || action === 'use' ? setEffortQuantityVisible(true) : setEffortQuantityVisible(false);
    action !== 'work' ? setresourceQuantityVisible(true) : setresourceQuantityVisible(false);
  }, [action]);

  function disabled(f: string): boolean {
    return false;
  }

  const parsers = {
    'due': (value: string) => new Date(Date.parse(value))
  }

  const onSlChange = slChangeConstructor<CommitmentShape>(name, onChange, setState, parsers);

  // We need a way to disable the unit selection when units have been set on another corresponding flow
  const ResourceQuantity = <MeasurementInput
    label="Resource"
    value={resourceQuantity}
    defaultUnit={conformingResource.defaultUnitOfResource}
    name='resourceQuantity'
    onChange={onSlChange}
    units={units} />;
  const EffortQuantity = <MeasurementInput
    label="Effort"
    value={effortQuantity}
    defaultUnit={conformingResource.defaultUnitOfEffort}
    name='effortQuantity'
    onChange={onSlChange}
    units={units} />;

  return (
    <>
      {inputOrOutputOf(inputOf as string, outputOf as string)}
      <div className='form-row'>
        <SlSelect className='half-form-width' disabled={disabled('action')} placeholder="Select action" label="Action" name='action' value={action as string} onSlChange={onSlChange} required>
          {actions.map((act) => (<SlMenuItem key={`action_${act.id}`} value={act.id}>{act.label}</SlMenuItem>))}
        </SlSelect>
        <div className='field-spacer'></div>
        <SlInput className='half-form-width' disabled label="Resource conforms to" name="resourceConformsTo" value={conformingResource?.name}></SlInput>
      </div>
      <br />
      {resourceQuantityVisible && ResourceQuantity}
      {resourceQuantityVisible && effortQuantityVisible && <><br /></>}
      {effortQuantityVisible && EffortQuantity}
      <br />
      <div className='form-row'>
      <SlSelect className='half-form-width' disabled={disabled('provider')} placeholder="Select agent" label="From" name='provider' value={provider ? provider as string : null} onSlChange={onSlChange} required>
        {agents.map((agent) => (<SlMenuItem key={`provider_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
      </SlSelect>
      <div className='field-spacer'></div>
      <SlSelect className='half-form-width' disabled={disabled('receiver')} placeholder="Select agent" label="To" name='receiver' value={receiver ? receiver as string : null} onSlChange={onSlChange} required>
        {agents.map((agent) => (<SlMenuItem key={`receiver_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
      </SlSelect>
      </div>
      <br />
      <SlInput className='half-form-width' label="Due" type="datetime-local" value={due ? DateToInputValueString(due as Date): ''} name="due" onSlChange={onSlChange} onSlInput={onSlChange}></SlInput>
      <br />
      <SlTextarea
        label='Note'
        name='note'
        // @ts-ignore
        onSlInput={onSlChange}
        value={note}
      ></SlTextarea>
    </>
  );
};

export default CommitmentInput;