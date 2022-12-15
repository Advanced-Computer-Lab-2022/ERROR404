import axios from "axios";
import { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";

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
import InstructorDashboard from "./instructorComponents/InstructorDashboard";
const { Option } = Select;

const WrapperCreateCourses = () => {
  return (
    <InstructorDashboard>
      <CreateCourse />
    </InstructorDashboard>
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
    const previewURL = event.previewURL;

    await createCourse(
      title,
      subtitles,
      price,
      summary,
      subject,
      totalHours,
      previewURL
    );
  };

  const createCourse = async (
    title,
    subtitle,
    price,
    summary,
    subject,
    totalHours,
    previewURL
  ) => {
    const requestBody = {
      username: "abdelrahman",
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
          label="Course Preview Video"
          name="previewURL"
          rules={[
            {
              required: true,
              message: "Please enter a Course Preview Video",
            },
          ]}
        >
          <Input addonBefore="https://" />
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
