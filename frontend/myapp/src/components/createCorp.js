import axios from "axios";
import { useState, useEffect } from "react";
import App from "../App";
import { Layout, Button, Form, Input, Select, message } from "antd";
import AdminDashboard from "./adminComponents/adminDashboard";
const { Option } = Select;

const CreateCorporateWrapper = () => {
  return (
    <>
      <AdminDashboard>
        <CreateCorporate />
      </AdminDashboard>
    </>
  );
};

const CreateCorporate = () => {
  const onFinish = async (event) => {
    console.log("Success:", event);
    const password = event.password;
    const username = event.username;

    await createCorporate(username, password);
  };

  const createCorporate = async (username, password) => {
    const requestBody = {
      currentUser: "alighieth",
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:2020/createCorporateTrainee", requestBody)
      .then((response) => {
        message.success("user " + username + " has been created", 1);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
        message.error("Unexpected Error occured" + error.response.message, 1);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <span>Create New User</span>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item label="Parent Admin Username" name="Parentusername">
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input new admin username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input new admin password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCorporateWrapper;
