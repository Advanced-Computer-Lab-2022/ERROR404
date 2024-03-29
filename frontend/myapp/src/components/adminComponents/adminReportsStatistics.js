import React, { useState, useEffect, useContext } from "react";
import { Pie } from "@ant-design/plots";
import { LikeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import axios from "axios";
import { Col, Row, Statistic } from "antd";

const DemoPie = () => {
  const [unseen, setUnseen] = useState(0);
  const [resolved, setResolved] = useState(0);
  const [pending, setPending] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalUnseen, setTotalUnseen] = useState(0);

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
      let total = results.data.length;
      setTotal(results.data.length);
      results.data.map((item) => {
        if (item.status == "unseen") {
          unseen++;
        } else if (item.status == "resolved") {
          resolved++;
        } else {
          pending++;
        }
      });

      setTotalUnseen(unseen);
      setUnseen(Number(((unseen / total) * 100).toFixed(2)));
      setPending(Number(((pending / total) * 100).toFixed(2)));
      setResolved(Number(((resolved / total) * 100).toFixed(2)));
    });
  }, []);

  return (
    <>
      <Pie {...config} />

      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title="Unseen"
            prefix={<EyeInvisibleOutlined />}
            value={totalUnseen}
            suffix={"/" + total}
          />
          {/* <Liquid {...lconfig} /> */}
          {/* <AdminPanelSettings /> */}
        </Col>
      </Row>
    </>
  );
};

export default DemoPie;
