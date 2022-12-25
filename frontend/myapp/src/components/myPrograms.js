import React, { useContext, useEffect, useState } from "react";
import App from "../App";
import { Breadcrumb, Layout, Menu, Image, Empty } from "antd";
import { AppContext } from "../AppContext";
import axios from "axios";
import CourseComponent from "./coursesListComponent";
const { Header, Footer, Sider, Content } = Layout;

const MyProgrmas = () => {
  const { username, userType } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [usertype, setUserType] = userType;
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:2020/getMyCourses/${usertype}/${userName}`)
      .then((response) => {
        setCourses(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log("error at getting user");
      });
  }, []);
  return (
    <App>
      <CourseComponent courses={courses} viewType="My Programs" />
    </App>
  );
};

export default MyProgrmas;