import React, { useContext, useEffect } from "react";
import { Button, Form, Input, InputNumber } from "antd";
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
  const onFinish = (values) => {
    const textValue = values.text;
    let url = "";

    // change url to match whatever the backend wants
    if (changeWhat == "Bio") {
    } else if (changeWhat == "Email") {
    }

    // axios. add the callout
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
