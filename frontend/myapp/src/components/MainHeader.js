import { Layout, Image, Menu, Input, Popover, Button, Avatar } from "antd";
import React, { useState, useContext } from "react";
import SearchByForm from "./search";
import { Link } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import SchoolIcon from "@mui/icons-material/School";
import { AppContext } from "../AppContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BugReportIcon from "@mui/icons-material/BugReport";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MainHeader = ({ values }) => {
  const { userType, username } = useContext(AppContext);
  const [user, setUser] = userType;
  const [userName, setUserName] = username;
  const [isModalOpen, setIsModalOpen] = values;

  const [current, setCurrent] = useState("mail");
  let items = [];

  if (user == "instructor") {
    items = [
      {
        label: (
          <Link to="/">
            <HomeOutlined />
          </Link>
        ),
        key: "home",
      }, // remember to pass the key prop
      {
        label: <Link to="/viewAllCourses">Explore All Courses</Link>,
        key: "explore",
      },
      {
        label: (
          <Popover content={userName}>
            <Avatar size="medium" icon={<UserOutlined />} />
          </Popover>
        ),
        key: "user",
      },
    ];
  } else if (user == "individual") {
    items = [
      {
        label: (
          <Link to="/">
            <HomeOutlined />
          </Link>
        ),
        key: "home",
      }, // remember to pass the key prop
      {
        label: <Link to="/viewAllCourses">Explore All Courses</Link>,
        key: "explore",
      },
      { label: <Link to="/viewMyGrades">My Grades</Link>, key: "grades" }, // which is required
      {
        label: (
          <Link to="/user/classroom">
            <Button ghost>My Classroom</Button>
          </Link>
        ),
        key: "myClassroom",
      },
      {
        label: (
          <Popover content={userName}>
            <Avatar size="medium" icon={<UserOutlined />} />
          </Popover>
        ),
        key: "user",
      },
    ];
  } else if (user == "admin") {
    items = [
      getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
      getItem(
        <Link to="/adminDashboard">My Dashboard</Link>,
        "3",
        <AdminPanelSettingsIcon />
      ),
      getItem(
        <Link to="/adminDashboard/reports">All Reports</Link>,
        "2",
        <BugReportIcon />
      ),
    ];
  } else {
    items = [
      {
        label: (
          <Link to="/">
            <HomeOutlined />
          </Link>
        ),
        key: "home",
      }, // remember to pass the key prop

      {
        label: <Link to="/viewAllCourses">Explore All Courses</Link>,
        key: "explore",
      },
      {
        label: (
          <Button
            type="link"
            style={{
              color: "white",
            }}
          >
            For Enterprise
          </Button>
        ),
        key: "enterprise",
      },
      {
        label: (
          <Button
            style={{
              color: "white",
            }}
            type="link"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Login
          </Button>
        ),
        key: "login",
      },
      {
        label: (
          <Button
            type="primary"
            style={{
              color: "white",
            }}
          >
            Join for Free
          </Button>
        ),
        key: "sigup",
      },
    ];
  }

  return (
    <Header
      theme="dark"
      style={{
        color: "white",
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        minHeight: "10vh",
        alignItems: "center",
      }}
    >
      <span>ERROR404</span>
      <SearchByForm />
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        style={{ width: "70%" }}
      />
    </Header>
  );
};

export default MainHeader;
