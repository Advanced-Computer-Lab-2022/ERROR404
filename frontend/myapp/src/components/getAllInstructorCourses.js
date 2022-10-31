import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select } from "antd";
import { Collapse } from "antd";
import App from "../App";

const { Panel } = Collapse;

const GetAllInstructorCoursesWrapper = () => {
  return (
    <App>
      <GetAllInstructorCourses />
    </App>
  );
};

const GetAllInstructorCourses = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("data =>  ", data);
  }, [data]);

  const GetAllInstructorCourses = (username, key) => {
    setIsModalOpen(true);
    axios({
      method: "get",
      url: "http://localhost:2020/searchmycourses/" + username + "/" + key,
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
      });
  };

  const [form] = Form.useForm();
  const onFinish = async (event) => {
    console.log(" => ", event);
    const value = event.username;
    const value2 = event.key;
    console.log(value);
    console.log(value2);

    await GetAllInstructorCourses(value, value2);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Form onFinish={onFinish} form={form} name="control-hooks">
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="key" label="Course Query" rules={[{ required: true }]}>
          <Input placeholder="enter a course price or subject" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Collapse defaultActiveKey={["1"]}>
          {console.log(data.length)}
          {data.map((course) => {
            console.log("here");
            return (
              <Panel header={course.title} key={course._id}>
                <p>Title: {course.title}</p>
                <p>Summary: {course.summary}</p>
                <p>Instructor: {course.instructor}</p>
                <p>Total Hours: {course.totalHours}</p>
              </Panel>
            );
          })}
        </Collapse>
      </Modal>
    </>
  );
};

export default GetAllInstructorCoursesWrapper;
