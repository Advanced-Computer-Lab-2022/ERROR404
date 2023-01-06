import React, { useContext } from "react";
import App from "../App";
import { Breadcrumb, Layout } from "antd";
import {
  PersonalInformationTab,
  SettingsPageSider,
} from "../components/settingsPage";
import InstructorDashboard from "../components/instructorComponents/InstructorDashboard";
import TraineeDashboard from "../components/traineeComponents/TraineeDashboard";
import { AppContext } from "../AppContext";
const { Content, Sider } = Layout;

const SettingsPageWrapper = () => {
  const { userType } = useContext(AppContext);
  const [user] = userType;
  if (user === "instructor") {
    return (
      <InstructorDashboard pageName="Settings">
        <UserSettingPageMain />
      </InstructorDashboard>
    );
  } else if (user === "individual" || user === "corporate") {
    return (
      <TraineeDashboard pageName="Settings">
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

const UserSettingPage = ({ children }) => (
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
