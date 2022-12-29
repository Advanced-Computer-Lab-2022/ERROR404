import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select, Card, Rate, Tooltip } from "antd";
import { Collapse } from "antd";
import App from "../App";
import { FilterOutlined } from "@ant-design/icons";
import SearchByForm from "./getCourses";
import CourseComponent from "./coursesListComponent";
import TopCourses from "./topCourses";

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
        console.log("dataaaaa ", response.data);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
      });
  }, []);

  const [form] = Form.useForm();
  const onFinish = async (event) => {
    console.log(" => ", event);
    console.log(event);
  };

  return (
    <>
      <CourseComponent courses={data} viewType="view" />
    </>
  );
};

export default ViewAllCoursesWrapper;
