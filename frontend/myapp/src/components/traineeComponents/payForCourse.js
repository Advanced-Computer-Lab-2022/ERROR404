import { message, Steps } from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

const { Step } = Steps;
const PayForCourse = () => {
  const location = useLocation();
  const { username, userType } = useContext(AppContext);
  const [courseId, setCourseId] = useState("");
  const [userName, setUserName] = username;
  const [user, setUser] = userType;

  const navigate = useNavigate();

  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");
    setCourseId(courseId);

    if (username == "" || user == "") {
      navigate("/");
      message.info("You need to login or sign up to be able to pay for course");
    }
  }, [location]);
  return (
    <div>
      <Steps>
        <Step status="finish" title="Login" />
        <Step status="finish" title="Verification" />
        <Step status="process" title="Pay" />
        <Step status="wait" title="Done" />
      </Steps>
      ,
    </div>
  );
};

export default PayForCourse;
