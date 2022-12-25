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
import TraineeDashboard from "./TraineeDashboard";
import { AppContext } from "../AppContext";
import FooterWrapper from "../components/footer";
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
    <Footer style={{ padding: 0, textAlign: "center", margin: "0 0px" }}>
      <FooterWrapper />
    </Footer>
  </Layout>
);

export { UserSettingPage };
export default SettingsPageWrapper;
