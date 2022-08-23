import getDataStore from "../data/DataStore";
import { ResourceSpecification } from "../data/models/Valueflows/Knowledge";
import { EconomicEvent, EconomicResource } from "../data/models/Valueflows/Observation";
import { EconomicResourceShape } from "../types/valueflows";

/**
 * 
 * @param economicEvent 
 * @returns [EconomicResource, EconomicResource]
 * The first EconomicResource is resourceInventoriedAs.
 * The second EconomicResource is toResourceInventoriedAs, and may be null.
 * Recommend destructuring response when calling this function.
 *
 * XXX: We are ignoring state and stage for now.
 */
export function applyActionResourceEffect(economicResources: EconomicResource[], economicEvents: EconomicEvent[]) : Array<EconomicResource> {
/**
 * This function does accounting given a set of EconomicEvents and a set of EconomicResources.
 *
 * We sort the set of EconomicResources into groupings by ResourceSpecification (conformsTo).
 * Each of these groupings is a EconomicResource pool (called resourcePool below).
 * Then we index by syntheticKey.
 * These Record structs indexed by ResourceSpecification are the pools of EconomicResources (called resourcePools below).
 *
 * An EconomicEvent acts on a pool of EconomicResources. Each pool conforms to a certain ResourceSpecification.
 * Essentially, an EconomicEvent takes a pool of EconomicResources and returns a new pool of EconomicResources.
 * In this instance, we're just modifying objects in place.
 */

  // We need the resource specifications to create the reosurcePools and for names
  const store = getDataStore();
  const resourceSpecifications: Record<string, ResourceSpecification> = store.getCursor('root.resourceSpecification');

  type SyntheticKey = string;
  type ResourcePool = Record<SyntheticKey, EconomicResource>;
  type ConformsTo = string;
  const resourcePools: Record<ConformsTo, ResourcePool> = {};

  // Initialize all resource pools from resource specifications
  Object.values(resourceSpecifications).forEach((spec) => {
    if (!Object.hasOwn(resourcePools, (spec as ResourceSpecification).id)) {
      resourcePools[(spec as ResourceSpecification).id] = {};
    }
  });

  // populate the resourcePools with clones of original data
  economicResources.forEach((resource)=>{
    const resourceConformsTo = resource.conformsTo;
    const sKey = resource.syntheticKey;
    resourcePools[resourceConformsTo][sKey] = new EconomicResource(resource);
  });

  const sortedEvents =  economicEvents.sort((a, b) => +a.created - +b.created);
  sortedEvents.forEach(economicEvent => {

    // get the action for the current economic event
    const action = store.getActions().find((action) => action.id == economicEvent.action as string)

    // Based on either:
    //  + resourceInventoriedAs, or
    //  + conformsTo AND the synthetic key derived from (provider, atLocation, stage, state),
    // we find the correct resourcePool and the correct resource.
    const {
      resourceInventoriedAs,
      toResourceInventoriedAs,
      resourceConformsTo: conformsTo,
      provider,
      receiver,
      atLocation,
      toLocation,
      // Note, the following is only applied to the output and never matched against the input, is this desirable?
      // I suppose so, because the other desired information can be derived through the data graph
      state,
      inputOf,
      outputOf
    } = economicEvent;

    // et the name of the matched resource specification
    const name = resourceSpecifications[conformsTo].name;

    // fetch the implied resourceInventoriedAs to do accounting on
    const economicResourceShape: EconomicResourceShape = {
      name,
      conformsTo,
      primaryAccountable: provider,
      currentLocation: atLocation
    };
    const synthKey = EconomicResource.getSytheticKey(economicResourceShape);
    const clonedEconomicResource =
      Object.hasOwn(resourcePools[conformsTo], synthKey) ?
      resourcePools[conformsTo][synthKey] :
      resourcePools[conformsTo][synthKey] = new EconomicResource(economicResourceShape);

    /**
     * If somehow two or more objects exist with the same synthetic key, this will throw an error.
     */
    if (resourceInventoriedAs && clonedEconomicResource && ((resourceInventoriedAs as unknown) as EconomicResource).id !== clonedEconomicResource.id) {
      throw new Error('Panic: The implied resourcedInventoriedAs does not match the resourceInventoriedAs field on the event.');
    }

    // fetch the implied toResourceInventoriedAs to do accounting on
    const toEconomicResourceShape = {
      name,
      conformsTo,
      primaryAccountable: receiver,
      currentLocation: toLocation,
      state,
      stage: outputOf
    };
    const toSynthKey = EconomicResource.getSytheticKey(toEconomicResourceShape);
    const clonedToEconomicResource =
      Object.hasOwn(resourcePools[conformsTo], toSynthKey) ?
      resourcePools[conformsTo][toSynthKey] :
      resourcePools[conformsTo][toSynthKey] = new EconomicResource(toEconomicResourceShape);

    /**
     * In the case that we are using the toResourceInventoriedAs field across orginizational boundaries
     * or Holochain membranes, we would actually need to be able to access their data. This could be as
     * simple as having the id for toResourceInventoriedAs in the Agreement notes for each transfer into
     * their org/membrane. Or it could be a more complicated song and dance with capability grants and
     * so on.
     *
     * XXX: If toResourceInventoriedAs is specified, we will throw an error.
     */
    if (toResourceInventoriedAs && clonedToEconomicResource && ((toResourceInventoriedAs as unknown) as EconomicResource).id !== clonedToEconomicResource.id) {
      throw new Error('Panic: The implied toResourcedInventoriedAs does not match the toResourceInventoriedAs field on the event.');
    }
  
    if (action.accountingEffect) {
      switch (action.accountingEffect) {
        case 'increment':
          clonedToEconomicResource.accountingQuantity.hasNumericalValue += economicEvent.resourceQuantity.hasNumericalValue;
          break;
        case 'decrement':
          clonedToEconomicResource.accountingQuantity.hasNumericalValue -= economicEvent.resourceQuantity.hasNumericalValue;
          break;
        case 'decrementIncrement':
          clonedEconomicResource.accountingQuantity.hasNumericalValue -= economicEvent.resourceQuantity.hasNumericalValue;
          clonedToEconomicResource.accountingQuantity.hasNumericalValue += economicEvent.resourceQuantity.hasNumericalValue;
          break;
      }
    }
  
    if (action.onhandEffect) {
      switch (action.onhandEffect) {
        case 'increment':
          clonedToEconomicResource.onhandQuantity.hasNumericalValue += economicEvent.resourceQuantity.hasNumericalValue;
          break;
        case 'decrement':
          clonedToEconomicResource.onhandQuantity.hasNumericalValue -= economicEvent.resourceQuantity.hasNumericalValue;
          break;
        case 'decrementIncrement':
          clonedEconomicResource.onhandQuantity.hasNumericalValue -= economicEvent.resourceQuantity.hasNumericalValue;
          clonedToEconomicResource.onhandQuantity.hasNumericalValue += economicEvent.resourceQuantity.hasNumericalValue;
          break;
      }
    }
  
    if (action.locationEffect) {
      switch (action.locationEffect) {
        case 'new':
          clonedToEconomicResource.currentLocation = economicEvent.atLocation;
          break;
        case 'update':
          clonedToEconomicResource.currentLocation = economicEvent.atLocation;
          break;
        case 'updateTo':
          clonedToEconomicResource.currentLocation = economicEvent.atLocation;
          break;
      }
    }
  
    if (action.containedEffect) {
      if (action.containedEffect === 'update') {
        clonedToEconomicResource.containedIn = (economicEvent.toResourceInventoriedAs as EconomicResource).id;
      }
      if (action.containedEffect === 'remove') {
        clonedToEconomicResource.containedIn = null;
      }
    }
  
    if (action.accountableEffect) {
      if (action.accountableEffect === 'new') {
        clonedToEconomicResource.primaryAccountable = economicEvent.receiver;
      }
      if (action.accountableEffect === 'updateTo') {
        clonedToEconomicResource.primaryAccountable = economicEvent.receiver;
      }
    }
  
    if (action.stageEffect) {
      if (action.stageEffect === 'stage') {
        clonedToEconomicResource.stage = economicEvent.outputOf;
      }
    }
  
    if (action.stateEffect) {
      if (action.stateEffect === 'update') {
        clonedToEconomicResource.state = economicEvent.state;
      }
      if (action.stateEffect === 'updateTo') {
        clonedToEconomicResource.state = economicEvent.state;
      }
    }
  });

  console.log(resourcePools)
  let computedResources = Array<EconomicResource>();
  for (let conformsTo in resourcePools) {
    const resources = Object.values(resourcePools[conformsTo]);
    computedResources = computedResources.concat(resources.filter((resource) => resource.accountingQuantity.hasNumericalValue != 0));
  }
  return computedResources;
}
