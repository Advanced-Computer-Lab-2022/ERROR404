import axios from "axios";
import { useState, useEffect } from "react";
import App from "../App";
import {
  Layout,
  Button,
  Checkbox,
  Dropdown,
  Form,
  Input,
  Select,
  Breadcrumb,
  Menu,
  message,
  DownOutLined,
  Space,
} from "antd";

import { Header, Container } from "semantic-ui-react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const WrapperCreateExam = () => {
  const onFinish = async (event) => {
    console.log("Success:", event);
  };

  return (
    <div>
      <div
        centered
        class="ui blue centered card"
        style={{ width: 600, marginTop: 20 }}
      >
        <h2 style={{ marginLeft: 240 }}>
          <u> Question 1</u>
        </h2>

        {/* <Form name="dynamic_form_nest_item"></Form>
         */}

        <p>
          <div class="ui input" style={{ width: 250 }}>
            <input
              type="text"
              placeholder="Please enter your first question"
            ></input>
          </div>
        </p>

        <p>
          <div class="ui input" style={{ width: 380 }}>
            <input
              type="text"
              placeholder="Enter the first possible solution for your question"
            ></input>
          </div>
        </p>
        <p>
          <div class="ui input" style={{ width: 380 }}>
            <input
              type="text"
              placeholder="Enter the second possible solution for your question"
            ></input>
          </div>
        </p>

        <Form name="dynamic_form_nest_item">
          <Form.List name="possible solutions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 2,
                      width: 300,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "Solution"]}
                      rules={[
                        {
                          required: true,
                          message: "Enter a solution",
                        },
                      ]}
                    >
                      <Input placeholder="Another solution" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    style={{ width: 300 }}
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add another possible solution
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <select
            class="ui dropdown"
            style={{ marginLeft: 200, marginBottom: 20 }}
          >
            <option value="">Correct Solution</option>
            <option value="1">A</option>
            <option value="0">B</option>
            <option value="1">C</option>
            <option value="0">D</option>
          </select>
        </Form>

        <button
          class="ui button"
          style={{ width: 150, marginLeft: 193, marginBottom: 10 }}
        >
          Add question
        </button>
      </div>

      <div
        centered
        class="ui blue centered card"
        style={{ width: 600, marginTop: 20 }}
      >
        <h2 style={{ marginLeft: 240 }}>
          <u> Question 2</u>
        </h2>

        {/* <Form name="dynamic_form_nest_item"></Form>
         */}

        <p>
          <div class="ui input" style={{ width: 250 }}>
            <input
              type="text"
              placeholder="Please enter your first question"
            ></input>
          </div>
        </p>

        <p>
          <div class="ui input" style={{ width: 380 }}>
            <input
              type="text"
              placeholder="Enter the first possible solution for your question"
            ></input>
          </div>
        </p>
        <p>
          <div class="ui input" style={{ width: 380 }}>
            <input
              type="text"
              placeholder="Enter the second possible solution for your question"
            ></input>
          </div>
        </p>

        <Form name="dynamic_form_nest_item">
          <Form.List name="possible solutions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 2,
                      width: 300,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "Solution"]}
                      rules={[
                        {
                          required: true,
                          message: "Enter a solution",
                        },
                      ]}
                    >
                      <Input placeholder="Another solution" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    style={{ width: 300 }}
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add another possible solution
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <select
            class="ui dropdown"
            style={{ marginLeft: 200, marginBottom: 20 }}
          >
            <option value="">Correct Solution</option>
            <option value="1">A</option>
            <option value="0">B</option>
            <option value="1">C</option>
            <option value="0">D</option>
          </select>
        </Form>

        <button
          class="ui button"
          style={{ width: 150, marginLeft: 193, marginBottom: 10 }}
        >
          Add question
        </button>
      </div>

      <div
        centered
        class="ui blue centered card"
        style={{ width: 600, marginTop: 20 }}
      >
        <h2 style={{ marginLeft: 240 }}>
          <u> Question 3</u>
        </h2>

        {/* <Form name="dynamic_form_nest_item"></Form>
         */}

        <p>
          <div class="ui input" style={{ width: 250 }}>
            <input
              type="text"
              placeholder="Please enter your first question"
            ></input>
          </div>
        </p>

        <p>
          <div class="ui input" style={{ width: 380 }}>
            <input
              type="text"
              placeholder="Enter the first possible solution for your question"
            ></input>
          </div>
        </p>
        <p>
          <div class="ui input" style={{ width: 380 }}>
            <input
              type="text"
              placeholder="Enter the second possible solution for your question"
            ></input>
          </div>
        </p>

        <Form name="dynamic_form_nest_item">
          <Form.List name="possible solutions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 2,
                      width: 300,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "Solution"]}
                      rules={[
                        {
                          required: true,
                          message: "Enter a solution",
                        },
                      ]}
                    >
                      <Input placeholder="Another solution" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    style={{ width: 300 }}
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add another possible solution
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <select
            class="ui dropdown"
            style={{ marginLeft: 200, marginBottom: 20 }}
          >
            <option value="">Correct Solution</option>
            <option value="1">A</option>
            <option value="0">B</option>
            <option value="1">C</option>
            <option value="0">D</option>
          </select>
        </Form>

        <button
          class="ui button"
          style={{ width: 150, marginLeft: 193, marginBottom: 10 }}
        >
          Add question
        </button>
      </div>

      <div
        centered
        class="ui blue centered card"
        style={{ width: 600, marginTop: 20 }}
      >
        <h2 style={{ marginLeft: 240 }}>
          <u> Question 4</u>
        </h2>

        {/* <Form name="dynamic_form_nest_item"></Form>
         */}

        <p>
          <div class="ui input" style={{ width: 250 }}>
            <input
              type="text"
              placeholder="Please enter your first question"
            ></input>
          </div>
        </p>

        <p>
          <div class="ui input" style={{ width: 380 }}>
            <input
              type="text"
              placeholder="Enter the first possible solution for your question"
            ></input>
          </div>
        </p>
        <p>
          <div class="ui input" style={{ width: 380 }}>
            <input
              type="text"
              placeholder="Enter the second possible solution for your question"
            ></input>
          </div>
        </p>

        <Form name="dynamic_form_nest_item">
          <Form.List name="possible solutions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 2,
                      width: 300,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "Solution"]}
                      rules={[
                        {
                          required: true,
                          message: "Enter a solution",
                        },
                      ]}
                    >
                      <Input placeholder="Another solution" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    style={{ width: 300 }}
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add another possible solution
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <select
            class="ui dropdown"
            style={{ marginLeft: 200, marginBottom: 20 }}
          >
            <option value="">Correct Solution</option>
            <option value="1">A</option>
            <option value="0">B</option>
            <option value="1">C</option>
            <option value="0">D</option>
          </select>
        </Form>

        <button
          class="ui button"
          style={{ width: 150, marginLeft: 193, marginBottom: 10 }}
        >
          Add question
        </button>
      </div>

      <div
        class="ui blue animated button"
        style={{ width: 200, marginLeft: 580, marginBottom: 10 }}
      >
        <div class="visible content">Create exam</div>
        <div class="hidden content">
          <i class="check icon"></i>
        </div>
      </div>
    </div>
  );
};

export default WrapperCreateExam;
