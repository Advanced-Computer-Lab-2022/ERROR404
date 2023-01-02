import React, { useContext } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
  LoginOutlined,
  SettingFilled,
  DislikeOutlined,
  LikeOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PreviewIcon from "@mui/icons-material/Preview";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GradeIcon from "@mui/icons-material/Grade";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Breadcrumb, Button, Layout, Menu, Rate } from "antd";
import { Link } from "react-router-dom";
import FooterWrapper from "../footer";
import { AppContext } from "../../AppContext";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const TraineeInsideCourse = ({ children, courseId, courseName }) => {
  const { userType, username } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [user, setUser] = userType;

  const items = [
    getItem(
      <Link className="link" to="/">
        Home
      </Link>,
      "1",
      <HomeOutlined />
    ),
    getItem(
      <Link className="link" to={`/course/about?courseId=${courseId}`}>
        Course Overview
      </Link>,
      "2",
      <PreviewIcon />
    ),
    getItem(
      <Link className="link" to={`/course/syllabus?courseId=${courseId}`}>
        Syllabus
      </Link>,
      "3",
      <ViewTimelineIcon />
    ),

    getItem(
      <Link className="link" to={`/course/reviews?courseId=${courseId}`}>
        Course Reviews
      </Link>,
      "5",
      <ReviewsIcon />
    ),
    getItem(
      <Link className="link" to={"/course/conversation?courseId=" + courseId}>
        Course Conversations
      </Link>,
      "6",
      <ShoppingCartIcon />
    ),
    getItem(
      <Link to="/traineeDashboard">My Dashboard</Link>,
      "13",
      <DashboardIcon />
    ),
    getItem(
      <Link to="/traineeDashboard">My Balance</Link>,
      "17",
      <AccountBalanceWalletIcon />
    ),
    getItem(
      <Link to="/traineeDashboard/viewGrade">View My Grades</Link>,
      "18",
      <GradeIcon />
    ),
    getItem(<Link to="/settings">Settings</Link>, "15", <SettingFilled />),

    {
      label: (
        <Link className="link" to="/user/myPrograms">
          <Button ghost>My Programs</Button>
        </Link>
      ),
      key: "myClassroom",
    },
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
      <LoginOutlined />
    ),
  ];

  const logout = () => {
    setUserName("");
    setUser("");
  };
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
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{ width: "100%" }}
        />
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
            <Link to="/viewAllCourses">Courses</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{courseName}</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className="site-layout-background"
          style={{
            padding: "24px 0",
          }}
        >
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
};
export default TraineeInsideCourse;
