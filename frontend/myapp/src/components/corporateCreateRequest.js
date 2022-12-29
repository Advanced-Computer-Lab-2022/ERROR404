import App from "../App";
import React, { useState, useRef, useEffect, useContext } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Input, Modal, Button } from "antd";
import { Form, Space, message, Select } from "antd";
import { blueGrey, green, lightBlue } from "@mui/material/colors";
import { AppContext } from "../AppContext";
import axios from "axios";
const { Option } = Select;
// import message from 'react';

const CreateRequestWrapper = ({ courseId }) => {
  const [request, setRequest] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userType } = useContext(AppContext);
  const { username } = useContext(AppContext);
  const [user, setUser] = userType;
  const [userName, setUserName] = username;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const creatRequest = async () => {
    console.log(request);
    const requestBody = {
      username: userName,
      courseId: courseId,
      usertype: user,
    };

    axios
      .post("http://localhost:2020/createCorporateRequest", requestBody)

      .then((response) => {
        message.success("request sent");
      })
      .catch((error) => {
        console.log("erorr ", error.response.data);
        message.error("Unexpected Error occured", 5);
      });
  };

  const componentRef = useRef();

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Access course
      </Button>
      <Modal
        title="Request Course Acces"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ marginTop: 120, marginLeft: 420, height: 500 }}
      >
        <h2> Are you sure you want to request access?</h2>
        <Button type="primary" onClick={creatRequest}>
          Send Request
        </Button>
      </Modal>
    </>
  );
};

export default CreateRequestWrapper;

//////////////////////////////////////////////////

// import { Button, Form, Input, Rate, message, Space } from "antd";
// import axios from "axios";
// import React, { useContext, useState, useEffect } from "react";
// import { Select } from 'antd';

// const CourseRequest = () => {
//   const createRequest = async (event) => {
//     const requestBody = {
//       username: event.username,
//       courseTitle: event.courseTitle,
//       userType: event.userType,
//     };
//     axios
//       .patch("http://localhost:2020/createCorporateRequest", requestBody)
//       .then((response) => {
//         message.success("Your request has been sent", 5);
//       })
//       .catch((error) => {
//         console.log("erorr ", error);
//         message.error("Unexpected Error occured " + error, 5);
//       });
//   };

//   return (
//     <>
//       <Form
//         name="createRequest"
//         className="reviewIntructor-form"
//         onFinish={createRequest}
//         style={{
//           width: "90%",
//         }}
//       >
//         <Form.Item
//           name="username"
//           label="Enter your username"
//           rules={[{ required: true }]}
//         >
//           <Input placeholder="Enter your username" />
//         </Form.Item>

//         <Form.Item
//           name="courseTitle"
//           label="Enter the title of the course"
//           rules={[
//             { required: true, message: "Please enter the course title" },
//           ]}
//         >
//           <Input placeholder="Enter the course title" />
//         </Form.Item>
//         <Form.Item name="userType">
//           <Select
//             style={{
//               width: 160,
//             }}
//             allowClear
//             options={[
//               {
//                 value: "corporate",
//                 label: "Corporate Trainee",
//               },
//             ]}
//           />
//         </Form.Item>
//         </Form>
//         <Form.Item>
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="login-form-button"
//             style={{
//               width: "70%",
//               marginTop:"10%",
//               alignItems:"center",
//             }}
//           >
//             Submit Request
//           </Button>
//         </Form.Item>
//       <Form/>
//     </>
//   );
// };
// export default CourseRequest;
