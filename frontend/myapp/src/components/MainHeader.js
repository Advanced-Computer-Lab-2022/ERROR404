import { Layout, Image, Menu, Input, Popover, Button, Avatar } from "antd";
import React, { useState } from "react";
import SearchByForm from "./search";
import { Link } from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import SchoolIcon from "@mui/icons-material/School";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

const MainHeader = () => {
  const [current, setCurrent] = useState("mail");

  const items = [
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
    { label: "My Grades", key: "grades" }, // which is required
    {
      label: <Button ghost>My Classroom</Button>,
      key: "myClassroom",
    },
  ];

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "5%",
      }}
    >
      <UserOutlined />
      <span>alighieth</span>
    </div>
  );

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
      <Popover content={content}>
        <Avatar size="medium" icon={<UserOutlined />} />
      </Popover>
    </Header>
  );
};

export default MainHeader;
