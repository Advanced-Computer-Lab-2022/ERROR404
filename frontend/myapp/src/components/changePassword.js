import React, { useContext, useState, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Avatar } from "antd";
import { AppContext } from "../AppContext";
import emailjs from "@emailjs/browser";
import { UserSettingPage } from "../pages/settingsPage";
import App from "../App";
import InstructorDashboard from "./instructorComponents/InstructorDashboard";
import TraineeDashboard from "./traineeComponents/TraineeDashboard";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const ChangePasswordPageWrapper = () => {
  const navigate = useNavigate();
  const { userEmail, userMongoId, userType, username, userPassword } =
    useContext(AppContext);
  const [useremail, setUserEmail] = userEmail;
  const [userId, setId] = userMongoId;
  const [typeUser, setUserType] = userType;
  const [name, setName] = username;
  const [oldPassword, setOldPassword] = userPassword;

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const logout = () => {
    setName("");
    setUserType("");
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const newPassword = values.newPassword;
    let body = {
      id: userId,
      newPassword: newPassword,
      usertype: typeUser,
    };
    if (oldPassword === values.oldPassword) {
      console.log("hello");
      axios
        .put("http://localhost:2020/changePassword", body)
        .then(() => {
          message.success("you have changed your password successfully", 1);
          setOldPassword(newPassword);
          logout();
          navigate("/");
        })
        .catch((err) => {
          message.error(
            "An unexpected error has occurred " + err.response.data,
            3
          );
          console.log("error at change password ", JSON.stringify(err));
        });
    } else {
      message.error("You have entered a wrong old password", 3);
    }
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
      <h4>Change Password</h4>

      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Form.Item
          name="oldPassword"
          rules={[
            { required: true, message: "Please input your old password!" },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Old Password"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="New Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "Please Confirm New Password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm New Password"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Change Password
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePasswordPageWrapper;
