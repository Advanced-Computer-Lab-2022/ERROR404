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
  ReconciliationOutlined,
  UsergroupDeleteOutlined,
  LogoutOutlined,
  WalletOutlined,
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
  Button,
} from "antd";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AppContext } from "../../AppContext";
import Alert from "@mui/material/Alert";
import FooterWrapper from "../footer";
import TraineeBalanceWrapper from "./traineeBalance";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const TraineeDashboard = ({ children, pageName }) => {
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
    {
      label: (
        <Link className="link" to="/user/myPrograms">
          <Button ghost>My Programs</Button>
        </Link>
      ),
      key: "myClassroom",
    },
    getItem(
      <Link className="link" to="/traineeDashboard/viewGrade">
        View My Grades
      </Link>,
      "18",
      <GradeIcon />
    ),
    getItem(
      <Link className="link" to="/user/reports">
        My Tickets
      </Link>,
      "20",
      <ReconciliationOutlined />
    ),
    getItem(
      <Link className="link">My Balance</Link>,
      "17",
      <AccountBalanceWalletIcon />,
      [getItem(<TraineeBalanceWrapper />, "50", <WalletOutlined />)]
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
          height: "100vh",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/traineeDashboard">Dashboard</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{pageName}</Breadcrumb.Item>
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
              minHeight: 280,
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
