import React, { useEffect, useState } from "react";
import { Badge, Table } from "antd";
import qs from "qs";
import AdminDashboard from "./adminDashboard";
import axios from "axios";

const { Column, ColumnGroup } = Table;

const AdminReportsWrapper = () => {
  return (
    <AdminDashboard>
      <AdminReports />
    </AdminDashboard>
  );
};

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
];

const AdminReports = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);
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
    <Table
      dataSource={data}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
      onChange={handleTableChange}
    ></Table>
  );
};
export default AdminReportsWrapper;
