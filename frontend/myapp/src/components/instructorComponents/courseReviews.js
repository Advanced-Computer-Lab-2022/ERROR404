import * as React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  EyeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, List, Space, Rate } from "antd";
import { borderRadius } from "@mui/system";

const messageExamples = [
  {
    primary: "Amazing Course",
    secondary: "Instructor really helpful",
    person: "/static/images/avatar/5.jpg",
  },
];

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CourseReviews = ({ reviews }) => {
  return (
    <div>
      <br />
      <List
        itemLayout="vertical"
        size="small"
        style={{
          height: 400,
          overflow: "auto",
        }}
        pagination={{
          onChange: (page) => {
            console.log(page);
            window.scrollTo(0, 0);
          },

          pageSize: 10,
        }}
        dataSource={reviews}
        renderItem={(item) => (
          <div
            style={{
              boxSizing: "border-box",
              padding: "2px",
              border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
          >
            <List.Item key={item._id} style={{ color: "black" }}>
              <List.Item.Meta
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "15px",
                  fontWeight: "bold",
                }}
                avatar={<Avatar icon={<UserOutlined />} />}
                title={item.username}
                description={item.review}
              />
            </List.Item>
          </div>
        )}
      />
    </div>
  );
};

export default CourseReviews;
