import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../AppContext";

const PayForCourse = () => {
  const location = useLocation();
  const { username, userType } = useContext(AppContext);
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");
    setCourseId(courseId);
  }, [location]);
  return <div></div>;
};

export default PayForCourse;
