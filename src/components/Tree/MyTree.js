import React, { useState, useEffect } from "react";
import { Tree } from "antd";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { getAllChildrens } from "../../redux/tree/treeReducer";
import { useSelector, useDispatch } from "react-redux";
const { DirectoryTree } = Tree;

const MyTree = () => {
  const [key, setKey] = useState("");
  const dispatch = useDispatch();
  const { data, childrens } = useSelector((state) => state.tree);

  const onSelect = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand = () => {
    console.log("Trigger Expand");
  };

  function filterRec(t, f) {
    const many = (t = []) => t.flatMap(one);

    const one = (t = {}) =>
      Boolean(f(t)) ? [{ ...t, children: many(t.children) }] : [];

    return many(t);
  }
  const result = filterRec(data, (elem) => elem.parent === 1);

  function countDown(fromNumber) {
    fromNumber.forEach((element) => {
      if (element.children) {
        countDown(element.children);
      }
      dispatch(getAllChildrens(element));
    });
  }

  useEffect(() => {
    countDown(result);
  }, []);
  return (
    <div>
      <DirectoryTree
        multiple
        draggable
        onDrop={(event) => console.log(event)}
        defaultExpandAll
        onSelect={onSelect}
        onExpand={onExpand}
        treeData={data}
        titleRender={(node) => (
          <ContextMenuTrigger id={node.key}>
            <span onContextMenu={(e) => setKey(node.key)}>{node.title}</span>
          </ContextMenuTrigger>
        )}
      />
      <ContextMenu id={key}>
        <MenuItem
          data={{ foo: "bar" }}
          onClick={(e) => console.log(e)}
        ></MenuItem>
      </ContextMenu>
    </div>
  );
};

export default MyTree;
