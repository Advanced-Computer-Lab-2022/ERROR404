import React, { useContext, useEffect } from "react";
import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import InstructorDashboard from "../../pages/InstructorDashboard";
import { AppContext } from "../../AppContext";
import App from "../../App";
import { UserSettingPage } from "../../pages/settingsPage";

const ChangeEmail = () => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  if (user == "instructor") {
    return (
      <InstructorDashboard>
        <UserSettingPage>
          <ChangeSomethingComponent changeWhat="Email" />
        </UserSettingPage>
      </InstructorDashboard>
    );
  } else {
    return (
      <App>
        <ChangeSomethingComponent changeWhat="Email" />
      </App>
    );
  }
  return;
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
  const { username, userType } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [type, setType] = userType;

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
      .then((data) => message.success("Changes has been made!!"))
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
