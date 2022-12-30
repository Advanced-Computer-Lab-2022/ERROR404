import React, { useEffect, useState } from "react";
import { Avatar, List, message, Card, Statistic } from "antd";
import { DollarOutlined } from "@ant-design/icons";
import VirtualList from "rc-virtual-list";
import DemoLine from "./instructorPayments";

const fakeDataUrl =
  "https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo";
const ContainerHeight = 400;

const data = [
  {
    transactionDate: "12/10/2022",
    transactionsAmount: "2000",
  },
  {
    transactionDate: "12/10/2022",
    transactionsAmount: "2000",
  },
  {
    transactionDate: "12/10/2022",
    transactionsAmount: "2000",
  },
  {
    transactionDate: "12/10/2022",
    transactionsAmount: "2000",
  },
  {
    transactionDate: "12/10/2022",
    transactionsAmount: "2000",
  },
  {
    transactionDate: "12/10/2022",
    transactionsAmount: "2000",
  },
  {
    transactionDate: "12/10/2022",
    transactionsAmount: "2000",
  },
  {
    transactionDate: "12/10/2022",
    transactionsAmount: "2000",
  },
  {
    transactionDate: "12/10/2022",
    transactionsAmount: "2000",
  },
  {
    transactionDate: "12/10/2022",
    transactionsAmount: "2000",
  },
  {
    transactionDate: "12/10/2022",
    transactionsAmount: "2000",
  },
  {
    transactionDate: "12/10/2022",
    transactionsAmount: "2000",
  },
];

const InstructorTransactions = () => {
  return (
    <div>
      <h1>My Last Transactions</h1>
      <List>
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemHeight={10}
          itemKey="email"
        >
          {(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                title={item.transactionDate}
                description={item.transactionsAmount}
              />
              <div>Content</div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
};

const monthlyBalance = [
  {
    month: "January",
    balance: "1000",
  },
  {
    month: "Februeray",
    balance: "2500",
  },
  {
    month: "March",
    balance: "1000",
  },
  {
    month: "April",
    balance: "1000",
  },
  {
    month: "May",
    balance: "1000",
  },
  {
    month: "June",
    balance: "1000",
  },
  {
    month: "July",
    balance: "1000",
  },
  {
    month: "August",
    balance: "250",
  },
  {
    month: "September",
    balance: "1000",
  },
  {
    month: "October",
    balance: "200",
  },
  {
    month: "November",
    balance: "25000",
  },
  {
    month: "December",
    balance: "1500",
  },
];

const InstructorMonthlyBalances = () => {
  return (
    <div>
      <h1>My Monthly Balance</h1>
      <DemoLine />
    </div>
  );
};
export { InstructorMonthlyBalances };
export default InstructorTransactions;
