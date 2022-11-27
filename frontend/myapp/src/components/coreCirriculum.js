import React, { useState } from "react";
import CoursePage from "./CoursePage";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  PieChartOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Space, Statistic, Timeline } from "antd";

const CoreCirWrapper = () => {
  return (
    <CoursePage>
      <CoreCurricullum />
    </CoursePage>
  );
};

const CoreCurricullum = () => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        padding: "5%",
        display: "flex",
        flexDirection: "column",
        height: "max-content",
        width: "90%",
        backgroundColor: "white",
        gap: "5%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            justifyContent: "space-between",
          }}
        >
          <Space>
            <PieChartOutlined />
            <span>7 Parts</span>
          </Space>
          <Space>
            <RocketOutlined />
            <span>0 Projects</span>
          </Space>
        </div>
        <div>
          <Statistic
            title="Active"
            value={1100}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<ArrowUpOutlined />}
            suffix="students"
          />
        </div>
      </div>
      <div>
        <Timeline>
          <TimeLineComp
            part={1}
            title="Introduction to the Program"
            description="Welcome to Egypt Future Work is Digital initiative."
            time="20 minutes"
          />
          <TimeLineComp
            part={2}
            title="Descriptive Statistics"
            description="Learn the basic concepts of data analysis and descriptive statistics."
            time="8 hours"
          />
          <TimeLineComp
            part={3}
            title="Spreadsheets"
            description="Learn how to manipulate, analyze and visualize data in Excel and Google Sheets."
            time="8 hours"
          />
        </Timeline>
      </div>
    </div>
  );
};

const TimeLineComp = (props) => {
  return (
    <Timeline.Item>
      <div>
        <h2>Part {props.part}</h2>
        <h1>{props.title}</h1>
        <h3>{props.description}</h3>
        <h5>Estimated time: {props.time}</h5>
        <hr />
      </div>
    </Timeline.Item>
  );
};

export default CoreCirWrapper;
