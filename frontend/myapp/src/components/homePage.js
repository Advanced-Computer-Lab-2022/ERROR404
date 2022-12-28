import App from "../App";
import { Layout, Image, Menu, Input, Button } from "antd";
import Categories from "./viewByCategory";
import TopCourses from "./topCourses";
import ReviewNavigation from "./reviewComponents";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import DemoWordCloud from "./WelcomePageComponents";
import { Link } from "react-router-dom";
import { color, height } from "@mui/system";

const HomePageWrapper = () => {
  return (
    <App>
      <HomePage />
    </App>
  );
};

const HomePage = () => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1>Learn without limits</h1>
          <h4>
            Start, switch, or advance your career with more than 5,400 courses,
            Professional Certificates, and degrees from world-class universities
            and companies.
          </h4>
          <Button
            type="primary"
            style={{
              backgroundColor: "#001529",
            }}
          >
            <Link
              style={{
                textDecoration: "none",
              }}
              to="/viewAllCourses"
            >
              Explore the World
            </Link>
          </Button>
        </div>
        <img
          src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/5CFC8u8XiXcbSOlVv6JZQx/4e6f898f57f9d798437b3aa22026e30b/CourseraLearners_C_Composition_Hillary_copy__3_.png?auto=format%2Ccompress&amp;dpr=1&amp;w=459&amp;h=497&amp;q=40"
          class="css-12519x1"
          alt=""
        ></img>
        <img
          class="non-student-cta--non-student-cta-image--7Y7Ul non-student-cta--on-desktop--2bk9D"
          data-purpose="desktop-non-student-cta-image"
          alt=""
          width="400"
          height="400"
          src="home/non-student-cta/instructor-1x-v3.jpg"
          srcset="https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg 1x, https://s.udemycdn.com/home/non-student-cta/instructor-2x-v3.jpg 2x"
        ></img>
      </div>

      <hr
        style={{
          border: "solid 1px black",
          width: "96%",
          color: "#FFFF00",
          height: "1px",
        }}
      />

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "40vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <img
            width="30%"
            src="https://www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/6VWrRGtNBKGeivw207U8Gj/9628b44b000dad0588b78d37c751d495/udacitys-talent-transformation-suite-graphic.png?fm=png"
            alt=""
            loading="lazy"
          ></img> */}
          <img
            src="https://s.udemycdn.com/error_page/error-desktop-v1.jpg"
            srcset="https://s.udemycdn.com/error_page/error-desktop-v1.jpg 1x, https://s.udemycdn.com/error_page/error-desktop-2x-v1.jpg 2x"
            alt=""
            width="480"
            height="360"
          ></img>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              wordBreak: "break-word",
              overflow: "hidden",
            }}
          >
            <h1>ERROR404s What We Offer</h1>
            <ul>
              <li>
                <h4>
                  Our experts work with you to design a tailored transformation
                  journey. Solve your acute workforce challenges to deliver
                  next-level business results.
                </h4>
              </li>
              <br />
              <li>
                <h4>
                  Our competencies focus exclusively on in‑demand digital
                  technologies and ensure workplace relevance.
                </h4>
              </li>
              <br />
              <li>
                <h4>
                  Easily deploy our infinitely scalable platform, optimized to
                  enable and empower job-ready digital talent. Highly focused
                  content—refined over 10 years with industry experts—verifies
                  core competencies through personalized feedback.
                </h4>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <hr
        style={{
          border: "solid 1px black",
          width: "96%",
          color: "#FFFF00",
          height: "1px",
        }}
      />

      <TopCourses />

      <hr
        style={{
          border: "solid 1px black",
          width: "96%",
          color: "#FFFF00",
          height: "1px",
        }}
      />

      <div
        style={{
          width: "100%",
          height: "40vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: "10%",
        }}
      >
        <h1>The trusted market leader in talent transformation.</h1>

        <Image
          preview={false}
          src="https://www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/47TPYX0wcqm1okPq5KsTD8/9a199f7634901bfa0b5bbdbb456983eb/customer-logos-mobile2.png"
          height="80%"
          style={{
            objectFit: "contain",
          }}
        ></Image>
      </div>
    </div>
  );
};

export default HomePageWrapper;
