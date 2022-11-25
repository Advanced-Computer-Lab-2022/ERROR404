import "./App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Select, Breadcrumb, Menu, Image, Space } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  SelectOutlined,
  FolderViewOutlined,
  PlusSquareOutlined,
  SearchOutlined,
  HomeOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SettingFilled,
  FontColorsOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import MainHeader from "./components/MainHeader";
import PrimarySearchAppBar from "./components/searchBarHeader";
import ReviewNavigation from "./components/reviewComponents";
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
  getItem(<Link to="/">Sigin | Login</Link>, "12", <LoginOutlined />),

  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Ali Ghieth", "6"),
    getItem("Abdelrahman Ali", "8"),
    getItem("موهمد تامر ", "9"),
    getItem("Dina Tamer", "10"),
    getItem("Malak Amr ", "11"),
  ]),
  getItem(<Link to="/settings">Settings</Link>, "15", <SettingFilled />),
];

function App({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      {/* <MainHeader /> */}
      <PrimarySearchAppBar />
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
