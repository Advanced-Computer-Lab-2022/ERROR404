import {
  Descriptions,
  Menu,
  List,
  Progress,
  Button,
  message,
  Collapse,
  Breadcrumb,
} from "antd";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TakeNotesWrapper from "../takeNotes";
import TraineeDashboard from "../traineeComponents/TraineeDashboard";
import TraineeInsideCourse from "../traineeComponents/traineeInsideCourse";
import RequestRefund from "../traineeComponents/requestRefund";

const { Panel } = Collapse;
const CoursePreview = () => {
  const [subtitles, setSubtitles] = useState([]);
  const [courseId, setcourseId] = useState([]);
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const { username, userType } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [usertype, setUserType] = userType;
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState({});

  const location = useLocation();

  useEffect(() => {
    const idSearch = window.location.search;
    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");

    setcourseId(courseId);

    axios
      .get(`http://localhost:2020/getUser/${userName}/${usertype}`)
      .then((response) => {
        console.log("HNNNNA");
        console.log(response.data.progress);
        response.data.progress.map((course) => {
          if (course.course == courseId) {
            setProgress(course.progress);
          }
        });
      });

    axios
      .get("http://localhost:2020/getCourse/" + courseId)
      .then((response) => {
        setCourse(response.data);
        console.log(response.data.preview);
        setVideo("https://" + response.data.preview);
        console.log(response.data.subtitles);
        setSubtitles(response.data.subtitles);
        setPrice(response.data.price);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

  const requestRefund = () => {
    if (progress > 50) {
      message.warning(
        "Sorrry, You are not eligible for course refund, You have exceeded 50% of the course"
      );
    } else {
      axios
        .get(
          " http://localhost:2020/getRefundRequestsByCourseIdUsername/" +
            userName +
            "/" +
            courseId
        )
        .then((response) => {
          console.log("RESULT " + response.data);
          if (response.data != null) {
            message.warning(
              "You have already requested a refund for this course, You will be refunded shortly"
            );
          } else {
            let body = {
              courseId: courseId,
              username: userName,
              userType: usertype,
              coursePrice: price,
            };
            axios
              .post("http://localhost:2020/requestRefund", body)
              .then((response) => {
                console.log(response);
                message.success("Refund issued successfully");
              })
              .catch((err) => {
                console.log(err);
                message.error(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <TraineeInsideCourse pageName="Course Preview">
      <div>
        <Progress percent={progress} />
      </div>
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
              width: "20%",
              height: "50%",
            }}
          >
            <TakeNotesWrapper />
            {progress >= 100 ? (
              <Button
                type="primary"
                style={{
                  width: "200px",
                }}
              >
                <Link
                  to={
                    "/certificate?courseTitle=" +
                    course.title +
                    "&user=" +
                    userName
                  }
                >
                  Certificate
                </Link>
              </Button>
            ) : null}
            <Button
              type="primary"
              style={{
                width: "200px",
              }}
              onClick={requestRefund}
            >
              Request Refund
            </Button>
            <Collapse ghost defaultActiveKey="1">
              <Panel header="Course Subtitles" key="1">
                <List
                  itemLayout="horizontal"
                  dataSource={subtitles}
                  renderItem={(item, index) => (
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
                          courseId +
                          "&courseTitle=" +
                          course.title
                        }
                      >
                        {item.subtitle}
                      </Link>
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
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
    </TraineeInsideCourse>
  );
};

const CourseSubtitleViewWrapper = () => {
  const [subtitle, setSubtitle] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  const [courseId, setcourseId] = useState([]);
  const [progress, setProgress] = useState(0);
  const { username, userType } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [usertype, setUserType] = userType;
  const [courseTitle, setCourseTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    const idSearch = window.location.search;
    const urlParams = new URLSearchParams(idSearch);
    const subtitle = urlParams.get("subtitle");
    const video = urlParams.get("video");
    const description = urlParams.get("description");
    const courseId = urlParams.get("courseId");
    const courseTitle = urlParams.get("courseTitle");
    setcourseId(courseId);
    setVideo("https://" + video);
    setDescription(description);
    setSubtitle(subtitle);
    setCourseTitle(courseTitle);

    axios
      .get(`http://localhost:2020/getUser/${userName}/${usertype}`)
      .then((response) => {
        console.log("HNNNNA");
        console.log(response.data.progress);
        response.data.progress.map((course) => {
          if (course.course == courseId) {
            setProgress(course.progress);
          }
        });
      });

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
  }, [location]);

  const requestRefund = () => {
    if (progress > 50) {
      message.warning(
        "Sorrry, You are not eligible for course refund, You have exceeded 50% of the course"
      );
    } else {
      axios
        .get(
          " http://localhost:2020/getRefundRequestsByCourseIdUsername/" +
            userName +
            "/" +
            courseId
        )
        .then((response) => {
          console.log("RESULT " + response.data);
          if (JSON.stringify(response.data).length > 0) {
            message.warning(
              "You have already requested a refund for this course, You will be refunded shortly"
            );
          } else {
            let body = {
              courseId: courseId,
              username: userName,
              userType: usertype,
            };
            axios
              .post("http://localhost:2020/requestRefund", body)
              .then((response) => {
                console.log(response);
                message.success("Refund issued successfully");
              })
              .catch((err) => {
                console.log(err);
                message.error(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <TraineeInsideCourse
      pageName={subtitle}
      courseName={
        <>
          <Breadcrumb.Item>
            <Link to={"/trainee/course?courseId=" + courseId}>
              {courseTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link className="link">{subtitle}</Link>
          </Breadcrumb.Item>
        </>
      }
    >
      <div>
        <Progress percent={progress} />
      </div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
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
              width: "25%",
              height: "50%",
            }}
          >
            <TakeNotesWrapper />
            <br />
            <Button style={{ width: "200px" }}>
              <Link to={"/trainee/takequiz?courseId=" + courseId}>
                Take Quiz
              </Link>
            </Button>
            <Collapse ghost defaultActiveKey={"1"}>
              <Panel header="Course Subtitles" key="1">
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
                          courseId +
                          "&courseTitle=" +
                          courseTitle
                        }
                      >
                        {item.subtitle}
                      </Link>
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
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

            <div
              style={{
                height: "20%",
                width: "100%",
                backgroundColor: "white",
                border: "1px solid black",
                fontSize: "24px",
                overflow: "scroll",
              }}
            >
              <h1>Summary :</h1>
              {description}
            </div>
          </div>
        </div>
      </div>
    </TraineeInsideCourse>
  );
};

export { CoursePreview };
export default CourseSubtitleViewWrapper;
