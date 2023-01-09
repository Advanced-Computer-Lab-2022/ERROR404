import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { Button, message, Modal, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { AppContext } from "../../AppContext";
import App from "../../App";
import CourseComponent from "../coursesListComponent";
import SearchByForm from "../search";
import InstructorDashboard from "./InstructorDashboard";

const InstructorFilteredCourses = () => {
  const { username } = useContext(AppContext);
  const [, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [userName, setusername] = username;
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
          "http://localhost:2020/instructorfilterByPriceOrRate/" +
            userName +
            "/" +
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
          "http://localhost:2020/instructorfilterByPriceOrRate/" +
            userName +
            "/" +
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
        .get(
          "http://localhost:2020/instructorfilterByCategory/" +
            userName +
            "/" +
            category
        )
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
        .get(
          "http://localhost:2020/instructorFilterCourses/" +
            userName +
            "/" +
            filterType +
            "/" +
            value
        )
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
    <InstructorDashboard>
      <CourseComponent courses={courses} viewType={"instructor"} />
    </InstructorDashboard>
  );
};

export default InstructorFilteredCourses;
