import React, { useState } from "react";
import { Modal, Button, Radio, Select,Input  } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {createChildren} from '../../redux/tree/treeReducer'

const { Option } = Select;

const CreateModal = ({countDown,result}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // file or folder
  const [value, setValue] = useState(0);
  const [fileName, setFileName] = useState(null);
  const [fileFormat,setFileFormat] = useState(null);
  const [key,setKey] = useState(null);
  const dispatch = useDispatch();

  const { childrens,data } = useSelector((state) => state.tree);

  console.log(childrens)
  const keyy = "id"
  const arrayUniqueByKey = [...new Map(childrens.map(item =>
    [item[keyy], item])).values()];

  const onChange = (e) => {
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
    await dispatch(createChildren(data, key, value,fileName,fileFormat))
    setValue(0);
    setKey(null)
    setFileName("")
    setFileFormat(null)
    countDown(result);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setValue(0);
    setKey(null)
    setFileFormat(null)
    setFileName(null)
  };

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
        <div style={{marginTop:"10px"}}>
          <Select placeholder="Choose Folder" value={key && key} style={{width:"250px"}} onChange={handleChange}>
            {arrayUniqueByKey?.map((item) => <Option key={item.key} value={item.key}>{item.title}</Option>)}
          </Select>
        </div>
        <div style={{display:"flex",marginTop:"10px"}}>
        <Input placeholder={value === 1? "Enter Folder Name" : "Enter File Name"} value={fileName && fileName} style={{width:"250px"}} onChange={(e) => setFileName(e.target.value)} />
        {!value&&<Select placeholder="Choose File" value={fileFormat && fileFormat} style={{width:"250px"}} onChange={(value) => setFileFormat(value)}>
            <Option value="pdf">pdf</Option>
            <Option value="docsx">docsx</Option>
            <Option value="xlax">xlax</Option>
            <Option value="png">png</Option>
            <Option value="txt">txt</Option>
          </Select> }
        </div>
      </Modal>
      <Button onClick={showModal}>Add Folder/File</Button>
    </div>
  );
};

export default CreateModal;
