import { SlIconButton } from "@shoelace-style/shoelace/dist/react/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDataStore } from "../data/DataStore";
import { ProcessSpecification } from "valueflows-models";
import Table from "../components/layout/Table";
import { usePath } from "Yaati";
import { Pathed } from "data-providers";
import { Root } from "../data/models/Application/Root";

export type Props = {};

const ProcessSpecifications: React.FC<Props> = () => {
  const store = getDataStore();
  const dataRecords = usePath<'root', Root, Pathed<ProcessSpecification>>('root.processSpecification', store)
  const [datas, setDatas] = useState<Array<Pathed<ProcessSpecification>>>([]);

  useEffect(()=>{
    setDatas(Object.values(dataRecords));
  },[dataRecords]);

  const descriptors = {
    'action': "Actions",
    'name': "Name",
    'notes': "Notes"
  }
  const synthetic = {
    'action': (data: Pathed<ProcessSpecification>) => [`/process-specifications/edit/${data.id}`]
  }
  const decorators = {
    'action': (data: any) => <><Link to={data[0]}>Edit</Link></>
  }

  const RenderObjects = (): JSX.Element => {
    if (datas.length === 0) {
      return(
        <>
          <div>No Process Specifications</div>
        </>
      );
    } else {
      return (
        <Table
          datas={datas}
          fieldDescriptors={descriptors}
          syntheticFields={synthetic}
          fieldDecorators={decorators}>
        </Table>
      );
    }
  }

  return (
    <>
      <div style={{display: "flex"}}>
        <h1>Process Specifications</h1>
        <div style={{paddingTop: "8px"}}>
          <Link to="/process-specifications/new">
            <SlIconButton name="plus-square-fill" label="Settings" />
          </Link>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection:'column'}}>
        <RenderObjects />
      </div>
    </>
  );
}

export default ProcessSpecifications;