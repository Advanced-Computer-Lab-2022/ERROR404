import React, { useContext, useEffect, useState } from "react";
import {
  MessageOutlined,
  EyeOutlined,
  HourglassOutlined,
  DollarOutlined,
  PlusOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import {
  List,
  Space,
  Rate,
  Button,
  Modal,
  Form,
  Input,
  message,
  DatePicker,
} from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const TraineePrograms = ({ courses, viewType }) => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDis, setIsModalOpenDis] = useState(false);
  const [courseTitle, setTitle] = useState("");
  const [id, setId] = useState("");

  let navigation = useNavigate();

  useEffect(() => {
    console.log(courses);
  }, []);

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
        }}
        dataSource={courses}
        renderItem={(item) => (
          <div>
            <List.Item
              key={item._id}
              onClick={() => {
                navigation("/course/about?courseId=" + item._id);
              }}
              actions={[
                <IconText
                  icon={EyeOutlined}
                  text={item.views}
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={MessageOutlined}
                  text={item.review.length}
                  key="list-vertical-message"
                />,
                <IconText
                  icon={HourglassOutlined}
                  text={item.totalHours + " hours"}
                  key="list-vertical-message"
                />,
                <IconText
                  icon={DollarOutlined}
                  text={item.price == 0 ? "FREE" : item.price}
                  key="list-vertical-message"
                />,
                <IconText
                  icon={UsergroupDeleteOutlined}
                  text={item.numberOfSubscribers}
                  key="list-vertical-message"
                />,
              ]}
              extra={
                <Space>
                  <img
                    width={250}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                </Space>
              }
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.summary}
              />
              {<Rate allowHalf defaultValue={item.rating} disabled={true} />}
            </List.Item>
          </div>
        )}
      />
    </>
  );
};

export default TraineePrograms;
