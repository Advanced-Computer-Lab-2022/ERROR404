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
  LogoutOutlined,
} from "@ant-design/icons";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GradeIcon from '@mui/icons-material/Grade';
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

const TraineeDashboard = ({ children }) => {
  const { userType, username } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [user, setUser] = userType;
  //const [visible, setVisibility] = useState(false);

  const items = [
    getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
    getItem(
      <Link to="/traineeDashboard">My Dashboard</Link>,
      "13",
      <DashboardIcon />
    ),
    getItem(
      <Link to="/traineeDashboard/traineeViewCourses">View all my courses</Link>,
      "16",
      <ViewWeekIcon />
    ),
    
    getItem(
      <Link to="/traineeDashboard">My Balance</Link>,
      "17",
      <AccountBalanceWalletIcon />
    ),
    getItem(
      <Link to="/traineeDashboard/viewGrade">View My Grades</Link>,
      "17",
      <GradeIcon />
    ),
    getItem(<Link to="/settings">Settings</Link>, "15", <SettingFilled />),
    getItem(
      <Link
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

  const logout = () => {
    setUserName("");
    setUser("");
  };

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
            <Breadcrumb.Item>{userName}</Breadcrumb.Item>
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
};


export default TraineeDashboard;