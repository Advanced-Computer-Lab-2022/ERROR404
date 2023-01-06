import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Empty,
  Form,
  Image,
  Input,
  List,
  Skeleton,
} from "antd";
import PreviewCourseWrapper from "./previewCourse";
import PreviewCourses from "../CourseViewWrapper";
import axios from "axios";
import { WechatOutlined, DeleteOutlined } from "@ant-design/icons";

import { AppContext } from "../../AppContext";
import TraineeInsideCourse from "../traineeComponents/traineeInsideCourse";

const count = 3;

const CourseConversation = () => {
  const [form] = Form.useForm();
  const { userType, username } = useContext(AppContext);
  const [user, setUser] = userType;
  const [userName, setUserName] = username;

  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");

    setCourseId(courseId);

    axios
      .get("http://localhost:2020/getCourseChats/" + courseId)
      .then((response) => {
        console.log(response.data);
        setList(response.data.chat);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:2020/getCourseChats/" + courseId)
      .then((response) => {
        console.log(response.data);
        setList(response.data.chat);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [refresh]);

  const onFinish = (event) => {
    const message = event.message;

    if (message == null || message == "") {
      return;
    } else {
      let usert = "";
      if (user == "individual" || user == "corporate") {
        usert = "student";
      } else {
        usert = user;
      }
      setLoading(true);
      form.resetFields();
      const body = {
        id: courseId,
        sender: userName,
        usertype: usert,
        message: message,
      };

      axios
        .patch("http://localhost:2020/createCourseChat", body)
        .then(() => {
          setRefresh(!refresh);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };

  if (list.length == 0) {
    return (
      <TraineeInsideCourse courseId={courseId}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <WechatOutlined
            style={{
              fontSize: "30px",
            }}
          />
          <Empty description="No Chats, be the first to send a message?" />
          <Form
            form={form}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
            onFinish={onFinish}
          >
            <Form.Item
              allowClear
              name="message"
              style={{
                width: "95%",
              }}
            >
              <Input allowClear placeholder="send message..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="send">
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </TraineeInsideCourse>
    );
  } else {
    return (
      <TraineeInsideCourse courseId={courseId}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* <Image
            preview={false}
            height="20%"
            src="https://marketplace.canva.com/EAENvT5r2kw/1/0/1600w/canva-black-and-gray-abstract-linkedin-banner-2CkD5P2xUDo.jpg"
          /> */}
          <WechatOutlined
            style={{
              fontSize: "30px",
            }}
          />
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            style={{
              minHeight: "40vh",
              maxHeight: "60vh",
              overflow: "auto",
            }}
            loading={loading}
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={item.sender + " (" + item.usertype + ")"}
                    description={item.message}
                  />
                </Skeleton>
                {user === "admin" ? (
                  <DeleteOutlined style={{ color: "red" }} />
                ) : null}
              </List.Item>
            )}
          />
          <Form
            form={form}
            style={{
              display: "flex",
              flexDirection: "row",
            }}
            onFinish={onFinish}
          >
            <Form.Item
              allowClear
              name="message"
              style={{
                width: "95%",
              }}
            >
              <Input allowClear placeholder="send message..." />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="send">
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </TraineeInsideCourse>
    );
  }
};

export default CourseConversation;
