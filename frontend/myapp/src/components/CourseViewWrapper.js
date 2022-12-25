import React from "react";
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
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PreviewIcon from "@mui/icons-material/Preview";
import Alert from "@mui/material/Alert";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Breadcrumb, Button, Layout, Menu, Rate } from "antd";
import { Link } from "react-router-dom";

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
  const items = [
    getItem(<Link to="/">Home</Link>, "1", <HomeOutlined />),
    getItem(
      <Link to={`/course/about?courseId=${courseId}`}>Course Overview</Link>,
      "2",
      <PreviewIcon />
    ),
    getItem(
      <Link to={`/course/syllabus?courseId=${courseId}`}>Syllabus</Link>,
      "3",
      <ViewTimelineIcon />
    ),

    getItem(
      <Link to={`/course/reviews?courseId=${courseId}`}>Course Reviews</Link>,
      "5",
      <ReviewsIcon />
    ),
    getItem(
      <Link to={`/course/pay?courseId=${courseId}`}>
        <Button ghost>BUY NOW!!</Button>
      </Link>,
      "6",
      <ShoppingCartIcon />
    ),
  ];
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
                height: "100%",
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
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©2018 Created by ©alighieth
      </Footer>
    </Layout>
  );
};
export default PreviewCourses;
