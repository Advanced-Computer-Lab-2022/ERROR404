import PreviewCourses from "../CourseViewWrapper";
import { CoreCurricullum } from "../coreCirriculum";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Avatar, List, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";

const CourseSyllabus = () => {
  const [courseId, setCourseId] = useState("");
  const navigate = useNavigate;

  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");
    console.log(courseId);
    setCourseId(courseId);
  }, [navigate]);
  return (
    <PreviewCourses courseId={courseId}>
      <CoreCurricullum courseId={courseId} />
    </PreviewCourses>
  );
};

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const CourseSubtitles = ({ courseId }) => {
  //const [courseId, setCourseId] = useState("");
  const [subtitles, setSubtitles] = useState([]);

  useEffect(() => {
    console.log("A7AAAAAA " + courseId);
    axios
      .get("http://localhost:2020/getAllSubtitles/" + courseId)
      .then((response) => {
        console.log(response.data);

        console.log("haloo" + response.data.subtitles);
        setSubtitles(response.data.subtitles);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <Sider
      className="site-layout-background"
      width={200}
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      <List
        itemLayout="horizontal"
        dataSource={subtitles}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.subtitle}</a>}
            />
          </List.Item>
        )}
      />
    </Sider>
  );
};

export default CourseSubtitles;
