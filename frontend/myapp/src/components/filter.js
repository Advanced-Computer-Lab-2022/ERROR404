import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import App from "../App";
import CourseComponent from "./coursesListComponent";

const Filter = () => {
  const [courses, setCourses] = useState([]);

  let location = useLocation();
  useEffect(() => {
    const idSearch = window.location.search;

    const urlParams = new URLSearchParams(idSearch);
    const filterType = urlParams.get("filterType");
    const value = urlParams.get("value");

    console.log(filterType);
    axios
      .get("http://localhost:2020/filter/" + filterType + "/" + value)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
        setCourses([]);
      });
  }, [location]);

  return (
    <App>
      <CourseComponent courses={courses} />
    </App>
  );
};

export default Filter;
