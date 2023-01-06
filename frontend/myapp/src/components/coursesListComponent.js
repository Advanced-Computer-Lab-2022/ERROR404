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
  Collapse,
} from "antd";
import { AppContext } from "../AppContext";
import axios from "axios";
import { json, Link, Navigate, useNavigate } from "react-router-dom";
import SubmitDiscount from "./instructorComponents/instructorSubmitDiscount";
import CreateRequestWrapper from "./corporateCreateRequest";
import SearchByForm from "./getCourses";
import TopCourses from "./topCourses";
import SearchBar from "./search";
import { height } from "@mui/system";
import InstructorFilterCourses from "./instructorComponents/instructorFilterCourses";
const { Panel } = Collapse;
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CourseComponent = ({ courses, viewType }) => {
  const { userType, traineeCourses } = useContext(AppContext);
  const [user, setUser] = userType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDis, setIsModalOpenDis] = useState(false);
  const [courseTitle, setTitle] = useState("");
  const [traineeRegCourses, setTraineeCourses] = traineeCourses;

  const [id, setId] = useState("");

  let navigation = useNavigate();
  const onFinish1 = (values, id) => {
    console.log("Success:", id);
    const body = {
      courseId: id,
      discount: values.discountValue,
      date: values.endDate,
    };

    axios
      .put("http://localhost:2020/submitDiscount", body)
      .then(() => {
        message.success("discount added", 1);
      })
      .catch((err) => {
        console.log("hal;a ", err);
        message.error("error " + err.response.data, 1);
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
  const showModal = () => {
    setIsModalOpen(true);
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
          onFinish={(e) => {
            onFinish1(e, id);
            modal.destroy();
          }}
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
            <Button htmlType="submit">Submit</Button>
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
        <Form
          onFinish={(e) => {
            onFinish(e, id);
            modal.destroy();
          }}
        >
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
            <Button htmlType="submit">Add URL</Button>
          </Form.Item>
        </Form>
      ),
    });
  };

  const onFinish = (values, id) => {
    setIsModalOpen(false);
    const url = values.url;

    let body = {
      id: id,
      url: url,
    };
    console.log(body);
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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "5px",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "20%",
          height: "100vh",
        }}
      >
        {user == "instructor" && viewType == "instructor" ? (
          <InstructorFilterCourses />
        ) : (
          <SearchByForm />
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          gap: "40px",
        }}
      >
        <TopCourses />
        <br />
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <SearchBar />
        </div>

        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
              window.scrollTo(0, 0);
            },
            pageSize: 3,
          }}
          dataSource={courses}
          renderItem={(item) => (
            <div>
              <List.Item
                key={item._id}
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
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        onClick={() => {
                          if (
                            (user == "corporate" || user == "individual") &&
                            traineeRegCourses.includes(item._id)
                          ) {
                            navigation("/trainee/course?courseId=" + item._id);
                          } else {
                            navigation("/course/about?courseId=" + item._id);
                          }
                        }}
                      >
                        Open course
                      </Button>
                    </div>
                    {user == "corporate" &&
                    !traineeRegCourses.includes(item._id) ? (
                      <>
                        <CreateRequestWrapper courseId={item._id} />{" "}
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
                          onClick={() => {
                            openPreview(item._id, item.title);
                          }}
                        >
                          Add preview video
                        </Button>
                        <Button
                          style={{ width: "100%" }}
                          onClick={() => {
                            navigation("/createQuiz?courseId=" + item._id);
                          }}
                        >
                          Create Quiz
                        </Button>
                        <Button
                          style={{ width: "100%" }}
                          onClick={() => {
                            openDis(item._id, item.title);
                          }}
                        >
                          Add Dicount
                        </Button>
                        <Link to={"/course/reviews?courseId=" + item._id}>
                          <Button
                            style={{ width: "100%" }}
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
                <Collapse bordered={false} ghost>
                  <Panel header="More Info" key={item._id}>
                    <List
                      size="small"
                      header={<div>Subtitles</div>}
                      dataSource={item.subtitles}
                      renderItem={(sub) => (
                        <List.Item>{sub.subtitle}</List.Item>
                      )}
                    />
                    <p>{"Instructor " + item.instructor}</p>
                    <p>{"Exercises " + item.questions.length}</p>
                    <p>{"Discount " + item.discount.value + "%"}</p>
                  </Panel>
                </Collapse>
              </List.Item>
            </div>
          )}
        />
        {user == "instructor" ? <></> : null}
      </div>
    </div>
  );
};

export default CourseComponent;
