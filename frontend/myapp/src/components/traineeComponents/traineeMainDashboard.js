import TraineeDashboard from "../../pages/TraineeDashboard";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";
import { AppContext } from "../../AppContext";
import React, { useContext } from "react";

const TraineeMainDashboardWrapper = () => {
  return (
    <TraineeDashboard>
      <TraineeMainDashboard />
    </TraineeDashboard>
  );
};

export default TraineeMainDashboardWrapper;

const TraineeMainDashboard = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;
  return (
    <Alert
      type="info"
      banner
      message={
        <Marquee pauseOnHover gradient={false}>
          Welcome Back {userName} , Here are all the courses you are registered for:
        </Marquee>
      }
    />
  );
};