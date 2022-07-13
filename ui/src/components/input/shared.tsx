import { SlInput } from "@shoelace-style/shoelace/dist/react";

export const inputOrOutputOf = (inputOf: string, outputOf: string) => {
  if (inputOf) {
    return (<>
      <SlInput disabled label="Input of" name="inputOf" value={inputOf}></SlInput>
      <br />
    </>)
  } else if (outputOf) {
    return (<>
      <SlInput disabled label="Output of" name="outputOf" value={outputOf}></SlInput>
      <br />
    </>)
  } else {
    return (<></>)
  }
};
