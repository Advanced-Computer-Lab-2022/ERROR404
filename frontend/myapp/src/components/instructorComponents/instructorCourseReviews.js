import { message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import InstructorDashboard from "./InstructorDashboard";
import ReviewNavigation from "../reviewComponents";

const InstructorCourseReview = () => {
  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");

    axios
      .get("http://localhost:2020/getCourse/" + courseId)
      .then((res) => {
        console.log("course reviews -> ", res.data.review);
        message.success("loaded reviews of " + res.data.title + " course");
      })
      .catch((err) => {
        console.log("error at getting course reviews ");
      });
  }, []);
  return (
    <InstructorDashboard>
      <ReviewNavigation />
    </InstructorDashboard>
  );
};

export default InstructorCourseReview;
