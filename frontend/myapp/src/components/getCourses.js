import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Form, Input, Select, Slider, Collapse } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const { Panel } = Collapse;

const SearchByForm = ({ values }) => {
  const [data, setData] = useState([]);
  const [FilterType, setFilterType] = useState("");
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const navigate = useNavigate();

  useEffect(() => {}, [data]);

  const getCourses = (filterType, value) => {
    if (filterType == "price") {
      axios({
        method: "get",
        url: "http://localhost:2020/filterByPrice/" + min + "/" + max,
      })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log("erorr ", error.message);
        });
    } else {
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
    }
  };

  const [form] = Form.useForm();
  const onFinish = async (event) => {
    const value = event.value;
    const filterType = FilterType;
    if (filterType == "price") {
      navigate(
        "/filter?filterType=" + filterType + "&min=" + min + "&max=" + max
      );
    } else {
      navigate("/filter?filterType=" + filterType + "&value=" + value);
    }

    getCourses(filterType, value);
  };
  const onChange = async () => {
    setFilterType(form.getFieldValue("filterType"));
  };
  const change = async (value) => {
    setMax(value[1]);
    setMin(value[0]);
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
            onChange={onChange}
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
        {form.getFieldValue("filterType") == "price" ? (
          <Form.Item name="value1" label="value" rules={[{ required: true }]}>
            <Slider
              onChange={change}
              range={{
                draggableTrack: true,
              }}
              defaultValue={[0, 5000]}
              max={5000}
            />
          </Form.Item>
        ) : (
          <Form.Item name="value" label="value" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        )}
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
