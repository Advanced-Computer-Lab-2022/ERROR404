import App from "../App";
import { Layout, Image, Menu, Input } from "antd";
import Categories from "./viewByCategory";
import TopCourses from "./topCourses";

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
      <Image
        src="https://www.open.edu/openlearn/pluginfile.php/3277384/tool_ocwmanage/articletext/0/become_a_student_inline.jpg"
        width="100%"
        height="70vh"
        preview={false}
      />
      <TopCourses />
      <TopCourses />
    </div>
  );
};

export default HomePageWrapper;
