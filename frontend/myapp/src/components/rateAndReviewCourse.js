import { Button, Form, Input, Rate, message, Space } from "antd";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

const desc = [1, 2, 3, 4, 5];
const ReviewCourseComponent = () => {
  const [value, setValue] = useState(0);
  const reviewCourse = async (event) => {
    const requestBody = {
      id: event.courseId,
      review: event.review,
      newRate: value,
    };
    axios
      .patch("http://localhost:2020/rateAndReviewCourse", requestBody)
      .then((response) => {
        message.success("Your review has been submitted successfully", 5);
      })
      .catch((error) => {
        console.log("erorr ", error);
        message.error("Unexpected Error occured " + error, 5);
      });
  };

  return (
    <>
      <Form
        name="reviewCourse"
        className="reviewIntructor-form"
        initialValues={{ remember: true }}
        onFinish={reviewCourse}
        style={{
          width: "50%",
        }}
      >
        <Form.Item
          name="courseId"
          label="Enter your course id"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter your course id" />
        </Form.Item>

        <Form.Item
          name="review"
          label="Enter your review"
          rules={[
            { required: true, message: "Please enter your review" },
            { minLength: 5 },
          ]}
        >
          <Input type="review" placeholder="Enter your review" />
        </Form.Item>
        <span>
          <Rate tooltips={desc} onChange={setValue} value={value} />
          {value ? (
            <span className="ant-rate-text">{desc[value - 1]}</span>
          ) : (
            ""
          )}
        </span>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{
              width: "70%",
            }}
          >
            Submit Review
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ReviewCourseComponent;
