import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
  LoginOutlined,
  SettingFilled,
  DislikeOutlined,
  LikeOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Alert from "@mui/material/Alert";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Breadcrumb, Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
  getItem(
    <Link to="/checkCourse/about">About this Course</Link>,
    "2",
    <LoginOutlined />
  ),
  getItem(
    <Link to="/instructorDashBoard/allMyCourses">View all my courses</Link>,
    "16",
    <ViewWeekIcon />
  ),

  getItem(
    <Link to="/instructorDashBoard/balance">My Balance</Link>,
    "17",
    <AccountBalanceWalletIcon />
  ),
  getItem(
    <Link to="/instructorDashBoard/reviews">My Reviews</Link>,
    "18",
    <ReviewsIcon />
  ),
  getItem(
    <Link to="/instructorDashBoard/createCourse">Create New Course</Link>,
    "19",
    <AddBoxIcon />
  ),
  getItem(
    <Link to="/instructorDashBoard/createQuiz">Create New Quiz</Link>,
    "20",
    <AddBoxIcon />
  ),
  getItem(<Link to="/settings">Settings</Link>, "15", <SettingFilled />),
  //   getItem(<InstructorBalance />, "16", <SettingFilled />),
];
const PreviewCourse = () => (
  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
      />
    </Header>
    <Content
      style={{
        padding: "0 50px",
      }}
    >
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Courses</Breadcrumb.Item>
        <Breadcrumb.Item>Web Development</Breadcrumb.Item>
      </Breadcrumb>
      <Layout
        className="site-layout-background"
        style={{
          padding: "24px 0",
        }}
      >
        <Sider className="site-layout-background" width={200}>
          <Menu
            theme="dark"
            mode="inline"
            style={{
              height: "100%",
            }}
            items={items}
          />
        </Sider>
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Content>
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
);
export default PreviewCourse;
