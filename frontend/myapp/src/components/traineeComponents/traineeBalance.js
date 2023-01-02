import React from "react";
import { Tabs } from "antd";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DollarOutlined,
  WalletOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Statistic, Breadcrumb } from "antd";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";
import axios from "axios";

const TraineeBalanceWrapper = () => {
  const { username, userType } = useContext(AppContext);
  const [value, setvalue] = useState(0);
  const [userName, setUserName] = username;
  const [usertype, setUserType] = userType;

  useEffect(() => {
    axios
      .get(`http://localhost:2020/getUser/${userName}/${usertype}`)
      .then((response) => {
        console.log(response.data.balance);
        setvalue(response.data.balance);
      });
  }, []);

  return <span>${value}</span>;
};

export default TraineeBalanceWrapper;
