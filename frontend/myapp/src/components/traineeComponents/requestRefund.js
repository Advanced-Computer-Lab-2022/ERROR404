import { Button, message } from "antd";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";

const RequestRefund = ({ courseId }) => {
  const { username, userType, traineeCourses } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [user, setUser] = userType;
  const [traineeCoursesList, setTraineeCoursesList] = traineeCourses;

  useEffect(() => {
    console.log("HALLO " + courseId);
    axios
      .get("/getRefundRequestsByCourseIdUsername/" + userName + "/" + courseId)
      .then((res) => {
        console.log(res);
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
