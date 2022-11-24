import React, { useContext, useState, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Avatar } from "antd";
import { AppContext } from "../AppContext";

const ChangePasswordPage = () => {
  const { userEmail } = useContext(AppContext);
  const [useremail, setUserEmail] = userEmail;

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="changePasswordWrapper">
      <h4>
        We will be sending you an email to {useremail} to change the password
      </h4>

      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => {
              message.info("Hello, Ant Design!");
            }}
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

export default ChangePasswordPage;
