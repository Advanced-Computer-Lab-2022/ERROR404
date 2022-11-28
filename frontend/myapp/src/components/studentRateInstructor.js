import { Rate, Button, Checkbox, Form, Input, message, Avatar } from "antd";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const RateComponent = () => {
  const [value, setValue] = useState(0);
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;
  //   const onFinish = async (event) => {
  //     console.log("Success:", event);

  //     const rate = event.rate;

  //     await rateInstructor(rate);
  //   };

  const rateInstructor = async () => {
    const requestBody = {
      username: userName,
      rate: value,
    };
    axios
      .patch("http://localhost:2020/rateInstructor", requestBody)
      .then((response) => {
        message.success("your rate has been submitted successfully", 5);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
        message.error("Unexpected Error occured" + error.response.message, 5);
      });
  };

  //   const onFinishFailed = (errorInfo) => {
  //     console.log("Failed:", errorInfo);
  //   };
  return (
    <>
      <span>
        <Rate tooltips={desc} onChange={setValue} value={value} />
        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ""}
      </span>
      <Button onClick={rateInstructor}>submit</Button>
    </>
  );
};
export default RateComponent;
