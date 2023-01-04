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
  const { userMongoId, username } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [userId, setUserId] = userMongoId;
  const [userName, setUserName] = username;
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
    fetch("http://localhost:2020/instViewCourses/" + userName)
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
      <CourseComponent courses={courses} viewType="instructor" />
    </InstructorDashboard>
  );
};

export default InstructorViewAllTitlesWrapper;
