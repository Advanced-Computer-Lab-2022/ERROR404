import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select } from "antd";
import { Collapse } from "antd";
import App from "../App";
const { Option } = Select;

const { Panel } = Collapse;

const ViewAllCoursesWrapper = () => {
    return (
      <App>
        <ViewAllCourses />
      </App>
    );
  };

  const ViewAllCourses = () => {
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

const ViewAllCourses = () => {
    setIsModalOpen(true);
    axios({
      method: "get",
      url: "http://localhost:2020/viewCourses ",
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
    console.log(event);

    await ViewAllCourses();
  };

  return (
    <>
      <Form onFinish={onFinish} form={form} name="control-hooks">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            ViewAllCourses
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
                <p>Total Hours: {course.totalHours}</p>
                <p>Rating: {course.rating}</p>
        
              </Panel>
            );
          })}
        </Collapse>
      </Modal>
    </>
  );
};

export default ViewAllCoursesWrapper;
