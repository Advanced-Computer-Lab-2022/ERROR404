import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select } from "antd";
import { Collapse } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import LoadSearchedCourses from "./loadSearchedCoursesComp";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Panel } = Collapse;

const SearchByForm = () => {
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
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        size="middle"
        bordered={true}
        style={{
          maxWidth: "20vw",
        }}
      />{" "}
      {/* <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Collapse defaultActiveKey={["1"]}>
          {console.log(data.length)}
          {data.map((course) => {
            console.log("here");
            return (
              <Panel header={course.title} key={course._id}>
                <p>Title: {course.title}</p>
                <p>Summary: {course.summary}</p>
                <p>Instructor: {course.instructor}</p>
                <p>Price: {course.price}</p>
                <p>rating: {course.rating}</p>
                <p>Total Hours: {course.totalHours}</p>
              </Panel>
            );
          })}
        </Collapse>
      </Modal> */}
    </>
  );
};

export default SearchByForm;
