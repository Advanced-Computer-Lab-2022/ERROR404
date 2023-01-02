import React, { useEffect, useState } from "react";
import {
  MessageOutlined,
  EyeOutlined,
  HourglassOutlined,
  DollarOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import {
  List,
  Space,
  Rate,
  Button,
  Modal,
  Form,
  Input,
  message,
  DatePicker,
  Radio,
} from "antd";
import axios from "axios";
import SearchByForm from "../getCourses";
import App from "../../App";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const AdminViewCourseComponent = () => {
  const [data, setData] = useState("");
  const [id, setId] = useState("");
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const onFinish1 = (values) => {
    console.log("Success:", values);
    const body = {
      courseId: id,
      discount: values.discountValue,
      date: values.endDate,
    };

    axios
      .put("http://localhost:2020/submitDiscount", body)
      .then(() => {
        message.success("discount added", 3);
      })
      .catch((err) => {
        message.error("error " + err.response.data, 3);
      });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:2020/viewCourses ",
    })
      .then((response) => {
        setData(response.data);
        console.log("dataaaaa ", response.data);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
      });
  }, []);
  const onFinishFailed1 = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const openDis = (id, courseTitle) => {
    const modal = Modal.confirm();

    modal.update({
      title: "Updated " + courseTitle,
      content: (
        <Form
          onFinish={onFinish1}
          onFinishFailed={onFinishFailed1}
          autoComplete="off"
        >
          <Form.Item
            label="Dicount Value"
            name="discountValue"
            rules={[
              {
                required: true,
                message: "Please input your Dicount Value!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Please input your End Date!",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ),
    });
  };

  return (
    <App>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "5px",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "20%",
            height: "100vh",
          }}
        >
          <SearchByForm />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            gap: "40px",
          }}
        >
          <Radio.Group onChange={onChange}>
            <Radio value={1}>item</Radio>
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 6,
              }}
              dataSource={data}
              renderItem={(item) => (
                <div>
                  <List.Item
                    key={item._id}
                    actions={[
                      <IconText
                        icon={EyeOutlined}
                        text={item.views}
                        key="list-vertical-like-o"
                      />,

                      <IconText
                        icon={MessageOutlined}
                        text={item.review.length}
                        key="list-vertical-message"
                      />,
                      <IconText
                        icon={HourglassOutlined}
                        text={item.totalHours + " hours"}
                        key="list-vertical-message"
                      />,
                      <IconText
                        icon={DollarOutlined}
                        text={item.price == 0 ? "FREE" : item.price}
                        key="list-vertical-message"
                      />,
                      <IconText
                        icon={UsergroupDeleteOutlined}
                        text={item.numberOfSubscribers}
                        key="list-vertical-message"
                      />,
                    ]}
                    extra={
                      <Space>
                        <img
                          width={250}
                          alt="logo"
                          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                      </Space>
                    }
                  >
                    <List.Item.Meta
                      title={<a href={item.href}>{item.title}</a>}
                      description={item.summary}
                    />
                    {
                      <Rate
                        allowHalf
                        defaultValue={item.rating}
                        disabled={true}
                      />
                    }
                  </List.Item>
                </div>
              )}
            />
          </Radio.Group>
        </div>
      </div>
    </App>
  );
};

export default AdminViewCourseComponent;
