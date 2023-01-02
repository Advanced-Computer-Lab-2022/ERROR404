import React from "react";
import { useEffect, useState, useContext } from "react";
import { RightOutlined, LinkOutlined } from "@ant-design/icons";
import { Button, Progress, Space } from "antd";
import { Checkbox } from "antd";
import axios from "axios";
import { AppContext } from "../../AppContext";
import { message, Select, Form, Item, Input } from "antd";
const ProgressWrapper = () => {
  const [progress, setProgress] = useState(0);
  const { username, userType } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [usertype, setUserType] = userType;

  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");
    axios
      .get(`http://localhost:2020/getUser/${userName}/${usertype}`)
      .then((response) => {
        console.log(response.data.progress);
        response.data.progress.map((course) => {
          if (course.course == courseId) {
            setProgress(course);
          }
        });
      });
  }, []);

  const onFinish = async (event) => {
    console.log("Success:", event);
    const progress = event.progress;

    await updateProgress(progress);
  };

  const updateProgress = async (progress) => {
    const requestBody = {
      usertype: usertype,
      progress: progress,
    };
    axios
      .patch("http://localhost:2020/updateCourseProgress", requestBody)
      .then((response) => {
        message.success("Progress Saved", 5);
        setProgress(progress);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
        message.error("Unexpected Error occured" + error.response.message, 5);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [percent, setPercent] = useState(0);
  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 20;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18%",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <h1>MyCourse Tutorials</h1>
        <br />
        <br />
        <Progress percent={percent} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "80%",
          justifyContent: "left",
          alignItems: "left",
          fontSize: "20px",
          boxSizing: "border-box",
          padding: "2%",
        }}
      >
        <a
          style={{
            textDecoration: "none",
          }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://youtu.be/9s29LKfEFjQ"
          onClick="return func();"
        >
          {" "}
          Online learning
          <LinkOutlined
            style={{
              fontSize: "25px",
            }}
          />
        </a>
        <Checkbox onClick={increase}> </Checkbox>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "75.2%",
          justifyContent: "left",
          alignItems: "left",
          fontSize: "20px",
          boxSizing: "border-box",
          padding: "2%",
        }}
      >
        <a
          style={{
            textDecoration: "none",
          }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.smartsheet.com/wise-words-about-writing-technical-requirements-documents"
          onClick="return func();"
        >
          {" "}
          Technical Requirements
          <LinkOutlined
            style={{
              fontSize: "25px",
            }}
          />
        </a>
        <Checkbox onClick={increase}> </Checkbox>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "79.5%",
          justifyContent: "left",
          alignItems: "left",
          fontSize: "20px",
          boxSizing: "border-box",
          padding: "2%",
        }}
      >
        <a
          style={{
            textDecoration: "none",
          }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.phpopenbiz.org/three-main-languages-of-web-development/#:~:text=There%20are%20three%20main%20languages%20of%20web%20development%2C,are%20unique%20and%20have%20their%20characteristics%20and%20uses."
          onClick="return func();"
        >
          {" "}
          Main Languages
          <LinkOutlined
            style={{
              fontSize: "25px",
            }}
          />
        </a>
        <Checkbox onClick={increase}> </Checkbox>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "75.5%",
          justifyContent: "left",
          alignItems: "left",
          fontSize: "20px",
          boxSizing: "border-box",
          padding: "2%",
        }}
      >
        <a
          style={{
            textDecoration: "none",
          }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.codecademy.com/learn/paths/web-development?utm_id=t_kwd-79715110574492:loc-187:ag_1275434296088110:cp_370540073:n_o:d_c&msclkid=a9d0c14deab9164d12b5a2e53ac2e6be&utm_source=bing&utm_medium=cpc&utm_campaign=US%20Career%20Path%3A%20Pro%20-%20Phrase&utm_term=web%20development%20courses&utm_content=web%20development"
          onClick="return func();"
        >
          {" "}
          Basic course navigation
          <LinkOutlined
            style={{
              fontSize: "25px",
            }}
          />
        </a>
        <Checkbox onClick={increase}> </Checkbox>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "74%",
          justifyContent: "left",
          alignItems: "left",
          fontSize: "20px",
          boxSizing: "border-box",
          padding: "2%",
        }}
      >
        <a
          style={{
            textDecoration: "none",
          }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.codecademy.com/learn/paths/web-development?utm_id=t_kwd-79715110574492:loc-187:ag_1275434296088110:cp_370540073:n_o:d_c&msclkid=a9d0c14deab9164d12b5a2e53ac2e6be&utm_source=bing&utm_medium=cpc&utm_campaign=US%20Career%20Path%3A%20Pro%20-%20Phrase&utm_term=web%20development%20courses&utm_content=web%20development"
          onClick="return func();"
        >
          {" "}
          MERN Stack For Beginners
          <LinkOutlined
            style={{
              fontSize: "25px",
            }}
          />
        </a>
        <Checkbox onClick={increase}> </Checkbox>
      </div>
      <Form.Item wrapperCol={{ offset: 21, span: "50%" }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ProgressWrapper;
