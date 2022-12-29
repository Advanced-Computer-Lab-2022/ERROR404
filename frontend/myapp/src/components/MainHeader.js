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
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardFilled,
  SettingFilled,
  DashboardOutlined,
} from "@ant-design/icons";
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

  const logout = () => {
    setUserName("");
    setUser("");
  };

  let v = {
    modal: [isModalOpen, setIsModalOpen],
    drawer: [isDrawerOpen, setIsDrawerOpen],
  };

  if (user == "instructor") {
    items = [
      {
        label: (
          <Link className="link" to="/">
            <HomeOutlined />
          </Link>
        ),
        key: "home",
      },
      getItem(
        <Link className="link" to="instructorDashboard">
          My Dashboard
        </Link>,
        "2",
        <DashboardOutlined />
      ),

      // remember to pass the key prop
      {
        label: (
          <Link className="link" to="/viewAllCourses">
            Explore All Courses
          </Link>
        ),
        key: "explore",
      },

      getItem(
        <Link
          className="link"
          to="/"
          onClick={() => {
            logout();
          }}
        >
          Log Out
        </Link>,
        "3",
        <LogoutOutlined />
      ),
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
        label: (
          <Link className="link" to="/viewAllCourses">
            Explore All Courses
          </Link>
        ),
        key: "explore",
      },
      getItem(
        <Link className="link" to="traineeDashboard">
          My Dashboard
        </Link>,
        "2",
        <DashboardOutlined />
      ),
      {
        label: (
          <Link className="link" to="/viewMyGrades">
            My Grades
          </Link>
        ),
        key: "grades",
      }, // which is required
      {
        label: (
          <Link className="link" to="/user/myPrograms">
            <Button ghost>My Programs</Button>
          </Link>
        ),
        key: "myClassroom",
      },
      getItem(
        <Link className="link" to="/settings">
          Settings
        </Link>,
        "3",
        <SettingFilled />
      ),
      getItem(
        <Link
          className="link"
          to="/"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Link>,
        "2",
        <LogoutOutlined />
      ),
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
      getItem(
        <Link className="link" to="/">
          Home
        </Link>,
        "1",
        <HomeOutlined />
      ),
      getItem(
        <Link className="link" to="/adminDashboard">
          My Dashboard
        </Link>,
        "3",
        <AdminPanelSettingsIcon />
      ),
      getItem(
        <Link className="link" to="/adminDashboard/reports">
          All Reports
        </Link>,
        "2",
        <BugReportIcon />
      ),
      getItem(
        <Link className="link" to="/viewAllCourses">
          Explore All Courses
        </Link>,
        "4"
      ),
      getItem(
        <Link
          className="link"
          to="/"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Link>,
        "2",
        <LogoutOutlined />
      ),
    ];
  } else {
    items = [
      {
        label: (
          <Link to="/" className="link">
            <HomeOutlined />
          </Link>
        ),
        key: "home",
      }, // remember to pass the key prop

      {
        label: (
          <Link className="link" to="/viewAllCourses">
            Explore All Courses
          </Link>
        ),
        key: "explore",
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
          <Link className="link" onClick={() => setIsDrawerOpen(true)}>
            Sign Up
          </Link>
        ),
        key: "signup",
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
      <Link
        to="/"
        style={{
          //backgroundColor: "black",
          height: "100%",
          width: "20vw",
          textDecoration: "none",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          preview={false}
          src="https://drnajafbeigi.com/wp-content/uploads/404%D8%AB.png"
          height="100%"
        />
      </Link>
      <SearchByForm />
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        style={{ width: "100%" }}
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
        <LoginComponent values={v} />
      </Modal>

      <WrapperSignUp values={[isDrawerOpen, setIsDrawerOpen]} />
    </Header>
  );
};

export default MainHeader;
