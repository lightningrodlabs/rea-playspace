
   
import { LIST_ECONOMIC_EVENTS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export default function useEconomicResources() {
  const { data, loading, error } = useQuery(LIST_ECONOMIC_EVENTS);
  const events = (data && data.economicEvents && data.economicEvents.edges) || [];

  // because we are looking at a list of events
  // we have to dedup the resource
  function uniq(a: any) {
    var seen = {};
    return a.filter(function (item: any) {
      // @ts-ignore
      return seen.hasOwnProperty(item.id) ? false : (seen[item.id] = true);
    });
  }
  const resources = uniq(
    events
      .filter((event: any) => {
        return event.node.action.id === "raise";
      })
      .map((event: any) => {
        return {
          ...event.node.resourceInventoriedAs,
          // HACK: temporary
          primaryAccountable: event.node.receiver.id,
        };
      })
  );

  return {
    data: resources,
    loading,
    error,
  }
}