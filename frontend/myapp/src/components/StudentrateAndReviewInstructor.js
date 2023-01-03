import { Button, Form, Input, Rate, message, Space } from "antd";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

const desc = [1, 2, 3, 4, 5];
const { TextArea } = Input;
const ReviewComponent = ({ username }) => {
  const [value, setValue] = useState(0);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const reviewInstructor = async (event) => {
    const requestBody = {
      username: username,
      review: event.review,
      rate: value,
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
        style={{
          width: "90%",
        }}
      >
        <Form.Item name="username" label="username" disabled>
          <Input defaultValue={username} disabled />
        </Form.Item>

        <Form.Item
          name="review"
          rules={[
            { required: true, message: "Please enter your review" },
            { minLength: 5 },
          ]}
        >
          <TextArea type="review" placeholder="Enter your review" rows={5} />
        </Form.Item>
        <span>
          <Rate tooltips={desc} onChange={setValue} value={value} />
          {value ? (
            <span className="ant-rate-text">{desc[value - 1]}</span>
          ) : (
            ""
          )}
        </span>
        <Form.Item
          style={{
            width: "70%",
            marginTop: "10%",
            alignItems: "center",
            alignContent: "center",
          }}
        >
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
