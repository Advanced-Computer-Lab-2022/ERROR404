import {
  Layout,
  Image,
  Menu,
  Input,
  Popover,
  Button,
  Avatar,
  Modal,
} from "antd";
import React, { useState, useContext } from "react";
import SearchByForm from "./search";
import { Link } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import SchoolIcon from "@mui/icons-material/School";
import { AppContext } from "../AppContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BugReportIcon from "@mui/icons-material/BugReport";
import WrapperSignUp from "./loginComponents/signUp";
import LoginComponent from "./loginComponents/mainHome";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = values;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
  } else if (user == "individual" || user == "corporate") {
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
          <Link to="/user/myPrograms">
            <Button ghost>My Programs</Button>
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
      getItem(<Link to="/viewAllCourses">Explore All Courses</Link>, "4"),
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
        label: <Link onClick={() => setIsDrawerOpen(true)}>Join for free</Link>,
        key: "signup",
        //(
        //   <Button
        //     style={{
        //       color: "white",
        //     }}
        //     type="link"
        //   >
        //     Join for Free
        //   </Button>
        // ),
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
      <img
        src="https://drnajafbeigi.com/wp-content/uploads/404%D8%AB.png"
        style={{ height: "80%" }}
      />
      <SearchByForm />
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        style={{ width: "70%" }}
      />
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}
      >
        <LoginComponent values={[isModalOpen, setIsModalOpen]} />
      </Modal>

      <WrapperSignUp values={[isDrawerOpen, setIsDrawerOpen]} />
    </Header>
  );
};

export default MainHeader;
