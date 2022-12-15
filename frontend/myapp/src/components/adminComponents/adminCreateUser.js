import axios from "axios";
import { useState, useEffect, useContext } from "react";
import App from "../../App";
import {
  Layout,
  Button,
  Form,
  Input,
  Select,
  message,
  Steps,
  Space,
} from "antd";
import AdminDashboard from "./adminDashboard";
import { AppContext } from "../../AppContext";
const { Option } = Select;

const CreateAdmin = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;

  const [current, setCurrent] = useState(0);
  const [formUserType] = Form.useForm();
  const [formUserInfo] = Form.useForm();
  const [finalFormDisabled, setFinalFormDisabled] = useState(true);
  const [usertype, setUser] = useState("");

  const onFinish = (event) => {
    console.log(event);
    let url = "";
    const requestBody = {
      admin: userName,
      username: event.username,
      password: event.password,
    };
    if (formUserType.getFieldValue("type") == "admin") {
      url = "createAdmin";
    } else if (formUserType.getFieldValue("type") == "instructor") {
      url = "createInstructor";
    } else if (formUserType.getFieldValue("type") == "individual") {
      url = "createIndividualTrainee";
    } else if (formUserType.getFieldValue("type") == "coorporate") {
      url = "createCorporateTrainee";
    }
    axios
      .post("http://localhost:2020/" + url, requestBody)
      .then((response) => {
        message.success("user " + username + "has been created", 5);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
        message.error("Unexpected Error occured" + error.response.message, 5);
      });
  };

  const steps = [
    {
      title: "Set User Type",
      content: (
        <Space>
          <Form form={formUserType} onFinish={() => next()}>
            <Form.Item
              label="User Type"
              name="type"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                allowClear
                onChange={(e) => {
                  setUser(e);
                  console.log(e);
                }}
              >
                <Option value="admin">Admin</Option>
                <Option value="instructor">Instructor</Option>
                <Option value="coorporate">Corporate Trainee</Option>
                <Option value="individual">Individual Trainee</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
          </Form>
        </Space>
      ),
    },
    {
      title: "Set New User Information",
      content: (
        <Space>
          <Form form={formUserInfo} onFinish={() => next()}>
            <Form.Item
              label={"New " + usertype + " username"}
              name="username"
              rules={[{ required: true }]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={"New " + usertype + " password"}
              name="password"
              rules={[{ required: true }]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Next
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={() => prev()}>Previous</Button>
            </Form.Item>
          </Form>
        </Space>
      ),
    },
    {
      title: "Confirm Information",
      content: (
        <Space>
          <Form onFinish={onFinish}>
            <Form.Item
              label={"New " + usertype + " username"}
              name="username"
              hasFeedback
            >
              <Input
                defaultValue={formUserInfo.getFieldValue("username")}
                disabled={finalFormDisabled}
                rules={[{ required: true }]}
              />
            </Form.Item>
            <Form.Item
              label={"New " + usertype + " password"}
              name="password"
              hasFeedback
            >
              <Input
                value={formUserInfo.getFieldValue("password")}
                disabled={finalFormDisabled}
                rules={[{ required: true }]}
              />
            </Form.Item>
            <Form.Item>
              <Button type="link" onClick={() => setFinalFormDisabled(false)}>
                Edit
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Confirm {usertype} info
              </Button>
            </Form.Item>
            <Form.Item>
              <Button onClick={() => prev()}>Previous</Button>
            </Form.Item>
          </Form>
        </Space>
      ),
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <>
      <Steps current={current} items={items} />
      <div className="steps-content">{steps[current].content}</div>
    </>
  );
};

const CreateUserWrapper = () => {
  return (
    <>
      <AdminDashboard>
        <CreateAdmin />
      </AdminDashboard>
    </>
  );
};

export default CreateUserWrapper;
