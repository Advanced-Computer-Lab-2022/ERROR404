import React from "react";
import InstructorDashboard from "./InstructorDashboard";
import { Tabs } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Breadcrumb } from "antd";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import axios from "axios";
import InstructorTransactions, {
  InstructorMonthlyBalances,
} from "./instructorTransactions";
const onChange = (key) => {
  console.log(key);
};

const InstructorStatistics = () => {
  return (
    <div className="site-statistic-demo-card">
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{
                color: "#3f8600",
              }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{
                color: "#cf1322",
              }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
const InstructorBalanceWrapper = () => {
  const { username, userType } = useContext(AppContext);
  const [value, setvalue] = useState(0);
  const [userName, setUserName] = username;
  const [usertype, setUserType] = userType;

  useEffect(() => {
    axios
      .get(`http://localhost:2020/getUser/${userName}/${usertype}`)
      .then((response) => {
        console.log(response.data.wallet);
        setvalue(response.data.wallet);
      });
  }, []);

  return (
    <InstructorDashboard pageName="My Balance">
      <div>
        <h1>My Monthly Balance</h1>
        <Card>
          <Statistic
            title="Active"
            value={value}
            precision={2}
            valueStyle={{
              color: "#3f8600",
            }}
            prefix={<WalletOutlined />}
            suffix="$"
          />
        </Card>
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: `Statistics`,
              key: "1",
              children: <InstructorMonthlyBalances />,
            },
          ]}
        />
      </div>
    </InstructorDashboard>
  );
};

export default InstructorBalanceWrapper;
