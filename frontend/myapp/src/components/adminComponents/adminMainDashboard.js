import React, { useContext } from "react";
import { Alert } from "antd";
import Marquee from "react-fast-marquee";
import AdminDashboard from "./adminDashboard";
import { AppContext } from "../../AppContext";
import DemoPie from "./adminReportsStatistics";

const AdminMainDashboardWrapper = () => {
  return (
    <AdminDashboard>
      <AdminMainDashboard />
    </AdminDashboard>
  );
};

export default AdminMainDashboardWrapper;

const AdminMainDashboard = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;
  return (
    <Alert
      type="info"
      banner
      message={
        <>
          <Marquee pauseOnHover gradient={false}>
            Welcome Back {userName}, This is a summary for all your reports and
            requests
          </Marquee>
          <DemoPie />
        </>
      }
    />
  );
};
