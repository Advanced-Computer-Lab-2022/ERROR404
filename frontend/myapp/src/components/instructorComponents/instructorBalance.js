import React, { useState } from "react";
import InstructorDashboard from "../../pages/InstructorDashboard";
import ReviewNavigation from "../reviewComponents";
import { Button, Table } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Breadcrumb } from "antd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const InstructorBalanceWrapper = () => {
  return (
    <InstructorDashboard>
      <InstructorBalance />
      <InstructorBalanceAdditions value={1000} />
      <InstructorBalanceAdditions value={125} />
      <InstructorBalanceAdditions value={1500} />
      <InstructorBalanceAdditions value={2000} />
      <InstructorBalanceAdditions value={2500} />
    </InstructorDashboard>
  );
};

const InstructorBalance = () => {
  const [current, setCurrent] = useState(3);
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>My Balance</Breadcrumb.Item>
      </Breadcrumb>
      <Stack spacing={2}>
        <Pagination
          count={12}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <MonthBalance balance={1000} month="January" />
        <MonthBalance balance={1000} month="Febreary" />
        <MonthBalance balance={1000} month="March" />
        <MonthBalance balance={1000} month="April" />
        <MonthBalance balance={1000} month="May" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          overflow: "scroll",
        }}
      >
        <MonthBalance balance={1000} month="June" />
        <MonthBalance balance={1000} month="July" />
        <MonthBalance balance={1000} month="August" />
        <MonthBalance balance={1000} month="September" />
        <MonthBalance balance={1000} month="October" />
        <MonthBalance balance={1000} month="November" />
        <MonthBalance balance={1000} month="December" />
      </div>
    </>
  );
};

const MonthBalance = ({ balance, month }) => {
  return (
    <Card>
      <Statistic
        title={"Total Balance for " + month}
        value={balance}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix={<DollarOutlined />}
      />
    </Card>
  );
};

const InstructorBalanceAdditions = ({ value }) => {
  return (
    <Card>
      <Statistic
        title="Added"
        value={value}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix={<PlusOutlined />}
      />
    </Card>
  );
};

export default InstructorBalanceWrapper;
