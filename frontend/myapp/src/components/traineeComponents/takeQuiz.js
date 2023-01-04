import {
  Button,
  Form,
  Space,
  Radio,
  message,
  Steps,
  Card,
  Col,
  Row,
} from "antd";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import App from "../../App";
import { AppContext } from "../../AppContext";

const TakeQuiz = () => {
  const location = useLocation();
  const [courseId, setcourseId] = useState("");
  const [coursetitle, setcourseTitle] = useState("");
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const [grade, setGrade] = useState("");

  const { userType, username } = useContext(AppContext);
  const [user, setUser] = userType;
  const [userName, setUserName] = username;
  //q1
  const [question1, setQuestion1] = useState("");
  const [answerA1, setaAnswerA1] = useState("");
  const [answerB1, setAnswerB1] = useState("");
  const [answerC1, setAnswerC1] = useState("");
  const [answerD1, setAnswerD1] = useState("");
  const [questionAnswer1, setQuestionAnswer1] = useState("");
  const [studentAnswer1, setStudentAnswer1] = useState("");
  //
  //q2
  const [question2, setQuestion2] = useState("");
  const [answerA2, setaAnswerA2] = useState("");
  const [answerB2, setAnswerB2] = useState("");
  const [answerC2, setAnswerC2] = useState("");
  const [answerD2, setAnswerD2] = useState("");
  const [questionAnswer2, setQuestionAnswer2] = useState("");
  const [studentAnswer2, setStudentAnswer2] = useState("");
  //
  //q3
  const [question3, setQuestion3] = useState("");
  const [answerA3, setaAnswerA3] = useState("");
  const [answerB3, setAnswerB3] = useState("");
  const [answerC3, setAnswerC3] = useState("");
  const [answerD3, setAnswerD3] = useState("");
  const [questionAnswer3, setQuestionAnswer3] = useState("");
  const [studentAnswer3, setStudentAnswer3] = useState("");
  //
  //q4
  const [question4, setQuestion4] = useState("");
  const [answerA4, setaAnswerA4] = useState("");
  const [answerB4, setAnswerB4] = useState("");
  const [answerC4, setAnswerC4] = useState("");
  const [answerD4, setAnswerD4] = useState("");
  const [questionAnswer4, setQuestionAnswer4] = useState("");
  const [studentAnswer4, setStudentAnswer4] = useState("");
  //
  useEffect(() => {
    const idSearch = window.location.search;

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");
    const question = urlParams.get("question");
    setcourseId(courseId);

    axios.get("http://localhost:2020/getCourse/" + courseId).then((data) => {
      setQuestion1(data.data.questions[question].questions[0].question);
      setaAnswerA1(data.data.questions[question].questions[0].answerA);
      setAnswerB1(data.data.questions[question].questions[0].answerB);
      setAnswerC1(data.data.questions[question].questions[0].answerC);
      setAnswerD1(data.data.questions[question].questions[0].answerD);
      setQuestionAnswer1(
        data.data.questions[question].questions[0].correctAnswer
      );

      //
      setQuestion2(data.data.questions[question].questions[1].question);
      setaAnswerA2(data.data.questions[question].questions[1].answerA);
      setAnswerB2(data.data.questions[question].questions[1].answerB);
      setAnswerC2(data.data.questions[question].questions[1].answerC);
      setAnswerD2(data.data.questions[question].questions[1].answerD);
      setQuestionAnswer2(
        data.data.questions[question].questions[1].correctAnswer
      );

      //
      setQuestion3(data.data.questions[question].questions[2].question);
      setaAnswerA3(data.data.questions[question].questions[2].answerA);
      setAnswerB3(data.data.questions[question].questions[2].answerB);
      setAnswerC3(data.data.questions[question].questions[2].answerC);
      setAnswerD3(data.data.questions[question].questions[2].answerD);
      setQuestionAnswer3(
        data.data.questions[question].questions[2].correctAnswer
      );
      //
      setQuestion4(data.data.questions[question].questions[3].question);
      setaAnswerA4(data.data.questions[question].questions[3].answerA);
      setAnswerB4(data.data.questions[question].questions[3].answerB);
      setAnswerC4(data.data.questions[question].questions[3].answerC);
      setAnswerD4(data.data.questions[question].questions[3].answerD);
      setQuestionAnswer4(
        data.data.questions[question].questions[3].correctAnswer
      );
      setcourseTitle(data.data.title);
    });
  }, [location]);
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const onChange1 = (e) => {
    setStudentAnswer1(e.target.value);
  };

  const onChange2 = (e) => {
    setStudentAnswer2(e.target.value);
  };

  const onChange3 = (e) => {
    setStudentAnswer3(e.target.value);
  };

  const onChange4 = (e) => {
    setStudentAnswer4(e.target.value);
  };
  const finish = () => {
    let g = 0;
    if (studentAnswer1 == questionAnswer1) {
      g++;
    }
    if (studentAnswer2 == questionAnswer2) {
      g++;
    }
    if (studentAnswer3 == questionAnswer3) {
      g++;
    }
    if (studentAnswer4 == questionAnswer4) {
      g++;
    }
    setGrade(g);
    let finalGrade = `${g}/4`;
    const body = {
      username: userName,
      usertype: user,
      grade: finalGrade,
      subject: coursetitle,
    };
    console.log(body);
    axios
      .put("http://localhost:2020/putGrades", body)
      .then((response) => {
        message.success("Your Grade has been submited");
        console.log(response.data);
      })
      .catch((error) => {
        message.error("Error submiting your grades report a problem");
        console.log(error);
      });
  };
  const steps = [
    {
      title: "Question 1",
      content: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            layout="vertical"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <h2>{question1}</h2>
            <Form.Item name="answer">
              <Radio.Group onChange={onChange1} value={studentAnswer1}>
                <Space direction="vertical">
                  <Radio value={"a"}>{answerA1}</Radio>
                  <Radio value={"b"}>{answerB1}</Radio>
                  <Radio value={"c"}>{answerC1}</Radio>
                  <Radio value={"d"}>{answerD1}</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button type="primary" onClick={next}>
              Next
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Question 2",
      content: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            layout="vertical"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <h2>{question2}</h2>
            <Form.Item name="answer">
              <Radio.Group onChange={onChange2} value={studentAnswer2}>
                <Space direction="vertical">
                  <Radio value={"a"}>{answerA2}</Radio>
                  <Radio value={"b"}>{answerB2}</Radio>
                  <Radio value={"c"}>{answerC2}</Radio>
                  <Radio value={"d"}>{answerD2}</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form>
          <div>
            {" "}
            <Button
              type="primary"
              onClick={() => {
                next();
              }}
            >
              Next
            </Button>{" "}
            <Button type="primary" onClick={prev}>
              Previous
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Question 3",
      content: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            layout="vertical"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <h2>{question3}</h2>
            <Form.Item name="answer">
              <Radio.Group onChange={onChange3} value={studentAnswer3}>
                <Space direction="vertical">
                  <Radio value={"a"}>{answerA3}</Radio>
                  <Radio value={"b"}>{answerB3}</Radio>
                  <Radio value={"c"}>{answerC3}</Radio>
                  <Radio value={"d"}>{answerD3}</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form>
          <div>
            <Button
              type="primary"
              onClick={() => {
                next();
              }}
            >
              Next
            </Button>{" "}
            <Button type="primary" onClick={prev}>
              Previous
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Question 4",
      content: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            layout="vertical"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <h2>{question4}</h2>
            <Form.Item name="answer">
              <Radio.Group onChange={onChange4} value={studentAnswer4}>
                <Space direction="vertical">
                  <Radio value={"a"}>{answerA4}</Radio>
                  <Radio value={"b"}>{answerB4}</Radio>
                  <Radio value={"c"}>{answerC4}</Radio>
                  <Radio value={"d"}>{answerD4}</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form>
          <div>
            <Button
              type="primary"
              onClick={() => {
                message.success("Hope you answerd well");
                finish();
                next();
              }}
            >
              Done
            </Button>{" "}
            <Button type="primary" onClick={prev}>
              Previous
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: "Your Grade",
      content: (
        <div
          className="site-card-wrapper"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Card title="Question One" bordered={true}>
                {question1}
                <br />

                {"A : " + answerA1}

                <br />
                {"B : " + answerB1}
                <br />

                {"C : " + answerC1}

                <br />
                {"D : " + answerD1}
                <br />

                {"Correct Answer : " + questionAnswer1}

                <br />
                {"Your Answer : " + studentAnswer1}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Question Two" bordered={true}>
                {question2}
                <br />

                {"A : " + answerA2}

                <br />
                {"B : " + answerB2}
                <br />

                {"C : " + answerC2}

                <br />
                {"D : " + answerD2}
                <br />

                {"Correct Answer : " + questionAnswer2}

                <br />
                {"Your Answer : " + studentAnswer2}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Question Three" bordered={true}>
                {question3}
                <br />

                {"A : " + answerA3}

                <br />
                {"B : " + answerB3}
                <br />

                {"C : " + answerC3}

                <br />
                {"D : " + answerD3}
                <br />

                {"Correct Answer : " + questionAnswer3}

                <br />
                {"Your Answer : " + studentAnswer3}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Question Four" bordered={true}>
                {question4}
                <br />
                {"A : " + answerA4}
                <br />
                {"B : " + answerB4}
                <br />
                {"C : " + answerC4}
                <br />
                {"D : " + answerD4}
                <br />
                {"Correct Answer : " + questionAnswer4}
                <br />
                {"Your Answer : " + studentAnswer4}
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Your Grade" bordered={true}>
                {grade + "/4"}
              </Card>
            </Col>
          </Row>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            <Button
              type="primary"
              style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
            >
              <Link className="link" to="/user/myPrograms">
                Continue Learning
              </Link>
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setCurrent(0);
              }}
            >
              Retake Quiz
            </Button>
          </div>
        </div>
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <App>
        <Steps current={current} items={items} />
        <div
          className="steps-content"
          style={{
            boxSizing: "border-box",
            padding: "20px",
          }}
        >
          {steps[current].content}
        </div>
      </App>
    </>
  );
};

export default TakeQuiz;
