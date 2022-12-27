// import axios from "axios";
// import { useState, useEffect } from "react";
// import "semantic-ui-css/semantic.min.css";
// import App from "../../App";
// import { Button, Form, Input, InputNumber, Select, message, Space } from "antd";
// const { Option } = Select;

// const WrapperSignUp = () => {
//   return (
//     <App>
//       <SignUp />
//     </App>
//   );
// };

// const formItemLayout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 14 },
// };

// const SignUp = () => {
//   //const [passwordVisible, setPasswordVisible] = React.useState(false);
//   const onFinish = async (event) => {
//     console.log("Success:", event);
//     const firstname = event.firstname;
//     const lastname = event.lastname;
//     const email = event.email;
//     const username = event.username;
//     const password = event.password;
//     const gender = event.gender;
//     const age = event.age;

//     await signUp(firstname, lastname, email, username, password, gender, age);
//   };

//   const signUp = async (
//     firstname,
//     lastname,
//     email,
//     username,
//     password,
//     gender,
//     age
//   ) => {
//     const requestBody = {
//       firstname: firstname,
//       lastname: lastname,
//       email: email,
//       username: username,
//       password: password,
//       gender: gender,
//       age: age,
//     };
//     axios
//       .post("http://localhost:2020/createIndividualTrainee", requestBody)
//       .then((response) => {
//         message.success("User " + username + " has been created", 5);
//       })
//       .catch((error) => {
//         console.log("erorr ", error);
//         message.error("Unexpected Error occured" + error.response.message, 5);
//       });
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           textAlign: "center",
//           width: "50%",
//           height: "70%",
//           backgroundColor: "white",
//           gap: "1%",
//           borderRadius: "20%",
//         }}
//       >
//         <h1>Sign Up</h1>
//         <Form
//           {...formItemLayout}
//           name="basic"
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//           style={{
//             width: "50%",
//           }}
//         >
//           <Form.Item
//             label="First Name"
//             name="firstname"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter your name",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Last Name"
//             name="lastname"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter your last name",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="E-mail"
//             name="email"
//             rules={[
//               {
//                 type: "email",
//                 message: "The input is not valid E-mail!",
//               },
//               {
//                 required: true,
//                 message: "Please enter your E-mail!",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             label="Username"
//             name="username"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter a username",
//               },
//             ]}
//           >
//             <Input />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             label="Password"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter your password!",
//                 min: 5,
//               },
//             ]}
//             hasFeedback
//           >
//             <Input.Password />
//           </Form.Item>

//           <Form.Item
//             name="confirm"
//             label="Confirm Password "
//             dependencies={["password"]}
//             hasFeedback
//             rules={[
//               {
//                 required: true,
//                 message: "Please confirm your password!",
//                 min: 5,
//               },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue("password") === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(
//                     new Error(
//                       "The two passwords that you entered do not match!"
//                     )
//                   );
//                 },
//               }),
//             ]}
//           >
//             <Input.Password />
//           </Form.Item>

//           <Space
//             style={{
//               display: "flex",
//               marginBottom: 8,
//             }}
//             //align="baseline"
//           >
//             <Form.Item
//               label="Gender"
//               name="gender"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please select gender!",
//                 },
//               ]}
//             >
//               <Select
//                 placeholder="Select your gender"
//                 style={{ width: "100%" }}
//               >
//                 <Option value="male">Male</Option>
//                 <Option value="female">Female</Option>
//                 <Option value="other">Other</Option>
//               </Select>
//             </Form.Item>

//             <Form.Item label="Age" name="age">
//               <InputNumber style={{ width: "100%" }} />
//             </Form.Item>
//           </Space>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Sign Up
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default WrapperSignUp;

import axios from "axios";
import { useState, useEffect } from "react";
import "semantic-ui-css/semantic.min.css";

import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  InputNumber,
  message,
  Image,
  Checkbox,
} from "antd";
const { Option } = Select;

const WrapperSignUp = ({ values }) => {
  const [open, setOpen] = values;
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onFinish = async (event) => {
    console.log("Success:", event);
    const firstname = event.firstname;
    const lastname = event.lastname;
    const email = event.email;
    const username = event.username;
    const password = event.password;
    const gender = event.gender;
    const age = event.age;

    await signUp(firstname, lastname, email, username, password, gender, age);
  };

  const signUp = async (
    firstname,
    lastname,
    email,
    username,
    password,
    gender,
    age
  ) => {
    const requestBody = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: password,
      gender: gender,
      age: age,
    };
    axios
      .post("http://localhost:2020/createIndividualTrainee", requestBody)
      .then((response) => {
        message.success("User " + username + " has been created", 5);
      })
      .catch((error) => {
        console.log("erorr ", error);
        message.error("Unexpected Error occured" + error.response.message, 5);
      });
  };

  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            width={200}
            preview={false}
            src="https://drnajafbeigi.com/wp-content/uploads/404%D8%AB.png"
          />
          <Form
            layout="vertical"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              style={{
                width: "100%",
              }}
              label="First Name"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "Please enter your name",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{
                width: "100%",
              }}
              label="Last Name"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please enter your last name",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{
                width: "100%",
              }}
              label="E-mail"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please enter your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{
                width: "100%",
              }}
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please enter a username",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              style={{
                width: "100%",
              }}
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password!",
                  min: 5,
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              style={{
                width: "100%",
              }}
              name="confirm"
              label="Confirm Password "
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                  min: 5,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Space
              style={{
                display: "flex",
                marginBottom: 8,
              }}
              //align="baseline"
            >
              <Form.Item
                label="Gender"
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please select gender!",
                  },
                ]}
              >
                <Select
                  placeholder="Select your gender"
                  style={{ width: "100%" }}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Age" name="age">
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Space>
            <Form.Item name="accept" style={{ alignSelf: "center" }}>
              <Checkbox
                onChange={() => {
                  document.getElementById("submit_button").disabled =
                    !document.getElementById("submit_button").disabled;
                }}
              >
                I agree to the{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://localhost:3000/terms"
                >
                  Terms of Service
                </a>
              </Checkbox>
            </Form.Item>
            <Form.Item style={{ alignSelf: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                id="submit_button"
                disabled
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </>
  );
};
export default WrapperSignUp;
