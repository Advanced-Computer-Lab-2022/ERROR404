import React from "react";
import InstructorDashboard from "../../pages/InstructorDashboard";
import ReviewNavigation from "../reviewComponents";
import { Breadcrumb, Rate } from "antd";

const InstructorReviewWrapper = () => {
  // create a backend callout to get user
  return (
    <InstructorDashboard>
      <>
        <Breadcrumb>
          <Breadcrumb.Item>My Reviews</Breadcrumb.Item>
        </Breadcrumb>
        <Rate allowHalf defaultValue={4} disabled={true} />
        <ReviewNavigation />
      </>
    </InstructorDashboard>
  );
};

export default InstructorReviewWrapper;
