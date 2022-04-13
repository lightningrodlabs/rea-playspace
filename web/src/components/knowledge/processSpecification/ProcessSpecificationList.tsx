
import React, { useEffect, useState } from "react";
import HoloService from "../../../service";
import { TreeNode } from "../../../types/holochain"
import { ProcessSpecification } from "../../../types/valueflows";
import { buildTree } from "../../../utils";


export type ProcessSpecificationListProps = {
  service: HoloService;
}

const ProcessSpecificationList: React.FC<ProcessSpecificationListProps> = ({service}) => {
  const [list, setList] = useState<ProcessSpecification[]>([]);

  const getProcessSpecifications = async () => {
    const result = await service.get_thing('processSpecification');
    const jsTree = buildTree(result.tree, result.tree[0]);
    const resources = jsTree.children.map((e) => {
      return JSON.parse(e.val.data) as ProcessSpecification;
    });
    setList(resources);
  }

  useEffect(()=>{
      getProcessSpecifications()
  },[]);

  return (
    <>
      <ul>
        {list.map((element,i) => <li key={i}>{element.id}: {element.name}</li>)}
      </ul>
    </>
  );
};

export default ProcessSpecificationList;

