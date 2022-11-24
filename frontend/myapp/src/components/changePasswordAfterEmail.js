import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Avatar, message } from "antd";
import axios from "axios";

const ChangingPaswword = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const userId = urlParams.get("userId");
    const email = urlParams.get("email");
    setEmail(email);
    setUserId(userId);
    console.log(userId, " ", email);
  }, []);
  const onFinish = (values) => {
    const oldPassword = values.oldPassword;
    const newPassword = values.newPassword;
    const confirmNewPassword = values.confirmNewPassword;

    axios.get()

    console.log("Received values of form: ", values);
    message.info("Hello world", 5);
  };

  return (
    <div className="changePasswordWrapper">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Avatar size={"medium"} icon={<UserOutlined />} />
        <span>alighieth</span>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="Old Password"
          label="oldPassword"
          rules={[
            { required: true, message: "Please input your Old Password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="New Password"
          label="newPassword"
          rules={[
            { required: true, message: "Please input your New Password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="Confirm New Password"
          label="confirmNewPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please Confirm New Password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{
              width: "100%",
            }}
          >
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangingPaswword;
