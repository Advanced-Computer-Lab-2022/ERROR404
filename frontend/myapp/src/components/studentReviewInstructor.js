import { Button, Form, Input, message, Space } from "antd";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";

const ReviewComponent = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;

  const reviewInstructor = async (event) => {
    const requestBody = {
      username: userName,
      review: event.review,
    };
    axios
      .put("http://localhost:2020/reviewInstructor", requestBody)
      .then((response) => {
        message.success("your review has been submitted successfully", 5);
      })
      .catch((error) => {
        console.log("erorr ", error);
        message.error("Unexpected Error occured" + error, 5);
      });
  };

  return (
    <>
      <Form
        name="reviewIntructor"
        className="reviewIntructor-form"
        initialValues={{ remember: true }}
        onFinish={reviewInstructor}
      >
        <Form.Item
          name="review"
          label="enter your review"
          rules={[
            { required: true, message: "Please enter your review" },
            { minLength: 5 },
          ]}
        >
          <Input type="review" placeholder="Enter your review" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{
              width: "100%",
            }}
          >
            submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ReviewComponent;
