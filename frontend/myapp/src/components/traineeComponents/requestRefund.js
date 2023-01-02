import { Button, message } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../AppContext";

const RequestRefund = ({ courseId }) => {
  const { username, userType, traineeCourses } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [user, setUser] = userType;
  const [progress, setProgress] = useState(0);
  const [traineeCoursesList, setTraineeCoursesList] = traineeCourses;

  useEffect(() => {
    console.log("HALLO " + courseId);
    axios
      .get(
        "http://localhost:2020/getRefundRequestsByCourseIdUsername/" +
          userName +
          "/" +
          courseId
      )
      .then((response) => {
        console.log("RESULT " + JSON.stringify(response.data));

        axios
          .get(`http://localhost:2020/getUser/${userName}/${user}`)
          .then((response) => {
            console.log("HNNNNA");
            console.log("ANA A" + response.data.progress);
            response.data.progress.map((course) => {
              if (course.course == courseId) {
                console.log(progress);
                setProgress(course.progress);
              }
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onFinish = () => {
    console.log(courseId);
  };

  return (
    <Button type="primary" onClick={onFinish}>
      Request Refund
    </Button>
  );
};

export default RequestRefund;
