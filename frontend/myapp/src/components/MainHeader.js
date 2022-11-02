import { Layout, Image, Menu, Input, Popover, Button, Avatar } from "antd";
import React, { useState } from "react";
import SearchByForm from "./search";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

const MainHeader = () => {
  const [current, setCurrent] = useState("mail");

  const items = [
    {
      label: <Link to="/viewAllCourses">Explore All Courses</Link>,
      key: "explore",
    },
    { label: <Link to="/">Home</Link>, key: "explore" }, // remember to pass the key prop
    { label: "item 2", key: "item-2" }, // which is required
    {
      label: "sub menu",
      key: "submenu",
      children: [{ label: "item 3", key: "submenu-item-1" }],
    },
  ];

  // const userItems = [
  //   {
  //     label: "User",
  //     key: "explore",
  //     icon: <
  //   },
  // ];

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
      style={{
        backgroundColor: "white",
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
        selectedKeys={["explore"]}
        theme="light"
        mode="horizontal"
        items={items}
      />
      <Popover content={content}>
        <Avatar size="medium" icon={<UserOutlined />} />
      </Popover>
    </Header>
  );
};

export default MainHeader;
