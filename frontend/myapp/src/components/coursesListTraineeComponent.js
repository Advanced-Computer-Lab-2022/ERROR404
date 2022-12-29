import React, { useContext, useEffect, useState } from "react";
import {
  MessageOutlined,
  EyeOutlined,
  HourglassOutlined,
  DollarOutlined,
  PlusOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { List, Space, Rate, Button, Modal, Form, Input, message } from "antd";
import { AppContext } from "../AppContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReviewCourseComponent from "./rateAndReviewCourse";
import ReviewComponent from "./StudentrateAndReviewInstructor";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CourseComponentTrainee = ({ courses, viewType }) => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenC, setIsModalOpenC] = useState(false);
  const [courseTitle, setTitle] = useState("");
  const [id, setId] = useState("");

  let navigation = useNavigate();

  useEffect(() => {
    console.log(courses);
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    setIsModalOpen(false);
    console.log(values);
    const url = values.url;

    // axios
    //   .put("http://localhost:2020/uploadPreviewVideoForCourse", body)
    //   .then(() => {
    //     message.success("URL added succesffully", 3);
    //   })
    //   .catch((err) => {
    //     console.log("error at add preview url ", JSON.stringify(err));
    //     message.error("Unexpected error has occured ", 3);
    //   });
    };

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
            //   onClick={() => {
            //     navigation("/course/about?courseId=" + item._id);
            //   }}
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
                  {user == "individual" && viewType == "individual" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Button
                        style={{ width: "100%" }}
                        type="dashed"
                        onClick={() => {
                          setTitle(item.title);
                          setId(item._id);
                          setIsModalOpenC(true);
                        }}
                      >
                        Rate Course
                      </Button>
                      <Button
                        style={{ width: "100%" }}
                        type="dashed"
                        onClick={() => {
                          setTitle(item.title);
                          setId(item._id);
                          setIsModalOpen(true);
                        }}
                      >
                        Rate and Review Instructor
                      </Button>
                      </div>
                  ) : null}
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
                onClick={() => {
                   navigation("/course/about?courseId=" + item._id)
                }}
              />
              {<Rate allowHalf defaultValue={item.rating} disabled={true} />}
            </List.Item>
          </div>
        )}
      />
      {user == "individual" ? (
        <>
          {/* <Modal
            title={courseTitle + " Preview video"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form onFinish={onFinish}>
              <Form.Item
                label="Preview Video URL"
                name="url"
                rules={[
                  {
                    required: true,
                    message: "Please input your Preview Video URL!",
                  },
                ]}
              >
                <Input addonBefore="https://" placeholder="any youtube video" />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Add URL
                </Button>
              </Form.Item>
            </Form>
          </Modal> */}
          <Modal
            title={"Rate " + courseTitle}
            open={isModalOpenC}
            onOk={() => setIsModalOpenC(false)}
            onCancel={() => setIsModalOpenC(false)}
          >
            <ReviewCourseComponent Id={id} />
          </Modal>
          <Modal
            title= "Rate and Review Instructor"
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          >
            <ReviewComponent />
          </Modal>
        </>
      ) : null}
    </>
  );
};

export default CourseComponentTrainee;
