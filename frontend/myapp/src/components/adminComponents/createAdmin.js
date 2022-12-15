import axios from "axios";
import { useState, useEffect, useContext } from "react";
import App from "../../App";
import { Layout, Button, Form, Input, Select, message, Steps } from "antd";
import AdminDashboard from "./adminDashboard";
import { AppContext } from "../../AppContext";
const { Option } = Select;

const CreateAdmin = () => {
  const [current, setCurrent] = useState(0);
  const [formUserName] = Form.useForm();
  const [formPass] = Form.useForm();

  const steps = [
    {
      title: "Set Admin Username",
      content: (
        <Form form={formUserName}>
          <Form.Item label="Admin Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Set Admin Password",
      content: (
        <Form form={formPass}>
          <Form.Item label="Admin Password" name="password" hasFeedback>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => prev()}>Previous</Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Confirm Information",
      content: (
        <Form form={formPass}>
          <Form.Item label="Admin Password" name="password" hasFeedback>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => prev()}>Previous</Button>
          </Form.Item>
        </Form>
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

const CreateAdminWrapper = () => {
  return (
    <>
      <AdminDashboard>
        <CreateAdmin />
      </AdminDashboard>
    </>
  );
};

// const CreateAdmin = () => {
//   const { username } = useContext(AppContext);
//   const [userName, setUserName] = username;

//   const onFinish = async (event) => {
//     console.log("Success:", event);
//     const password = event.password;

//     await createAdmin(password);
//   };

//   const createAdmin = async (username, password) => {
//     const requestBody = {
//       admin: userName,
//       username: username,
//       password: password,
//     };
//     axios
//       .post("http://localhost:2020/createAdmin", requestBody)
//       .then((response) => {
//         message.success("user " + username + "has been created", 5);
//       })
//       .catch((error) => {
//         console.log("erorr ", error.message);
//         message.error("Unexpected Error occured" + error.response.message, 5);
//       });
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };
//   return (
//     <div
//       style={{
//         textAlign: "center",
//       }}
//     >
//       <span>Create New User</span>
//       <Form
//         name="basic"
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         autoComplete="off"
//       >
//         <Form.Item
//           label="Username"
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: "Please input new admin username!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Password"
//           name="password"
//           rules={[
//             {
//               required: true,
//               message: "Please input new admin password!",
//             },
//           ]}
//           hasFeedback
//         >
//           <Input.Password />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Create
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

export default CreateAdminWrapper;
