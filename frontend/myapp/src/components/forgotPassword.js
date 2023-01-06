import React, { useContext, useState, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Avatar, Image } from "antd";
import { AppContext } from "../AppContext";
import emailjs from "@emailjs/browser";
import { UserSettingPage } from "../pages/settingsPage";
import App from "../App";
import InstructorDashboard from "./instructorComponents/InstructorDashboard";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPasswordPageWrapper = () => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;

  return (
    <App>
      <ForgotPasswordPage />
    </App>
  );
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
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "20%",
      }}
    >
      <Form
        layout="vertical"
        style={{
          width: "30%",
        }}
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
            Send Email
          </Button>
        </Form.Item>
        <div>
          <h5>
            <b>Have you forgotton your username?</b>
          </h5>
          <span>
            If you no longer remeber the username associated with your ERROR404
            account, you may contact{" "}
            <Link to="/reportaproblem">Customer Service</Link> for help
            restoring access to your account.
          </span>
        </div>
      </Form>
      <Image
        width="50%"
        src="https://s.udemycdn.com/teaching/billboard-desktop-v4.jpg"
      />
    </div>
  );
};

export default ForgotPasswordPageWrapper;
