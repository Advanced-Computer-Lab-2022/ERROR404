import InstructorDashboard from "./InstructorDashboard";
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, Card, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { Avatar, List, Space, Rate } from "antd";
import { AppContext } from "../../AppContext";
import { SearchOutlined } from "@ant-design/icons";
import CourseComponent from "../coursesListComponent";
import InstructorFilter from "./instructorFilterCourses";
import InstructorSearchBar from "./instructorSearch";

const InstructorViewAllTitlesWrapper = () => {
  const { userMongoId } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [userId, setUserId] = userMongoId;
  const [neverChangedCourses, setNeverCourses] = useState([]);
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
        setNeverCourses(data);
      });
  }, []);

  const values = {
    coursesData: [courses, setCourses],
    originalData: [neverChangedCourses, setNeverCourses],
  };
  return (
    <InstructorDashboard>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title="Filter">
          <Button
            type="primary"
            shape="round"
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
          <InstructorFilter />
        </Modal>
        <InstructorSearchBar data={values} />
      </div>

      <CourseComponent courses={courses} viewType="instructor" />
    </InstructorDashboard>
  );
};

export default InstructorViewAllTitlesWrapper;
