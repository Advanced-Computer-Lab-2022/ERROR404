import App from "../App";
import React from 'react';
import {
    ReadOutlined,
    FileSearchOutlined,
    DatabaseOutlined,
  } from '@ant-design/icons';
import { Button , Space} from 'antd';
import { useState } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;
const ReportaProblemWrapper = () => {

    const [value, setValue] = useState('');

return (    
    <App>
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          justifycontent: "Spacebetween" ,
          alignItems: "stretch",
          fontSize: "20px",
          gap: "40%" ,
          fontweight: "bold" ,
        }}
      >
       <h2>
        How to make a good report
       </h2>
       <br />
       <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "18%" ,
          justifyContent: "left",
          alignItems: "stretch",
          fontSize: "20px",
        }}
      >
        <Space>
        <ReadOutlined />
       <h2>Clear title</h2>
       </Space>
      
       <Space>
       <FileSearchOutlined />
       <h2>Review suggestion</h2>
       </Space>

       <Space>
       <DatabaseOutlined />
       <h2>Separate issues</h2>
       </Space>

       </div>
       <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20%" ,
          justifyContent: "left",
          alignItems: "stretch",
          fontSize: "20px",
        }}
      >
       <p>Provide clear title and details</p>
       <p>You might find your issue already exists</p>
       <p>If you have multiple problems, submit multiple reports</p>
       </div>
       <div>
       <br />
       <h3>Please provide clear title and details. Share your research to help us understand your post *</h3>
       <TextArea placeholder="Please add the title here" autoSize />
      <div
        style={{
          margin: '24px 0',
        }}
      />
      <h3>Description *</h3>
      <>
    <TextArea rows={8} placeholder="To increase our ability to provide a fix, please thoroughly explain the issue and add clear reproduction steps" />
    
  </>
       </div>
       <div>
       <br />
       <Space wrap>
    <Button type="primary">Submit</Button>
    <Button type="primary">Cancel</Button>
  </Space>
       </div>
      </div>
    </App>
    );
};

export default ReportaProblemWrapper;