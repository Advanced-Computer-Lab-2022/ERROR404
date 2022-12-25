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
  const [rate, setRate] = useState(0);

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
      My Rate :
      <Rate allowHalf defaultValue={rate} disabled={true} />
      <List
        itemLayout="vertical"
        size="small"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={messages}
        renderItem={(item) => (
          <div
            style={{
              boxSizing: "border-box",
              padding: "2px",
            }}
          >
            <List.Item key={item}>
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={item}
              />
            </List.Item>
          </div>
        )}
      />
    </div>
  );
};

export default ReviewNavigation;
