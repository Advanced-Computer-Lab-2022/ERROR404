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

import emailjs from "@emailjs/browser";
const { Option } = Select;

const AdminReportsWrapper = () => {
  return (
    <AdminDashboard pageName="Reports">
      <AdminReports />
    </AdminDashboard>
  );
};

const AdminReports = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
  const [reportType, setReportType] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();

  const confirm = (status, id, user, issueDate, description, problem) =>
    new Promise((resolve) => {
      const requestBody = {
        id: id,
        status: status,
      };
      axios
        .put("http://localhost:2020/updateReportStatus", requestBody)
        .then((res) => {
          message.success("status has been changed to " + status);
          setRefresh(!refresh);
        })
        .then(() => {
          axios.get("http://localhost:2020/login/" + user).then((response) => {
            console.log(user);
            console.log(response);
            if (status == "resolved") {
              var data = {
                to_name: user,
                id: id,
                date: issueDate,
                desc: description,
                email: response.data.email,
                status: "accepted,we hope that we met your expectations",
              };

              emailjs.send(
                "service_cgnfy6h",
                "template_dxseinf",
                data,
                "cfz8yizeBXThAinxz"
              );
            } else if (status == "pending") {
              var data = {
                to_name: user,
                id: id,
                date: issueDate,
                desc: description,
                email: response.data.email,
                status: "viewed and it is now under investigation",
              };

              emailjs.send(
                "service_cgnfy6h",
                "template_dxseinf",
                data,
                "cfz8yizeBXThAinxz"
              );
            }
          });
        });
      setTimeout(() => resolve(null), 3000);
    });

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      width: "20%",
    },
    {
      title: <Badge status="success" text="Status" />,
      dataIndex: "status",
      render: (status) => {
        let type = "default";
        if (status === "resolved") {
          type = "success";
        } else if (status === "pending") {
          type = "processing";
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
          text: "resolved",
          value: "resolved",
        },
      ],
      width: "20%",
    },
    {
      title: "Report type",
      dataIndex: "problemType",
      render: (reportType) => {
        let type = "";
        if (reportType == "technical") {
          type = "technical";
        } else if (reportType == "financial") {
          type = "financial";
        } else if (reportType == "other") {
          type = "other";
        }
        return <span>{type}</span>;
      },
      filters: [
        {
          text: "technical",
          value: "technical",
        },
        {
          text: "financial",
          value: "financial",
        },
        {
          text: "other",
          value: "other",
        },
      ],
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Date Of Submission",
      dataIndex: "createdAt",
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
    },
    {
      title: "View Report",
      dataIndex: "_id",
      render: (id, user, issueDate, description, problem) => {
        return (
          <Link
            onClick={(event) => {
              showModal(id, user, issueDate, description, problem);
            }}
          >
            View
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

  const showModal = (reportId, user, issueDate, description) => {
    const modal = Modal.info();
    let reports;
    data.map((report) => {
      if (report._id == reportId) {
        console.log("ccccccccc ", report);
        reports = report;
        return;
      }
    });
    console.log("the report => ", reports);
    axios
      .get(
        "http://localhost:2020/getUser/" + reports.user + "/" + reports.usertype
      )
      .then((response) => {
        let type = "default";
        if (reports.status == "resolved") {
          type = "success";
        } else if (reports.status == "pending") {
          type = "processing";
        }
        if (response.data != null) {
          let data = response.data;
          modal.update({
            title: "Report Id " + reports._id,
            width: "100vh",

            content: (
              <>
                <Tabs
                  defaultActiveKey="1"
                  onChange={onChange}
                  items={[
                    {
                      label: `Report Information`,
                      key: "1",
                      children: (
                        <Card>
                          <Form
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <Form.Item
                              label="Report Id"
                              name="reportId"
                              initialValue={reports._id}
                            >
                              <Input disabled />
                            </Form.Item>
                            <Form.Item
                              label="Description"
                              name="description"
                              initialValue={reports.description}
                            >
                              <Input.TextArea disabled />
                            </Form.Item>

                            <Form.Item
                              wrapperCol={{
                                offset: 8,
                                span: 16,
                              }}
                            ></Form.Item>
                          </Form>
                          <Descriptions title="Extra Info">
                            <Descriptions.Item label="Last Update">
                              {reports.updatedAt}
                            </Descriptions.Item>
                          </Descriptions>
                        </Card>
                      ),
                    },
                    {
                      label: `User Information`,
                      key: "2",
                      children: (
                        <Card>
                          <Descriptions title="User Info">
                            <Descriptions.Item
                              label="Username"
                              style={{ width: "50%" }}
                            >
                              {data.username}
                            </Descriptions.Item>

                            <Descriptions.Item
                              label="Email"
                              style={{ width: "50%" }}
                            >
                              {data.email}
                            </Descriptions.Item>
                            <br />
                            <Descriptions.Item label="Role">
                              {data.role}
                            </Descriptions.Item>
                          </Descriptions>
                        </Card>
                      ),
                    },
                    {
                      label: `Change Report Status`,
                      key: "3",
                      children: (
                        <Card>
                          <Descriptions title="Updating Report.........">
                            <Descriptions.Item label="Current Status">
                              <span>
                                <Badge status={type} text={reports.status} />
                              </span>
                            </Descriptions.Item>
                          </Descriptions>
                          <Form
                            form={form}
                            onFinish={(e) => {
                              console.log("anaaaa", e);
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
                                <Option value="resolved">Resolved</Option>
                                <Option value="pending">Pending</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item>
                              <Popconfirm
                                title="Are you sure you want to submit this new status"
                                onConfirm={() =>
                                  confirm(
                                    form.getFieldValue("status"),
                                    reports._id,
                                    reports.user,
                                    reports.issueDate,
                                    reports.description,
                                    reports.problem
                                  )
                                }
                                onOpenChange={() => console.log("open change")}
                              >
                                <Button type="primary" htmlType="submit">
                                  Submit Status
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
        } else {
          modal.update({
            title: "Report Id " + reports._id,
            width: "100vh",

            content: (
              <>
                <Tabs
                  defaultActiveKey="1"
                  onChange={onChange}
                  items={[
                    {
                      label: `Report Information`,
                      key: "1",
                      children: (
                        <Card>
                          <Form
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                          >
                            <Form.Item
                              label="Report Id"
                              name="reportId"
                              initialValue={reports._id}
                            >
                              <Input disabled />
                            </Form.Item>
                            <Form.Item
                              label="Description"
                              name="description"
                              initialValue={reports.description}
                            >
                              <Input.TextArea disabled />
                            </Form.Item>

                            <Form.Item
                              wrapperCol={{
                                offset: 8,
                                span: 16,
                              }}
                            ></Form.Item>
                          </Form>
                          <Descriptions title="Extra Info">
                            <Descriptions.Item label="Last Update">
                              {reports.updatedAt}
                            </Descriptions.Item>
                          </Descriptions>
                        </Card>
                      ),
                    },
                    {
                      label: `User Information`,
                      key: "2",
                      children: (
                        <Card>
                          <Descriptions title="User Info">
                            <Descriptions.Item label="Username">
                              {reports.user}
                            </Descriptions.Item>
                            <Descriptions.Item label="Extra Info">
                              <span>
                                This user is a guest and no information
                                available
                              </span>
                            </Descriptions.Item>
                          </Descriptions>
                        </Card>
                      ),
                    },
                    {
                      label: `Change Report Status`,
                      key: "3",
                      children: (
                        <Card>
                          <Descriptions title="Updating Report.........">
                            <Descriptions.Item label="Current Status">
                              <span>
                                <Badge status={type} text={reports.status} />
                              </span>
                            </Descriptions.Item>
                          </Descriptions>
                          <Form
                            form={form}
                            onFinish={(e) => {
                              console.log("anaaaa", e);
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
                                <Option value="resolved">Resolved</Option>
                                <Option value="pending">Pending</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item>
                              <Popconfirm
                                title="Are you sure you want to submit this new status"
                                onConfirm={() =>
                                  confirm(
                                    form.getFieldValue("status"),
                                    reports._id
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
        }
      });
  };

  const fetchData = () => {
    setLoading(true);
    axios.get("http://localhost:2020/getAllReports").then((results) => {
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
  }, [filter, reportType, refresh]);

  const handleChange = (event) => {
    console.log(event);
  };
  const handleTableChange = (pagination, filters, sorter) => {
    console.log(filters.status);
    console.log(filters.reportType);
    setFilter(filters.status);
    setReportType(filters.reportType);
    //setFilter(filters.reportType);
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
export default AdminReportsWrapper;
