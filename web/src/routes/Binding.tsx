import React, { useState } from "react";
import HoloService from "../service";
import { AddOutput, Content, ThingInput, Tree } from "../types/holochain";

interface Props {
  service: HoloService
}

const Binding: React.FC<Props> = ({service}) => {
  const [putResponse, setPutResponse] = useState<AddOutput>();
  const [getResponse, setGetResponse] = useState<Tree<Content>>();
  const [pathInput, setPathInput] = useState('');

  const put_thing = async () => {
    const thing: ThingInput = {
      path: 'some.path',
      data: 'some data'
    };

    setPutResponse(await service.put_thing(thing));
  }

  const get_thing = async () => {
    if (putResponse) {
      setGetResponse(await service.get_thing(pathInput));
    } else {
      console.log(`${pathInput} doesnt exist.`);
    }
  }

  const handleChange = (event) => {
    setPathInput(event.target.value);
  }

  const handleSubmit = async (event) => {
    console.log('A path was submitted: ' + pathInput);
    event.preventDefault();
    await get_thing();
  }

  const PutResponse = () => {
    if (putResponse === undefined) {
      return (<p>Press button to do a thing</p>);
    }
    return (
      <>
        <h1>Initial Thing</h1>
        <p>header:{putResponse.header_hash} entry:{putResponse.entry_hash}</p>
      </>
    );
  }

  // const GetResponse = () => {

  //   // function get_nodes() {
  //   //   const nodes: Node<>[];
  //   //   getResponse.tree
  //   // }


  //   return (
  //     <>
  //       <form>
  //         <label>
  //           Path:
  //           <input type="text" value={pathInput} onChange={handleChange}/>
  //         </label>
  //         <input type="submit" value="Submit" onClick={handleSubmit} />
  //       </form>
  //       <h1>Get Thing</h1>
  //       {getResponse? <p>{getResponse.tree[0]}</p> : <p>Put a thing before you can get a thing!</p>}
  //     </>
  //   );
  // }

  return(
    <div>
      <div style={{border: "1px black solid", padding: "5px", margin: "5px"}}>
        <button onClick={put_thing}>Put Thing</button>
        <PutResponse />
      </div>
      <div style={{border: "1px black solid", padding: "5px", margin: "5px"}}>

      {/* <GetResponse /> */}
      </div>
    </div>
  )
}

export default Binding;