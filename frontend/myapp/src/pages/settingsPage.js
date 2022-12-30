import React, { useContext } from "react";
import App from "../App";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import {
  PersonalInformationTab,
  SettingsPageSider,
} from "../components/settingsPage";
import { Link } from "react-router-dom";
import InstructorDashboard from "../components/instructorComponents/InstructorDashboard";
import TraineeDashboard from "../components/traineeComponents/TraineeDashboard";
import { AppContext } from "../AppContext";
import FooterWrapper from "../components/footer";
const { Header, Content, Footer, Sider } = Layout;

const SettingsPageWrapper = () => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  if (user == "instructor") {
    return (
      <InstructorDashboard pageName="Setting">
        <UserSettingPageMain />
      </InstructorDashboard>
    );
  } else if (user == "individual") {
    return (
      <TraineeDashboard>
        <UserSettingPageMain />
      </TraineeDashboard>
    );
  } else {
    return (
      <App>
        <UserSettingPageMain />
      </App>
    );
  }
};

const UserSettingPageMain = () => {
  return <PersonalInformationTab />;
};

const UserSettingPage = ({ children, Settings }) => (
  <Content
    style={{
      padding: "0 50px",
    }}
  >
    <Breadcrumb
      style={{
        margin: "16px 0",
      }}
    ></Breadcrumb>
    <Layout
      className="site-layout-background"
      style={{
        padding: "24px 0",
      }}
    >
      <Sider>
        <SettingsPageSider />
      </Sider>
      <Content
        style={{
          padding: "20px",
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    </Layout>
  </Content>
);

export { UserSettingPage };
export default SettingsPageWrapper;
