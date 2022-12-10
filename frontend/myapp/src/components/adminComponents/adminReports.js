import React, { useEffect, useState } from "react";
import { Badge, Table } from "antd";
import qs from "qs";
import AdminDashboard from "./adminDashboard";
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
    title: "Name",
    dataIndex: "name",
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: "20%",
  },
  {
    title: <Badge status="success" text="Status" />,
    dataIndex: "status",
    filters: [
      {
        text: "Unseen",
        value: "Unseen",
      },
      {
        text: "Pending",
        value: "pending",
      },
      {
        text: "Resolved",
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
    dataIndex: "dateOfSubmission",
  },
  {
    title: "Last Update",
    dataIndex: "lastUpdate",
  },
];
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const AdminReports = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };
  return (
    <Table
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};
export default AdminReportsWrapper;
