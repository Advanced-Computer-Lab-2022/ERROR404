import React from "react";
import { useState } from "react";
import { RightOutlined, LinkOutlined } from "@ant-design/icons";
import { Button, Progress } from "antd";
const ProgressWrapper = () => {
  const [percent, setPercent] = useState(0);
  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 10;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18%",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <h1>MyCourse Tutorials</h1>
        <br />
        <Progress percent={percent} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "18%",
          justifyContent: "left",
          alignItems: "left",
          fontSize: "20px",
        }}
      >
        <a
          style={{
            textDecoration: "none",
          }}
          href="https://twitter.com/Mohamed55549552"
          onClick="return func();"
        >
          {" "}
          Online learning
          <LinkOutlined
            style={{
              fontSize: "25px",
            }}
          />
        </a>
        <Button.Group>
          <Button onClick={increase} icon={<RightOutlined />} />
        </Button.Group>
      </div>
    </div>
  );
};
export default ProgressWrapper;
