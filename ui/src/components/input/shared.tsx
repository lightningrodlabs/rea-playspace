import { SlInput } from "@shoelace-style/shoelace/dist/react";
import getDatastore  from "../../data/DataStore";

export const inputOrOutputOf = (inputOf: string, outputOf: string) => {
  const store = getDatastore();
  if (inputOf) {
    const input = store.getById(inputOf);
    return (<>
      <SlInput disabled label="Input to process" name="inputOf" value={input.name}></SlInput>
      <br />
    </>)
  } else if (outputOf) {
    const output = store.getById(outputOf);
    return (<>
      <SlInput disabled label="Output from process" name="outputOf" value={output.name}></SlInput>
      <br />
    </>)
  } else {
    return (<></>)
  }
};
