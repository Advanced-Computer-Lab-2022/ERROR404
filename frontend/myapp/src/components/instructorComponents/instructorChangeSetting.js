import React, { useContext, useEffect } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import InstructorDashboard from "./InstructorDashboard";
import { AppContext } from "../../AppContext";
import App from "../../App";
import { UserSettingPage } from "../../pages/settingsPage";

const ChangeEmail = () => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  return (
    <InstructorDashboard>
      <UserSettingPage Settings="Change Email">
        <ChangeSomethingComponent changeWhat="Email" />
      </UserSettingPage>
    </InstructorDashboard>
  );
};

const UserChangeEmail = () => {
  return (
    <App>
      <UserSettingPage Settings="Change Email">
        <ChangeSomethingComponent changeWhat="Email" />
      </UserSettingPage>
    </App>
  );
};

const ChangeBio = () => {
  return (
    <InstructorDashboard>
      <UserSettingPage>
        <ChangeSomethingComponent changeWhat="Bio" />
      </UserSettingPage>
    </InstructorDashboard>
  );
};

export { ChangeEmail, ChangeBio };

const ChangeSomethingComponent = ({ changeWhat }) => {
  const { username, userType, userEmail } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [type, setType] = userType;
  const [email, setEmail] = userEmail;

  const onFinish = (values) => {
    const textValue = values.text;
    let url = "";
    let body = [];
    //username
    //email
    //type

    // change url to match whatever the backend wants
    if (changeWhat == "Bio") {
      url = "/editBio";
      body = {
        username: userName,
        bio: textValue,
        usertype: type,
      };
    } else if (changeWhat == "Email") {
      url = "/editEmail";
      body = {
        username: userName,
        email: textValue,
        usertype: type,
      };
    }

    axios
      .put(`http://localhost:2020${url}`, body)
      .then((data) => {
        message.success("Changes has been made!!");
        if (changeWhat == "Email") {
          setEmail(textValue);
        }
      })
      .catch((err) => {
        message.error("An unexpected error has occured", 5);
        console.log("error at change ", JSON.stringify(err));
      });
  };
  return (
    <Form name="nest-messages" onFinish={onFinish}>
      <Form.Item
        name="text"
        label={changeWhat}
        rules={[
          {
            required: true,
            message: `Please input your new ${changeWhat}`,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Change {changeWhat}
        </Button>
      </Form.Item>
    </Form>
  );
};

export { UserChangeEmail };
