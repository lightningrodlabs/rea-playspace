import { SlButton, SlButtonGroup, SlDivider, SlDrawer, SlIcon, SlIconButton, SlTooltip } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState } from 'react';
import { PathedData } from '../../data/models/PathedData';
import { Action, Agent, Unit } from '../../data/models/Valueflows/Knowledge';
import { CommitmentShape, EconomicEventShape, FlowShape } from '../../types/valueflows';
import { Commitment } from '../../data/models/Valueflows/Plan';
import { EconomicEvent } from '../../data/models/Valueflows/Observation';
import CommitmentInput from '../input/Commitment';
import EventInput from '../input/Event';
import { flowDefaults, getCommitmentAndEvents, getDisplayNodeBy, getLabelForFlow } from '../../logic/flows';
import getDataStore from '../../data/DataStore';

interface Props {
  vfPath?: string[];
  source: string;
  target: string;
  closeModal: () => void;
  afterward?: (items: PathedData[]) => void;
}

const FlowModal: React.FC<Props> = ({vfPath, source, target, closeModal, afterward}) => {
  const [commitmentOpen, setCommitmentOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const [commitment, setCommitment] = useState(null as Commitment);
  const [events, setEvents] = useState(new Array<EconomicEvent>());
  const [event, setEvent] = useState(null as EconomicEvent);
  const [initial, setInitial] = useState(null as FlowShape);
  const [agents, setAgents] = useState(new Array<Agent>());
  const [actions, setActions] = useState(new Array<Action>());
  const [units, setUnits] = useState(new Array<Unit>());

  // store updates to flows until saving or discarding
  let commitmentUpdates = null;
  let eventUpdates = null;

  // close the panel
  const resetState = () => {
    setCommitmentOpen(false);
    setEventOpen(false);
  }

  // Set up the initial state
  useEffect(() => {
    resetState();

    const store = getDataStore();

    // Grab vfTypes and vfNodes off the DisplayNodes
    const { vfType: sourceVfType, vfNode: sourceVfNode } = getDisplayNodeBy(source);
    const { vfType: targetVfType, vfNode: targetVfNode } = getDisplayNodeBy(target);
    const initialState = flowDefaults[`${sourceVfType}-${targetVfType}`](store.getCurrentPlanId(), sourceVfNode, targetVfNode);
    setInitial(initialState);

    const allActions = store.getActions();
    if(initialState && Object.hasOwn(initialState, 'inputOf')) {
      setActions(allActions.filter((action) => (action.inputOutput == 'input' || action.inputOutput == 'both')));
    } else if (initialState && Object.hasOwn(initialState, 'outputOf')) {
      setActions(allActions.filter((action) => (action.inputOutput == 'output' || action.inputOutput == 'both')));
    } else {
      setActions(allActions.filter((action) => action.inputOutput == 'na'));
    }

    if (vfPath) {
      const state = getCommitmentAndEvents(vfPath);
      setCommitment(state.commitment);
      setEvents(state.events);
    }

    setAgents(store.getAgents());
    setUnits(store.getUnits());
  }, []);

  // Pick an event to edit, but make a clone so edits don't propagate through the app.
  const pickEvent = (event: EconomicEvent) => {
    setEvent(event);
  };

  /**
   * Hydrate the provider from the key
   */
  const getProvider = (flow: FlowShape) => {
    const store = getDataStore();
    if (flow && flow.provider) {
      return store.getById(flow.provider);
    }
    return null;
  };

  /**
   * Hydrate the recevier from the key
   */
  const getReceiver = (flow: FlowShape) => {
    const store = getDataStore();
    if (flow && flow.receiver) {
      return store.getById(flow.receiver);
    }
    return null;
  };

  /**
   * Hydrate the conforming resource from the key, or the defaults
   */
  const getConformingResource = (flow: FlowShape) => {
    const store = getDataStore();
    if (flow && flow.resourceConformsTo) {
      return store.getById(flow.resourceConformsTo);
    } else {
      return store.getById(initial.resourceConformsTo);
    }
  };

  /**
   * Removes fields not present in an Event
   */
  const getEventDefaultsFromCommitment = (commitment: CommitmentShape): FlowShape => {
    const init = {...commitment};
    delete init.id;
    delete init.created;
    delete init.plannedWithin;
    delete init.due;
    return init;
  }

  /**
   * When the commitment changes, update it.
   */
  const handleCommitmentChange = (e: any) => {
    commitmentUpdates = e.target.value;
  }

  /**
   * Save the commitment
   */
  const handleCommitmentSubmit = () => {
    const store = getDataStore();
    let newCommitment: Commitment = store.upsert<CommitmentShape, Commitment>(commitmentUpdates, Commitment);
    setCommitment(newCommitment);
    setCommitmentOpen(false);
  };

  /**
   * When the current event changes, update it.
   */
  const handleEventChange = (e: any) => {
    eventUpdates = e.target.value;
  }

  // If the event is in the list of events, update it
  // If it's not, then add it
  const handleEventSubmit = () => {
    setEventOpen(false);
    const store = getDataStore();
    const newEvent = store.upsert<EconomicEventShape, EconomicEvent>(eventUpdates, EconomicEvent);
    setEvents((prevEvents) => {
      const eventIndex = events.findIndex((event) => event.id === newEvent.id);
      if (eventIndex > -1) {
        const newEvents = [...prevEvents];
        newEvents[eventIndex] = newEvent;
        return newEvents;
      } else {
        const newEvents = [...prevEvents, newEvent];
        return newEvents;
      }
    });
  };

  /**
   * A component of sorts to either show a button to add a commitment or a button
   * to edit a commitment.
   */
  const commitmentEditOrCreate = () => {
    if (commitment) {
      const label = getLabelForFlow(commitment, getProvider(commitment), getReceiver(commitment), actions, units);
      return <>
        <SlButton variant="default" onClick={() => setCommitmentOpen(true)}>{label}</SlButton>
      </>;
    } else {
      return <>
        <SlButton variant="primary" onClick={() => setCommitmentOpen(true)}>Create Commitment</SlButton>
      </>;
    }
  };

  /**
   * Form for commitment
   */
  const commitmentForm = () => {
    if (commitmentOpen) {
      return <>
        <SlIconButton onClick={resetState} name="chevron-left" label="Cancel. Go Back."></SlIconButton>
        <h4 className='panel-heading'>Commitment</h4>
        <CommitmentInput
          commitmentState={{...initial, ...commitment}}
          conformingResource={getConformingResource(commitment)}
          agents={agents}
          actions={actions}
          units={units}
          name='commitment'
          onChange={handleCommitmentChange}
        ></CommitmentInput>
        <SlDivider></SlDivider>
        <SlButtonGroup slot="footer">
          <SlButton onClick={handleCommitmentSubmit} variant="primary">{commitment?.id? 'Update' : 'Create'}</SlButton>
          <SlButton onClick={resetState} variant="default">Cancel</SlButton>
        </SlButtonGroup>
      </>;
    } else {
      return <></>;
    }
  };

  /**
   * Form for events 
   */
  const eventForm = () => {
    let eventState = {...initial, ...event}
    if (commitment) {
      eventState = {...initial, ...getEventDefaultsFromCommitment(commitment), ...event};
    }
    if (eventOpen) {
      return <>
        <SlIconButton onClick={resetState} name="chevron-left" label="Cancel. Go Back."></SlIconButton>
        <h4 className='panel-heading'>Event</h4>
        <EventInput
          eventState={eventState}
          conformingResource={getConformingResource(event)}
          agents={agents}
          actions={actions}
          units={units}
          name='event'
          onChange={handleEventChange}
        ></EventInput>
        <SlDivider></SlDivider>
        <SlButtonGroup slot="footer">
          <SlButton onClick={handleEventSubmit} variant="primary">{eventState?.id? 'Update' : 'Create'}</SlButton>
          <SlButton onClick={resetState} variant="default">Cancel</SlButton>
        </SlButtonGroup>
      </>;
    } else {
      return <></>;
    }
  };

  /**
   * Pass the array of objects back
   */
  const handleSubmit = () => {
    closeModal();
    const items: PathedData[] = [...events];

    if (commitment && commitment !== null) {
      items.unshift(commitment);
    }
    if (afterward) afterward(items);
  };

  /**
   * Determines if the panel should be open or closed, returns the appropriate class
   */
  const panelState = () => {
    return (commitmentOpen || eventOpen) ? ' open' : ' close';
  }

  /**
   * Returns an event hanlder for the button. This is a hack, should use an
   * event listener and should inspect the key.
   *
   * TODO: This could be bad. For instance if we close this modal after canceling
   * this will still save any new events, but they will not be associated with
   * the edge. I need to separate out new/modified flows into a separate array
   * that doesn't get persisted until this point. 
   */
  const makeEventClickHandler = (event: EconomicEvent): (()=>void) => {
    return () => {
      pickEvent(event);
      setEventOpen(true);
    }
  };

  return (
    <>
      <div className="modal-title">Flows</div>
      <SlDivider></SlDivider>
      <div className='panel-container'>
        <div className='panel-slider'>
          <div className='panel'>
            <div>
              <div className='form-heading'>
                <span>Commitment</span>
                <SlTooltip content="Planned resource flows.">
                  <SlIconButton name="info-circle" label="Commitment info." />
                </SlTooltip>
              </div>
            </div>
            {commitmentEditOrCreate()}
            <br />
            <br />
            <div>
              <div className='form-heading'>
                Events
                <SlTooltip content="Actual resource flows, planed or unplanned.">
                  <SlIconButton name="info-circle" label="Commitment info." />
                </SlTooltip>
              </div>
            </div>
            {events.map((ev) =>
              <SlButton variant="default" id={`edit-${ev.id}`} key={ev.id} onClick={makeEventClickHandler(ev)}>
                {getLabelForFlow(ev, getProvider(ev), getReceiver(ev), actions, units)}
              </SlButton>
            )}
            <br />
            <SlButton onClick={() => setEventOpen(true)} variant="primary">Create Event</SlButton>
            <SlDivider></SlDivider>
            <SlButtonGroup slot="footer">
              <SlButton onClick={handleSubmit} variant="primary">Done</SlButton>
              <SlButton onClick={closeModal} variant="default">Cancel</SlButton>
            </SlButtonGroup>
          </div>
          <div className={`panel slide${panelState()}`}>
            {commitmentForm()}
            {eventForm()}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowModal;