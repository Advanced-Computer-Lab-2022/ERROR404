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

const AdminRequestsWrapper = () => {
  return (
    <AdminDashboard>
      <AdminRequests />
    </AdminDashboard>
  );
};

const AdminRequests = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);

  const [form] = Form.useForm();

  const confirm = (status, id) =>
    new Promise((resolve) => {
      console.log("sssssssss ", status);
      const requestBody = {
        id: id,
        status: status,
      };
      axios
        .put("http://localhost:2020/updateRequestStatus", requestBody)
        .then((res) => {
          console.log(res);
          message.success("status has been changed to " + status);
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
        title: "Course title",
        dataIndex: "courseTitle",
        width: "20%",
      },
    {
      title: <Badge status="success" text="Status" />,
      dataIndex: "status",
      render: (status) => {
        let type = "default";
        if (status == "approved") {
          type = "success";
        } else if (status == "pending") {
          type = "processing";
        }else if (status == "rejected") {
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
          text: "pending",
          value: "pending",
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
      title: "Last Updated",
      dataIndex: "updatedAt",
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
        return ;
      }
    });
    console.log("the request => ", requests);
    axios
      .get(
        "http://localhost:2020/getUser/" + requests.username + "/" + requests.usertype
      )
      .then((response) => {
        let data = response.data;
        console.log(response.data);
        let type = "default";
        if (requests.status == "approved") {
          type = "success";
        } else if (requests.status == "pending") {
          type = "processing";
        }else if (requests.status == "rejected") {
            type = "fail";
          }
        modal.update({
          title: "Request Id " + requests._id,
          width: "100vh",

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
                      <Card>
                        <Descriptions title="Updating status...">
                          <Descriptions.Item label="Current Status">
                            <span>
                              <Badge status={type} text={requests.status} />
                            </span>
                          </Descriptions.Item>
                        </Descriptions>
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
                                  requests._id
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
                      </Card>
                    ),
                  },
                ]}
              />
            </>
          ),
        });
      });
  };

  const fetchData = () => {
    setLoading(true);
    axios.get("http://localhost:2020/getAllRequests").then((results) => {
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
export default AdminRequestsWrapper;
