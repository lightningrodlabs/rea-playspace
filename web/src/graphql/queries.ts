import { gql } from "@apollo/client";

export const WHO_AM_I = gql`
  {
    myAgent {
      id
      name
    }
  }
`;

export const LIST_ECONOMIC_EVENTS = gql`
  query ListEconomicEvents {
    economicEvents {
      edges {
        node {
          id
          action {
            id
          }
          provider {
            id
          }
          receiver {
            id
          }
          resourceInventoriedAs {
            id
            accountingQuantity {
              hasNumericalValue
              hasUnit {
                id
                label
                symbol
              }
            }
            onhandQuantity {
              hasNumericalValue
            }
            image
            note
          }
        }
      }
    }
  }
`;

export const LIST_ECONOMIC_RESOURCES = gql`
  query ListEconomicResources {
    economicResources {
      edges {
        node {
          id
          accountingQuantity {
            hasNumericalValue
          }
          onhandQuantity {
            hasNumericalValue
          }
          image
          note
        }
      }
    }
  }
`;

export const CREATE_ECONOMIC_EVENT = gql`
  mutation CreateEconomicResource(
    $event: EconomicEventCreateParams!
  ) {
    createEconomicEvent(
      event: $event
    ) {
      economicEvent {
        id
      }
    }
  }
`;

export const UPDATE_ECONOMIC_RESOURCES = gql`
  mutation CreateEconomicResource($event: EconomicEventCreateParams!) {
    createEconomicEvent(event: $event) {
      economicEvent {
        resourceInventoriedAs {
          id
          accountingQuantity {
            hasNumericalValue
          }
        }
      }
    }
  }
`;

export const CREATE_ECONOMIC_RESOURCES = gql`
  mutation CreateEconomicResource(
    $event: EconomicEventCreateParams!
    $newInventoriedResource: EconomicResourceCreateParams!
  ) {
    createEconomicEvent(
      event: $event
      newInventoriedResource: $newInventoriedResource
    ) {
      economicResource {
        id
        accountingQuantity
      }
    }
  }
`;

export const CREATE_RESOURCE_SPECIFICATION = gql`
  mutation CreateSpec(
    $resourceSpecification: ResourceSpecificationCreateParams!
  ) {
    createResourceSpecification(resourceSpecification: $resourceSpecification) {
      resourceSpecification {
        id
        name
        image
        note
      }
    }
  }
`;

export const CREATE_UNIT = gql`
  mutation CreateUnit(
    $unit: UnitCreateParams!
  ) {
    createUnit(unit: $unit) {
      unit {
        id
        symbol
        label
      }
    }
  }
`;