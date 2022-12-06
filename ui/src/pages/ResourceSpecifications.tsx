import { SlIconButton } from "@shoelace-style/shoelace/dist/react/index";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDataStore } from "../data/DataStore";
import { ResourceSpecification, Unit } from "valueflows-models";
import Table from "../components/layout/Table";
import { usePath } from "yaati";
import { Pathed } from "data-providers";
import { Root } from "../data/models/Application/Root";

export type Props = {};

const ResourceSpecifications: React.FC<Props> = () => {
  const store = getDataStore();
  const dataRecords = usePath<'root', Root, Pathed<ResourceSpecification>>('root.resourceSpecification', store)
  const unitRecords = usePath<'root', Root, Pathed<Unit>>('root.unit', store)
  const [datas, setDatas] = useState<Array<Pathed<ResourceSpecification>>>([]);

  useEffect(()=>{
    setDatas(Object.values(dataRecords));
  },[dataRecords]);

  const fieldDescriptors = {
    'action': "",
    'name': "Name",
    'defaultUnitOfResource': "Default Unit of Resource",
    'defaultUnitOfEffort': "Default Unit of Effort",
    'notes': "Notes"
  }
  const synthetic = {
    'action': (data: Pathed<ResourceSpecification>) => [`/resource-specifications/edit/${data.id}`]
  }
  const decorators = {
    'action': (data: any) => <><Link to={data[0]}>Edit</Link></>,
    'defaultUnitOfResource': (data: any) => {
      if(data) {
        const unit: Unit = unitRecords[data];
        return <>{unit.name}</>
      } else {
        return <></>
      }
    }
  }

  const RenderObjects = (): JSX.Element => {
    if (datas.length === 0) {
      return(
        <>
          <div>No Resource Specifications</div>
        </>
      );
    } else {
      return (
        <Table
          datas={datas}
          fieldDescriptors={fieldDescriptors}
          syntheticFields={synthetic}
          fieldDecorators={decorators}>
        </Table>
      );
    }
  }

  return (
    <>
      <div style={{display: "flex"}}>
        <h1>Resource Specifications</h1>
        <div style={{paddingTop: "8px"}}>
          <Link to="/resource-specifications/new">
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

export default ResourceSpecifications;