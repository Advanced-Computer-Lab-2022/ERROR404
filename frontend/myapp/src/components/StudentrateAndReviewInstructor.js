import { Button, Form, Input, Rate, message, Space } from "antd";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";

const desc = [1, 2, 3, 4, 5];
const { TextArea } = Input;
const ReviewComponent = ({ instructor, username }) => {
  const [value, setValue] = useState(0);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const reviewInstructor = async (event) => {
    const requestBody = {
      username: instructor,
      review: event.review,
      rate: value,
      reviewer: username,
    };
    axios
      .patch("http://localhost:2020/rateAndReviewInstructor", requestBody)
      .then((response) => {
        message.success("your review has been submitted successfully", 5);
      })
      .catch((error) => {
        console.log("erorr ", error);
        message.error("Unexpected Error occured " + error, 5);
      });
  };

  return (
    <>
      <Form
        name="reviewIntructor"
        className="reviewIntructor-form"
        onFinish={reviewInstructor}
        layout="vertical"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",

          width: "100%",
        }}
      >
        <Form.Item
          name="username"
          label="Instructor"
          disabled
          style={{ width: "100%" }}
        >
          <Input defaultValue={instructor} disabled />
        </Form.Item>

        <span>
          <Rate
            tooltips={desc}
            onChange={setValue}
            value={value}
            style={{ color: "red" }}
          />
          {value ? (
            <span className="ant-rate-text">{desc[value - 1]}</span>
          ) : (
            ""
          )}
        </span>
        <br />

        <Form.Item
          name="review"
          rules={[
            { required: true, message: "Please enter your review" },
            { minLength: 5 },
          ]}
          style={{ width: "100%" }}
        >
          <TextArea type="review" placeholder="Enter your review" rows={5} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Submit Review
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ReviewComponent;
