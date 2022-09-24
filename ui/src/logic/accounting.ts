import getDataStore from "../data/DataStore";
import { QuantityEffect, ResourceSpecification } from "../data/models/Valueflows/Knowledge";
import { Process } from "../data/models/Valueflows/Plan";
import { EconomicEvent, EconomicEvents, EconomicResource, EconomicResources } from "../data/models/Valueflows/Observation";
import { EconomicResourceShape } from "../types/valueflows";

type ResourcePair = [EconomicResource, EconomicResource];
type ResourceSpecifications = Record<string, ResourceSpecification>;
type SyntheticKey = string;
type ResourcePool = Record<SyntheticKey, EconomicResource>;
type ConformsTo = string;
type ResourcePools = Record<ConformsTo, ResourcePool>;

const quantityEffects: Record<QuantityEffect, (field: 'accountingQuantity' | 'onhandQuantity', resource: EconomicResource, toResource: EconomicResource, event: EconomicEvent) => void> = {
  'decrement': (field, resource, toResource, event) => {
    resource[field].hasNumericalValue -= event.resourceQuantity.hasNumericalValue;
  },
  'increment': (field, resource, toResource, event) => {
    resource[field].hasNumericalValue += event.resourceQuantity.hasNumericalValue;
  },
  'decrementIncrement': (field, resource, toResource, event) => {
    resource && (resource[field].hasNumericalValue -= event.resourceQuantity.hasNumericalValue);
    toResource && (toResource[field].hasNumericalValue += event.resourceQuantity.hasNumericalValue);
  }
}

export function applyEvent(event: EconomicEvent, resources: ResourcePair) {
  const store = getDataStore();

  // get the action for the current economic event
  const action = store.getActions().find((action) => action.id == event.action as string);

  // Note: corresponds with [ resourceInventoriedAs, toResourceInventoriedAs ]
  const [resource, toResource] = resources;

  if (action.accountingEffect) {
    quantityEffects[action.accountingEffect]('accountingQuantity', resource, toResource, event);
  }

  if (action.onhandEffect) {
    quantityEffects[action.accountingEffect]('onhandQuantity', resource, toResource, event);
  }

  if (action.locationEffect) {
    switch (action.locationEffect) {
      case 'new':
        resource.currentLocation = event.atLocation;
        break;
      case 'update':
        resource.currentLocation = event.atLocation;
        break;
      case 'updateTo':
        toResource.currentLocation = event.atLocation;
        break;
    }
  }

  if (action.containedEffect) {
    if (action.containedEffect === 'update') {
      resource.containedIn = event.toResourceInventoriedAs;
    }
    if (action.containedEffect === 'remove') {
      resource.containedIn = null;
    }
  }

  if (action.accountableEffect) {
    if (action.accountableEffect === 'new') {
      resource.primaryAccountable = event.receiver;
    }
    if (action.accountableEffect === 'updateTo') {
      toResource.primaryAccountable = event.receiver;
    }
  }

  if (action.stageEffect) {
    if (action.stageEffect === 'stage') {
      const processes: Record<string, Process> = store.getCursor(`root.plan.${store.getCurrentPlanId()}.process`);
      const processSpecificationId = processes[event.outputOf].basedOn;
      resource.stage = processSpecificationId;
    }
  }

  if (action.stateEffect) {
    if (action.stateEffect === 'update') {
      resource.state = event.state;
    }
    if (action.stateEffect === 'updateTo') {
      toResource.state = event.state;
    }
  }
}

/**
 * We sort the set of EconomicResource[] into groupings by ResourceSpecification (conformsTo).
 * Each of these groupings is a EconomicResource pool (called resourcePool below).
 * Then we index by EconomicResource.syntheticKey (which is our own proprietary extension).
 * These Record structs indexed by ResourceSpecification are the pools of EconomicResources (called resourcePools below).
 *
 * An EconomicEvent acts on a pool of EconomicResources. Each pool conforms to a certain ResourceSpecification.
 * Essentially, an EconomicEvent takes a pool of EconomicResources and returns a new pool of EconomicResources.
 * In this instance, we're just modifying objects in place.
 */
export function createResourcePools(resourceSpecifications: ResourceSpecifications, economicResources: EconomicResources): ResourcePools {
  const resourcePools: ResourcePools = {};

  // Initialize all resource pools from resource specifications
  Object.values(resourceSpecifications).forEach((spec) => {
    if (!Object.hasOwn(resourcePools, spec.id)) {
      resourcePools[spec.id] = {};
    }
  });

  // populate the resourcePools with clones of original data
  economicResources.forEach((resource)=>{
    const resourceConformsTo = resource.conformsTo;
    const sKey = resource.syntheticKey;
    resourcePools[resourceConformsTo][sKey] = new EconomicResource(resource);
  });

  return resourcePools;
}

/**
 * This creates very bland generic versions of [resourceInventoriedAs, toResourceInventoriedAs]
 * for simulations of events without user input.
 */
export function createResourceAndToResourceShapes(resourceSpecifications: ResourceSpecifications, economicEvent: EconomicEvent) {
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
 */
export function simulateAccounting(economicResources: EconomicResources, economicEvents: EconomicEvents): EconomicResources {
  const store = getDataStore();
  const resourceSpecifications: ResourceSpecifications = store.getCursor('root.resourceSpecification');
  const resourcePools: ResourcePools = createResourcePools(resourceSpecifications, economicResources);

  // Sort events by time of creation, but topological ordering is preferable
  const sortedEvents = economicEvents.sort((a, b) => +a.created - +b.created);

  // Iterate over events creating simulated resources
  sortedEvents.forEach(event => {
    const {
      resourceConformsTo: conformsTo,
      resourceInventoriedAs: resourceId,
      toResourceInventoriedAs: toResourceId,
      state, // try with the state, then without the state
      inputOf,
      outputOf
    } = event;

    /**
     * Let's ignore this for now in a simulation,
     * we have to traverse the graph to get the correct answers for this.
     * In real life, the operator (user) will select the resource with the
     * correct state.
     *
     * +---------+              +-----------+              +---------+
     * | Event 1 |      =>      | Process 1 |      =>      | Event 2 |
     * +---------+              +-----------+              +---------+
     * inputOf p1               p1                         outputOf p1
     *
     * resource with
     * possible stage form p0   basedOn            =>      resourceInventoriedAs.stage
     */

    const [economicResourceShape, toEconomicResourceShape] = createResourceAndToResourceShapes(resourceSpecifications, event);

    const synthKey = EconomicResource.getSytheticKey(economicResourceShape);
    const toSynthKey = EconomicResource.getSytheticKey(toEconomicResourceShape);

    // Synthesize
    if (!Object.hasOwn(resourcePools[conformsTo], synthKey)){
      resourcePools[conformsTo][synthKey] = new EconomicResource(economicResourceShape);
    }
    if (!Object.hasOwn(resourcePools[conformsTo], toSynthKey)) {
      resourcePools[conformsTo][toSynthKey] = new EconomicResource(toEconomicResourceShape);
    }

    // Debug
    if (resourcePools[conformsTo][synthKey].id != resourceId) {
      console.log(`toResourceInventoriedAs mismatch, provided: ${resourceId}; computed: ${resourcePools[conformsTo][synthKey].id}`)
    }
    if (resourcePools[conformsTo][toSynthKey].id != toResourceId) {
      console.log(`toResourceInventoriedAs mismatch, provided: ${toResourceId}; computed: ${resourcePools[conformsTo][toSynthKey].id}`)
    }

    applyEvent(event, [resourcePools[conformsTo][synthKey], resourcePools[conformsTo][toSynthKey]])
  });

  let simulatedResources: EconomicResources = [];
  for (let conformsTo in resourcePools) {
    const resources = Object.values(resourcePools[conformsTo]);
    simulatedResources = simulatedResources.concat(resources.filter((resource) => resource.accountingQuantity.hasNumericalValue != 0));
  }
  return simulatedResources;
}
