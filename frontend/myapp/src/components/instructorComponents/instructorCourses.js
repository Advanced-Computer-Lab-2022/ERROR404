import InstructorDashboard from "../../pages/InstructorDashboard";
import React, { useContext, useEffect, useState } from "react";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Avatar, List, Space, Rate } from "antd";
import { AppContext } from "../../AppContext";
import CourseComponent from "../coursesListComponent";

const InstructorViewAllTitlesWrapper = () => {
  const { userMongoId } = useContext(AppContext);
  const [userId, setUserId] = userMongoId;
  const [courses, setCourses] = useState([]);

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
      <CourseComponent courses={courses} viewType="instructor" />
    </InstructorDashboard>
  );
};

export default InstructorViewAllTitlesWrapper;
