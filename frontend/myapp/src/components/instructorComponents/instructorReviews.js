import React from "react";
import InstructorDashboard from "./InstructorDashboard";
import ReviewNavigation from "../reviewComponents";
import { Breadcrumb, Rate } from "antd";

const InstructorReviewWrapper = () => {
  // create a backend callout to get user
  return (
    <InstructorDashboard pageName="My Reviews">
      <ReviewNavigation />
    </InstructorDashboard>
  );
};

export default InstructorReviewWrapper;
