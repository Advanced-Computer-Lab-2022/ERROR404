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
import { AppContext } from "../AppContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SubmitDiscount from "./instructorComponents/instructorSubmitDiscount";
import CreateRequestWrapper from "./corporateCreateRequest";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CourseComponent = ({ courses, viewType }) => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDis, setIsModalOpenDis] = useState(false);
  const [courseTitle, setTitle] = useState("");
  const [id, setId] = useState("");

  let navigation = useNavigate();
  const onFinish1 = (values) => {
    console.log("Success:", values);
    const body = {
      courseId: id,
      discount: values.discountValue,
      date: values.endDate,
    };

    axios
      .put("http://localhost:2020/submitDiscount", body)
      .then(() => {
        message.success("discount added", 3);
      })
      .catch((err) => {
        message.error("error " + err.response.data, 3);
      });
  };
  const onFinishFailed1 = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    console.log(courses);
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openDis = (id, courseTitle) => {
    const modal = Modal.confirm();

    modal.update({
      title: "Updated " + courseTitle,
      content: (
        <Form
          onFinish={onFinish1}
          onFinishFailed={onFinishFailed1}
          autoComplete="off"
        >
          <Form.Item
            label="Dicount Value"
            name="discountValue"
            rules={[
              {
                required: true,
                message: "Please input your Dicount Value!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Please input your End Date!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ),
    });
  };

  const openPreview = (id, courseTitle) => {
    const modal = Modal.success();

    modal.update({
      title: "Updated " + courseTitle,
      content: (
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
      ),
    });
  };

  const onFinish = (values) => {
    setIsModalOpen(false);
    console.log(values);
    const url = values.url;

    let body = {
      id: id,
      url: url,
    };

    axios
      .put("http://localhost:2020/uploadPreviewVideoForCourse", body)
      .then(() => {
        message.success("URL added succesffully", 3);
      })
      .catch((err) => {
        console.log("error at add preview url ", JSON.stringify(err));
        message.error("Unexpected error has occured " + err.response.data, 3);
      });
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
              onClick={() => {
                if (user == "instructor" && viewType == "instructor") {
                  setIsModalOpen(true);
                } else if (user == "individual") {
                  navigation("/course/about?courseId=" + item._id);
                }
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
                  {user == "corporate" ? (
                    <>
                      <CreateRequestWrapper />{" "}
                      <Button
                        onClick={() => {
                          navigation("/course/about?courseId=" + item._id);
                        }}
                      >
                        View Course
                      </Button>
                    </>
                  ) : null}
                  {user == "instructor" && viewType == "instructor" ? (
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
                          openPreview(item._id, item.title);
                        }}
                      >
                        Add preview video
                      </Button>
                      <Button
                        style={{ width: "100%" }}
                        type="dashed"
                        onClick={() => {
                          navigation("createQuiz?courseId=" + item._id);
                        }}
                      >
                        Create Quiz
                      </Button>
                      <Button
                        style={{ width: "100%" }}
                        type="dashed"
                        onClick={() => {
                          openDis(item._id, item.title);
                        }}
                      >
                        Add Dicount
                      </Button>
                      <Link to={"reviews?courseId=" + item._id}>
                        <Button
                          style={{ width: "100%" }}
                          type="dashed"
                          onClick={() => {
                            setTitle(item.title);
                            setId(item._id);
                          }}
                        >
                          View Reviews
                        </Button>
                      </Link>
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
              />
              {<Rate allowHalf defaultValue={item.rating} disabled={true} />}
            </List.Item>
          </div>
        )}
      />
      {user == "instructor" ? <></> : null}
    </>
  );
};

export default CourseComponent;
