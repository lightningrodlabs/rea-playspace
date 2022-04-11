import React from "react";
import { SlButton, SlCard, SlInput } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import MainPanelHeader from "../layout/MainPanelHeader";

export type NewResourceSpecificationProps = {}

const NewResourceSpecification: React.FC<NewResourceSpecificationProps> = () => {
  return (
    <>
      <MainPanelHeader>
        <h2>New Resource Specification</h2>
        <Link to="/resources">
          <SlButton variant="primary">View Resources</SlButton>
        </Link>
      </MainPanelHeader>
      <SlCard className="create-resource">
      <form >
        {/* make sure its a number, using + */}
        <br />
        <SlInput
          required
          label="Name"
          // @ts-ignore
          onSlChange={(e) => setResourceName(e.target.value)}
          
        />
        <br />
        <SlInput
          required
          type="number"
          label="Initial Balance"
          // @ts-ignore
          onSlChange={(e) => setQuantity(+e.target.value)}
          
        />
        {/* TODO: specify units here optionally */}
        <br />
        <SlInput
          required
          label="Image"
          // @ts-ignore
          onSlChange={(e) => setImage(e.target.value)}
         
        />
        <br />
        <SlButton type="submit" variant="primary">
          Create
        </SlButton>
      </form>
    </SlCard>
    </>
  );
};

export default NewResourceSpecification;