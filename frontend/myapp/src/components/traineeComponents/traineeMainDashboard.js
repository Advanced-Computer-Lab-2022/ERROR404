import TraineeDashboard from "./TraineeDashboard";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";
import { AppContext } from "../../AppContext";
//import TraineeViewCourses from "./traineeViewCourses";
import CourseComponent from "../coursesListComponent";
import React, { useContext, useEffect, useState } from "react";
import CourseComponentTrainee from "../coursesListTraineeComponent";

const TraineeMainDashboardWrapper = () => {
  return (
    <TraineeDashboard>
      <TraineeAlert/>
      <TraineeViewCourses/>
    </TraineeDashboard>
  );
};



const TraineeAlert = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;
  return (
    <Alert
      type="info"
      banner
      message={
        <>
          <Marquee pauseOnHover gradient={false}>
            Welcome Back {userName} , Here are all the courses you are registered for:
          </Marquee>
        </>
      }
    />
  );
};

const TraineeViewCourses = () => {
  const { userType, username } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [user, setUser] = userType;
  const [neverChangedCourses, setNeverCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:2020/getMyCourses/" + user + "/" + userName)
      .then((responce) => responce.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
        setNeverCourses(data);
      });
  }, []);

  const values = {
    coursesData: [courses, setCourses],
    originalData: [neverChangedCourses, setNeverCourses],
  };
  return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
      <CourseComponentTrainee courses={courses} viewType="individual" />
      </div>
  );
};
export default TraineeMainDashboardWrapper;