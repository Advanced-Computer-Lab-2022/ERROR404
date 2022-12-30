import React, { useContext, useEffect, useState } from "react";
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
import axios from "axios";
import { Link } from "react-router-dom";
import AdminDashboard from "../adminComponents/adminDashboard";
import TraineeDashboard from "../../pages/TraineeDashboard";
import { AppContext } from "../../AppContext";
import App from "../../App";
import InstructorDashboard from "../instructorComponents/InstructorDashboard";

const { Option } = Select;

const TraineeReportsWrapper = () => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;

  if (user == "instructor") {
    return (
      <InstructorDashboard pageName="Reports Follow up">
        <TraineeReports />
      </InstructorDashboard>
    );
  } else if (user == "individual" || user == "corporate") {
    return (
      <TraineeDashboard>
        <TraineeReports />
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
      title: "Last Update On",
      dataIndex: "updatedAt",
    },
    // {
    //   title: "View Report",
    //   dataIndex: "_id",
    //   render: (id) => {
    //     return (
    //       <Link
    //         onClick={(event) => {
    //           showModal(id);
    //         }}
    //       >
    //         View
    //       </Link>
    //     );
    //   },
    // },
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

  const showModal = (reportId) => {
    let reports;
    data.map((report) => {
      if (report._id == reportId) {
        console.log("ccccccccc ", report);
        reports = report;
        return;
      }
    });
    console.log("the report => ", reports);
  };

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
