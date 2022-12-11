import axios from "axios";
import { useState, useEffect, useContext } from "react";
import App from "../../App";
import { Layout, Button, Form, Input, Select, message } from "antd";
import AdminDashboard from "./adminDashboard";
import { AppContext } from "../../AppContext";
const { Option } = Select;

const CreateAdminWrapper = () => {
  return (
    <>
      <AdminDashboard>
        <CreateAdmin />
      </AdminDashboard>
    </>
  );
};

const CreateAdmin = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;

  const onFinish = async (event) => {
    console.log("Success:", event);
    const password = event.password;

    await createAdmin(password);
  };

  const createAdmin = async (username, password) => {
    const requestBody = {
      admin: userName,
      username: username,
      password: password,
    };
    axios
      .post("http://localhost:2020/createAdmin", requestBody)
      .then((response) => {
        message.success("user " + username + "has been created", 5);
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
    <div
      style={{
        textAlign: "center",
      }}
    >
      <span>Create New User</span>
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
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAdminWrapper;
