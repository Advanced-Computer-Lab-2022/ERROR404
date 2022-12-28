import React from "react";
import InstructorDashboard from "./InstructorDashboard";
import ReviewNavigation from "../reviewComponents";
import { Button, Table } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Card, List, Row, Statistic, Breadcrumb } from "antd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VirtualList from "rc-virtual-list";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import axios from "axios";
import InstructorTransactions, {
  InstructorMonthlyBalances,
} from "./instructorTransactions";

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
    <InstructorDashboard>
      <div>
        <h1>My Monthly Balance</h1>
        <Card
          title="My Wallet"
          bordered={false}
          style={{
            width: 300,
          }}
        >
          <p>{value}</p>
        </Card>
      </div>
      {/* <InstructorBalanceAdditions value={1000} />
      <InstructorBalanceAdditions value={125} />
      <InstructorBalanceAdditions value={1500} />
      <InstructorBalanceAdditions value={2000} />
      <InstructorBalanceAdditions value={2500} /> */}

      <InstructorTransactions />
    </InstructorDashboard>
  );
};

export default InstructorBalanceWrapper;
