import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Button, message, Modal, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { AppContext } from "../../AppContext";
import App from "../../App";
import CourseComponent from "../coursesListComponent";
import SearchByForm from "../search";
import InstructorDashboard from "./InstructorDashboard";

const InstructorFilteredCourses = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;
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
    setIsModalOpen(false);
    const idSearch = window.location.search;
    const urlParams = new URLSearchParams(idSearch);
    const filterType = urlParams.get("filterType");
    if (filterType == "price") {
      const min = urlParams.get("min");
      const max = urlParams.get("max");
      axios
        .get(
          "http://localhost:2020/InstructorFilterByPrice/" +
            userName +
            "/" +
            min +
            "/" +
            max
        )
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => {
          console.log("erorr ", error.message);
          setCourses([]);
        });
    } else {
      const value = urlParams.get("value");
      axios
        .get(
          "http://localhost:2020/instructorFilterCourses/" +
            userName +
            "/" +
            filterType +
            "/" +
            value
        )
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => {
          console.log("erorr ", error.message);
          setCourses([]);
        });
    }
  }, [location]);

  return (
    <InstructorDashboard>
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
      <CourseComponent courses={courses} viewType={"instructor"} />
    </InstructorDashboard>
  );
};

export default InstructorFilteredCourses;
