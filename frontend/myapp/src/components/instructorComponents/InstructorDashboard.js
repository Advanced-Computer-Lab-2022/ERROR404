import React, { useContext, useEffect, useState } from "react";
import {
  HomeOutlined,
  SettingFilled,
  LogoutOutlined,
  ReconciliationOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Breadcrumb, Layout, Menu, Result, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AppContext } from "../../AppContext";
import FooterWrapper from "../footer";
import { InstructorStudents } from "./instructorMainDashboard";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const InstructorDashboard = ({ children }) => {
  const { userType, username } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [user, setUser] = userType;
  const [visible, setVisibility] = useState(false);
  const navigate = useNavigate();

  const items = [
    getItem(
      <Link className="link" to="/">
        Home
      </Link>,
      "1",
      <HomeOutlined />
    ),
    getItem(
      <Link className="link" to="/instructorDashBoard">
        My Dashboard
      </Link>,
      "2",
      <DashboardIcon />
    ),
    getItem(
      <Link className="link" to="/instructorDashBoard/allMyCourses">
        View all my courses
      </Link>,
      "4",
      <ViewWeekIcon />
    ),

    getItem(
      <Link className="link" to="/instructorDashBoard/balance">
        My Balance
      </Link>,
      "17",
      <AccountBalanceWalletIcon />
    ),
    getItem(
      <Link className="link" to="/instructorDashBoard/reviews">
        My Reviews
      </Link>,
      "18",
      <ReviewsIcon />
    ),
    getItem(
      <Link className="link" to="/instructorDashBoard/createCourse">
        Create New Course
      </Link>,
      "19",
      <AddBoxIcon />
    ),
    getItem(
      <Link className="link" to="/instructorDashBoard/createQuiz">
        Create New Quiz
      </Link>,
      "20",
      <AddBoxIcon />
    ),
    getItem(
      <Link className="link" to="/instructorDashBoard/addDiscount">
        Add Discount
      </Link>,
      "21",
      <AddBoxIcon />
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
      <Link className="link" to="/user/reports">
        My Students
      </Link>,
      "19",
      <ReconciliationOutlined />,
      [getItem(<InstructorStudents />, "20", <UsergroupDeleteOutlined />)]
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

    //   getItem(<InstructorBalance />, "16", <SettingFilled />),
  ];

  const logout = () => {
    setUserName("");
    setUser("");
  };

  if (user == "instructor") {
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
  } else {
    return (
      <Result
        key="unautherized"
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    );
  }
};

export default InstructorDashboard;
