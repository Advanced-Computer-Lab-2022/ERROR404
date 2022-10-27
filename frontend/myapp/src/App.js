import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Breadcrumb,
  Menu,
} from "antd";
import GetCoursesByPrice from "./components/getCourses";
import CreateAdmin from "./components/createAdmin";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem(<Button></Button>, "9", <FileOutlined />),
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>Header</Header>
        <Content style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <CreateAdmin />
          <GetCoursesByPrice />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
