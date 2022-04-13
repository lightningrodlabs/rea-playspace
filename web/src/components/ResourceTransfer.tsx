import {
  SlButton,
  SlCard,
  SlInput,
  SlMenuItem,
  SlSelect,
} from "@shoelace-style/shoelace/dist/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainPanelHeader from "./layout/MainPanelHeader";
import useEconomicResources from "../hooks/useEconomicResources";

export type ResourceTransferProps = {
  myAgentId: string;
};

const VALUE_SEPARATOR = "__SEPARATOR__";

export type ResourceListProps = {
  econResources: any[];
};
const ResourceList: React.FC<ResourceListProps> = ({ econResources }) => {
  return (
    <>
      {econResources.map((eR: any) => {
        const value = `${eR.primaryAccountable}${VALUE_SEPARATOR}${eR.id}`;
        return (
          <SlMenuItem key={value} value={value} className="resource-select-menu-item">
            {/* TODO: fix this to name, when possible */}
            {eR.note}
            <div slot="suffix">{eR.accountingQuantity.hasNumericalValue}</div>
          </SlMenuItem>
        );
      })}
    </>
  );
};

const ResourceTransfer: React.FC<ResourceTransferProps> = ({ myAgentId }) => {
  const navigate = useNavigate();
  //const [createEE, createEEmutationStatus] = useMutation(CREATE_ECONOMIC_EVENT);
  const econResources = useEconomicResources();

  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [quantity, setQuantity] = useState();

  // if (createEEmutationStatus.loading)
  //   return <div>Creating economic resource...</div>;
  // if (createEEmutationStatus.error) return <p>ERROR</p>;

  const create = async () => {
    if (!from || !to || typeof quantity === "undefined") {
      return;
    }
    const [fromAgentId, fromResourceId] = from.split(VALUE_SEPARATOR);
    const [toAgentId, toResourceId] = to.split(VALUE_SEPARATOR);
    // await createEE({
    //   variables: {
    //     event: {
    //       action: "transfer",
    //       provider: fromAgentId,
    //       receiver: toAgentId,
    //       resourceInventoriedAs: fromResourceId,
    //       toResourceInventoriedAs: toResourceId,
    //       resourceQuantity: { hasNumericalValue: quantity },
    //       // resourceClassifiedAs: "https://something",
    //       hasPointInTime: new Date(),
    //     },
    //   },
    // });
    navigate("/resources");
    window.location.reload();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    create();
  };

  return (
    <>
      <MainPanelHeader>
        <h2>Transfer Resources</h2>
        <div>
          <Link to="/resources">
            <SlButton variant="primary">View Resources</SlButton>
          </Link>
        </div>
      </MainPanelHeader>

      {/* The Form */}
      <SlCard className="create-resource">
        {econResources.loading && <>Loading...</>}
        {!econResources.loading && !econResources.error && (
          <form onSubmit={handleSubmit}>
            <SlSelect
              // required
              label="From"
              onSlChange={(e) => {
                // @ts-ignore
                console.log(e.target.value);
                // @ts-ignore
                setFrom(e.target.value);
              }}
            >

            </SlSelect>
            <br />
            <SlSelect
              // required
              label="To"
              // @ts-ignore
              onSlChange={(e) => setTo(e.target.value)}
            >
              {econResources.data && (
                <ResourceList econResources={econResources.data} />
              )}
            </SlSelect>
            <br />
            <SlInput
              required
              type="number"
              label="Amount"
              // @ts-ignore
              onSlChange={(e) => setQuantity(+e.target.value)}
              // @ts-ignore
              value={quantity ? quantity.toString() : ""}
            />
            {/* TODO: specify units here optionally */}
            <br />
            <SlButton type="submit" variant="primary">
              Transfer
            </SlButton>
          </form>
        )}
      </SlCard>
    </>
  );
};

export default ResourceTransfer;