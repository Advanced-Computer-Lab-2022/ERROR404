import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Gauge } from "@ant-design/plots";

const DemoGauge = ({ value }) => {
  const config = {
    percent: { value },
    type: "meter",
    innerRadius: 0.75,
    range: {
      ticks: [0, 1 / 4, 2 / 4, 3 / 4],
      color: ["#F4664A", "#FAAD14", "#30BF78"],
    },
    indicator: {
      pointer: {
        style: {
          stroke: "#D0D0D0",
        },
      },
      pin: {
        style: {
          stroke: "#D0D0D0",
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: "36px",
          lineHeight: "36px",
        },
      },
    },
  };
  return <Gauge {...config} />;
};

export default DemoGauge;
