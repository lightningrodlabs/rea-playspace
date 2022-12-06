import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainPanelHeader from "../components/layout/MainPanelHeader";
import { useNavigate } from "react-router-dom";
import { getDataStore } from "../data/DataStore";
import { usePath } from "yaati";
import { Root } from "../data/models/Application/Root";
import { Pathed } from "data-providers";
import { Plan } from "valueflows-models";
import Table from "../components/layout/Table";

export type HomeProps = {}

const Home: React.FC<HomeProps> = () => {
  const store = getDataStore();
  const dataRecords = usePath<'root', Root, Pathed<Plan>>('root.plan', store);
  const [datas, setDatas] = useState<Array<Pathed<Plan>>>([]);

  useEffect(()=>{
    setDatas(Object.values(dataRecords));
  },[dataRecords]);

  const descriptors = {
    'action': "Available Plans"
  }
  const synthetic = {
    'action': (data: Pathed<Plan>) => [`/plans/edit/${data.id}`, data.name]
  }
  const decorators = {
    'action': (data: any) => <><Link to={data[0]}>{data[1]}</Link></>
  }

  const RenderPlans= (): JSX.Element => {
    if (datas.length === 0) {
      return(
        <>
          <div>No Plans</div>
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

  const navigate = useNavigate();

  return (
    <>
      <MainPanelHeader>
        <h1>Welcome to the REA Playspace</h1>
      </MainPanelHeader>
      <p>
        To get started, you should create some <Link to={"agents"}>Agents</Link>, <Link to={"resource-specifications"}>Resource Specifications</Link>, <Link to={"process-specifications"}>Process Specifications</Link>.
        After you have those basic necessities, make a <Link to={"plans"}>Plan</Link> or two.
      </p>
      <hr />
      <p>
        <RenderPlans />
      </p>
    </>
  );
};

export default Home;
