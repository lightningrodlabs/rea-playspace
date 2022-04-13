
import React, { useEffect, useState } from "react";
import HoloService from "../../../service";
import { TreeNode } from "../../../types/holochain"
import { buildTree } from "../../../utils";


export type ProcessSpecificationListProps = {
  service: HoloService;
}

const ProcessSpecificationList: React.FC<ProcessSpecificationListProps> = ({service}) => {
  const [list, setList] = useState<TreeNode[]>([]);

  const getProcessSpecifications = async () => {
    const result = await service.get_thing('processSpecification');
    const jsTree = buildTree(result.tree, result.tree[0]);
    console.log(jsTree.children);
    setList(jsTree.children);
    //jsTree.children.map((d, i) => console.log(d.val, i));
    // renderList = jsTree.children.map((d, i) => <li key={i}>{d.val}</li>);
  }

  useEffect(()=>{
      getProcessSpecifications()
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

export default ProcessSpecificationList;

