import React, { useEffect, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
  QuestionOutlined,
  BranchesOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Image } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    <Link className="link" to="/">
      Home
    </Link>,
    0,
    <HomeOutlined />
  ),
  getItem("Exercises", 1, <QuestionOutlined />),
  getItem("Syllabus", 2, <BranchesOutlined />),
  getItem("Core Curriculum", 3, <BranchesOutlined />),
  getItem("Your Grades", 4, <PercentageOutlined />),
];

const CoursePage = ({ children, courseName }) => {
  return (
    <Layout>
      <Header className="header" style={{ backgroundColor: "white" }}>
        <div
          className="logo"
          style={{
            color: "black",
          }}
        >
          <Link to="/">ERROR404</Link>
        </div>
      </Header>

      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "60vh",
              borderRight: 0,
            }}
            items={items}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Courses</Breadcrumb.Item>
            <Breadcrumb.Item>{courseName}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CoursePage;
