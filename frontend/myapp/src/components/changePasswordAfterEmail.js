import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Avatar } from "antd";
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
    console.log("Received values of form: ", values);
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
          label="Old Password"
          rules={[
            { required: true, message: "Please input your Old Password!" },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="New Password"
          label="New Password"
          rules={[
            { required: true, message: "Please input your New Password!" },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="Confirm New Password"
          label="Confirm New Password"
          rules={[{ required: true, message: "Please Confirm New Password!" }]}
        >
          <Input
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
