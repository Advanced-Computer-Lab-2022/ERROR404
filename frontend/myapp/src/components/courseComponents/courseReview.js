import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PreviewCourses from "../CourseViewWrapper";
import ReviewNavigation from "../reviewComponents";

const CourseReview = () => {
  const [courseId, setCourseId] = useState("");
  const navigate = useNavigate;

  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");

    setCourseId(courseId);
  }, [navigate]);
  return (
    <PreviewCourses courseId={courseId}>
      <ReviewNavigation courseId={courseId} />
    </PreviewCourses>
  );
};

export default CourseReview;
