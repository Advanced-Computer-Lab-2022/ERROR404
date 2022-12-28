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
  WechatOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import ReviewsIcon from "@mui/icons-material/Reviews";
import PreviewIcon from "@mui/icons-material/Preview";
import Alert from "@mui/material/Alert";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Breadcrumb, Button, Layout, Menu, Rate } from "antd";
import { Link } from "react-router-dom";
import FooterWrapper from "./footer";
import { AppContext } from "../AppContext";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const PreviewCourses = ({ children, courseId }) => {
  const { userType, traineeCourses } = useContext(AppContext);
  const [user, setUser] = userType;
  const [traineeRegCourses, setTraineeCourses] = traineeCourses;

  let items = [];

  if (
    (user == "individual" || user == "corporate" || user == "admin") &&
    traineeRegCourses.includes(courseId)
  ) {
    items = [
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
        <Link className="link" to={`/course/conversation?courseId=${courseId}`}>
          Course Conversations
        </Link>,
        "6",
        <WechatOutlined />
      ),
    ];
  } else {
    items = [
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
        <Link className="link" to={`/course/pay?courseId=${courseId}`}>
          <Button ghost>BUY NOW!!</Button>
        </Link>,
        "6",
        <ShoppingCartIcon />
      ),
    ];
  }

  return (
    <Layout>
      <Header className="header">
        <Menu theme="dark" mode="horizontal" items={items} />
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
          <Breadcrumb.Item>Web Development</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          className="site-layout-background"
          style={{
            padding: "24px 0",
          }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              theme="dark"
              mode="inline"
              style={{
                height: "60vh",
              }}
              items={items}
            />
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
};
export default PreviewCourses;
