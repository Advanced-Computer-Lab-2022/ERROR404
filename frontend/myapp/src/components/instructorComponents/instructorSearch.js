import React, { useEffect, useState } from "react";
import {
  AudioOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { Button, Input, Space } from "antd";
const { Search } = Input;

const InstructorSearchBar = ({ data }) => {
  const [searchLoading, setIsLoading] = useState(false);
  const { originalData, coursesData } = data;
  const [allCourses, setAllcourses] = originalData;
  const [courses, setCourses] = coursesData;

  const onSearch = (value) => {
    setIsLoading(true);
    console.log(value);
    let data = [];
    courses.map((course) => {
      if (
        course.title.toLowerCase().includes(value) ||
        course.category.toLowerCase().includes(value) ||
        course.summary.toLowerCase().includes(value)
      ) {
        data.push(course);
      } else if (
        course.price == value ||
        course.rating == value ||
        course.totalHours == value
      ) {
        data.push(course);
      }
    });
    setCourses(data);
    setIsLoading(false);
  };

  return (
    <div
      style={{
        width: "70%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button type="link" onClick={() => setCourses(allCourses)}>
        reset search
      </Button>
      <Search
        bordered
        placeholder="Search for anything..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        loading={searchLoading}
        onSearch={onSearch}
      />
    </div>
  );
};
export default InstructorSearchBar;
