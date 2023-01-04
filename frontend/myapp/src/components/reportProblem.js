import App from "../App";
import axios from "axios";
import React, { useContext } from "react";
import {
  ReadOutlined,
  FileSearchOutlined,
  DatabaseOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Button, Space, message, Form, Dropdown, Select } from "antd";
import { useState } from "react";
import { Input } from "antd";
import { AppContext } from "../AppContext";

const { Option } = Select;
const { TextArea } = Input;
const ReportaProblemWrapper = () => {
  const [value, setValue] = useState("");
  const { username, userType } = useContext(AppContext);
  const [UserName, setUserName] = username;
  const [Usertype, setUserType] = userType;
  const [description, setDescription] = useState("");
  const [reportType, setReportType] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setDescription(event.target.value);
  };

  const report = () => {
    let body = {
      username: UserName,
      usertype: Usertype,
      description: description,
      reportType: reportType,
    };
    console.log(body);
    axios
      .post("http://localhost:2020/createReport", body)
      .then(() => {
        message.success("you have created your report successfully", 3);
        console.log("hello");
      })
      .catch((err) => {
        message.error("An unexpected error has occurred", 3);
        console.log("error at create report ", JSON.stringify(err));
      });
  };
  return (
    <App>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: "20px",
          gap: "40%",
          fontweight: "bold",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          How to make a good report
        </h2>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "18%",
            justifyContent: "left",
            alignItems: "stretch",
            fontSize: "20px",
          }}
        >
          <Space>
            <ReadOutlined />
            <h2>Clear title</h2>
          </Space>

          <Space>
            <FileSearchOutlined />
            <h2>Review suggestion</h2>
          </Space>

          <Space>
            <DatabaseOutlined />
            <h2>Separate issues</h2>
          </Space>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20%",
            justifyContent: "left",
            alignItems: "stretch",
            fontSize: "20px",
          }}
        >
          <p>Provide clear title and details</p>
          <p>You might find your issue already exists</p>
          <p>If you have multiple problems, submit multiple reports</p>
        </div>
        <div>
          <br />

          <div
            style={{
              margin: "24px 0",
              width: "100%",
            }}
          />

          <>
            <Form
              layout="vertical"
              style={{
                width: "50%",
                alignItems: "center",
                justifyItems: "center",
              }}
            >
              <Form.Item
                name="type"
                label="Report Type"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  allowClear
                >
                  <Option value="financial">Financial</Option>
                  <Option value="technical">Technical</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Description :"
                name="description"
                rules={[
                  {
                    required: true,
                  },
                ]}
                style={{ alignItems: "center", justifyItems: "center" }}
              >
                <Input.TextArea
                  onChange={handleChange}
                  rows={5}
                  style={{
                    fontStyle: "bolder",
                    fontSize: "20px",
                  }}
                  placeholder="To increase our ability to provide a fix, please thoroughly explain the issue and add clear reproduction steps"
                />
              </Form.Item>
            </Form>
          </>
        </div>
        <div>
          <br />
          <Space wrap>
            <Button
              type="primary"
              onClick={() => {
                report();
              }}
            >
              Submit{" "}
            </Button>
          </Space>
        </div>
      </div>
    </App>
  );
};

export default ReportaProblemWrapper;
