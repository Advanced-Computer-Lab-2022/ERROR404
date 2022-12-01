import React, { useContext, useEffect, useState } from "react";
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
import {
  Breadcrumb,
  Layout,
  Menu,
  Col,
  Row,
  Statistic,
  Card,
  Skeleton,
} from "antd";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AppContext } from "../AppContext";
import Alert from "@mui/material/Alert";

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
  getItem(
    <Link to="/instructorDashBoard">My Dashboard</Link>,
    "13",
    <DashboardIcon />
  ),
  getItem(<Link to="/">Sigin | Login</Link>, "12", <LoginOutlined />),
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
  getItem(
    <Link to="/instructorDashBoard/addDiscount">Add Discount</Link>,
    "20",
    <AddBoxIcon />
  ),
  getItem(<Link to="/settings">Settings</Link>, "15", <SettingFilled />),
  //   getItem(<InstructorBalance />, "16", <SettingFilled />),
];

const InstructorDashboard = ({ children }) => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    if (user != "instructor") {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  }, []);

  if (visible) {
    return (
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
            <Breadcrumb.Item>Instructor</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{
              padding: "24px 0",
            }}
          >
            <Sider
              className="site-layout-background"
              width={200}
              style={{
                maxHeight: "500px",
              }}
            >
              <Menu
                mode="inline"
                theme="dark"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                items={items}
              />
            </Sider>
            <Content
              style={{
                padding: "0 24px",
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          GUC ACL LAB ©2022 Created by ©alighieth
        </Footer>
      </Layout>
    );
  } else {
    return (
      <>
        <Alert severity="error">You dont have acces to this page!</Alert>
        <Skeleton active />
      </>
    );
  }
};

export default InstructorDashboard;
