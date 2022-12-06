import React from "react";
import { Button, Space } from "antd";
import App from "../../App";

const onChange = (e) => {
  console.log(e);
};

const AcceptAgreWrapper = () => {
  return (
    <App>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <h1>InsructorAgreement :</h1>

        <p>
          <a
            href="https://drive.google.com/file/d/1Af0GnFEtfENbn2ubAj-RYCFSyLHv0YWm/view?usp=sharing"
            target="_blank"
          >
            Click Here
          </a>
        </p>
        <input type="checkbox" class="larger" onChange={onChange} />
        <p> Accept Agreement</p>
        <Space wrap>
          <Button type="primary">Done</Button>
        </Space>
      </div>
    </App>
  );
};

export default AcceptAgreWrapper;
