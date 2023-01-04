import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  GithubOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import { Link } from "react-router-dom";

const SocialMediaComponent = () => {
  return (
    <div
      className="socialMedia"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "100%",
      }}
    >
      <Space>
        <a
          style={{
            color: "white",
            textDecoration: "none",
          }}
          href="https://www.facebook.com/CanCham/"
          onClick="return func();"
        >
          <FacebookOutlined
            style={{
              fontSize: "30px",
            }}
          />
        </a>
        <br></br>
        <br></br>
        <a
          style={{
            color: "white",
            textDecoration: "none",
          }}
          href="https://twitter.com/Mohamed55549552"
          onClick="return func();"
        >
          <TwitterOutlined
            style={{
              fontSize: "30px",
            }}
          />
        </a>
        <br></br>
        <br></br>
        <a
          style={{
            color: "white",
            textDecoration: "none",
          }}
          href="https://www.linkedin.com/in/mohamed-tamer-68030b22a/"
          onClick="return func();"
        >
          <LinkedinOutlined
            style={{
              fontSize: "30px",
            }}
          />
        </a>
        <br></br>
        <br></br>
        <a
          style={{
            color: "white",
            textDecoration: "none",
          }}
          href="https://www.youtube.com/channel/UC1ykoFKsMjVQCx3TeLIXDbg"
          onClick="return func();"
        >
          {" "}
          <YoutubeOutlined
            style={{
              fontSize: "30px",
            }}
          />
        </a>
        <br></br>
        <br></br>
        <a
          style={{
            color: "white",
            textDecoration: "none",
          }}
          href="https://github.com/Advanced-Computer-Lab-2022/ERROR404"
          onClick="return func();"
        >
          <GithubOutlined
            style={{
              fontSize: "30px",
            }}
          />
        </a>
        <br></br>
        <br></br>
      </Space>
    </div>
  );
};

const Logo = () => {
  return (
    <div
      className="logo"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "100%",
      }}
    >
      <img
        src="https://drnajafbeigi.com/wp-content/uploads/404%D8%AB.png"
        style={{ width: "10%" }}
      />
    </div>
  );
};

const CourseraCategories = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "100%",
        width: "12%",
        boxSizing: "border-box",
        padding: "1%",
        gap: "1%",
      }}
    >
      <h4
        style={{
          color: "white",
          justifySelf: "flex-start",
        }}
      >
        <b>ERROR 404</b>
      </h4>
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        Home
      </Link>
      <Link style={{ color: "white", textDecoration: "none" }} to="/aboutTeam">
        About
      </Link>
      {/* <Link style={{ color: "white", textDecoration: "none" }}>Contact Us</Link>
      <Link style={{ color: "white", textDecoration: "none" }}>
        What we offer
      </Link> */}
      {/* <Link style={{ color: "white", textDecoration: "none" }}>
        Become an Instructor
      </Link> */}
    </div>
  );
};

const MoreCategories = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "100%",
        width: "12%",
        boxSizing: "border-box",
        padding: "1%",
        gap: "1%",
      }}
    >
      <h4
        style={{
          color: "white",
          justifySelf: "flex-start",
        }}
      >
        <b>Instructors </b>
      </h4>
      <Link
        to="/acceptagreement"
        style={{ color: "white", textDecoration: "none" }}
      >
        Instructor Agreement
      </Link>
      <Link
        to="/ReportaProblem"
        style={{ color: "white", textDecoration: "none" }}
      >
        Report a Problem
      </Link>
      {/* <Link
        to="/user/reports"
        style={{ color: "white", textDecoration: "none" }}
      >
        Follow up on a ticket
      </Link> */}
      {/* <Link style={{ color: "white", textDecoration: "none" }}>
        Request Access to Course
      </Link> */}
      {/* <Link style={{ color: "white", textDecoration: "none" }}>
        Request refund
      </Link> */}
    </div>
  );
};

const InstructorCategories = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "100%",
        width: "12%",
        boxSizing: "border-box",
        padding: "1%",
        gap: "1%",
      }}
    >
      <h4
        style={{
          color: "white",
          justifySelf: "flex-start",
        }}
      >
        <b>Courses</b>
      </h4>
      <Link
        to="/viewAllCourses"
        style={{ color: "white", textDecoration: "none" }}
      >
        View All courses
      </Link>
    </div>
  );
};

const TeamCategories = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "100%",
        width: "12%",
        boxSizing: "border-box",
        padding: "1%",
        gap: "1%",
      }}
    >
      <h4
        style={{
          color: "white",
          justifySelf: "flex-start",
        }}
      >
        <b>Our Team</b>
      </h4>
      <span>Ali Ghieth</span>
      <span>Abdelrahman Ali</span>
      <span>Mohammed Tamer</span>
      <span>Dina Tamer</span>
      <span>Malak</span>
    </div>
  );
};

const ContactInfoCategories = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        height: "100%",
        width: "30%",
        boxSizing: "border-box",
        padding: "1%",
        gap: "1%",
      }}
    >
      <h4
        style={{
          color: "white",
          justifySelf: "flex-start",
        }}
      >
        <b>Where to find us</b>
      </h4>
      <span>German University in Cairo</span>
      <span>New Cairo City . Main Entrance El-Tagamoa El-Khames</span>
      <span>Main Entrance El-Tagamoa El-Khames</span>
      <span>Hotline 16482 . Tel: +202 27589990-8 . Fax: +202 27581041</span>
    </div>
  );
};
const FooterWrapper = () => {
  return (
    <div
      className="wholeDiv"
      style={{
        display: "flex",
        flexDirection: "column",

        backgroundColor: "black",
        color: "White",
        height: "50vh",
      }}
    >
      <div
        className="logo socialMedia"
        style={{
          display: "flex",
          flexDirection: "row",
          height: "40%",
        }}
      >
        <Logo />
        <SocialMediaComponent />
      </div>
      <div
        className="categories"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "60%",
          width: "100%",
          gap: "5%",
        }}
      >
        <CourseraCategories />
        <MoreCategories />
        <InstructorCategories />
        <ContactInfoCategories />
      </div>
    </div>
  );
};
export default FooterWrapper;
