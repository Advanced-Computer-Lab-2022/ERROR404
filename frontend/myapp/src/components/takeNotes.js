import React, { useState, useRef } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Input, Modal, Form, Space, Button, Drawer } from "antd";

const TakeNotesWrapper = () => {
  const { TextArea } = Input;
  const [value, setValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const componentRef = useRef();

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("input").value], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      {" "}
      <Button
        type="link"
        style={{
          width: "200px",
        }}
        onClick={showModal}
      >
        Take Notes <EditOutlined />
      </Button>
      <Drawer
        title="Taking Note.."
        placement="left"
        width="25vw"
        onClose={handleCancel}
        open={isModalOpen}
        extra={
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" onClick={downloadTxtFile}>
              save
            </Button>
          </Space>
        }
      >
        <Form style={{ width: "100%", height: "100%" }}>
          <Form.Item
            style={{
              height: "50vh",
            }}
          >
            <Input.TextArea id="input" placeholder="Type here........" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default TakeNotesWrapper;
