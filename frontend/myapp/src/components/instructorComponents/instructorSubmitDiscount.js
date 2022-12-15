import React from "react";
import { Button, Checkbox, Form, Input, message, DatePicker } from "antd";
import axios from "axios";
import InstructorDashboard from "./InstructorDashboard";

const SubmitDiscount = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
    const body = {
      courseId: values.courseId,
      discount: values.discountValue,
      date: values.endDate,
    };

    axios
      .put("http://localhost:2020/submitDiscount", body)
      .then(() => {
        message.success("discount added", 3);
      })
      .catch(() => {
        message.error("error", 3);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <InstructorDashboard>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Course Id"
          name="courseId"
          rules={[
            {
              required: true,
              message: "Please input your Course Id!",
            },
          ]}
        >
          <Input />
        </Form.Item>

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
    </InstructorDashboard>
  );
};
export default SubmitDiscount;
