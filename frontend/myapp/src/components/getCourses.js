import React, { useState } from "react";
import axios from "axios";
import { Button } from "antd";

const GetCoursesByPrice = () => {
  const [data, setData] = useState("");

  const getCourses = () => {
    axios({
      method: "get",
      url: "http://localhost:2020/search/125",
    })
      .then((response) => console.log(response))
      .then((data) => {
        console.log("the data => ", data);
        setData(data);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
      });
  };

  return (
    <Button type="primary" onClick={getCourses}>
      Get Courses at price 12s
    </Button>
  );
};

export default GetCoursesByPrice;
