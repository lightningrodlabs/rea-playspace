import { SlButton, SlButtonGroup, SlDivider, SlIconButton, SlTooltip } from '@shoelace-style/shoelace/dist/react';
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
import { objectsDiff } from '../../utils';

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
  const [editCommitment, setEditCommitment] = useState<Commitment>();
  const [editEvents, setEditEvents] = useState<Array<EconomicEvent>>([]);
  const [currentEditEvent, setCurrentEditEvent] = useState<EconomicEvent>();
  const [initial, setInitial] = useState<FlowShape>();
  const [agents, setAgents] = useState<Array<Agent>>([]);
  const [actions, setActions] = useState<Array<Action>>([]);
  const [units, setUnits] = useState<Array<Unit>>([]);

  // store updates to flows until saving or discarding
  let commitmentUpdates: CommitmentShape = null;
  let eventUpdates: EconomicEventShape = null;

  // close the panel
  const resetState = () => {
    setCommitmentOpen(false);
    setEventOpen(false);
    commitmentUpdates = null;
    eventUpdates = null;
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
      const {commitment, events} = getCommitmentAndEvents(vfPath);
      setEditCommitment(commitment);
      setEditEvents(events);
    }

    setAgents(store.getAgents());
    setUnits(store.getUnits());
  }, []);

  // Pick an event to edit, but make a clone so edits don't propagate through the app.
  const pickEvent = (event: EconomicEvent) => {
    setCurrentEditEvent(event);
  };

  /**
   * Hydrate the provider from the key
   */
  const getProvider = (flow: FlowShape) => {
    const store = getDataStore();
    if (flow && flow.provider) {
      return store.getById(flow.provider as string);
    }
    return null;
  };

  /**
   * Hydrate the recevier from the key
   */
  const getReceiver = (flow: FlowShape) => {
    const store = getDataStore();
    if (flow && flow.receiver) {
      return store.getById(flow.receiver as string);
    }
    return null;
  };

  /**
   * Hydrate the conforming resource from the key, or the defaults
   */
  const getConformingResource = (flow: FlowShape) => {
    const store = getDataStore();
    if (flow && flow.resourceConformsTo) {
      return store.getById(flow.resourceConformsTo as string);
    } else {
      return store.getById(initial.resourceConformsTo as string);
    }
  };

  /**
   * Removes fields that shouldn't be set or not present in an Event and sets defaults
   */
  const getEventDefaultsFromCommitment = (commitment: CommitmentShape): FlowShape => {
    const init = {...commitment};
    delete init.id;
    delete init.created;
    delete init.plannedWithin;
    delete init.due;
    delete init.note;
    init.hasPointInTime = new Date();
    return init;
  }

  /**
   * Removes fields that shouldn't be set or not present in an Event and sets defaults
   */
  const getEventDefaultsFromEvent = (event: EconomicEventShape): FlowShape => {
    const init = {...event};
    delete init.id;
    delete init.created;
    delete init.due;
    delete init.note;
    init.hasPointInTime = new Date();
    return init;
  }

  /**
   * When the commitment changes, update it.
   */
  const handleCommitmentChange = (e: any) => {
    commitmentUpdates = e.target.value;
  }

  /**
   * When the current event changes, update it.
   */
   const handleEventChange = (e: any) => {
    eventUpdates = e.target.value;
  }

  /**
   * Store the commitment so we can save it later
   */
  const handleCommitmentSubmit = () => {
    const commitment = new Commitment(commitmentUpdates);
    setEditCommitment(commitment);
    setCommitmentOpen(false);

    // Clean up
    commitmentUpdates = null;
  };

  /**
   * Store the event so we can save it later
   * If the event is in the list of events, update it. If it's not, then add it
   */
  const handleEventSubmit = () => {
    setEventOpen(false);
    const newEvent = new EconomicEvent(eventUpdates);
    setEditEvents((prevEvents) => {
      const eventIndex = editEvents.findIndex((event) => newEvent.id === event.id);
      if (eventIndex > -1) {
        const newEvents = [...prevEvents];
        newEvents[eventIndex] = newEvent;
        return newEvents;
      } else {
        const newEvents = [...prevEvents, newEvent];
        return newEvents;
      }
    });

    // Clean up
    setCurrentEditEvent(null);
    eventUpdates = null;
  };

  /**
   * A component of sorts to either show a button to add a commitment or a button
   * to edit a commitment.
   */
  const commitmentEditOrCreate = () => {
    if (editCommitment) {
      const label = getLabelForFlow(editCommitment, getProvider(editCommitment), getReceiver(editCommitment), actions, units);
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
          commitmentState={{...initial, ...editCommitment}}
          conformingResource={getConformingResource(editCommitment)}
          agents={agents}
          actions={actions}
          units={units}
          name='commitment'
          onChange={handleCommitmentChange}
        ></CommitmentInput>
        <SlDivider></SlDivider>
        <SlButtonGroup slot="footer">
          <SlButton onClick={handleCommitmentSubmit} variant="primary">{editCommitment?.id? 'Update' : 'Create'}</SlButton>
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
    let eventState = {...initial, ...currentEditEvent};
    const readonlyFields = [];

    function disableFields(flow: FlowShape) {
      if (flow.action && flow.action != null) {
        readonlyFields.unshift('action');
      }
      if (flow.resourceQuantity && flow.resourceQuantity != null) {
        readonlyFields.unshift('resourceQuantityUnit');
      }
      if (flow.effortQuantity && flow.effortQuantity != null) {
        readonlyFields.unshift('effortQuantityUnit');
      }
    }

    /**
     * This should prevent editing certain fields when they are present and
     * copied over from a Commitment.
     */
    if (editCommitment && editCommitment != null) {
      eventState = {...initial, ...getEventDefaultsFromCommitment(editCommitment), ...currentEditEvent};
      disableFields(editCommitment);
    } else {
      // Do the same with Events.
      if (editEvents.length > 0) {
        const firstEvent = editEvents[0];
        eventState = {...initial, ...getEventDefaultsFromEvent(firstEvent), ...currentEditEvent};
        disableFields(firstEvent);
      }
    }
    if (eventOpen) {
      return <>
        <SlIconButton onClick={resetState} name="chevron-left" label="Cancel. Go Back."></SlIconButton>
        <h4 className='panel-heading'>Event</h4>
        <EventInput
          eventState={eventState}
          readonlyFields={readonlyFields}
          conformingResource={getConformingResource(currentEditEvent)}
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
   *
   * XXX: maybe it's time to break out the vfPath into vfCommitment and vfEvents
   *      fields?
   * XXX: This always replaces the vfPath array on the edge, which will always
   *      cause a rerender and network traffic on Holochain even if it didn't
   *      change. Might not be a big problem.
   */
  const handleSubmit = () => {
    closeModal();
    const store = getDataStore();

    // Init array of changed items
    const items: PathedData[] = [];

    // Check for the Commitment
    if (
      editCommitment
      && editCommitment !== null
    ) {
      // If it was changed
      if (objectsDiff(store.getCursor(editCommitment.path), editCommitment)) {
        // Store the object
        const newCommitment: Commitment = store.upsert<CommitmentShape, Commitment>(editCommitment, Commitment);
        // Ensure it gets passed back to the DisplayEdge
        items.unshift(newCommitment);
      } else {
        // It hasn't changed, ensure the original gets passed back to the DisplayEdge
        items.unshift(editCommitment);
      }
    }

    // Cycle through Events
    for(let event of editEvents) {
      // Check for the Event
      if (
        event
        && event !== null
      ) {
        // If it was changed
        if (objectsDiff(store.getCursor(event.path), event)) {
          // Store the object
          const newEvent = store.upsert<EconomicEventShape, EconomicEvent>(event, EconomicEvent);
          // Ensure it gets passed back to the DisplayEdge
          items.unshift(newEvent);
        } else {
          // It hasn't changed, ensure the original gets passed back to the DisplayEdge
          items.unshift(event);
        }
      }
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
            {editEvents.map((ev) =>
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