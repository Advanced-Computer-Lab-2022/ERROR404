import { Descriptions, Menu, List } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TraineeDashboard from "../traineeComponents/TraineeDashboard";

const CoursePreview = () => {
  const [subtitles, setSubtitles] = useState([]);
  const [courseId, setcourseId] = useState([]);
  const [video, setVideo] = useState("");

  useEffect(() => {
    const idSearch = window.location.search;
    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");

    setcourseId(courseId);

    axios
      .get("http://localhost:2020/getCourse/" + courseId)
      .then((response) => {
        console.log(response.data.preview);
        setVideo("https://" + response.data.preview);
        console.log(response.data.subtitles);
        setSubtitles(response.data.subtitles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <TraineeDashboard pageName="Course Preview">
      {" "}
      <h1>Les</h1>
      <div>{/* 7ot el progress hena */}</div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "5%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              width: "10%",
              height: "50%",
            }}
          >
            <h2>All Subtitles</h2>
            <List
              itemLayout="horizontal"
              dataSource={subtitles}
              renderItem={(item) => (
                <List.Item>
                  <Link
                    to={
                      "/trainee/course/subtitle?subtitle=" +
                      item.subtitle +
                      "&description=" +
                      item.description +
                      "&video=" +
                      item.video +
                      "&courseId=" +
                      courseId
                    }
                  >
                    {item.subtitle}
                  </Link>
                </List.Item>
              )}
            />
          </div>
          <div
            style={{
              width: "90%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "5%",
            }}
          >
            <iframe
              style={{
                marginLeft: 150,
                marginTop: 10,
              }}
              width="70%"
              height="50%"
              src={video}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </TraineeDashboard>
  );
};

const CourseSubtitleViewWrapper = () => {
  const [subtitle, setSubtitle] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  const [courseId, setcourseId] = useState([]);

  useEffect(() => {
    const idSearch = window.location.search;
    const urlParams = new URLSearchParams(idSearch);
    const subtitle = urlParams.get("subtitle");
    const video = urlParams.get("video");
    const description = urlParams.get("description");
    const courseId = urlParams.get("courseId");

    setVideo("https://" + video);
    setDescription(description);
    setSubtitle(subtitle);

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
    <TraineeDashboard pageName={subtitle}>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "5%",
        }}
      >
        <h1>Les</h1>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              width: "10%",
              height: "50%",
            }}
          >
            <h2>All Subtitles</h2>
            <List
              itemLayout="horizontal"
              dataSource={subtitles}
              renderItem={(item) => (
                <List.Item>
                  <Link
                    to={
                      "trainee/course?subtitle=" +
                      item.subtitle +
                      "&description=" +
                      item.description +
                      "&video=" +
                      item.video +
                      "&courseId=" +
                      courseId
                    }
                  >
                    {item.subtitle}
                  </Link>
                </List.Item>
              )}
            />
          </div>
          <div
            style={{
              width: "90%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "5%",
            }}
          >
            <iframe
              style={{
                marginLeft: 150,
                marginTop: 10,
              }}
              width="70%"
              height="50%"
              src={video}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div>{description}</div>
          </div>
        </div>
      </div>
    </TraineeDashboard>
  );
};

export { CoursePreview };
export default CourseSubtitleViewWrapper;
