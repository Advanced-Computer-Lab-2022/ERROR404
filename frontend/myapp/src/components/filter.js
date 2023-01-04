import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import App from "../App";
import CourseComponent from "./coursesListComponent";
const Filter = () => {
  const [, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  let location = useLocation();

  useEffect(() => {
    const idSearch = window.location.search;
    const urlParams = new URLSearchParams(idSearch);
    const filterType = urlParams.get("filterType");
    if (filterType === "price") {
      const min = urlParams.get("min");
      const max = urlParams.get("max");
      axios
        .get(
          "http://localhost:2020/filterByPriceOrRate/" +
            filterType +
            "/" +
            min +
            "/" +
            max
        )
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => {
          console.log("erorr ", error.message);
          setCourses([]);
        });
    } else if (filterType === "rate") {
      let min = urlParams.get("min");
      axios
        .get(
          "http://localhost:2020/filterByPriceOrRate/" +
            "rate" +
            "/" +
            min +
            "/" +
            5
        )
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => {
          console.log("erorr ", error.message);
          setCourses([]);
        });
    } else if (filterType === "category") {
      const category = urlParams.get("category");
      axios
        .get("http://localhost:2020/filterByCategory/" + category)
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => {
          console.log("erorr ", error.message);
          setCourses([]);
        });
    } else {
      const value = urlParams.get("value");
      axios
        .get("http://localhost:2020/filter/" + filterType + "/" + value)
        .then((response) => {
          setCourses(response.data);
        })
        .catch((error) => {
          console.log("erorr ", error.message);
          setCourses([]);
        });
    }
  }, [location]);

  return (
    <App>
      <CourseComponent courses={courses} />
    </App>
  );
};

export default Filter;
