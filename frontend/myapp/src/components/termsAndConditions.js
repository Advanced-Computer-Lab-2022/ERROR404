import { message, Form, Button, Checkbox } from "antd";
import App from "../App";
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import { jsPDF } from "jspdf";

const Terms = () => {
  const actions = [
    {
      icon: (
        <SaveIcon
          onClick={() => {
            const input = document.getElementById("pdf-element");
            const pdf = new jsPDF("p", "pt", "a4");
            pdf.html(input).then(() => {
              pdf.save("test.pdf");
            });
          }}
        />
      ),
      name: "Save",
    },
    {
      icon: (
        <PrintIcon
          onClick={() => {
            const input = document.getElementById("pdf-element");
            const pdf = new jsPDF("p", "pt", "a4");
            pdf.html(input).then(() => {
              pdf.autoPrint();
              pdf.output("dataurlnewwindow");
            });
          }}
        />
      ),
      name: "Print",
    },
  ];

  return (
    <App>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifycontent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <h1>Terms and Policy Agreement </h1>

        <div
          id="pdf-element"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "normal",
            fontSize: "15px",
            width: "100%",
            height: "100%",
            lineheight: "3em",
            overflow: "scroll",
            border: "thin #000 solid",
            padding: "5px",
          }}
        >
          <h4> 1. One-time Purchases </h4>General Refunds Guided Projects
          Error404 does not offer refunds for payments made for guided projects.
          Courses and Specializations If you cancel your one-time, paid
          enrollment for a course or specialization, Error404 will offer you a
          complete refund until 14 days after payment, or until you earn a
          course certificate for any course in the specialization, whichever is
          earlier. If you pre-enroll and pay for a course or specialization,
          Error404 will offer you a complete refund until 14 days after the
          course or specialization launches or until you have earned your course
          or specialization certificate, whichever is earlier. Refunds for
          Certificates Guided Projects If you do not earn your completion
          certificate within 180 days after registering for a guided project,
          your registration will expire and you will need to pay to re-enroll
          for the guided project in order to complete the guided project and
          earn your completion certificate. Courses Once you have earned a
          course certificate with your payment, you are not eligible for a
          refund even if it is within 14 days. If you do not earn your course
          certificate within 180 days, your registration will expire and you
          will need to pay to re-enroll for the course. Specializations Unless
          otherwise indicated as part of the sign-up process, you have one year
          after you purchase a specialization to complete the specialization.
          <h4>2. Month-to-Month Specialization Subscriptions</h4> General
          Refunds Error404 does not offer refunds for payments made on a
          month-to-month specialization subscription plan. Refunds for Trials To
          avoid being charged during a free trial period, you must cancel your
          subscription before your free trial ends. If you complete a course
          during the free trial period, Error404 reserves the right to require
          you to pay for a one-month subscription in order to receive a course
          and/or specialization certificate. Cancellation Your subscription will
          continue on a month-to-month basis unless and until you cancel or the
          subscription is suspended or discontinued by Error404. If you cancel
          your subscription, cancellation will be effective at the end of the
          current monthly period. You will continue to have access to your
          subscription for the remainder of that period, but you will not
          receive a refund. For subscriptions to individual specializations,
          Error404 will automatically discontinue your subscription at the end
          of the monthly period during which you earn a certificate for the
          specialization.
          <h4>3. Error404 Plus</h4> General Refunds To get a full refund of your
          Error404 Plus subscription payment, submit a refund request via the
          Learner Help Center within 14 days of your payment. Refunds will not
          be provided if requested after this 14-day period. Refunds for Trials
          Some Error404 Plus subscriptions may have a free trial period instead
          of a refund period. If you do not cancel during the free trial, you
          will be billed the full amount for the subscription you signed up for
          and be unable to request a refund. Cancellation Your Error404 Plus
          subscription will continue for the subscription period identified at
          the time of your purchase and then automatically renew unless and
          until you cancel your subscription or the subscription is suspended or
          discontinued by Error404. If you cancel your subscription after the
          refund period of your subscription, you will continue to have access
          until the end of the subscription period and will not be billed for
          the next billing cycle.
          <h4>4. Degree, MasterTrack, and University Certificate Programs</h4>
          Refund policies for Degree, MasterTrack, and University Certificate
          programs are established and administered by the Content Provider
          offering the program. Refund policies are communicated to students by
          those Content Providers.
          <h4>5. Other Paid Services</h4> Except as described in this Refund
          Policy or as explicitly stated as part of the sign-up process for a
          Service, Error404 has no obligation to provide refunds or vouchers for
          any other Services. Error404 reserves the right to offer refunds at
          its discretion. Please note that our policies differ between
          subscription payments and one-time payments made for course,
          specialization, and guided project purchases, and that payment options
          may vary from one offering to another. Please also note that we treat
          violations of our Terms of Use and Honor Code very seriously, and we
          have no obligation to offer refunds to users who violate these or
          other Error404 policies, even if their requests are made within the
          designated refund period. Similarly, we have no obligation to offer
          late refunds to users who do not receive a passing mark in a Content
          Offering, or who are otherwise unsatisfied with their final grade.
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "normal",
            alignItems: "center",
            fontSize: "20px",
          }}
        >
          <div>
            <Box
              sx={{
                height: 100,
                width: 1100,
                transform: "translateZ(100px)",
                flexGrow: 2,
              }}
            >
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: "absolute", bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
            </Box>
          </div>
        </div>
      </div>
    </App>
  );
};

export default Terms;
