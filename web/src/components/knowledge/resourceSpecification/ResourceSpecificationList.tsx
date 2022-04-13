import HoloService from "../../../service";
import React, { useEffect, useState } from "react";
import { buildTree } from "../../../utils";
import { TreeNode } from "../../../types/holochain";
import { ResourceSpecification } from "../../../types/valueflows";


export type ResourceSpecificationListProps = {
  service: HoloService;
}

const ResourcesSpecificationList: React.FC<ResourceSpecificationListProps> = ({service}) => {
  const [list, setList] = useState<ResourceSpecification[]>([]);

  const getResourceSpecifications = async () => {
    const result = await service.get_thing('resourceSpecification');
    const jsTree = buildTree(result.tree, result.tree[0]);
    const resources = jsTree.children.map((e) => {
      return JSON.parse(e.val.data) as ResourceSpecification;
    });
    setList(resources);
  }

  useEffect(()=>{
      getResourceSpecifications()
  },[]);
  
  return (
    <>
      <ul>
        {list.map((element,i) => <li key={i}>{element.id}: {element.name}</li>)}
      </ul>
    </>
  );
};

export default ResourcesSpecificationList;

