import React, { useState, useEffect } from "react";
import { Modal, Button, Radio, Select, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { createChildren, getAllChildrens } from "../../redux/tree/treeReducer";

const { Option } = Select;

const CreateModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // file or folder
  const [value, setValue] = useState(0);
  // file name
  const [fileName, setFileName] = useState(null);
  // file format
  const [fileFormat, setFileFormat] = useState(null);
  //
  const [key, setKey] = useState(null);
  const dispatch = useDispatch();

  const { childrens, data } = useSelector((state) => state.tree);

  // unique children by id
  const arrayUniqueByKey = [
    ...new Map(childrens.map((item) => [item["id"], item])).values(),
  ];

  // filter data by parent
  function filterRec(t, f) {
    const many = (t = []) => t.flatMap(one);

    const one = (t = {}) =>
      Boolean(f(t)) ? [{ ...t, children: many(t.children) }] : [];

    return many(t);
  }
  const result = filterRec(data, (elem) => elem.parent === 1);
 // recursive of children
  function countDown(fromNumber) {
    fromNumber.forEach((element) => {
      if (element.children) {
        countDown(element.children);
      }
      dispatch(getAllChildrens(element));
    });
  }

  // file or folder handler
  const onChange = (e) => {
    setValue(e.target.value);
  };

    // key handler
  function handleChange(value) {
    setKey(`${value}`);
  }

    // modal handler
  const showModal = () => {
    setIsModalVisible(true);
    countDown(result);
  };

    // modal submit
  const handleOk = async () => {
    setIsModalVisible(false);
    await dispatch(createChildren(data, key, value, fileName, fileFormat));
    setValue(0);
    setKey(null);
    setFileName("");
    setFileFormat(null);
    countDown(result);
  };

  // modal abort
  const handleCancel = () => {
    setIsModalVisible(false);
    setValue(0);
    setKey(null);
    setFileFormat(null);
    setFileName(null);
  };

  useEffect(() => {
    countDown(result);
  }, [data]);

  return (
    <div>
      <Modal
        title="Add Folder/File"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={0}>File</Radio>
            <Radio value={1}>Folder</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Select
            placeholder="Choose Folder"
            value={key && key}
            style={{ width: "250px" }}
            onChange={handleChange}
          >
            {arrayUniqueByKey?.map((item) => (
              <Option key={item.key} value={item.key}>
                {item.title}
              </Option>
            ))}
          </Select>
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <Input
            placeholder={value === 1 ? "Enter Folder Name" : "Enter File Name"}
            value={fileName && fileName}
            style={{ width: "250px" }}
            onChange={(e) => setFileName(e.target.value)}
          />
          {!value && (
            <Select
              placeholder="Choose File"
              value={fileFormat && fileFormat}
              style={{ width: "250px" }}
              onChange={(value) => setFileFormat(value)}
            >
              <Option value="pdf">pdf</Option>
              <Option value="docsx">docsx</Option>
              <Option value="xlax">xlax</Option>
              <Option value="png">png</Option>
              <Option value="txt">txt</Option>
            </Select>
          )}
        </div>
      </Modal>
      <Button onClick={showModal}>Add Folder/File</Button>
    </div>
  );
};

export default CreateModal;
