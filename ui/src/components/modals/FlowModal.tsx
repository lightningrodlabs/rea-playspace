import { SlButton, SlButtonGroup, SlCheckbox, SlDivider, SlIcon, SlIconButton, SlTooltip } from '@shoelace-style/shoelace/dist/react';
import React, { useEffect, useState, useRef } from 'react';
import { PathedData } from '../../data/models/PathedData';
import { Action, ActionKey, Agent, isTransfer, Unit } from '../../data/models/Valueflows/Knowledge';
import { CommitmentShape, EconomicEventShape, FlowShape } from '../../types/valueflows';
import { Commitment } from '../../data/models/Valueflows/Plan';
import { EconomicEvent, EconomicResource } from '../../data/models/Valueflows/Observation';
import CommitmentInput from '../input/Commitment';
import EventInput from '../input/Event';
import { flowDefaults, getEventDefaultsFromCommitment, getEventDefaultsFromEvent, getCommitmentAndEvents, getDisplayNodeBy, getLabelForFlow } from '../../logic/flows';
import getDataStore from '../../data/DataStore';
import { objectsDiff } from '../../data/utils';
import EconomicResourceInput from '../input/EconomicResource';

/**
 * XXX: This is a mess we really need to break each component out into its own
 * file (Commitment, Event, EconomicResource) with all the handlers packaged in
 * handler files. We could start passing a store object around instead of passing
 * all the props down. Additionally, this could use a state machine, just like
 * FlowCanvas. -JB
 */

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

  const [initial, setInitial] = useState<FlowShape>();
  const [actions, setActions] = useState<Array<Action>>([]);
  const [units, setUnits] = useState<Array<Unit>>([]);
  const commitmentFinishedRef = useRef(null);

  // store updates to flows until saving or discarding
  const [workingCommitment, setWorkingCommitment] = useState<CommitmentShape>();
  const [workingEvent, setWorkingEvent] = useState<EconomicEventShape>();

  // close the commitment and resource panels
  const resetState = () => {
    setCommitmentOpen(false);
    setEventOpen(false);
    setWorkingCommitment(null);
    setWorkingEvent(null);
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

    if (vfPath) {
      const {commitment, events} = getCommitmentAndEvents(vfPath);
      setEditCommitment(commitment);
      setEditEvents(events);
    }

    setActions(store.getActions());
    setUnits(store.getUnits());
    return () => {console.log('flowModal unmount')}
  }, []);

  // Pick an event to edit, but make a clone so edits don't propagate through the app.
  const pickEvent = (event: EconomicEvent) => {
    setWorkingEvent(event);
  };

  /**
   * Hydrate the resource from the key
   */
  const getResource = (flow: FlowShape) => {
    const store  = getDataStore();
    if (flow && flow.resourceConformsTo) {
      return store.getById(flow.resourceConformsTo as string);
    }
    return null;
  }

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
    } else if (initial && initial.resourceConformsTo) {
      return store.getById(initial.resourceConformsTo as string);
    } else {
      return null;
    }
  };

  /**
   * When the commitment changes, update it.
   */
  const handleCommitmentChange = (e: any) => {
    setWorkingCommitment(new Commitment(e.target.value));
  }

  /**
   * When the current event changes, update it.
   */
   const handleEventChange = (e: any) => {
    console.log('event: ', e.target.value);
    setWorkingEvent(new EconomicEvent(e.target.value));
  }

  /**
   * Store the commitment so we can save it later
   */
  const handleCommitmentSubmit = () => {
    const commitment = new Commitment(workingCommitment);
    setEditCommitment(commitment);
    setCommitmentOpen(false);

    // Clean up
    setWorkingCommitment(null);
  };

  /**
   * Store the event so we can save it later
   * If the event is in the list of events, update it. If it's not, then add it
   */
  const handleEventSubmit = () => {
    setEventOpen(false);
    const newEvent = new EconomicEvent(workingEvent);
    console.log('newEvent: ', newEvent);
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
    setWorkingEvent(null);
    setWorkingEvent(null);
  };

  const handleCommitmentFinished = () => {
    setEditCommitment((current) => {
      return new Commitment({...current, finished: commitmentFinishedRef.current.checked});
    })
  }

  const handleCommitmentOpen = () => {
    setCommitmentOpen(true);
  }

  const handleEventOpen = () => {
    setEventOpen(true);
  }

  /**
   * A component of sorts to either show a button to add a commitment or a button
   * to edit a commitment.
   */
  const commitmentEditOrCreate = () => {
    if (editCommitment) {
      const commitmentClass = ('commitment-button' + (editCommitment.finished ? ' finished' : ''));
      const label = getLabelForFlow(editCommitment, getResource(editCommitment), getProvider(editCommitment), getReceiver(editCommitment), actions, units);
      return <>
        <SlButton className={commitmentClass} variant="default" onClick={handleCommitmentOpen}>{label}</SlButton>
        <span className='commitment-checkbox-space'></span>
        <SlCheckbox disabled={false} checked={editCommitment.finished} className='commitment-checkbox' onSlChange={handleCommitmentFinished} ref={commitmentFinishedRef}></SlCheckbox>
        <SlTooltip content='Click this checkbox to put the commitment into a finished state.'>
          <SlIcon className='commitment-finish-info' name='info-circle'></SlIcon>
        </SlTooltip>
      </>;
    } else {
      return <>
        <SlButton className='commitment-button' variant="primary" onClick={handleCommitmentOpen}>Create Commitment</SlButton>
        <span className='commitment-checkbox-space'></span>
        <SlCheckbox disabled={true} className='commitment-checkbox' onSlChange={handleCommitmentFinished} ref={commitmentFinishedRef}></SlCheckbox>
        <SlTooltip content='Click this checkbox to put the commitment into a finished state.'>
          <SlIcon className='commitment-finish-info' name='info-circle'></SlIcon>
        </SlTooltip>
      </>;
    }
  };

  /**
   * Form for commitment
   */
  const commitmentForm = () => {
    if (commitmentOpen) {
      let state = {} as CommitmentShape;

      /**
       * If editing a commitment, merge initial state with exisiting data
       */
      if (editCommitment) {
        state = {...initial, ...editCommitment}
      }

      // If moving around the panels, such as creating a new Commitment or
      // EconomicResource, use the working state.
      if (workingCommitment) {
        state = {...initial, ...workingCommitment};
      }

      return <>
        <SlIconButton onClick={resetState} name="chevron-left" label="Cancel. Go Back."></SlIconButton>
        <h4 className='panel-heading'>Commitment</h4>
        <CommitmentInput
          commitmentState={state}
          conformingResource={getConformingResource(state)}
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
    let eventState = {...initial, ...workingEvent};
    const readonlyFields = [];

    function disableFields(flow: FlowShape) {
      if (
        flow.action && flow.action != null
        && !isTransfer(flow.action as ActionKey)) {
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
      eventState = {...initial, ...getEventDefaultsFromCommitment(editCommitment), ...workingEvent};
      disableFields(editCommitment);
    } else {
      // Do the same with Events.
      if (editEvents.length > 1) {
        const firstEvent = editEvents[0];
        eventState = {...initial, ...getEventDefaultsFromEvent(firstEvent), ...workingEvent};
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
          conformingResource={getConformingResource(eventState)}
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
  * Form for economic resource if a new Resource is to be created
  */
  // const economicResourceForm = () => {
  //   return <>
  //     <SlIconButton onClick={resetResourceState} name="chevron-left" label="Cancel. Go Back."></SlIconButton>
  //     <h4 className='panel-heading'>Economic Resource</h4>
  //     <EconomicResourceInput
  //       conformingResource={getConformingResource(editCommitment)}
  //       resetResourceState={resetResourceState}
  //       afterHandleResourceSubmit={afterHandleResourceSubmit}
  //       agents={agents}
  //     ></EconomicResourceInput>
  //   </>;
  // };

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
        items.push(newCommitment);
      } else {
        // It hasn't changed, ensure the original gets passed back to the DisplayEdge
        items.push(editCommitment);
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
          items.push(newEvent);
        } else {
          // It hasn't changed, ensure the original gets passed back to the DisplayEdge
          items.push(event);
        }
      }
    }
    if (afterward) afterward(items);
  };

  /**
   * Determines if the event or commitment panel should be open or closed, returns the appropriate class
   */
  const panelState = () => {
    return (commitmentOpen || eventOpen) ? ' open' : ' close';
  }

  /**
   * Returns an event handler for the button. This is a hack, should use a form-
   * wide event listener and should inspect the key of the object clicked.
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
                <SlTooltip content="Committed resource flow.">
                  <SlIconButton name="info-circle" />
                </SlTooltip>
              </div>
            </div>
            <div className="commitment-with-finish">
              {commitmentEditOrCreate()}
            </div>
            <br />
            <br />
            <div>
              <div className='form-heading'>
                Events
                <SlTooltip content="Actual resource flows, planned or unplanned.">
                  <SlIconButton name="info-circle" />
                </SlTooltip>
              </div>
            </div>
            {editEvents.map((ev) =>
              <SlButton variant="default" id={`edit-${ev.id}`} key={ev.id} onClick={makeEventClickHandler(ev)}>
                {getLabelForFlow(ev, getResource(ev), getProvider(ev), getReceiver(ev), actions, units)}
              </SlButton>
            )}
            <br />
            <SlButton onClick={handleEventOpen} variant="primary">Create Event</SlButton>
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
