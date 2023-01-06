import React, { useContext } from "react";
import { Alert } from "antd";
import AdminDashboard from "./adminDashboard";
import { AppContext } from "../../AppContext";
import DemoPie from "./adminReportsStatistics";

const AdminMainDashboardWrapper = () => {
  return (
    <AdminDashboard pageName="Dashboard">
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
      style={{
        position: "relative",
      }}
      type="info"
      banner
      message={
        <>
          Welcome Back {userName}, This is a summary for all your reports and
          requests
          {/* <DemoPie /> */}
        </>
      }
    />
  );
};
