import "./App.css";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Select, Breadcrumb, Menu, Modal, Button, Avatar } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  SelectOutlined,
  FolderViewOutlined,
  PlusSquareOutlined,
  UserAddOutlined,
  SearchOutlined,
  HomeOutlined,
  TeamOutlined,
  SettingFilled,
  LogoutOutlined,
  LoginOutlined,
  ExclamationOutlined,
} from "@ant-design/icons";
import MainHeader from "./components/MainHeader";
import PrimarySearchAppBar from "./components/searchBarHeader";
import ReviewNavigation from "./components/reviewComponents";
import LoginComponent from "./components/loginComponents/mainHome";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppContext } from "./AppContext";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BugReportIcon from "@mui/icons-material/BugReport";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

const App = ({ children }) => {
  const { userType, username } = useContext(AppContext);
  const [user, setUser] = userType;
  const [userName, setUserName] = username;
  const navigate = useNavigate();

  const logout = () => {
    setUserName("");
    setUser("");
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
// const items = [
//   getItem(<Link to="/">Home</Link>, "17", <HomeOutlined />),
//   getItem(<Link to="/">Sign in | Login</Link>, "12", <LoginOutlined />),
//   getItem(<Link to="/signUp">Sign up </Link>, "12", <UserAddOutlined />),

  let items = [];
  if (user == "instructor") {
    items = [
      getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
      getItem(
        <Link to="instructorDashboard">My Dashboard</Link>,
        "2",
        <HomeOutlined />
      ),
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
  } else if (user == "individual" || user == "corporate") {
    items = [
      getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
      getItem(
        <Link to="traineeDashboard">My Dashboard</Link>,
        "2",
        <DashboardIcon />
      ),
      getItem(<Link to="/settings">Settings</Link>, "3", <SettingFilled />),
      getItem(
        <Link
          to="/"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Link>,
        "2",
        <LogoutOutlined />
      ),
    ];
  } else if (user == "admin") {
    items = [
      getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
      getItem(
        <Link to="/adminDashboard">My Dashboard</Link>,
        "3",
        <AdminPanelSettingsIcon />
      ),
      getItem(
        <Link to="/adminDashboard/reports">All Reports</Link>,
        "2",
        <BugReportIcon />
      ),
      getItem(
        <Link
          to="/"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Link>,
        "2",
        <LogoutOutlined />
      ),
    ];
  } else {
    items = [
      getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
      getItem(
        <Button
          style={{ color: "white" }}
          type="link"
          onClick={() => setIsModalOpen(true)}
        >
          Login | Sign Up
        </Button>,
        "2",
        <LoginOutlined />
      ),

      getItem("Team", "sub2", <TeamOutlined />, [
        getItem("Ali Ghieth", "6"),
        getItem("Abdelrahman Ali", "8"),
        getItem("موهمد تامر ", "9"),
        getItem("Dina Tamer", "10"),
        getItem("Malak Amr ", "11"),
      ]),
    ];
  }

  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout className="layout">
      <MainHeader values={[isModalOpen, setIsModalOpen]} />
      {/* <PrimarySearchAppBar /> */}
      <Layout style={{ minHeight: "90vh" }} theme="dark">
        <Sider
          width={300}
          theme="dark"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" items={items} />
        </Sider>
        <Content style={{ padding: "5%" }}>
          {children}
          <Modal
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
              <Button type="primary" onClick={handleCancel}>
                Cancel
              </Button>,
            ]}
          >
            <LoginComponent values={[isModalOpen, setIsModalOpen]} />
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
