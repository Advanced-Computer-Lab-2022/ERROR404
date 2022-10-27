import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select } from "antd";
import { Collapse } from "antd";
import App from "../App";
const { Option } = Select;

const { Panel } = Collapse;

const WrapperGetCourses = () => {
  return (
    <App>
      <SearchByForm />
    </App>
  );
};

const SearchByForm = () => {
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

  const getCourses = (value) => {
    setIsModalOpen(true);
    axios({
      method: "get",
      url: "http://localhost:2020/search/" + value,
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
    console.log(value);

    await getCourses(value);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Form onFinish={onFinish} form={form} name="control-hooks">
        <Form.Item name="Filter By: " label="filterType">
          <Select
            placeholder="Select a option and change input text above"
            allowClear
          >
            <Option value="Ttitle" key="Ttitle">
              By Ttitle
            </Option>
            <Option value="Price" key="Price">
              By Price
            </Option>
            <Option value="Subject" key="Subject">
              By Subject
            </Option>
            <Option value="Instructor" key="Instructor">
              By Instructor
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

export default WrapperGetCourses;
