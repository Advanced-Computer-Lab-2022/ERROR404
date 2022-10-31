import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Select, Breadcrumb, Menu, Image } from "antd";
import CreateAdmin from "./components/createAdmin";
import MainHeader from "./components/websiteHeader";
import CreateCourse from "./components/createCourse";
import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  FontColorsOutlined,
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
  getItem(<Link to="/">Home</Link>, "12", <HomeOutlined />),
  getItem(
    <Link to="/courses">Filtering Courses</Link>,
    "1",
    <PieChartOutlined />
  ),
  getItem(
    <Link to="/getAllInstructorCourses">GetAllInstructorCourses</Link>,
    "15",
    <PieChartOutlined />
  ),
  getItem(
    <Link to="/viewallCoursesPrice">ViewAllCoursesPrice</Link>,
    "30",
    <PieChartOutlined />
  ),
  getItem(
    <Link to="/adminCreateAdmin">Create Admin</Link>,
    "13",
    <FontColorsOutlined />
  ),
  getItem(
    <Link to="/adminCreateInstructor">Create Instructor</Link>,
    "14",
    <FontColorsOutlined />
  ),
  getItem(
    <Link to="/createCourse">Create Course</Link>,
    "20",
    <PieChartOutlined />
  ),
  getItem(
    <Link to="/SelectCountry1">Select Country</Link>,
    "21",
    <FontColorsOutlined />
  ),
  getItem(
    <Link to="/createCorp">CreateCorporate</Link>,
    "22",
    <FontColorsOutlined />
  ),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Ali Ghieth", "6"),
    getItem("Abdelrahman Ali", "8"),
    getItem("Mohammed Tamer", "9"),
    getItem("Dina Tamer", "10"),
    getItem("Malak Amr ", "11"),
  ]),
];

function App({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Header
        theme="light"
        style={{
          backgroundColor: "white",
          fontFamily: "sans-serif",
          fontSize: "20px",
        }}
      >
        ERROR404 Team
      </Header>
      <Layout style={{ minHeight: "90vh" }} theme="light">
        <Sider
          width={300}
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu mode="inline" items={items} />
        </Sider>
        <Content style={{ padding: "5%" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default App;
