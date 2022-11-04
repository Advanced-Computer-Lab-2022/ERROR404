import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select, Card, Rate, Tooltip } from "antd";
import { Collapse } from "antd";
import App from "../App";
import { FilterOutlined } from "@ant-design/icons";
import SearchByForm from "./getCourses";
const { Option } = Select;

const { Panel } = Collapse;

const ViewAllCoursesWrapper = () => {
  return (
    <App>
      <ViewAllCourses />
    </App>
  );
};

const ViewAllCourses = () => {
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    axios({
      method: "get",
      url: "http://localhost:2020/viewCourses ",
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
      });
  }, []);

  const [form] = Form.useForm();
  const onFinish = async (event) => {
    console.log(" => ", event);
    console.log(event);

    await ViewAllCourses();
  };

  return (
    <>
      <Tooltip title="search">
        <Button
          type="primary"
          shape="circle"
          icon={<FilterOutlined />}
          onClick={showModal}
        />
      </Tooltip>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <SearchByForm />
      </Modal>

      {console.log(data.length)}
      {data.map((course) => {
        console.log("here");
        return (
          <Card
            title={course.title}
            bordered={true}
            key={course._id}
            style={{ width: "100%" }}
          >
            <p>Title: {course.title}</p>
            <p>Summary: {course.summary}</p>
            <p>Instructor: {course.instructor}</p>
            <p>Price: {course.price}</p>
            <p>Total Hours: {course.totalHours}</p>
            <p>Subject: {course.subject}</p>
            <Rate allowHalf defaultValue={course.rating} disabled={true} />
          </Card>
        );
      })}
    </>
  );
};

export default ViewAllCoursesWrapper;
