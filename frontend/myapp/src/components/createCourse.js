import axios from "axios";
import { useState, useEffect } from "react";

import { Button, Form, Input, InputNumber, message, Space, Card } from "antd";
import InstructorDashboard from "./instructorComponents/InstructorDashboard";
import { positions } from "@mui/system";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "semantic-ui-css/semantic.min.css";
// const { Option } = Selec
//import InstructorDashboard from "../pages/InstructorDashboard";

const WrapperCreateCourses = () => {
  return (
    <InstructorDashboard pageName="Create Course">
      <CreateCourse />
    </InstructorDashboard>
  );
};

const CreateCourse = () => {
  const onFinish = async (event) => {
    console.log("Success:", event);
    const id = event.instructorId;
    const title = event.title;
    const subject = event.subject;
    const subtitles = event.subtitles;
    const rating = event.rating;
    const price = event.price;
    const discount = event.discount;
    const summary = event.summary;
    const image = event.image;
    const totalHours = event.totalHours;
    const prerequisite = event.prequisite;
    const exercises = event.exercises;
    const previewURL = event.previewURL;
    const category = event.category;

    await createCourse(
      id,
      title,
      subject,
      subtitles,
      rating,
      price,
      discount,
      summary,
      image,
      totalHours,
      prerequisite,
      exercises,
      previewURL,
      category
    );
  };

  const createCourse = async (
    id,
    title,
    subject,
    subtitles,
    rating,
    price,
    discount,
    summary,
    image,
    totalHours,
    prerequisite,
    exercises,
    previewURL,
    category
  ) => {
    const requestBody = {
      id: "6366d3ddd79a066bc2b74106",
      title: title,
      subject: subject,
      subtitles: subtitles,
      rating: rating,
      price: price,
      discount: discount,
      summary: summary,
      image: image,
      totalHours: totalHours,
      prerequisite: prerequisite,
      exercises: exercises,
      previewURL: previewURL,
      category: category,
    };
    axios
      .post("http://localhost:2020/createCourse", requestBody)
      .then((response) => {
        message.success("Course " + title + " has been created", 5);
      })
      .catch((error) => {
        console.log("erorr ", error);
        message.error("Unexpected Error occured" + error.response.message, 5);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Create New Course</h1>

      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          width: "50%",
        }}
      >
        <Form.Item
          label="Course title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter a title for the course",
            },
          ]}
          style={{
            alignContent: "center",
            borderEndRadius: 200,
            width: 850,
            fontStyle: "italic",
          }}
        >
          <Input placeholder="please enter a title for the course" />
        </Form.Item>

        <Form.Item
          label="Course subjects"
          name="subject"
          rules={[
            {
              required: true,
              message: "Please enter subjects for the course",
            },
          ]}
          style={{
            alignContent: "center",
            borderRadius: 200,
            width: 850,
            fontStyle: "italic",
          }}
        >
          <Input placeholder="please enter the course subjects" />
        </Form.Item>

        <Form.List label="Course subtitles" name="subtitles">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "subtitle"]}
                    label="Add Subtitle"
                    rules={[
                      {
                        required: true,
                        message: "Missing subtitle",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "video"]}
                    label="Add Video"
                    rules={[
                      {
                        required: true,
                        message: "Missing video",
                      },
                      {
                        type: "url",
                        warningOnly: true,
                      },
                      {
                        type: "string",
                        min: 6,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    label="Add a Description"
                    rules={[
                      {
                        required: true,
                        message: "Missing description",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Click to add Course Subtitles
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Space
          style={{
            display: "flex",
            marginBottom: 8,
          }}
          //align="baseline"
        >
          <Form.Item
            style={{
              alignContent: "center",
              borderEndRadius: 200,
              width: 850,
              fontStyle: "italic",
            }}
          >
            <Input placeholder="please enter a title for the course" />
          </Form.Item>

          <Form.Item
            label="Course subjects"
            name="subject"
            rules={[
              {
                required: true,
                message: "Please enter subjects for the course",
              },
            ]}
            style={{
              alignContent: "center",
              borderRadius: 200,
              width: 850,
              fontStyle: "italic",
            }}
          >
            <Input placeholder="please enter the course subjects" />
          </Form.Item>
        </Space>

        <Form.List label="Course subtitles" name="subtitles">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: 8,
                  }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "subtitle"]}
                    label="Add Subtitle"
                    rules={[
                      {
                        required: true,
                        message: "Missing subtitle",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, "video"]}
                    label="Add Video"
                    rules={[
                      {
                        required: true,
                        message: "Missing video",
                      },
                      {
                        type: "url",
                        warningOnly: true,
                      },
                      {
                        type: "string",
                        min: 6,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    label="Add a Description"
                    rules={[
                      {
                        required: true,
                        message: "Missing description",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Click to add Course Subtitles
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Space
          style={{
            display: "flex",
            marginBottom: 8,
          }}
          //align="baseline"
        >
          <Form.Item
            style={{ width: "100%" }}
            label="Course price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please enter the course price",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Add a discount" name="discount">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Space>

        <Form.Item label="Add image" name="image">
          <Input addonBefore="https://" />
        </Form.Item>

        <Form.Item
          label="Course summary"
          name="summary"
          rules={[
            {
              required: true,
              message: "Please enter a summary for the course",
            },
          ]}
        >
          <Input addonBefore="https://" />
        </Form.Item>

        <Form.Item
          label="Total hours"
          name="totalHours"
          rules={[
            {
              required: true,
              message: "Please enter a total hours of the course",
            },
          ]}
          style={{
            alignContent: "center",
            borderEndRadius: 200,
            width: 850,
            fontStyle: "italic",
          }}
        >
          <Input placeholder="please enter the total hours of the course" />
        </Form.Item>

        <Form.Item
          label="Add image"
          name="image"
          style={{
            alignContent: "center",
            borderEndRadius: 200,
            width: 850,
            fontStyle: "italic",
          }}
        >
          <Input addonBefore="https://" placeholder="add a url" />
        </Form.Item>

        <Form.Item
          label="Total hours"
          name="totalHours"
          rules={[
            {
              required: true,
              message: "Please enter a total hours of the course",
            },
          ]}
          style={{
            alignContent: "center",
            borderEndRadius: 200,
            width: 850,
            fontStyle: "italic",
          }}
        >
          <Input placeholder="please enter the total hours of the course" />
        </Form.Item>

        <Form.Item
          label="Add a prerequisite"
          name="prerequisite"
          style={{
            alignContent: "center",
            borderEndRadius: 200,
            width: 850,
            fontStyle: "italic",
          }}
        >
          <Input placeholder="please enter the prequisites of the course" />
        </Form.Item>

        <Form.Item
          label="Course Preview Video"
          name="previewURL"
          rules={[
            {
              required: true,
              message: "Please enter a Course Preview Video",
            },
          ]}
          style={{
            alignContent: "center",
            borderEndRadius: 200,
            width: 850,
            fontStyle: "italic",
          }}
        >
          <Input addonBefore="https://" placeholder="add a url" />
        </Form.Item>

        <Form.Item
          label="Add a Category"
          name="category"
          style={{
            alignContent: "center",
            borderEndRadius: 200,
            width: 850,
            fontStyle: "italic",
          }}
        >
          <Input placeholder="Add the course category if needed" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WrapperCreateCourses;
