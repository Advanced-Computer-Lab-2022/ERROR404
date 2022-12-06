import InstructorDashboard from "../../pages/InstructorDashboard";
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, Card, Tooltip } from "antd";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Avatar, List, Space, Rate } from "antd";
import { AppContext } from "../../AppContext";
import { SearchOutlined } from "@ant-design/icons";
import CourseComponent from "../coursesListComponent";
import InstructorFilter from "./instructorFilterCourses";

const InstructorViewAllTitlesWrapper = () => {
  const { userMongoId } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [userId, setUserId] = userMongoId;
  const [courses, setCourses] = useState([]);
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
    fetch("http://localhost:2020/instViewCourses/abdelrahman")
      .then((responce) => responce.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
      });
  }, []);
  return (
    <InstructorDashboard>
      <Tooltip title="Filter">
        <Button
          type="primary"
          shape="round"
          icon={<SearchOutlined />}
          onClick={showModal}
        />
      </Tooltip>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InstructorFilter />
      </Modal>
      <CourseComponent courses={courses} viewType="instructor" />
    </InstructorDashboard>
  );
};

export default InstructorViewAllTitlesWrapper;
