import { message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import InstructorDashboard from "./InstructorDashboard";
import ReviewNavigation from "../reviewComponents";
import CourseReviews from "./courseReviews";
const InstructorCourse = () => {
  const [reviews, setRev] = useState([]);
  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");

    axios
      .get("http://localhost:2020/getCourse/" + courseId)
      .then((res) => {
        console.log("course reviews -> ", res.data.review);
        setRev(res.data.review);
      })
      .catch((err) => {
        console.log("error at getting course reviews ");
      });
  }, []);
  return (
    <InstructorDashboard>
      <CourseReviews reviews={reviews} />
    </InstructorDashboard>
  );
};

export default InstructorCourse;
