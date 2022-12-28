import * as React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
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

const ReviewNavigation = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [messages, setMessages] = useState([]);
  const [rate, setRate] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:2020/viewRatingAndReviews/" + userName)
      .then((response) => {
        console.log(response.data[0].review);
        console.log(response.data[0].rating);
        setMessages(response.data[0].review);
        setRate(response.data[0].rating);
      });
  }, []);
  return (
    <div>
      <br />
      My Rate :
      <Rate allowHalf value={rate} disabled={true} />
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
          },

          pageSize: 10,
        }}
        dataSource={messages}
        renderItem={(item) => (
          <div
            style={{
              boxSizing: "border-box",
              padding: "2px",
              border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
          >
            <List.Item key={item} style={{ color: "black" }}>
              <List.Item.Meta
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "15px",
                  fontWeight: "bold",
                }}
                avatar={<Avatar icon={<UserOutlined />} />}
                description={item}
              />
            </List.Item>
          </div>
        )}
      />
    </div>
  );
};

export default ReviewNavigation;
