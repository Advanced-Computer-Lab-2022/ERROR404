import App from "../App";
import { Layout, Image, Menu, Input } from "antd";
import Categories from "./viewByCategory";
import TopCourses from "./topCourses";
import ReviewNavigation from "./reviewComponents";

const HomePageWrapper = () => {
  return (
    <App>
      <HomePage />
    </App>
  );
};

const HomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5vh",
      }}
    >
      <TopCourses />
      {/* <TopCourses /> */}
      {/* <ReviewNavigation /> */}
    </div>
  );
};

export default HomePageWrapper;
