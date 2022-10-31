import React, {useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select } from "antd";
import { Collapse } from "antd";
import App from "../App";

const { Panel } = Collapse;

const InstViewCoursesWrapper = () => {
  return (
    <App>
      <InstViewCourses />
    </App>
  );
};

const InstViewCourses = () => {
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

const instViewCourses = (user) => {
      setIsModalOpen(true);
      axios({
        method: "get",
        url: "http://localhost:2020/instViewCourses/" + user,
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
    //console.log(value2);

    await instViewCourses(event.user);
  };

  const onReset = () => {
    form.resetFields();
  };
  
    return (
      <>
      <Form onFinish={onFinish} form={form} name="control-hooks">
        
        <Form.Item name="user" label="Username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            View your Courses
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
              <Panel header={course.title} >
                <p>Title: {course.title}</p>
              </Panel>
            );
          })}
        </Collapse>
      </Modal>
    </>
    );
  };

export default InstViewCoursesWrapper;
