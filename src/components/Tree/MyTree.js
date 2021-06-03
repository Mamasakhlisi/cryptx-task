import React, { useState, useEffect } from "react";
import { Tree } from "antd";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { useSelector, useDispatch } from "react-redux";
import CreateModal from "./CreateModal";
const { DirectoryTree } = Tree;

const MyTree = () => {
  const [key, setKey] = useState("");

  const { data } = useSelector((state) => state.tree);

  const keyy = "id";
  const arrayUniqueByKey = [
    ...new Map(data.map((item) => [item[keyy], item])).values(),
  ];


  return (
    <div>
      <CreateModal />
      <DirectoryTree
        multiple
        defaultExpandAll
        treeData={arrayUniqueByKey}
        titleRender={(node) => (
          <ContextMenuTrigger id={`${parseInt(node.title.length)}`}>
          <span onContextMenu={(e) => setKey(parseInt(node.title.length))}>{node.title}</span>
          </ContextMenuTrigger>
        )}
      />
      <ContextMenu id={`${key}`} className="menu">
        <MenuItem
        					className="menuItem"
          data={{ foo: "bar" }}
          onClick={(e) => console.log(e)}
        ><button>Edit</button></MenuItem>
      </ContextMenu>
    </div>
  );
};

export default MyTree;
