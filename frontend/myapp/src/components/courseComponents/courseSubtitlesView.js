import {
  Descriptions,
  Menu,
  List,
  Progress,
  Button,
  message,
  Collapse,
  Breadcrumb,
  Layout,
  Popconfirm,
  Modal,
  Form,
  Input,
  Empty,
} from "antd";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TakeNotesWrapper from "../takeNotes";
import TraineeDashboard from "../traineeComponents/TraineeDashboard";
import TraineeInsideCourse from "../traineeComponents/traineeInsideCourse";
import RequestRefund from "../traineeComponents/requestRefund";
import { Card } from "antd";
import ArticleIcon from "@mui/icons-material/Article";

const { Meta } = Card;

const { Header, Footer, Sider, Content } = Layout;

const { Panel } = Collapse;

const CoursePreview = () => {
  const [subtitles, setSubtitles] = useState([]);
  const [courseId, setcourseId] = useState([]);
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const { username, userType, userMongoId } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [usertype, setUserType] = userType;
  const [userId, setUserId] = userMongoId;
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState({});
  const [myReviews, setMyReviews] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const [instructorReviews, setinstructorReviews] = useState([]);
  const [instructorId, setinstructorId] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const update = (index) => {
    console.log((progress * subtitles.length) / 100);
    console.log(index);
    if ((progress * subtitles.length) / 100 < index) {
      let newProgress = progress + Math.ceil(100 / subtitles.length);
      if (newProgress >= 100) newProgress = 100;
      setProgress(newProgress);
      let body = {
        usertype: usertype,
        id: userId,
        courseId: courseId,
        progress: newProgress,
      };
      axios
        .patch("http://localhost:2020/updateCourseProgress", body)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const confirm = (reviewId, id, deleteFrom) => {
    let body = {
      id: id,
      reviewId: reviewId,
      deleteFrom: deleteFrom,
    };
    axios.put("http://localhost:2020/removeReview", body).then((response) => {
      console.log(response);
      setrefresh(!refresh);
      message.success("Review Has been removed");
    });
  };

  const cancel = (e) => {};

  useEffect(() => {
    const idSearch = window.location.search;
    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");

    setcourseId(courseId);

    axios
      .get(`http://localhost:2020/getUser/${userName}/${usertype}`)
      .then((response) => {
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
        console.log(response.data);
        setVideo("https://" + response.data.preview);
        console.log(response.data.subtitles);
        setSubtitles(response.data.subtitles);
        setPrice(response.data.price);

        let mine = [];
        response.data.review.map((r) => {
          if (r.username == userName) {
            mine.push(r);
          }
        });
        console.log("mine " + mine.length);
        setMyReviews(mine);

        axios
          .get(`http://localhost:2020/login/${response.data.instructor}`)
          .then((response) => {
            console.log("HNNNNA");
            console.log(response.data);
            setinstructorId(response.data._id);
            let dezz = [];
            response.data.review.map((r) => {
              if (r.username == userName) {
                dezz.push(r);
              }
            });
            setinstructorReviews(dezz);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location, refresh]);

  const requestRefund = () => {
    if (progress > 50) {
      message.warning(
        "Sorrry, You are not eligible for course refund, You have exceeded 50% of the course",
        3
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
              "You have already requested a refund for this course, You will be refunded shortly",
              3
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

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(<TakeNotesWrapper />, "1"),
    getItem(
      <Button
        type="link"
        style={{
          width: "200px",
        }}
        onClick={requestRefund}
      >
        Request Refund
      </Button>,
      "2"
    ),

    progress >= 100
      ? getItem(
          <Button
            type="link"
            style={{
              width: "200px",
            }}
            onClick={() => {
              navigate(
                "/certificate?courseTitle=" + course.title + "&user=" + userName
              );
            }}
          >
            Certificate
          </Button>,
          "4"
        )
      : null,
  ];

  const editReview = (e, id, reviewId, deleteFrom, modal) => {
    console.log(e);
    let body = {
      id: id,
      reviewId: reviewId,
      deleteFrom: deleteFrom,
      review: e.review,
    };
    axios.put("http://localhost:2020/editReview", body).then((response) => {
      console.log(response);
      setrefresh(!refresh);
      modal.destroy();
    });
  };
  return (
    <TraineeInsideCourse
      courseId={courseId}
      courseName={course.title + " Preview"}
    >
      <Layout>
        <Header
          style={{
            backgroundColor: "white",
          }}
        >
          <Menu
            theme="light"
            mode="horizontal"
            items={items}
            style={{ display: "flex", justifyContent: "flex-end" }}
          />
        </Header>
        <Layout>
          <Content>
            <br />
            <div>
              <Progress percent={progress == null ? 0 : progress} />
            </div>
            <br />
            <div
              style={{
                width: "100%",
                minHeight: "60vh",
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
                  <Collapse ghost defaultActiveKey="1">
                    <Panel header="Course Subtitles" key="1">
                      <List
                        itemLayout="horizontal"
                        dataSource={subtitles}
                        renderItem={(item) => (
                          <List.Item>
                            <Link
                              onClick={() => {
                                update(subtitles.indexOf(item));
                              }}
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
                  <Card
                    style={{
                      boxSizing: "border-box",
                      padding: "20px",
                      width: "100%",
                    }}
                    hoverable
                    // style={{ width: 240 }}
                    cover={
                      <iframe
                        width="850"
                        height="500"
                        src={video}
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    }
                  ></Card>
                </div>
              </div>
            </div>

            <>
              <Collapse defaultActiveKey={["courseReviews"]}>
                <Panel
                  header={
                    "My Submitted Reviews for this course " + course.title
                  }
                  key="courseReviews"
                >
                  {myReviews.length == 0 ? (
                    <span>You have not submitted any reviews yet </span>
                  ) : (
                    <List
                      className="demo-loadmore-list"
                      itemLayout="horizontal"
                      size="small"
                      dataSource={myReviews}
                      renderItem={(item) => (
                        <List.Item
                          actions={[
                            <Button
                              type="link"
                              key="list-loadmore-edit"
                              onClick={() => {
                                let modal = Modal.confirm();

                                modal.update({
                                  title: "Editting review.. ",
                                  content: (
                                    <>
                                      <Form
                                        layout="vertical"
                                        onFinish={(e) => {
                                          editReview(
                                            e,
                                            course._id,
                                            item._id,
                                            "course",
                                            modal
                                          );
                                        }}
                                      >
                                        <Form.Item
                                          name="review"
                                          label="Edit the Review"
                                        >
                                          <Input defaultValue={item.review} />
                                        </Form.Item>
                                        <Form.Item>
                                          <Button htmlType="submit">
                                            Submit
                                          </Button>
                                        </Form.Item>
                                      </Form>
                                    </>
                                  ),
                                });
                              }}
                            >
                              edit
                            </Button>,
                            <Popconfirm
                              title="Delete the review"
                              description="Are you sure to delete this review?"
                              onConfirm={() => {
                                confirm(item._id, course._id, "course");
                              }}
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                danger
                                type="link"
                                key="list-loadmore-more"
                              >
                                delete
                              </Button>
                            </Popconfirm>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<ArticleIcon />}
                            title={item.username}
                            description={item.review}
                          />
                        </List.Item>
                      )}
                    />
                  )}
                </Panel>
              </Collapse>

              <Collapse defaultActiveKey={["1"]}>
                <Panel
                  header={
                    "Your Submitted Reviews about Instructor " +
                    course.instructor +
                    " teaching this course"
                  }
                  key="1"
                >
                  {instructorReviews == 0 ? (
                    <span>
                      You have not submitted any reviews for this instructor
                    </span>
                  ) : (
                    <List
                      className="demo-loadmore-list"
                      itemLayout="horizontal"
                      size="small"
                      dataSource={instructorReviews}
                      renderItem={(item) => (
                        <List.Item
                          actions={[
                            <Button
                              type="link"
                              key="list-loadmore-edit"
                              onClick={() => {
                                let modal = Modal.confirm();

                                modal.update({
                                  title: "Editting review.. ",
                                  content: (
                                    <>
                                      <Form
                                        layout="vertical"
                                        onFinish={(e) => {
                                          editReview(
                                            e,
                                            instructorId,
                                            item._id,
                                            "instructor",
                                            modal
                                          );
                                        }}
                                      >
                                        <Form.Item
                                          name="review"
                                          label="Edit the Review"
                                        >
                                          <Input defaultValue={item.review} />
                                        </Form.Item>
                                        <Form.Item>
                                          <Button htmlType="submit">
                                            Submit
                                          </Button>
                                        </Form.Item>
                                      </Form>
                                    </>
                                  ),
                                });
                              }}
                            >
                              edit
                            </Button>,

                            <Popconfirm
                              title="Delete the review"
                              description="Are you sure to delete this review?"
                              onConfirm={() => {
                                confirm(item._id, instructorId, "instructor");
                              }}
                              onCancel={cancel}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button
                                danger
                                type="link"
                                key="list-loadmore-more"
                              >
                                delete
                              </Button>
                            </Popconfirm>,
                          ]}
                        >
                          <List.Item.Meta
                            avatar={<ArticleIcon />}
                            title={item.username}
                            description={item.review}
                          />
                        </List.Item>
                      )}
                    />
                  )}
                </Panel>
              </Collapse>
            </>
          </Content>
        </Layout>
      </Layout>
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
  const { username, userType, userMongoId } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [usertype, setUserType] = userType;
  const [userId, setUserId] = userMongoId;
  const [courseTitle, setCourseTitle] = useState("");
  const location = useLocation();
  const [quizes, setQuizes] = useState([]);
  const navigate = useNavigate();

  const update = (index) => {
    console.log((progress * subtitles.length) / 100);
    console.log(index);
    if ((progress * subtitles.length) / 100 < index) {
      let newProgress = progress + Math.ceil(100 / subtitles.length);
      if (newProgress >= 100) newProgress = 100;
      setProgress(newProgress);
      let body = {
        usertype: usertype,
        id: userId,
        courseId: courseId,
        progress: newProgress,
      };
      axios
        .patch("http://localhost:2020/updateCourseProgress", body)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
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
        console.log("hello ", response.data);
        let data = [];
        response.data.questions.map((q) => {
          if (q.subtitle == subtitle) {
            data.push(q);
          }
          setQuizes(data);
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
        console.log(err);
      });
  }, [location]);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = [
    getItem(<TakeNotesWrapper />, "1"),

    progress >= 100
      ? getItem(
          <Button
            type="link"
            style={{
              width: "200px",
            }}
            onClick={() => {
              navigate(
                "/certificate?courseTitle=" + courseTitle + "&user=" + userName
              );
            }}
          >
            Certificate
          </Button>,
          "4"
        )
      : null,
  ];

  return (
    <TraineeInsideCourse
      courseId={courseId}
      pageName={subtitle}
      courseName={
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Breadcrumb.Item>
            <Link to={"/trainee/course?courseId=" + courseId}>
              {courseTitle}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link className="link">{subtitle}</Link>
          </Breadcrumb.Item>
        </div>
      }
    >
      <Layout>
        <Header style={{ backgroundColor: "white" }}>
          <Menu
            theme="light"
            mode="horizontal"
            items={items}
            style={{ display: "flex", justifyContent: "flex-end" }}
          />
        </Header>
        <Content>
          <br />
          <div>
            <Progress percent={progress == null ? 0 : progress} />
          </div>
          <br />
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
                boxSizing: "border-box",
                padding: "3%",
              }}
            >
              <div
                style={{
                  width: "25%",
                  height: "50%",
                }}
              >
                <Collapse ghost defaultActiveKey={"1"}>
                  <Panel header="Course Subtitles" key="1">
                    <List
                      itemLayout="horizontal"
                      dataSource={subtitles}
                      renderItem={(item) => (
                        <List.Item>
                          <Link
                            onClick={() => {
                              update(subtitles.indexOf(item));
                            }}
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
                <Collapse ghost defaultActiveKey={"1"}>
                  <Panel header={subtitle + " Quizes"} key="1">
                    {quizes.length == 0 ? (
                      <Empty description="No Quizes" />
                    ) : (
                      <List
                        itemLayout="vertical"
                        dataSource={quizes == null ? [] : quizes}
                        renderItem={(item) => (
                          <List.Item>
                            <Link
                              type="link"
                              to={
                                "/trainee/takequiz?courseId=" +
                                courseId +
                                "&question=" +
                                quizes.indexOf(item) +
                                "&subtitle=" +
                                subtitle
                              }
                            >
                              Take Quiz {quizes.indexOf(item) + 1}
                            </Link>
                          </List.Item>
                        )}
                      />
                    )}
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
                <Card
                  style={{
                    boxSizing: "border-box",
                    padding: "20px",
                    width: "100%",
                  }}
                  hoverable
                  // style={{ width: 240 }}
                  cover={
                    <iframe
                      width="850"
                      height="500"
                      src={video}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  }
                >
                  <Meta title={courseTitle} description={description} />
                </Card>
              </div>
            </div>
          </div>
          {/* <div>
            <h4>Description</h4>
            <hr />
            <br />
            {description}
          </div> */}
        </Content>
      </Layout>
    </TraineeInsideCourse>
  );
};

export { CoursePreview };
export default CourseSubtitleViewWrapper;
