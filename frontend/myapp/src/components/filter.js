import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import App from "../App";
import { Button, message, Modal, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import CourseComponent from "./coursesListComponent";
import SearchByForm from "./getCourses";
const Filter = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  let location = useLocation();

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
    const idSearch = window.location.search;
    const urlParams = new URLSearchParams(idSearch);
    const filterType = urlParams.get("filterType");
    const value = urlParams.get("value");
    axios
      .get("http://localhost:2020/filter/" + filterType + "/" + value)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        message.error(error.response.data, 3);
        console.log("erorr ", error.message);
        setCourses([]);
      });
  }, [location]);

  return (
    <App>
      <Tooltip title="search">
        <Button
          type="primary"
          shape="circle"
          icon={<FilterOutlined />}
          onClick={showModal}
        />
      </Tooltip>
      <Modal
        title="Filter"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <SearchByForm />
      </Modal>
      <CourseComponent courses={courses} />
    </App>
  );
};

export default Filter;
