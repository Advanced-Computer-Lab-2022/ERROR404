import React, { useContext, useState, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Avatar } from "antd";
import { AppContext } from "../AppContext";
import emailjs from "@emailjs/browser";

const ChangePasswordPage = () => {
  const { userEmail, userMongoId, userType, userName } = useContext(AppContext);
  const [useremail, setUserEmail] = userEmail;
  const [userId, setId] = userMongoId;
  const [typeUser, setUserType] = userType;
  const [name, setName] = userName;

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    let body =
      "We are sending you this email because you have asked to change your password, Press the below link to be redircted to the changing password page." +
      `http://localhost:3000/changingPasswordEmail?userId=${userId}&email=alilolo&userType=${typeUser}`;

    var data = {
      name: name,
      userId: userId,
      userType: typeUser,
      recepientEmail: useremail,
    };
    emailjs
      .send("service_5di6lsf", "template_mo9m7xe", data, "hIXXOv4x76p3JXKWU")
      .then(
        (result) => message.success("An Email has been sent successfully!! "),
        (error) => {
          message.error("Oops... " + JSON.stringify(error));
          console.log(JSON.stringify(error));
        }
      );
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
