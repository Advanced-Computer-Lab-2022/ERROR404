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
import FooterWrapper from "./components/footer";
import WrapperSignUp from "./components/loginComponents/signUp";

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
      <Layout
        style={{ minHeight: "90vh", backgroundColor: "white" }}
        theme="dark"
      >
        <Content style={{ margin: "0 0px", padding: "5%" }}>{children}</Content>
      </Layout>
      <Footer style={{ padding: 0, textAlign: "center", margin: "0 0px" }}>
        <FooterWrapper />
      </Footer>
    </Layout>
  );
};

export default App;
