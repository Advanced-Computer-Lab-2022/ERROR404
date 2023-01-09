import React, { useContext, useEffect, useState } from "react";
import {
  HomeOutlined,
  SettingFilled,
  LogoutOutlined,
  ReconciliationOutlined,
  UsergroupDeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Breadcrumb, Layout, Menu, Result, Button, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { AppContext } from "../../AppContext";
import FooterWrapper from "../footer";
import { InstructorStudents } from "./instructorMainDashboard";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const InstructorDashboard = ({ children, pageName }) => {
  const { userType, username } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [user, setUser] = userType;
  const [visible, setVisibility] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const items = [
    getItem(
      <Link className="link" to="/">
        Home
      </Link>,
      "1",
      <HomeOutlined />
    ),
    getItem(
      <Link className="link" to="/instructorDashBoard/allMyCourses">
        My Classroom
      </Link>,
      "4",
      <ViewWeekIcon />
    ),

    getItem(
      <Link className="link" to="/instructorDashBoard/balance">
        My Balance
      </Link>,
      "17",
      <AccountBalanceWalletIcon />
    ),
    getItem(
      <Link className="link" to="/instructorDashBoard/reviews">
        My Reviews
      </Link>,
      "18",
      <ReviewsIcon />
    ),
    getItem(
      <Link className="link" to="/instructorDashBoard/createCourse">
        Create New Course
      </Link>,
      "19",
      <AddBoxIcon />
    ),

    getItem(
      <Link className="link" to="/user/reports">
        My Tickets
      </Link>,
      "23",
      <ReconciliationOutlined />
    ),
    getItem(<Link>My Students</Link>, "22", <ReconciliationOutlined />, [
      getItem(<InstructorStudents />, "20", <UsergroupDeleteOutlined />),
    ]),
    getItem(<Avatar size="medium" icon={<UserOutlined />} />, "user", <></>, [
      getItem(<span>{userName}</span>, "4", <UserOutlined />),
      getItem(
        <Link className="link" to="/settings">
          Settings
        </Link>,
        "3",
        <SettingFilled />
      ),
      getItem(
        <Link
          className="link"
          to="/"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Link>,
        "5",
        <LogoutOutlined />
      ),
    ]),

    //   getItem(<InstructorBalance />, "16", <SettingFilled />),
  ];

  const logout = () => {
    setUserName("");
    setUser("");
  };

  if (user == "instructor") {
    return (
      <Layout>
        <Header
          className="header"
          style={{
            position: "relative",
            position: "sticky",
            top: "0px",
            width: "100%",
            height: "8vh",
            zIndex: "100",
            color: "white",
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            minHeight: "10vh",
            alignItems: "center",
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          />
        </Header>
        <Content
          style={{
            padding: "0 50px",
            backgroundColor: "white",
            minHeight: "150vh",
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
              <Link to="/instructorDashBoard/allMyCourses">My Classroom</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{pageName}</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            className="site-layout-background"
            style={{
              padding: "24px 0",
            }}
          >
            <Content
              style={{
                padding: "30px",
                minHeight: "80vh",
                backgroundColor: "white",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Content>
        {/* <Footer style={{ padding: 0, textAlign: "center", margin: "0 0px" }}>
          <FooterWrapper />
        </Footer> */}
      </Layout>
    );
  } else {
    return (
      <Result
        key="unautherized"
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    );
  }
};

export default InstructorDashboard;
