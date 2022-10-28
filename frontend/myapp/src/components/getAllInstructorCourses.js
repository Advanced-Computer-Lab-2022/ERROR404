import React, { useState } from "react";
import axios from "axios";
import { Button } from 'antd';


const GetAllInstructorCourses = () => {
    const [data, setData] = useState("");
  
    const instructorCourses = () => {
      axios({
        method: "get",
        url: "http://localhost:2020/searchmycourses/abdoAli/csen",
      })
        .then((data) => {
          console.log("the data => ", data);
          setData(data.data);
        })
        .catch((error) => {
          console.log("erorr ", error.message);
        });
    };
  
    return (
      <Button type="primary" onClick={instructorCourses}>
        GetAllInstructorCourses
      </Button>
    );
  };

export default GetAllInstructorCourses;
