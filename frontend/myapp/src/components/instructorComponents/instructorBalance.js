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
  const ContainerHeight = 400;
  let value;
  const { username, userType } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [userName, setUserName] = username;
  const [usertype, setUserType] = userType;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(true);
    axios
      .get(`http://localhost:2020/getUser/${userName}/${usertype}`)
      .then((response) => {
        value = response.wallet;
      });
  }, []);

  return (
    <InstructorDashboard>
      <div>
        <h1>My Monthly Balance</h1>
        <List>
          <VirtualList
            data={value}
            height={ContainerHeight}
            itemHeight={2}
            itemKey="email"
          >
            {() => (
              <List.Item>
                <Card>
                  <Statistic
                    title={"Total Balance for "}
                    value={value}
                    precision={2}
                    valueStyle={{ color: "#3f8600" }}
                    prefix={<DollarOutlined />}
                  />
                </Card>
              </List.Item>
            )}
          </VirtualList>
        </List>
      </div>
      {/* <InstructorBalanceAdditions value={1000} />
      <InstructorBalanceAdditions value={125} />
      <InstructorBalanceAdditions value={1500} />
      <InstructorBalanceAdditions value={2000} />
      <InstructorBalanceAdditions value={2500} /> */}

      <InstructorMonthlyBalances />
      <InstructorTransactions />
    </InstructorDashboard>
  );
};

export default InstructorBalanceWrapper;
