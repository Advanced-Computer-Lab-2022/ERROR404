import React, { useContext, useEffect } from "react";
import {
  HomeOutlined,
  PlusCircleOutlined,
  DashboardOutlined,
  QuestionOutlined,
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

const items = [
  getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
  getItem(
    <Link to="/adminDashboard">Dashboard</Link>,
    "6",
    <DashboardOutlined />
  ),
  getItem(
    <Link to="/adminDashboard/reports">Reports</Link>,
    "2",
    <BugReportIcon />
  ),
  getItem(
    <Link to="/adminDashboard/requests">Course Requests</Link>,
    "2",
    <QuestionOutlined />
  ),
  getItem(
    <Link to="/adminCreateAdmin">Create New User</Link>,
    "3",
    <PlusCircleOutlined />
  ),

  //   getItem(<InstructorBalance />, "16", <SettingFilled />),
];

const AdminDashboard = ({ children, pageName }) => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;

  if (user != "admin") {
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
  } else {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" items={items} />
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Admin Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>{pageName}</Breadcrumb.Item>
          </Breadcrumb>
          <Layout style={{ padding: "24px 0" }}>
            <Sider width={200} style={{ height: "45xvh" }}>
              <Menu theme="dark" mode="inline" items={items} />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: "80vh" }}>
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
