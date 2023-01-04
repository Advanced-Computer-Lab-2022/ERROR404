import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select } from "antd";
import { Collapse } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import LoadSearchedCourses from "./loadSearchedCoursesComp";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Panel } = Collapse;

const SearchBar = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("data =>  ", data);
  }, [data]);

  const [form] = Form.useForm();
  const onSearch = async (event) => {
    console.log(" => ", event);
    navigate("/searchedItems?value=" + event);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Search
        placeholder="Search........."
        onSearch={onSearch}
        enterButton
        size="middle"
        bordered={true}
        style={{
          width: "60%",
        }}
      />{" "}
      <Button
        type="link"
        onClick={() => {
          navigate("/viewAllCourses");
        }}
      >
        clear search
      </Button>
    </>
  );
};

export default SearchBar;
