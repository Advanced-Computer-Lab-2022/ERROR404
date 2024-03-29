import axios from "axios";
import { useState, useEffect, useContext } from "react";
import App from "../App";
import { Layout, Button, Form, Input, Select, message } from "antd";
import AdminDashboard from "./adminComponents/adminDashboard";
import { AppContext } from "../AppContext";
const { Option } = Select;
const CreateInstructorWrapper = () => {
  return (
    <>
      <AdminDashboard>
        <CreateInstructor />
      </AdminDashboard>
    </>
  );
};

const CreateInstructor = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;
  const onFinish = async (event) => {
    console.log("Success:", event);
    const password = event.password;
    const username = event.username;

    await createInstructor(username, password);
  };

  const createInstructor = async (username, password) => {
    const requestBody = {
      admin: userName,
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:2020/createInstructor", requestBody)
      .then((response) => {
        message.success("user " + username + " has been created", 5);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
        message.error("Unexpected Error occured" + error.response.message, 5);
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
        {/* <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your lastname!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Age" name="age">
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input />
        </Form.Item> */}

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

export default CreateInstructorWrapper;
