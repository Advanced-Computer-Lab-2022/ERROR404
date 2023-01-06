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
  Popover,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  CaretRightOutlined,
  SearchOutlined,
  FilterFilled,
} from "@ant-design/icons";
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
    navigate(`/filter?filterType=price&min=${value[0]}&max=${value[1]}`);
  };
  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
    navigate(`/filter?filterType=rate&min=${e.target.value}&max=5`);
  };

  const category = (e) => {
    setValue(e.target.value);
    navigate("/filter?filterType=category&category=" + e.target.value);
  };

  const marks = {
    0: "0",
    1000: "1000",
    2000: "2000",
    3000: "3000",
    4000: "4000",
  };

  return (
    <div>
      <h1 style={{ color: "black" }}> Filter By</h1>
      <Collapse
        bordered={true}
        defaultActiveKey={["0", "reset", "1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
        ghost
      >
        <Panel header="Reset Filter" key="reset">
          <Button type="link" onClick={() => navigate("/viewallcourses")}>
            clear filter
          </Button>
        </Panel>
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
          >
            <Form.Item name="rating">
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Popover placement="right" content="4.5 and above">
                    <Radio value={4.5}>
                      <Rate
                        disabled
                        name="Rate"
                        precision={0.5}
                        defaultValue={4.5}
                        allowHalf
                        style={{
                          color: "red",
                        }}
                      ></Rate>
                    </Radio>
                  </Popover>
                  <Popover placement="right" content="4 and above">
                    <Radio value={4}>
                      <Rate
                        disabled
                        name="Rate"
                        precision={0.5}
                        defaultValue={4}
                        allowHalf
                        style={{
                          color: "red",
                        }}
                      ></Rate>
                    </Radio>
                  </Popover>
                  <Popover placement="right" content="3.5 and above">
                    <Radio value={3.5}>
                      <Rate
                        disabled
                        name="Rate"
                        precision={0.5}
                        defaultValue={3.5}
                        allowHalf
                        style={{
                          color: "red",
                        }}
                      ></Rate>
                    </Radio>
                  </Popover>
                  <Popover placement="right" content="3 and above">
                    <Radio value={3}>
                      <Rate
                        disabled
                        name="Rate"
                        precision={0.5}
                        defaultValue={3}
                        allowHalf
                        style={{
                          color: "red",
                        }}
                      ></Rate>
                    </Radio>
                  </Popover>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Panel>

        <Panel
          header="Price"
          key="2"
          className="site-collapse-custom-panel"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Form>
            <Form.Item name="price">
              <Button
                htmlType="submit"
                type="link"
                icon={<SearchOutlined />}
                onClick={() => {
                  navigate(`/filter?filterType=price&min=0&max=0`);
                }}
              >
                Our free courses{" "}
              </Button>
            </Form.Item>
            <Form.Item>
              <span>Use slider to set min and max based on ur preferneces</span>
              <Slider
                marks={marks}
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
          </Form>
        </Panel>
        <Panel
          header="Categotry"
          key="3"
          className="site-collapse-custom-panel"
        >
          <Form>
            <Form.Item>
              <List
                itemLayout="horizontal"
                dataSource={Category}
                renderItem={(item) => (
                  <List.Item>
                    <Radio.Group
                      onChange={category}
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
            </Form.Item>
          </Form>
        </Panel>

        <Panel
          header="filter by title, subject or instructor"
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
