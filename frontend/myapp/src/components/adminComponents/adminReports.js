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
} from "antd";
import qs from "qs";
import AdminDashboard from "./adminDashboard";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const AdminReportsWrapper = () => {
  return (
    <AdminDashboard>
      <AdminReports />
    </AdminDashboard>
  );
};

const AdminReports = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
  const [report, setReport] = useState({});

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

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
        if (status == "resolved") {
          type = "success";
        } else if (status == "pending") {
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
      title: "Edit",
      dataIndex: "_id",
      render: (id) => {
        return (
          <Button
            type="text"
            onClick={(event) => {
              showModal(id);
            }}
          >
            Show More
          </Button>
        );
      },
    },
  ];
  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const showModal = (reportId) => {
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
        let data = response.data;
        console.log(response.data);
        let type = "default";
        if (reports.status == "resolved") {
          type = "success";
        } else if (reports.status == "pending") {
          type = "processing";
        }
        modal.update({
          title: "Report Id " + reports._id,
          width: "100vh",

          content: (
            <>
              <Card>
                <Descriptions title="Report Info">
                  <Descriptions.Item label="Report Id">
                    {reports._id}
                  </Descriptions.Item>
                  <Descriptions.Item label="Report Description">
                    {reports.description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Report Status">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={user}
                      label="User Type"
                      onChange={handleUserChange}
                      style={{
                        width: "100%",
                      }}
                    >
                      <MenuItem value={"pending"}>Pending</MenuItem>
                      <MenuItem value={"resolved"}>Resolved</MenuItem>
                    </Select>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              <Card>
                <Descriptions title="User Info">
                  <Descriptions.Item label="Username">
                    {data.username}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email">
                    {data.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Role">
                    {data.role}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </>
          ),
        });
      });
  };

  const handleOk = () => {
    setModalText("Submitting Changes");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
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
      {/* <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal> */}
    </>
  );
};
export default AdminReportsWrapper;
