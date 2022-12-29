import { Avatar, List } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const Subtitles = () => {
  const [courseId, setCourseId] = useState("");
  const [courseSubtitles, setCourseSubtitles] = useState([]);
  const [courseSubName, setCourseSubName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseVideo, setCourseVideo] = useState("");

  useEffect(() => {
    const idSearch = window.location.search;
    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");
    console.log(idSearch);

    setCourseId(courseId);

    axios
      .get("http://localhost:2020/getAllSubtitles/63890eb0905b2b7822834673")
      .then((response) => {
        setCourseSubtitles(response.data);
        console.log(response.data);
        // const courseSubtitles = courseSubtitles.flatMap(m => m);
        //console.log(courseSubtitles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={<a href="https://ant.design">{item.title}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  );
};
export default Subtitles;
