import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Slider,
  Collapse,
  Rate,
  Space,
  List,
  Tooltip,
  Radio,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
const { Option } = Select;
const { Panel } = Collapse;
const SearchByForm = ({ values }) => {
  const { Search } = Input;
  const [FilterType, setFilterType] = useState("");
  let [min, setMin] = useState();
  let [max, setMax] = useState();
  const navigate = useNavigate();
  const [Category, setCategory] = useState();
  const [value, setValue] = useState(1);
  let form = Form.useFormInstance();
  useEffect(() => {
    axios
      .get("http://localhost:2020/getCategory")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
      });
  }, []);

  const onSearch = (value) => {
    setValue(value);
    navigate(`/filter?filterType=${FilterType}&value=${value}`);
  };
  const c = (value) => {
    setFilterType(value);
  };
  const change = async (value) => {
    setMax(value[1]);
    setMin(value[0]);
  };
  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const rating = (event) => {
    navigate(`/filter?filterType=rate&min=${event.rating}&max=5`);
  };
  const price = () => {
    navigate(`/filter?filterType=price&min=${min}&max=${max}`);
  };
  const category = () => {
    navigate("/filter?filterType=category&category=" + value);
  };
  return (
    <div>
      <h1 style={{ color: "black" }}>Filter</h1>
      <Collapse
        bordered={true}
        defaultActiveKey={["1", "2", "3", "4"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        <Panel header="Rating" key="1" className="site-collapse-custom-panel">
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              alignContent: "flex-start",
              gap: "10%",
            }}
            onFinish={rating}
          >
            <Form.Item name="rating">
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={4.5}>
                    <Rate
                      disabled
                      name="Rate"
                      precision={0.5}
                      defaultValue={4.5}
                      allowHalf
                    ></Rate>
                  </Radio>
                  <Radio value={4}>
                    <Rate
                      disabled
                      name="Rate"
                      precision={0.5}
                      defaultValue={4}
                      allowHalf
                    ></Rate>
                  </Radio>
                  <Radio value={3.5}>
                    <Rate
                      disabled
                      name="Rate"
                      precision={0.5}
                      defaultValue={3.5}
                      allowHalf
                    ></Rate>
                  </Radio>
                  <Radio value={3}>
                    <Rate
                      disabled
                      name="Rate"
                      precision={0.5}
                      defaultValue={3}
                      allowHalf
                    ></Rate>
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Tooltip>
              <Button
                type="primary"
                htmlType="submit"
                shape="circle"
                icon={<SearchOutlined />}
                style={{ alignSelf: "center" }}
              ></Button>
            </Tooltip>
          </Form>
        </Panel>

        <Panel
          header="Price"
          key="2"
          className="site-collapse-custom-panel"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "5%",
          }}
        >
          <Form onFinish={price}>
            <Form.Item name="price">
              <Tooltip>
                <Button
                  htmlType="submit"
                  type="primary"
                  shape="circle"
                  icon={<SearchOutlined />}
                  onClick={() => {
                    setMax(0);
                    setMin(0);
                  }}
                ></Button>
                Our free courses
              </Tooltip>
            </Form.Item>
            <Form.Item>
              <Slider
                label="Budget"
                id="slider"
                onChange={change}
                range={{
                  draggableTrack: true,
                }}
                defaultValue={[0, 5000]}
                max={5000}
              />
            </Form.Item>
            <br />
            <Form.Item>
              <Tooltip>
                <Button
                  type="primary"
                  shape="circle"
                  icon={<SearchOutlined />}
                  style={{ alignSelf: "center" }}
                  htmlType="submit"
                ></Button>
              </Tooltip>
            </Form.Item>
          </Form>
        </Panel>
        <Panel
          header="Categotry"
          key="3"
          className="site-collapse-custom-panel"
        >
          <Form onFinish={category}>
            <Form.Item>
              <List
                itemLayout="horizontal"
                dataSource={Category}
                renderItem={(item) => (
                  <List.Item>
                    <Radio.Group
                      onChange={onChange}
                      value={value}
                      name="radioCategory"
                    >
                      <Space direction="vertical">
                        <Radio value={item}>{item}</Radio>
                      </Space>
                    </Radio.Group>
                  </List.Item>
                )}
              />
              <Tooltip>
                <Button
                  type="primary"
                  shape="circle"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  style={{ alignSelf: "center" }}
                ></Button>
              </Tooltip>
            </Form.Item>
          </Form>
        </Panel>

        <Panel
          header="Title,Subject or Instructor"
          key="4"
          className="site-collapse-custom-panel"
        >
          <Form form={form}>
            <Form.Item name="filtertype">
              <Select
                name="filtertype"
                placeholder="Select a option and change input text above"
                allowClear
                onChange={c}
              >
                <Option value="title" key="Title">
                  By Title
                </Option>

                <Option value="subject" key="Subject">
                  By Subject
                </Option>
                <Option value="instructor" key="instructor">
                  By Instructor
                </Option>
              </Select>
            </Form.Item>
            <Form.Item name="data">
              <Search
                type="primary"
                placeholder="input search text"
                style={{
                  width: 200,
                }}
                onSearch={onSearch}
              />
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    </div>
  );
};

export default SearchByForm;
