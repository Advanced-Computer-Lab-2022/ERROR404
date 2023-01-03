import React, { useContext, useState, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Avatar } from "antd";
import { AppContext } from "../AppContext";
import emailjs from "@emailjs/browser";
import { UserSettingPage } from "../pages/settingsPage";
import App from "../App";
import InstructorDashboard from "./instructorComponents/InstructorDashboard";
import axios from "axios";

const ForgotPasswordPageWrapper = () => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  if (user == "instructor") {
    return (
      <InstructorDashboard>
        <ForgotPasswordPage />
      </InstructorDashboard>
    );
  } else {
    return (
      <App>
        <ForgotPasswordPage />
      </App>
    );
  }
};

const ForgotPasswordPage = () => {
  const { userEmail, userMongoId, userType, username } = useContext(AppContext);
  const [useremail, setUserEmail] = userEmail;
  const [userId, setId] = userMongoId;
  const [typeUser, setUserType] = userType;
  const [name, setName] = username;

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    axios
      .get(`http://localhost:2020/login/${values.username}`)
      .then((response) => {
        console.log(response);
        if (response.data != null || response.data.length > 0) {
          var data = {
            name: values.username,
            userId: response.data._id,
            userType: response.data.role,
            recepientEmail: response.data.email,
          };

          emailjs
            .send(
              "service_5di6lsf",
              "template_mo9m7xe",
              data,
              "hIXXOv4x76p3JXKWU"
            )
            .then(
              (result) =>
                message.success("An Email has been sent successfully!! ", 1),
              (error) => {
                message.error("Oops... " + error.response.data);
                console.log(JSON.stringify(error));
              }
            );
        } else {
          message.warning("username not found");
        }
      })
      .catch((err) => {
        console.log(err);
        message.warning("username not found");
      });
  };
  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        name="normal_login"
        className="change-password-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="input your username" />
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

export default ForgotPasswordPageWrapper;
