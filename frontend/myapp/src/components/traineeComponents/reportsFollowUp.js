import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Table, Modal, Form } from "antd";
import axios from "axios";
import TraineeDashboard from "./TraineeDashboard";
import InstructorDashboard from "../instructorComponents/InstructorDashboard";
import { AppContext } from "../../AppContext";

const TraineeReportsWrapper = () => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;

  if (user === "instructor") {
    return (
      <InstructorDashboard pageName="Reports Follow up">
        <TraineeReports />
      </InstructorDashboard>
    );
  } else if (user === "individual" || user === "corporate") {
    return (
      <TraineeDashboard pageName="Reports Follow up">
        <TraineeReports />{" "}
      </TraineeDashboard>
    );
  }
};

const TraineeReports = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);

  const [form] = Form.useForm();

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
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Date Of Submission",
      dataIndex: "createdAt",
    },
    {
      title: "Last Update On",
      dataIndex: "updatedAt",
    },
  ];

  const fetchData = () => {
    setLoading(true);
    axios.get("http://localhost:2020/getAllReports").then((results) => {
      console.log(results.data);
      let data = [];
      results.data.map((item) => {
        if (item.user == userName) {
          if (filter != null && filter.length > 0) {
            if (filter.includes(item.status)) {
              data.push(item);
            }
          } else {
            data.push(item);
          }
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

export default TraineeReportsWrapper;
