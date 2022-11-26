import React from "react";
import InstructorDashboard from "../../pages/InstructorDashboard";
import ReviewNavigation from "../reviewComponents";
import { Breadcrumb } from "antd";

const InstructorReviewWrapper = () => {
  return (
    <InstructorDashboard>
      <>
        <Breadcrumb>
          <Breadcrumb.Item>My Reviews</Breadcrumb.Item>
        </Breadcrumb>
        <ReviewNavigation />
      </>
    </InstructorDashboard>
  );
};

export default InstructorReviewWrapper;
