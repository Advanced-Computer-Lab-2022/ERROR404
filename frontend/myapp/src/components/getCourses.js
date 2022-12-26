import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select } from "antd";
import { Collapse } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const { Panel } = Collapse;

const SearchByForm = ({ values }) => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {}, [data]);

  const getCourses = (filterType, value) => {
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
    setIsModalOpen(false);
    navigate("/filter?filterType=" + filterType + "&value=" + value);
    getCourses(filterType, value);
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
            <Option value="instructor" key="Instructor">
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
    </>
  );
};

export default SearchByForm;
