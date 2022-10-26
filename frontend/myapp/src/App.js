import "./App.css";
import { useState, useEffect } from "react";
import { Layout, Button, Checkbox, Form, Input, Select } from "antd";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

function App() {
  return (
    <Layout>
      <Sider>Sider</Sider>
      <Layout style={{ minHeight: "100vh" }}>
        <Header>Header</Header>
        <Content style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
          <CreateAdmin />
          <GetCoursesByPrice />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

const GetCoursesByPrice = () => {
  const [data, setData] = useState("");

  const getCourses = () => {
    fetch("http://localhost:2020/search/125", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("the data => ", data);
        setData(data);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
      });
  };

  return (
    <Button type="primary" onClick={getCourses}>
      Get Courses at price 124
    </Button>
  );
};

const CreateAdmin = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <span>Create New User</span>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your lastname!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Age" name="age">
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
