import React from "react";
import {
  SlButton,
  SlButtonGroup,
  SlCard,
  SlCheckbox,
  SlIcon,
  SlInput,
} from "@shoelace-style/shoelace/dist/react";
import ResourceListTableItem from "./knowledge/ResourceSpecificationListTableItem";
import useEconomicResources from "./hooks/useEconomicResources";

export type EconomicResourceListProps = {
  myAgentId: string;
};

const EconomicResourceList: React.FC<EconomicResourceListProps> = ({
  myAgentId,
}) => {
  const { data, loading, error } = useEconomicResources();
  if (loading) return <div>Listing economic resources...</div>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  return (
    <SlCard className="resource-list">
      {/* Header */}
      <div className="resource-list-header">
        <SlInput placeholder="Search..." clearable>
          <SlIcon name="search" slot="prefix"></SlIcon>
        </SlInput>
        <SlButtonGroup>
          <SlButton>
            <SlIcon name="filter-circle" slot="prefix"></SlIcon>
            Filter
          </SlButton>
          <SlButton>
            <SlIcon name="sort-down" slot="prefix"></SlIcon>Sort
          </SlButton>
        </SlButtonGroup>
      </div>

      <div className="resource-list-table">
        <div className="resource-list-table-header">
          {/* Checkbox */}
          <div>
            <SlCheckbox></SlCheckbox>
          </div>
          {/* Image */}
          <div></div>
          {/* Name */}
          <div>Resource</div>
          {/* Type */}
          {/* <div>Type</div> */}

          {/* Agent */}
          <div>Agent</div>

          {/* Measure */}
          <div>Measure</div>
        </div>
        {data.map((resource: any) => (
          <ResourceListTableItem
            key={resource.id}
            resource={resource}
            myAgentId={myAgentId}
          />
        ))}
      </div>
    </SlCard>
  );
};

export default EconomicResourceList;