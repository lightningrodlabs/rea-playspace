import HoloService from "../../../service";
import React, { useEffect, useState } from "react";
import { ResourceSpecification } from "../../../types/valueflows";
import { buildTree } from "../../../utils";
import { TreeNode } from "../../../types/holochain";


export type ResourceSpecificationListProps = {
  service: HoloService;
}

const ResourcesSpecificationList: React.FC<ResourceSpecificationListProps> = ({service}) => {
  const [list, setList] = useState<TreeNode[]>([]);

  const getResourceSpecifications = async () => {
    const result = await service.get_thing('resourceSpecification');
    const jsTree = buildTree(result.tree, result.tree[0]);
    console.log(jsTree.children);
    setList(jsTree.children);
    //jsTree.children.map((d, i) => console.log(d.val, i));
    // renderList = jsTree.children.map((d, i) => <li key={i}>{d.val}</li>);
  }

  useEffect(()=>{
      getResourceSpecifications()
  },[]);

  // console.log('rl', renderList)

  const renderList = () => {
    if (list.length > 0) {
      const render = list.map((d, i) => {
        return (<li key={i}>{d.val}</li>)
        })
      return render;
    }
    return (<p>Loading...</p>)
  }
  
  return (
    <>
      <ul>
        {list.map((child,i) => <li key={i}>{child.val.name}</li>)}
      </ul>
    </>
  );
};

export default ResourcesSpecificationList;

