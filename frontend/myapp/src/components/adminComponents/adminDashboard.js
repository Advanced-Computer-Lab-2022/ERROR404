import React, { useContext, useEffect } from "react";
import {
  HomeOutlined,
  PlusCircleOutlined,
  DashboardOutlined,
  QuestionOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Alert, Result, Button } from "antd";
import { Link } from "react-router-dom";
import BugReportIcon from "@mui/icons-material/BugReport";
import { AppContext } from "../../AppContext";
import FooterWrapper from "../footer";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const AdminDashboard = ({ children, pageName }) => {
  const { userType, username } = useContext(AppContext);
  const [user, setUser] = userType;
  const [UserName, setUserName] = username;

  const logout = () => {
    setUserName("");
    setUser("");
  };

  const items = [
    getItem(
      <Link className="link" to="/">
        Home
      </Link>,
      "1",
      <HomeOutlined />
    ),
    getItem(
      <Link className="link" to="/adminDashboard">
        Dashboard
      </Link>,
      "6",
      <DashboardOutlined />
    ),
    getItem(
      <Link className="link" to="/adminDashboard/reports">
        Reports
      </Link>,
      "2",
      <BugReportIcon />
    ),
    getItem(
      <Link className="link" to="/adminDashboard/requests">
        Course Requests
      </Link>,
      "4",
      <QuestionOutlined />
    ),
    getItem(
      <Link className="link" to="/adminCreateAdmin">
        Create New User
      </Link>,
      "3",
      <PlusCircleOutlined />
    ),
    getItem(
      <Link className="link" to="/viewAllCourses">
        View All Courses
      </Link>,

      "6"
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
      "5",
      <LogoutOutlined />
    ),

    //   getItem(<InstructorBalance />, "16", <SettingFilled />),
  ];

  if (user != "admin") {
    return (
      <Result
        key="unautherized"
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary">
            <Link className="link" to="/">
              Back Home
            </Link>
          </Button>
        }
      />
    );
  } else {
    return (
      <Layout>
        <Header
          className="header"
          style={{
            position: "sticky",
            top: "0px",
            width: "100%",
            height: "8vh",
            zIndex: "100",
          }}
        >
          <div className="logo" />
          <Menu
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            theme="dark"
            mode="horizontal"
            items={items}
          />
        </Header>
        <Content style={{ padding: "0 50px", zindex: 1 }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>{pageName}</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: "24px 0" }}>
            <Content
              style={{
                padding: "0 24px",
                minHeight: "80vh",
                position: "relative",
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
  }
};

export default AdminDashboard;
