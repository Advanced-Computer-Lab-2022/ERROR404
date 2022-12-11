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
import { AppContext } from "../AppContext";
const { Header, Content, Footer, Sider } = Layout;

const SettingsPageWrapper = () => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  if (user == "instructor") {
    return (
      <InstructorDashboard>
        <UserSettingPageMain />
      </InstructorDashboard>
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
  return (
    <UserSettingPage>
      <PersonalInformationTab />
    </UserSettingPage>
  );
};

const UserSettingPage = ({ children, Settings }) => (
  <Layout>
    <Header className="header">
      <div className="logo" />
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
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/settings">Account</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{Settings}</Breadcrumb.Item>
      </Breadcrumb>
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
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Content>
    <Footer
      style={{
        textAlign: "center",
      }}
    >
      Ant Design ©2018 Created by abdo UED
    </Footer>
  </Layout>
);

export { UserSettingPage };
export default SettingsPageWrapper;
