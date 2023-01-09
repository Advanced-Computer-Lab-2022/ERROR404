import { useEffect, useState } from "react";
import { RiseOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Carousel, List } from "antd";
import { Grow } from "@mui/material";

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
        console.log("hala ", courses.data);
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
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <List
        grid={{ gutter: 16, column: 0 }}
        dataSource={topCourses}
        renderItem={(item) => (
          <List.Item>
            <Card
              onClick={() => navigate(`/course/about?courseId=${item._id}`)}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  height={150}
                  alt="course image"
                  src={
                    item.image == null ||
                    item.image == undefined ||
                    item.image == ""
                      ? "https://m.media-amazon.com/images/I/61nKTBvX5GL.jpg"
                      : item.image
                  }
                />
              }
            >
              <Card.Meta title={item.title} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TopCourses;
