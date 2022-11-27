import { SlInput } from "@shoelace-style/shoelace/dist/react";
import { Process } from "valueflows-models";
import { getDataStore } from "../../data/DataStore";

export const inputOrOutputOf = (inputOf: string, outputOf: string) => {
  const store = getDataStore();
  if (inputOf) {
    const input = store.getById<Process>(inputOf);
    return (<>
      <SlInput disabled label="Input to process" name="inputOf" value={input.name}></SlInput>
      <br />
    </>)
  } else if (outputOf) {
    const output = store.getById<Process>(outputOf);
    return (<>
      <SlInput disabled label="Output from process" name="outputOf" value={output.name}></SlInput>
      <br />
    </>)
  } else {
    return (<></>)
  }
};
