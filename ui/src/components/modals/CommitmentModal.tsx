import { SlButton, SlInput, SlMenuItem, SlSelect, SlTextarea } from '@shoelace-style/shoelace/dist/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { PathedData } from '../../data/models/PathedData';
import { ActionShape, AgentShape, CommitmentShape, MeasurementShape, UnitShape } from '../../types/valueflows';
import { Commitment, Process } from '../../data/models/Valueflows/Plan';
import getDataStore from '../../data/DataStore';
import { assignFields } from '../../utils';

interface Props {
  commitmentState: CommitmentShape;
  closeModal: () => void;
  afterward?: (item: PathedData) => void;
}

const initialState: CommitmentShape = {
  id: '',
  plannedWithin: '',          // Needed: Plan ID
  action: 'use',              // Needed: Action ID
  provider: '',               // Needed: Agent ID
  receiver: '',               // Needed: Agent ID
  inputOf: '',                // Process ID
  outputOf: '',               // Process ID
  resourceInventoriedAs: '',  // EconomicResource ID,  not yet implemented, but will be soon
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

const CommitmentModal: React.FC<Props> = ({commitmentState, closeModal, afterward}) => {
  const [
    {id, plannedWithin, action, provider, receiver, inputOf, outputOf, resourceConformsTo, resourceQuantity, effortQuantity, note}, setState
  ] = useState({...initialState, ...commitmentState});

  const [actions, setActions] = useState<ActionShape[]>([]);
  const [agents, setAgents] = useState<AgentShape[]>([]);
  const [units, setUnits] = useState<UnitShape[]>([]);

  useEffect(() => {
    const store = getDataStore();
    setActions(store.getActions());
    setAgents(store.getAgents());
    setUnits(store.getUnits());
  }, []);

  const clearState = () => {
    setState({ ...initialState });
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const getMeasumentValue = (old: MeasurementShape | number): string => {
    let retval = '';

    switch (typeof old) {
      case 'number':
        console.log('number')
        retval = old.toString();
        break;
      case 'object':
        console.log('object, old')
        if (old != null) {
          retval = old.hasNumericalValue ? old.hasNumericalValue.toString() : '';
        }
    }

    return retval;
  }

  const getMeasurementUnit = (old: MeasurementShape | number): string => {

    let retval = '';

    if (typeof old == 'object' && old != null) {
      retval = old.hasUnit ? old.hasUnit.toString() : '';
    }

    return retval;
  }

  const newMeasurement = (): MeasurementShape => {
    return {
      hasNumericalValue: 0,
      hasUnit: ''
    };
  };

  const onMeasurementChange = (e: any) => {
    const { name, value } = e.target;

    switch (name) {
      case 'resourceValue':
        setState((prevState) => {
          const res = prevState.resourceQuantity ? prevState.resourceQuantity : newMeasurement();
          return {
            ...prevState,
            resourceQuantity: {
              hasNumericalValue: parseFloat(value),
              hasUnit: res.hasUnit
            }
          }
        })
        break;
      case 'effortValue':
        setState((prevState) => {
          const res = prevState.effortQuantity ? prevState.effortQuantity : newMeasurement();
          return {
            ...prevState,
            effortQuantity: {
              hasNumericalValue: parseFloat(value),
              hasUnit: res.hasUnit
            }
          }
        })
        break;
      case 'resourceUnit':
        setState((prevState) => {
          const res = prevState.resourceQuantity ? prevState.resourceQuantity : newMeasurement();
          return {
            ...prevState,
            resourceQuantity: {
              hasNumericalValue: res.hasNumericalValue,
              hasUnit: value
            }
          }
        })
        break;
      case 'effortUnit':
        setState((prevState) => {
          const res = prevState.effortQuantity ? prevState.effortQuantity : newMeasurement();
          console.log(res)
          return {
            ...prevState,
            effortQuantity: {
              hasNumericalValue: res.hasNumericalValue,
              hasUnit: value
            }
          }
        })
        break;
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const store = getDataStore();
    if (id) {
      const commitment = store.getById(id);
      assignFields(
        {id, plannedWithin, action, provider, receiver, inputOf, outputOf, resourceConformsTo, resourceQuantity, effortQuantity, note},
        commitment
      );
      await store.set(commitment);
      if (afterward) afterward(commitment);
    } else {
      const commitment: Commitment = new Commitment(
        {plannedWithin: store.getCurrentPlanId(), action, provider, receiver, inputOf, outputOf, resourceConformsTo, resourceQuantity, effortQuantity, note}
      );
      await store.set(commitment);
      if (afterward) afterward(commitment);
    }

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

  /**
   * TIL: valueAsNumber does not cause the the value to display.
   * This might be because of how we're using shoelace. /me shrugs
   */
  return (
    <>
      <form onSubmit={handleSubmit}>
        <SlSelect label="Action" name='action' value={action} onSlChange={onChange} required>
          {actions.map((act) => (<SlMenuItem key={`action_${act.id}`} value={act.id}>{act.label}</SlMenuItem>))}
        </SlSelect>
        <br/>
        <SlSelect label="Provider" name='provider' value={provider ? provider : agents[0]?.id} onSlChange={onChange} required>
          {agents.map((agent) => (<SlMenuItem key={`provider_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
        </SlSelect>
        <br/>
        <SlSelect label="Receiver" name='receiver' value={receiver ? receiver : agents[0]?.id} onSlChange={onChange} required>
          {agents.map((agent) => (<SlMenuItem key={`receiver_${agent.id}`} value={agent.id}>{agent.name}</SlMenuItem>))}
        </SlSelect>
        <br/>
        {inputOrOutputOf()}
        <br/>
        <SlInput disabled label="Resource conforms to" name="resourceConformsTo" value={resourceConformsTo}></SlInput>
        <br />
        <SlInput label="Resource quantity" type="number" name="resourceValue" onSlInput={onMeasurementChange} value={getMeasumentValue(resourceQuantity)}></SlInput>
        <br />
        <SlSelect label="Resource unit" name="resourceUnit" onSlChange={onMeasurementChange} value={getMeasurementUnit(resourceQuantity)}>
          {units.map((unit) => (<SlMenuItem key={`resource_unit_${unit.id}`} value={unit.id}>{unit.name}</SlMenuItem>))}
        </SlSelect>
        <br />
        <SlInput label="Effort quantity" type="number" name="effortValue" onSlInput={onMeasurementChange} value={getMeasumentValue(effortQuantity)}></SlInput>
        <br />
        <SlSelect label="Effort unit" name="effortUnit" onSlChange={onMeasurementChange} value={getMeasurementUnit(effortQuantity)}>
          {units.map((unit) => (<SlMenuItem key={`effort_unit_${unit.id}`} value={unit.id}>{unit.name}</SlMenuItem>))}
        </SlSelect>
        <br />
        <SlTextarea
          label='Note'
          name='note'
          // @ts-ignore
          onSlInput={onChange}
          value={note}
        />
        <SlButton type="submit" variant="primary">{id? 'Update' : 'Create'}</SlButton>
      </form>
    </>
  );
}

export default CommitmentModal;