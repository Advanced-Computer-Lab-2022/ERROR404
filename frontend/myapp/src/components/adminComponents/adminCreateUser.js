import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
  Layout,
  Button,
  Form,
  Input,
  Select,
  message,
  Steps,
  Space,
  Result,
  Typography,
} from "antd";
import AdminDashboard from "./adminDashboard";
import { AppContext } from "../../AppContext";

import { CloseCircleOutlined, SmileOutlined } from "@ant-design/icons";
const { Option } = Select;

const CreateAdmin = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;

  const [current, setCurrent] = useState(0);
  const [formUserType] = Form.useForm();
  const [formUserInfo] = Form.useForm();
  const [finalFormDisabled, setFinalFormDisabled] = useState(true);
  const [usertype, setUser] = useState("");
  const [submitted, setSubmitted] = useState(0);

  const { Paragraph, Text } = Typography;

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
    } else if (formUserType.getFieldValue("type") == "corporate") {
      url = "createCorporateTrainee";
    }
    axios
      .post("http://localhost:2020/" + url, requestBody)
      .then((response) => {
        setSubmitted(1);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
        setSubmitted(2);
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
                <Option value="corporate">Corporate Trainee</Option>
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
  if (submitted == 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "50%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Steps current={current} items={items} />
            <div className="steps-content">{steps[current].content}</div>
          </div>
        </div>
      </div>
    );
  } else if (submitted == 1) {
    return (
      <Result
        icon={<SmileOutlined />}
        title="Great, we have done all the operations!"
        extra={<Button type="primary">Next</Button>}
      />
    );
  } else if (submitted == 2) {
    return (
      <Result
        status="error"
        title="Submission Failed"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          <Button
            type="primary"
            key="resubmit"
            onClick={() => {
              setSubmitted(0);
              setCurrent(0);
            }}
          >
            Resubmit User
          </Button>,
        ]}
      >
        <div className="desc">
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              The content you submitted has the following error:
            </Text>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="site-result-demo-error-icon" /> You
            may have entered an incorrect admin or unautherized
          </Paragraph>
        </div>
      </Result>
    );
  }
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
