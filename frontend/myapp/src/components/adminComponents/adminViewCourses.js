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
  Checkbox,
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
  const [checkedCourses, setcheckedCourses] = useState([]);
  const [allCourses, setAll] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:2020/viewCourses ",
    })
      .then((response) => {
        setData(response.data);
        let data = [];
        response.data.map((course) => {
          data.push(course._id);
        });

        setAll(data);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
      });
  }, []);
  const onFinishFailed1 = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (checkedList) => {
    console.log(checkedList);
    setcheckedCourses(checkedList);
  };

  const submitPromotion = (e) => {
    console.log(checkedCourses);
    let body = {
      courseId: checkedCourses,
      value: e.value,
      endDate: e.endDate,
    };
    axios
      .put("http://localhost:2020/setDiscountForAllCourses", body)
      .then((respnse) => {
        console.log(respnse);
        message.success("Dscount Applied ");
        setcheckedCourses([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitAll = (e) => {
    if (e.target.checked) {
      console.log(e.target.checked);
      setcheckedCourses(allCourses);
    } else {
      setcheckedCourses([]);
    }
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
            width: "30%",
          }}
        >
          <Form onFinish={submitPromotion}>
            <Checkbox onChange={submitAll}>Check all</Checkbox>

            <Form.Item
              name="value"
              label="Value"
              rules={[
                {
                  required: true,
                  message: "Please input your Discount Value!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="enDate"
              label="End Date"
              rules={[
                {
                  required: true,
                  message: "Please input your Discount End Date!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Promotion
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            gap: "40px",
          }}
        >
          <Checkbox.Group onChange={handleChange} value={checkedCourses}>
            <List
              style={{
                height: "80vh",
              }}
              itemLayout="vertical"
              size="small"
              dataSource={data}
              renderItem={(item) => (
                <div>
                  <List.Item key={item._id} actions={[]}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Checkbox value={item._id}></Checkbox>
                      <List.Item.Meta
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.summary}
                      />
                      <Rate
                        allowHalf
                        defaultValue={item.rating}
                        disabled={true}
                      />
                    </div>
                  </List.Item>
                </div>
              )}
            />
          </Checkbox.Group>
        </div>
      </div>
    </App>
  );
};

export default AdminViewCourseComponent;
