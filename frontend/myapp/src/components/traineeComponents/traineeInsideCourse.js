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
  LogoutOutlined,
} from "@ant-design/icons";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PreviewIcon from "@mui/icons-material/Preview";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GradeIcon from "@mui/icons-material/Grade";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Breadcrumb, Button, Layout, Menu, Rate, Avatar } from "antd";
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
      <Link className="link" to="/traineeDashboard/viewGrade">
        View My Grades
      </Link>,
      "18",
      <GradeIcon />
    ),
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
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
            width: "100%",
          }}
        >
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/user/myPrograms">My Classroom</Link>
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
              minHeight: " 150vh",
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
