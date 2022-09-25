import getDataStore from "../data/DataStore";
import { QuantityEffect, ResourceSpecification } from "../data/models/Valueflows/Knowledge";
import { Process } from "../data/models/Valueflows/Plan";
import { EconomicEvent, EconomicEvents, EconomicResource, EconomicResources } from "../data/models/Valueflows/Observation";
import { EconomicResourceShape } from "../types/valueflows";

//// SINGLE EVENT ACCOUNTING ////////////////////////////////////////////////////

type ResourcePair = [EconomicResource, EconomicResource];
type QuantityEffectMethod = (field: 'accountingQuantity' | 'onhandQuantity', resource: EconomicResource, toResource: EconomicResource, event: EconomicEvent) => void;
type QuantityEffectMethods = Record<QuantityEffect, QuantityEffectMethod>;

/**
 * This takes care of the adjustments made to the values of the resources.
 * This mutates the values in place, so clone before passing in to avoid carrying
 * out accidental mutations to the current store state.
 */
const quantityEffects: QuantityEffectMethods = {
  'decrement': (field, resource, _, event) => {
    resource[field].hasNumericalValue -= event.resourceQuantity.hasNumericalValue;
  },
  'increment': (field, resource, _, event) => {
    resource[field].hasNumericalValue += event.resourceQuantity.hasNumericalValue;
  },
  'decrementIncrement': (field, resource, toResource, event) => {
    resource && (resource[field].hasNumericalValue -= event.resourceQuantity.hasNumericalValue);
    toResource && (toResource[field].hasNumericalValue += event.resourceQuantity.hasNumericalValue);
  }
}

/**
 * This applies the full set of adjustments specified by an EconomicEvent to a
 * pair of EconomicResources: [resourceInventoriedAs, toResourceInventoriedAs],
 * which correspond to the EconomicResources specified by the EconomicEvent.
 *
 * This is broken up this way, so this code doesn't need to focus on fetching any
 * data, but rather acts directly upon the objects provided.
 */
export function applyEvent(event: EconomicEvent, resources: ResourcePair) {
  const store = getDataStore();

  // get the action for the current economic event
  const action = store.getActions().find((action) => action.id == event.action as string);

  // Note: corresponds with [ resourceInventoriedAs, toResourceInventoriedAs ]
  const [resource, toResource] = resources;

  // Adjust accounting quantities
  if (action.accountingEffect) {
    quantityEffects[action.accountingEffect]('accountingQuantity', resource, toResource, event);
  }

  // Adjust onhand quantities
  if (action.onhandEffect) {
    quantityEffects[action.onhandEffect]('onhandQuantity', resource, toResource, event);
  }

  // Adjust the location
  if (action.locationEffect) {
    if (action.locationEffect === 'new' || action.locationEffect === 'update') resource.currentLocation = event.atLocation;
    if (action.locationEffect === 'updateTo') toResource.currentLocation = event.atLocation;
  }

  // Adjust containedIn
  if (action.containedEffect) {
    if (action.containedEffect === 'update') {
      resource.containedIn = event.toResourceInventoriedAs;
    }
    if (action.containedEffect === 'remove') {
      resource.containedIn = null;
    }
  }

  // Adjust primary accountable
  if (action.accountableEffect) {
    if (action.accountableEffect === 'new') {
      resource.primaryAccountable = event.receiver;
    }
    if (action.accountableEffect === 'updateTo') {
      toResource.primaryAccountable = event.receiver;
    }
  }

  // Adjust stage
  if (action.stageEffect) {
    if (action.stageEffect === 'stage') {
      const processes: Record<string, Process> = store.getCursor(`root.plan.${store.getCurrentPlanId()}.process`);
      const processSpecificationId = processes[event.outputOf].basedOn;
      resource.stage = processSpecificationId;
    }
  }

  // Adjust state
  if (action.stateEffect) {
    if (action.stateEffect === 'update') {
      resource.state = event.state;
    }
    if (action.stateEffect === 'updateTo') {
      toResource.state = event.state;
    }
  }
}

//// MULTIPLE EVENT ACCOUNTING //////////////////////////////////////////////////

type ResourceSpecificationIndex = Record<string, ResourceSpecification>;
type EconomicResourceIndex = Record<string, EconomicResource>;
type EconomicResourcePools = Record<string, EconomicResource>;
type ConformsTo = string;
type EconomicResourceIndicesByResourceSpecification = Record<ConformsTo, EconomicResourcePools>;

/**
 * This function sorts things so we can find things in linear time when we
 * actually start doing the accounting process.
 *
 * We create two indices in one pass of the list of resources passed in:
 * - resourcePools: an two dimensional index grouped by conformsTo then grouped
 *   by synthetcKey, with an array of EconomicResources who's synthicKeys all
 *   collide.
 * - resourceIndex: each EconomicResource is indexed by id
 *
 * Additionally, we clone each of the objects so the accounting algorithm can
 * modify the cloned objects in place.
 */
export function createResourcePools(
  resourceSpecifications: ResourceSpecificationIndex,
  economicResources: EconomicResources
): [EconomicResourceIndex, EconomicResourceIndicesByResourceSpecification] {
  const resourcePools: EconomicResourceIndicesByResourceSpecification = {};
  const resourceIndex: EconomicResourceIndex = {};

  // Initialize all resource pools from resource specifications
  Object.values(resourceSpecifications).forEach((spec) => {
    if (!Object.hasOwn(resourcePools, spec.id)) {
      resourcePools[spec.id] = {};
    }
  });

  // populate the resourcePools with clones of original data
  economicResources.forEach((resource) => {
    const resourceConformsTo = resource.conformsTo;
    const clonedResource = new EconomicResource(resource);
    resourceIndex[resource.id] = clonedResource;
    if (!Object.hasOwn(resourcePools[resourceConformsTo], resource.syntheticKey)) {
      resourcePools[resourceConformsTo][resource.syntheticKey] = clonedResource;
    }
  });
  return [resourceIndex, resourcePools];
}

/**
 * This creates very bland generic versions of [resourceInventoriedAs, toResourceInventoriedAs]
 * for simulations of events without full user input.
 */
export function createResourceAndToResourceShapes(resourceSpecifications: ResourceSpecificationIndex, economicEvent: EconomicEvent) {
  const {
    resourceInventoriedAs,
    toResourceInventoriedAs,
    resourceConformsTo: conformsTo,
    provider,
    receiver,
    atLocation,
    toLocation
  } = economicEvent;

  // set the name of the matched resource specification
  const name = resourceSpecifications[conformsTo].name;

  // fetch the implied resourceInventoriedAs to do accounting on
  const economicResourceShape: EconomicResourceShape = {
    id: resourceInventoriedAs,
    name,
    conformsTo,
    primaryAccountable: provider,
    currentLocation: atLocation
  };

  // fetch the implied toResourceInventoriedAs to do accounting on
  const toEconomicResourceShape = {
    id: toResourceInventoriedAs,
    name,
    conformsTo,
    primaryAccountable: receiver,
    currentLocation: toLocation
  };
  return [economicResourceShape, toEconomicResourceShape];
}

/**
 * This function does accounting given a set of EconomicEvents and a set of EconomicResources.
 *
 * Real accounting would be done by applying the effect of the last created EconomicEvent to
 * the pair of EconomicResources specified in the EconomicEvent. Since we have no way of ensuring
 * we haven't applied the accounting twice, we are reckoning from the begining of history in the
 * playspace. For now, this is fine since no one has billions of EconomicEvents yet. However,
 * it means we still need to implement a way of tracking which events have been applied. This
 * can be accomplished in many way. One way is by querying the backend to see what it's state
 * is, or by just storing the point in time from which the user started editing and only doing
 * the the reckoning from that point forward.
 */
export function simulateAccounting(economicResources: EconomicResources, economicEvents: EconomicEvents): EconomicResources {
  const store = getDataStore();
  const resourceSpecifications: ResourceSpecificationIndex = store.getCursor('root.resourceSpecification');
  const [economicResourceIndex, economicResourcePools] = createResourcePools(resourceSpecifications, economicResources);

  // Sort events by time of creation, but topological ordering is preferable
  const sortedEvents = economicEvents.sort((a, b) => +a.created - +b.created);

  // Iterate over events creating simulated resources
  sortedEvents.forEach(event => {

    /**
     * An EconomicEvent acts on a pool of EconomicResources. Each pool conforms
     * to a certain ResourceSpecification. Essentially, an EconomicEvent takes a
     * pool of EconomicResources and returns a new pool of EconomicResources.
     *
     * When a pair of [resourceInventoriedAs, toResourceInventoriedAs] are speci-
     * -fied in the EconomicEvent, they should be used to override the simulation.
     *
     * If they are not present, we just simulate the presence of the resources by
     * creating a sytheticKey from the information provided in the event. This is
     * not perfect, but it does allow us to get accurate accounting from a list
     * of incompletely filled out events. I'm using this as a potential sanity
     * check for the event forms.
     *
     * There a few issues immediately visible. For one, we don't know what state
     * the input should be in. We also don't know what stage the input will be
     * in, but we have all the information to figure it out:
     *
     * +---------+              +-----------+              +---------+
     * | Event 1 |      =>      | Process 1 |      =>      | Event 2 |
     * +---------+              +-----------+              +---------+
     * inputOf p1               p1                         outputOf p1
     *
     * resource with
     * possible stage form p0   basedOn            =>      resourceInventoriedAs.stage
     *
     * Let's ignore this for now in a simulation, since we'll have to traverse
     * the graph to get the correct answers for this. In real life, the operator
     * (user) will select the resource with the correct stage and state.
     */

    const {
      resourceConformsTo: conformsTo,
      resourceInventoriedAs: resourceId,
      toResourceInventoriedAs: toResourceId,
      state,
      inputOf,
      outputOf
    } = event;

    const [economicResourceShape, toEconomicResourceShape] = createResourceAndToResourceShapes(resourceSpecifications, event);
    const synthKey = EconomicResource.getSytheticKey(economicResourceShape);
    const toSynthKey = EconomicResource.getSytheticKey(toEconomicResourceShape);

    // Either grab the resource corresponding to the [resourceInventoriedAs, toResourceInventoriedAs] pair, or generate new ones.
    let resource = economicResourceIndex[resourceId] ? economicResourceIndex[resourceId] : new EconomicResource(economicResourceShape);
    let toResource = economicResourceIndex[toResourceId] ? economicResourceIndex[toResourceId] : new EconomicResource(toEconomicResourceShape);

    if (!Object.hasOwn(economicResourcePools[conformsTo], synthKey)) {
      economicResourcePools[conformsTo][synthKey] = resource;
    } else {
      if (economicResourcePools[conformsTo][synthKey].id === resource.id) {
        console.info(`EconomicResource ${resource.id} already in resource pool.`);
      } else {
        console.warn(`Conflict between ${resource.id} and ${economicResourcePools[conformsTo][synthKey].id}.`);
      }
    }
    if (!Object.hasOwn(economicResourceIndex, resource.id)) economicResourceIndex[resource.id] = resource
    if (!Object.hasOwn(economicResourcePools[conformsTo], toSynthKey)) {
      economicResourcePools[conformsTo][toSynthKey] = toResource;
    } else {
      if (economicResourcePools[conformsTo][toSynthKey].id === toResource.id) {
        console.info(`EconomicResource ${toResource.id} already in resource pool.`);
      } else {
        console.warn(`Conflict between ${toResource.id} and ${economicResourcePools[conformsTo][toSynthKey].id}.`);
      }
    }
    if (!Object.hasOwn(economicResourceIndex, toResource.id)) economicResourceIndex[toResource.id] = toResource

    applyEvent(event, [resource, toResource]);
  });

  // Return the modified objects from the index
  return Object.values(economicResourceIndex).filter((resource) => resource.accountingQuantity.hasNumericalValue != 0);
}
