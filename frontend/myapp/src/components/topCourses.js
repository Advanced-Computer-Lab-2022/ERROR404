import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { RiseOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const contentStyle = {
  height: "30vh",
  color: "#fff",
  lineHeight: "30vh",
  textAlign: "center",
};

const TopCourses = () => {
  const navigate = useNavigate();
  const [topCourses, setTopCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2020/getTopCourses")
      .then((courses) => {
        console.log(courses.data);
        setTopCourses(courses.data);
      })
      .catch((err) => {
        console.log("error getting top courses ", JSON.stringify(err));
      });
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "30vh",
      }}
    >
      <div sty>
        <h1>
          Most Popular Courses <RiseOutlined />
        </h1>
      </div>
      <Carousel autoplay>
        {topCourses.map((course) => {
          return (
            <div
              key={course._id}
              onClick={() => navigate(`/course/about?courseId=${course._id}`)}
            >
              <h1
                className="dataScience"
                style={{
                  height: "30vh",
                  color: "#fff",
                  lineHeight: "30vh",
                  textAlign: "center",
                }}
              >
                {course.title} by {course.instructor}
              </h1>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default TopCourses;
