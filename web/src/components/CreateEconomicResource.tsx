import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SlButton, SlCard, SlInput } from "@shoelace-style/shoelace/dist/react";
import { useNavigate } from "react-router-dom";

export type CreateEconomicResourceProps = {
  myAgentId: string;
  setCurrentNodeName: React.Dispatch<React.SetStateAction<string | undefined>>;
  closeModal: () => void;
};

const CreateEconomicResource: React.FC<CreateEconomicResourceProps> = ({
  myAgentId, setCurrentNodeName, closeModal
}) => {
  const navigate = useNavigate();


  const [image, setImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [resourceName, setResourceName] = useState("");

  if (createERmutationStatus.loading)
    return <div>Creating economic resource...</div>;
  if (createERmutationStatus.error) return <p>ERROR</p>;

  const create = async () => {
    await createER({
      variables: {
        event: {
          action: "raise",
          provider: myAgentId,
          receiver: myAgentId,
          resourceQuantity: { hasNumericalValue: quantity },
          resourceClassifiedAs: "https://something",
          hasPointInTime: new Date(),
        },
        newInventoriedResource: {
          // TODO: remove this hack
          // once `name` exists
          note: resourceName,
          image: image,
        },
      },
    });
    setCurrentNodeName(resourceName);
    closeModal();
    // navigate("/resources");
    // window.location.reload();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (resourceName && image && typeof quantity !== "undefined") {
      create();

    }
  };

  return (
    <SlCard className="create-resource">
      <form onSubmit={handleSubmit}>
        {/* make sure its a number, using + */}
        <br />
        <SlInput
          required
          label="Resource Name"
          // @ts-ignore
          onSlChange={(e) => setResourceName(e.target.value)}
          value={resourceName}
        />
        <br />
        <SlInput
          required
          type="number"
          label="Initial Balance"
          // @ts-ignore
          onSlChange={(e) => setQuantity(+e.target.value)}
          value={quantity.toString()}
        />
        {/* TODO: specify units here optionally */}
        <br />
        <SlInput
          required
          label="Image"
          // @ts-ignore
          onSlChange={(e) => setImage(e.target.value)}
          value={image}
        />
        <br />
        <SlButton type="submit" variant="primary">
          Create
        </SlButton>
      </form>
    </SlCard>
  );
};

export default CreateEconomicResource;