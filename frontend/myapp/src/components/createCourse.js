import axios from "axios";
import { useState, useEffect } from "react";
import App from "../App";
import {
  Layout,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Breadcrumb,
  Menu,
  message,
} from "antd";
const { Option } = Select;

const WrapperCreateCourses = () => {
  return (
    <App>
      <CreateCourse />
    </App>
  );
};

const CreateCourse = () => {
  const onFinish = async (event) => {
    console.log("Success:", event);
    const title = event.title;
    const subtitles = event.subtitles;
    const price = event.price;
    const summary = event.summary;
    const subject = event.subject;
    const totalHours = event.totalHours;

    await createCourse(title, subtitles, price, summary, subject, totalHours);
  };

  const createCourse = async (
    title,
    subtitle,
    price,
    summary,
    subject,
    totalHours
  ) => {
    const requestBody = {
      username: "abdoAli",
      title: title,
      subtitle: subtitle,
      price: price,
      summary: summary,
      video: "video",
      image: "image",
      subject: subject,
      totalHours: totalHours,
    };
    axios
      .post("http://localhost:2020/createCourse", requestBody)
      .then((response) => {
        message.success("course " + title + " has been created", 5);
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
      <span>Create New Course</span>
      <Form
        name="basic"
        labelCol={{
          span: 15,
        }}
        wrapperCol={{
          span: 25,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
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
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Course subtitles"
          name="subtitles"
          rules={[
            {
              required: true,
              message: "Please enter subtitles for the course",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
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
          <Input />
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
        >
          <Input />
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
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 15,
            span: 25,
          }}
        >
          <Button type="primary" htmlType="submit">
            Create Course
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default WrapperCreateCourses;
