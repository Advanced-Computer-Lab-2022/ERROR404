import PreviewCourses from "../CourseViewWrapper";
import { CoreCurricullum } from "../coreCirriculum";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const CourseSyllabus = () => {
  const [courseId, setCourseId] = useState("");
  const navigate = useNavigate;

  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");
    console.log(courseId);
    setCourseId(courseId);
  }, [navigate]);
  return (
    <PreviewCourses courseId={courseId}>
      <CoreCurricullum courseId={courseId} />
    </PreviewCourses>
  );
};

export default CourseSyllabus;
