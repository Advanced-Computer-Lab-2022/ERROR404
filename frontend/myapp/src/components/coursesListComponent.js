import React, { useContext, useEffect, useState } from "react";
import {
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  EyeOutlined,
  HourglassOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { Avatar, List, Space, Rate } from "antd";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CourseComponent = ({ courses }) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 4,
      }}
      dataSource={courses}
      renderItem={(item) => (
        <div>
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={EyeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={item.review.length}
                key="list-vertical-message"
              />,
              <IconText
                icon={HourglassOutlined}
                text={item.totalHours + " hours"}
                key="list-vertical-message"
              />,
              <IconText
                icon={DollarOutlined}
                text={item.price == 0 ? "FREE" : item.price}
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.summary}
            />
            {<Rate allowHalf defaultValue={item.rating} disabled={true} />}
          </List.Item>
        </div>
      )}
    />
  );
};

export default CourseComponent;
