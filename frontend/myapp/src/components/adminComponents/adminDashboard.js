import React from "react";
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import BugReportIcon from "@mui/icons-material/BugReport";

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
    <Link to="/adminDashboard/reports">Reports</Link>,
    "2",
    <BugReportIcon />
  ),
  getItem(<Link to="/">Create New Admin</Link>, "3", <PlusCircleOutlined />),
  getItem(
    <Link to="/">Create New Instructor</Link>,
    "4",
    <PlusCircleOutlined />
  ),
  getItem(
    <Link to="/">Create New Instructor</Link>,
    "5",
    <PlusCircleOutlined />
  ),

  //   getItem(<InstructorBalance />, "16", <SettingFilled />),
];

const AdminDashboard = ({ children, pageName }) => {
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
          <Sider width={200}>
            <Menu
              theme="dark"
              mode="inline"
              style={{ height: "100%" }}
              items={items}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>Footer</Footer>
    </Layout>
  );
};

export default AdminDashboard;
