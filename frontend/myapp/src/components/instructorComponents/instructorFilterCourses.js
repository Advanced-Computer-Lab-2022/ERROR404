import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select } from "antd";
import { Collapse } from "antd";
const { Option } = Select;

const { Panel } = Collapse;

const InstructorFilter = () => {
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

  const getCourses = (filterType, value) => {
    setIsModalOpen(true);
    console.log("filename ", filterType);
    axios({
      method: "get",
      url: "http://localhost:2020/filter/" + filterType + "/" + value,
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
    const value = event.value;
    const filterType = event.filterType;
    console.log(value);

    await getCourses(filterType, value);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Form onFinish={onFinish} form={form} name="control-hooks">
        <Form.Item label="Filter By:" name="filterType">
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="title" key="Title">
              By Title
            </Option>
            <Option value="price" key="Price">
              By Price
            </Option>
            <Option value="subject" key="Subject">
              By Subject
            </Option>
          </Select>
        </Form.Item>
        <Form.Item name="value" label="value" rules={[{ required: true }]}>
          <Input />
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
          {data.map((course) => {
            console.log("here");
            return (
              <Panel header={course.title} key={course._id}>
                <p>Title: {course.title}</p>
                <p>Summary: {course.summary}</p>
                <p>Instructor: {course.instructor}</p>
                <p>Price: {course.price}</p>
                <p>rating: {course.rating}</p>
                <p>Total Hours: {course.totalHours}</p>
                <p>Subject: {course.subject}</p>
                <p>Discount: {course.discount}</p>
              </Panel>
            );
          })}
        </Collapse>
      </Modal>
    </>
  );
};

export default InstructorFilter;
