import { Button, Form, Input, Rate, message, Space } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../AppContext";
const textArea = Input;
const desc = [1, 2, 3, 4, 5];
const ReviewCourseComponent = ({ Id, username }) => {
  const [value, setValue] = useState(0);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviewCourse = (event) => {
    const requestBody = {
      courseId: Id,
      review: event.review,
      reviewer: username,
      newRate: value,
    };
    axios
      .patch("http://localhost:2020/rateAndReviewCourse", requestBody)
      .then((response) => {
        message.success("Your review has been submitted successfully", 2);
        console.log(response);
      })
      .catch((error) => {
        console.log("erorr ", error);
        message.error("Unexpected Error occured " + error, 2);
      });
  };

  return (
    <>
      <Form
        name="reviewCourse"
        className="reviewIntructor-form"
        onFinish={reviewCourse}
        style={{
          width: "20vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          padding: "10px",
          gap: "10px",
        }}
      >
        <span>
          <Rate
            tooltips={desc}
            onChange={setValue}
            value={value}
            style={{
              color: "red",
            }}
          />
          {value ? (
            <span className="ant-rate-text">{desc[value - 1]}</span>
          ) : (
            ""
          )}
        </span>
        <Form.Item
          name="review"
          rules={[
            { required: true, message: "Please enter your review" },
            { minLength: 5 },
          ]}
          style={{ width: "100%" }}
        >
          <Input.TextArea
            type="review"
            placeholder="Enter your review"
            rows={5}
          />
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
export default ReviewCourseComponent;
