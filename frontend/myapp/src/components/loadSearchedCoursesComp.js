import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import App from "../App";
import CourseComponent from "./coursesListComponent";

const LoadSearchedCourses = () => {
  const [courses, setCourses] = useState([]);

  let location = useLocation();
  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const searchValue = urlParams.get("value");

    axios
      .get("http://localhost:2020/search/" + searchValue)
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

export default LoadSearchedCourses;
