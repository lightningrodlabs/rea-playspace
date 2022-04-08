import React, { useState } from "react";
import {
  SlButton,
  SlCheckbox,
  SlDropdown,
  SlIconButton,
  SlInput,
  SlMenu,
  SlMenuItem,
} from "@shoelace-style/shoelace/dist/react";

export type ResourceListTableItemProps = {
  resource: any;
  myAgentId: string;
};

const ResourceListTableItem: React.FC<ResourceListTableItemProps> = ({
  resource,
  myAgentId,
}) => {
  //const [callAdjust, mutationStatus] = useMutation(UPDATE_ECONOMIC_RESOURCES);
  // for tracking the persisted value
  const [originalQuantity, setOriginalQuantity] = useState(
    +resource.accountingQuantity.hasNumericalValue
  );

  // for adjusting
  const [quantityAbsolute, setQuantityAbsolute] = useState(
    +resource.accountingQuantity.hasNumericalValue
  );
  const [quantityAdjustment, setQuantityAdjustment] = useState(0);

  //
  const update = async () => {
    // await callAdjust({
    //   variables: {
    //     event: {
    //       action: quantityAdjustment > 0 ? "raise" : "lower",
    //       provider: myAgentId,
    //       receiver: myAgentId,
    //       resourceQuantity: { hasNumericalValue: Math.abs(quantityAdjustment) },
    //       resourceInventoriedAs: resource.id,
    //       hasPointInTime: new Date(),
    //     },
    //   },
    // });
    // update original, so that the save button hides
    setOriginalQuantity(quantityAbsolute);
  };

  return (
    <div className="resource-list-table-item">
      {/* Checkbox */}
      <div>
        <SlCheckbox></SlCheckbox>
      </div>

      {/* Image */}
      <div>
        <img alt="test" title={resource.image} src={resource.image} />
      </div>

      {/* Resource Name */}
      <div className="resource-list-resource-name">
        {/* HACK: todo, fix once name is added */}
        {resource.note}
      </div>

      {/* Note */}
      {/* <div>{edge.node.conformsTo.note}</div> */}

      {/* Agent */}
      <div>{resource.primaryAccountable.slice(0, 8)}...</div>

      {/* Quantity */}
      <div>
        <div className="resource-list-resource-quantity">
          <SlInput
            value={quantityAbsolute.toString()}
            onSlInput={(e) => {
              // @ts-ignore (numeric)
              const absolute = +e.target.value
              const adjustment = absolute - originalQuantity
              setQuantityAbsolute(absolute)
              setQuantityAdjustment(adjustment)
            }}
          ></SlInput>
        </div>
        <SlDropdown>
          <SlIconButton slot="trigger" name="sliders"></SlIconButton>
          <SlMenu>
            <SlMenuItem disabled>
              <SlInput
                label="Adjust by"
                type="number"
                value={quantityAdjustment.toString()}
                onSlInput={(e) => {
                  // @ts-ignore (numeric)
                  const adjustment = +e.target.value;
                  setQuantityAbsolute(originalQuantity + adjustment);
                  setQuantityAdjustment(adjustment);
                }}
              ></SlInput>
            </SlMenuItem>
          </SlMenu>
        </SlDropdown>

        {/* Save Button */}
        {originalQuantity !== quantityAbsolute && (
          <SlButton variant="primary" onClick={update}>
            Save
          </SlButton>
        )}
      </div>
    </div>
  );
};

export default ResourceListTableItem;