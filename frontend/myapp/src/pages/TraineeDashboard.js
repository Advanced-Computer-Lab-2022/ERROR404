import React, { useContext, useEffect, useState } from "react";
import {
  HomeOutlined,
  SettingFilled,
  LogoutOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GradeIcon from "@mui/icons-material/Grade";
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
import FooterWrapper from "../components/footer";

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
    getItem(
      <Link className="link" to="/">
        Home
      </Link>,
      "1",
      <HomeOutlined />
    ),
    getItem(
      <Link className="link" to="/traineeDashboard">
        My Dashboard
      </Link>,
      "13",
      <DashboardIcon />
    ),
    getItem(
      <Link className="link" to="/traineeDashboard/traineeViewCourses">
        View all my courses
      </Link>,
      "16",
      <ViewWeekIcon />
    ),

    getItem(
      <Link className="link" to="/traineeDashboard">
        My Balance
      </Link>,
      "17",
      <AccountBalanceWalletIcon />
    ),
    getItem(
      <Link className="link" to="/traineeDashboard/viewGrade">
        View My Grades
      </Link>,
      "17",
      <GradeIcon />
    ),
    getItem(
      <Link className="link" to="/settings">
        Settings
      </Link>,
      "15",
      <SettingFilled />
    ),
    getItem(
      <Link className="link" to="/user/reports">
        My Tickets
      </Link>,
      "18",
      <ReconciliationOutlined />
    ),
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

  const logout = () => {
    setUserName("");
    setUser("");
  };

  return (
    <Layout>
      <Header
        className="header"
        style={{
          position: "relative",
          position: "sticky",
          top: "0px",
          width: "100%",
          height: "8vh",
          zIndex: "100",
          color: "white",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          minHeight: "10vh",
          alignItems: "center",
        }}
      >
        <div className="logo" />
        <Menu
          style={{
            width: "100%",
          }}
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
          <Content
            style={{
              padding: "0 24px",
              minHeight: "80vh",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ padding: 0, textAlign: "center", margin: "0 0px" }}>
        <FooterWrapper />
      </Footer>
    </Layout>
  );
};

export default TraineeDashboard;
