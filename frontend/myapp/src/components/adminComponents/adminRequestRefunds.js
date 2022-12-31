import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Descriptions,
  Card,
  Tabs,
  Checkbox,
  Select,
  Popconfirm,
  message,
} from "antd";
import AdminDashboard from "./adminDashboard";
import axios from "axios";
import { Link } from "react-router-dom";

const { Option } = Select;

const RefundRequestsWrapper = () => {
  return (
    <AdminDashboard pageName="Refund Requests">
      <RefundRequests />
    </AdminDashboard>
  );
};

const RefundRequests = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
  const [form] = Form.useForm();

  const confirm = (status, id, courseId, username, userType) =>
    new Promise((resolve) => {
      console.log("sssssssss ", status);
      const requestBody = {
        id: id,
        status: status,
      };
      axios
        .put("http://localhost:2020/updateRefundRequestStatus", requestBody)
        .then((res) => {
          const reqBody = {
            courseId: courseId,
            username: username,
          };
          if (status == "approved") {
            axios
              .put("http://localhost:2020/deleteCourse", reqBody)
              .then(() => {
                message.success("request approved");
              })
              .catch((err) => console.log("error at updating courses" + err));

            axios
              .get(
                "http://localhost:2020/getUser/" + RefundRequests.user + "/" + RefundRequests.usertype)
                  
              
          } 
          else {
            message.success("status has been changed to " + status);
            console.log(res);
          }
        });
      setTimeout(() => resolve(null), 3000);
    });

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      width: "20%",
    },
    {
      title: <Badge status="success" text="Status" />,
      dataIndex: "status",
      render: (status) => {
        let type = "default";
        if (status == "approved") {
          type = "success";
        } else if (status == "rejected") {
          type = "rejected";
        }
        return (
          <span>
            <Badge status={type} text={status} />
          </span>
        );
      },
      filters: [
        {
          text: "unseen",
          value: "unseen",
        },
        {
          text: "approved",
          value: "approved",
        },
        {
          text: "rejected",
          value: "rejected",
        },
      ],
      width: "10%",
    },

    {
      title: "Date Of Submission",
      dataIndex: "createdAt",
    },
    {
      title: "Update request status",
      dataIndex: "_id",
      render: (id) => {
        return (
          <Link
            onClick={(event) => {
              showModal(id);
            }}
          >
            Update
          </Link>
        );
      },
    },
  ];

  const onChange = (key) => {
    console.log(key);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = (requestId) => {
    const modal = Modal.info();
    let requests;
    data.map((request) => {
      if (request._id == requestId) {
        console.log("ccccccccc ", request);
        requests = request;
        return;
      }
    });
    console.log("the request => ", requests);
    console.log(requests.username + " " + requests.userType);
    axios
      .get(
        "http://localhost:2020/getUser/" +
          RefundRequests.username +
          "/" +
          RefundRequests.userType
      )
      .then((response) => {
        console.log("hello");
        let data = response.data;
        console.log(response.data);
        let type = "default";
        if (requests.status == "approved") {
          type = "success";
        } else if (requests.status == "pending") {
          type = "processing";
        } else if (requests.status == "rejected") {
          type = "fail";
        }
        console.log("hello world", requests._id, " " + requests.username);
        modal
          .update({
            title: "Request Id " + requests._id,

            content: (
              <>
                <Tabs
                  defaultActiveKey="1"
                  onChange={onChange}
                  items={[
                    {
                      label: `Change Request Status`,
                      key: "1",
                      children: (
                        <>
                          <Card>
                            <Descriptions title="Updating status...">
                              <Descriptions.Item label="Current Status">
                                <span>
                                  <Badge status={type} text={requests.status} />
                                </span>
                              </Descriptions.Item>
                            </Descriptions>
                          </Card>
                          <Form
                            form={form}
                            onFinish={(e) => {
                              console.log("entaaaa", e);
                            }}
                          >
                            <Form.Item
                              name="status"
                              label="Update Status to "
                              rules={[
                                {
                                  required: true,
                                },
                              ]}
                            >
                              <Select
                                placeholder="Select a option and change input text above"
                                allowClear
                              >
                                <Option value="pending">Pending</Option>
                                <Option value="approved">Approved</Option>
                                <Option value="rejected">Rejected</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item>
                              <Popconfirm
                                title="Are you sure you want to submit this new status"
                                onConfirm={() =>
                                  confirm(
                                    form.getFieldValue("status"),
                                    requests._id,
                                    requests.courseId,
                                    requests.username,
                                    requests.userType
                                  )
                                }
                                onOpenChange={() => console.log("open change")}
                              >
                                <Button type="primary" htmlType="submit">
                                  Submit Statuss
                                </Button>
                              </Popconfirm>
                            </Form.Item>
                          </Form>
                        </>
                      ),
                    },
                  ]}
                />
              </>
            ),
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      });
  };

  const fetchData = () => {
    setLoading(true);
    axios.get("http://localhost:2020/getAllRefundRequests").then((results) => {
      console.log(results.data);
      let data = [];
      results.data.map((item) => {
        if (filter != null && filter.length > 0) {
          if (filter.includes(item.status)) {
            data.push(item);
          }
        } else {
          data.push(item);
        }
      });

      setData(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchData();
    console.log("--------> ", filter);
  }, [filter]);

  const handleChange = (event) => {
    console.log(event);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    console.log(filters.status);

    setFilter(filters.status);
  };
  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
        onChange={handleTableChange}
      ></Table>
    </>
  );
};
export default RefundRequestsWrapper;