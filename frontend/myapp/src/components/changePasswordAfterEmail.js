import React, { useContext, useEffect, useId, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Avatar, message } from "antd";
import axios from "axios";
import { AppContext } from "../AppContext";

const ChangingPaswword = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [oldpassword, setoldpassword] = useState("");

  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const userId = urlParams.get("userId");
    const email = urlParams.get("email");
    const userType = urlParams.get("userType");
    setUserType(userType);
    setEmail(email);
    setUserId(userId);

    // let url = `http://localhost:2020/getUser/${userId}/${userType}`;
    // console.log(url);
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log("res=>>> ", response);
    //     response.map((user) => {
    //       setoldpassword(user.password);
    //     });
    //   });
    console.log("query params ", userId, " ", email, " ", userType);
  }, []);
  const onFinish = (values) => {
    const oldPassword = values.oldPassword;
    const newPassword = values.newPassword;

    console.log("old ", oldpassword);
    //if (oldPassword == oldpassword) {
    let body = {
      id: userId,
      newPassword: newPassword,
      usertype: userType,
    };
    // add fetch to change the password
    axios
      .put("http://localhost:2020/changePassword", body)
      .then(() => {
        message.success("you have changed your password successfully", 3);
        message.info("you can now close this tab", 5);
      })
      .catch((err) => {
        message.error(
          "An unexpected error has occurred " + err.response.data,
          3
        );
        console.log("error at change password ", JSON.stringify(err));
      });
    // } else {
    //   message.error("You have entered a wrong old password", 5);
    // }

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
        <span>{email}</span>
      </div>
      <Form
        name="changingpassword"
        className="changingpassword-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        {/* <Form.Item
          name="oldPassword"
          label="Old Password"
          rules={[
            { required: true, message: "Please input your Old Password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Old password"
          />
        </Form.Item> */}
        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            { required: true, message: "Please input your New Password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="New Password"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm New Password"
          dependencies={["password"]}
          hasFeedback
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
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm New Password"
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
