import React, { useState, useEffect } from "react";
import { Button, Form, Input, message, Space } from "antd";

const UploadLink = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    // create an axios put to insert video link in mongo
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  return (
    <div className="changePasswordWrapper">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="url"
          label="URL"
          rules={[
            { required: true },
            { type: "url", warningOnly: true },
            { type: "string", min: 6 },
          ]}
        >
          <Input placeholder="input a youtube link" />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit Link
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadLink;
