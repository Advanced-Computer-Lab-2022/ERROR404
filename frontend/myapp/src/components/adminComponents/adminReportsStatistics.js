import React, { useState, useEffect, useContext } from "react";
import { Pie } from "@ant-design/plots";
import { AppContext } from "../../AppContext";
import axios from "axios";

const DemoPie = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [unseen, setUnseen] = useState(0);
  const [resolved, setResolved] = useState(0);
  const [pending, setPending] = useState(0);

  let data = [
    {
      type: "unseen",
      value: unseen,
    },
    {
      type: "resolved",
      value: resolved,
    },
    {
      type: "pending",
      value: pending,
    },
  ];

  let config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };

  useEffect(() => {
    axios.get("http://localhost:2020/getAllReports").then((results) => {
      const reports = results.data;
      console.log(results.data);
      let unseen = 0;
      let resolved = 0;
      let pending = 0;
      let total = 7;
      results.data.map((item) => {
        if (item.status == "unseen") {
          unseen++;
        } else if (item.status == "resolved") {
          resolved++;
        } else {
          pending++;
        }
      });
      setUnseen((unseen / total) * 100);
      setPending((pending / total) * 100);
      setResolved((resolved / total) * 100);
    });
  }, []);

  return <Pie {...config} />;
};

export default DemoPie;
