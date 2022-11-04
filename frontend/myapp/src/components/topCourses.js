import { Carousel } from "antd";
import { useState } from "react";
import { RiseOutlined } from "@ant-design/icons";

const contentStyle = {
  height: "30vh",
  color: "#fff",
  lineHeight: "30vh",
  textAlign: "center",
};

const TopCourses = () => {
  const [topCourses, setTopCourses] = useState([]);
  return (
    <div
      style={{
        width: "100%",
        height: "30vh",
      }}
    >
      <div sty>
        <h1>
          Top Categories <RiseOutlined />
        </h1>
      </div>
      <Carousel autoplay>
        <div>
          <h3 className="dataScience" style={contentStyle}>
            Data Science
          </h3>
        </div>
        <div>
          <h3 className="dataScience" style={contentStyle}>
            Computer Engineering
          </h3>
        </div>
        <div>
          <h3 className="dataScience" style={contentStyle}>
            UX/UI
          </h3>
        </div>
        <div>
          <h3 className="dataScience" style={contentStyle}>
            Web Development
          </h3>
        </div>
      </Carousel>
    </div>
  );
};

export default TopCourses;
