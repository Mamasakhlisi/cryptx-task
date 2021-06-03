import React, { useState } from "react";
import { Modal, Button, Radio, Select,Input  } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {createChildren} from '../../redux/tree/treeReducer'

const { Option } = Select;

const CreateModal = ({countDown,result}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(1);
  const [key,setKey] = useState("");
  const dispatch = useDispatch();

  const { childrens,data } = useSelector((state) => state.tree);

  const keyy = "id"
  const arrayUniqueByKey = [...new Map(childrens.map(item =>
    [item[keyy], item])).values()];

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  function handleChange(value) {
    setKey(`${value}`)
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    await dispatch(createChildren(data, key, 1))
    countDown(result);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>File</Radio>
            <Radio value={2}>Folder</Radio>
          </Radio.Group>
        </div>
        <div style={{marginTop:"10px"}}>
          <Select defaultValue="Choose Folder" style={{width:"250px"}} onChange={handleChange}>
            {arrayUniqueByKey?.map((item) => <Option key={item.key} value={item.key}>{item.title}</Option>)}
          </Select>
        </div>
        <div style={{display:"flex",marginTop:"10px"}}>
        <Input placeholder="Enter File Name" style={{width:"250px"}} />
        <Select defaultValue="Choose File" style={{width:"250px"}}>
            <Option value="lucy">Parent Folder</Option>
          </Select>
        </div>
      </Modal>
      <Button onClick={showModal}>Add Folder/File</Button>
    </div>
  );
};

export default CreateModal;
