import axios from "axios";
import { useState, useEffect, useContext } from "react";
import App from "../App";
import "semantic-ui-css/semantic.min.css";

import {
  Layout,
  Button,
  Dropdown,
  Form,
  Input,
  Select,
  message,
  Divider,
} from "antd";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import InstructorDashboard from "./instructorComponents/InstructorDashboard";
import { AppContext } from "../AppContext";

const { Option } = Select;

const CreateExamWrapper = () => {
  return (
    <InstructorDashboard pageName="Create Quiz">
      <CreateExam />
    </InstructorDashboard>
  );
};

const CreateExam = () => {
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [q1Form] = Form.useForm();
  const [q2Form] = Form.useForm();
  const [q3Form] = Form.useForm();
  const [q4Form] = Form.useForm();

  const [courseId, setCourse] = useState("");

  useEffect(() => {
    const idSearch = window.location.search;
    const urlParams = new URLSearchParams(idSearch);
    const course = urlParams.get("courseId");

    setCourse(course);
  }, []);

  const createExam = async () => {
    const requestBody = {
      username: userName,
      courseId: "63af72c8dc50987ddd1e1848",
      questions: {
        subtitle: q1Form.getFieldValue("subtitle"),
        questions: [
          {
            question: q1Form.getFieldValue("q1"),
            answerA: q1Form.getFieldValue("q1a"),
            answerB: q1Form.getFieldValue("q1b"),
            answerC: q1Form.getFieldValue("q1c"),
            answerD: q1Form.getFieldValue("q1d"),
            correctAnswer: q1Form.getFieldValue("q1Answer"),
          },
          {
            question: q2Form.getFieldValue("q2"),
            answerA: q2Form.getFieldValue("q2a"),
            answerB: q2Form.getFieldValue("q2b"),
            answerC: q2Form.getFieldValue("q2c"),
            answerD: q2Form.getFieldValue("q2d"),
            correctAnswer: q2Form.getFieldValue("q2Answer"),
          },
          {
            question: q3Form.getFieldValue("q3"),
            answerA: q3Form.getFieldValue("q3a"),
            answerB: q3Form.getFieldValue("q3b"),
            answerC: q3Form.getFieldValue("q3c"),
            answerD: q3Form.getFieldValue("q3d"),
            correctAnswer: q3Form.getFieldValue("q3Answer"),
          },
          {
            question: q4Form.getFieldValue("q4"),
            answerA: q4Form.getFieldValue("q4a"),
            answerB: q4Form.getFieldValue("q4b"),
            answerC: q4Form.getFieldValue("q4c"),
            answerD: q4Form.getFieldValue("q4d"),
            correctAnswer: q4Form.getFieldValue("q4Answer"),
          },
        ],
      },
    };
    console.log(requestBody);

    axios
      .post("http://localhost:2020/createQuiz", requestBody)
      .then((data) => {
        console.log(data);
        message.success("Quiz created");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div
        id="q1-form"
        style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `#f0f8ff`,
          borderRadius: 20,
        }}
      >
        <h1>
          <b>
            <i>
              <u>Question 1</u>
            </i>
          </b>
        </h1>
        <Form
          form={q1Form}
          style={{
            width: "50%",
          }}
        >
          <Form.Item name="subtitle">
            <Input
              placeholder="enter the wanted subtitle"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>
          <Form.Item name="q1">
            <Input placeholder="Question 1" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item name="q1a">
            <Input
              placeholder="Question 1, 1st possible answer(a)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>
          <Form.Item name="q1b">
            <Input
              placeholder="Question 1, 2nd possible answer(b)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item name="q1c">
            <Input
              placeholder="Question 1, 3rd possible answer(c)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item name="q1d">
            <Input
              placeholder="Question 1, 4th possible answer(d)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item name="q1Answer">
            <select
              class="ui dropdown"
              style={{ borderRadius: 10, marginLeft: 170 }}
            >
              <option value="">Select the correct solution</option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </Form.Item>
        </Form>
      </div>

      <div
        id="q2-form"
        style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `#f0f8ff`,
          borderRadius: 20,
          marginTop: 5,
        }}
      >
        <h1>
          <b>
            <i>
              <u>Question 2</u>
            </i>
          </b>
        </h1>
        <Form
          form={q2Form}
          style={{
            width: "50%",
          }}
        >
          <Form.Item name="q2">
            <Input placeholder="Question 2" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item name="q2a">
            <Input
              placeholder="Question 2, 2st possible answer(a)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>
          <Form.Item name="q2b">
            <Input
              placeholder="Question 2, 2nd possible answer(b)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item name="q2c">
            <Input
              placeholder="Question 2, 3rd possible answer(c)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item name="q2d">
            <Input
              placeholder="Question 2, 4th possible answer(d)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item name="q2Answer">
            <select
              class="ui dropdown"
              style={{ borderRadius: 10, marginLeft: 170 }}
            >
              <option value="">Select the correct solution</option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </Form.Item>
        </Form>
      </div>
      <div
        id="q3-form"
        style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `#f0f8ff`,
          borderRadius: 20,
          marginTop: 5,
        }}
      >
        <h1>
          <b>
            <i>
              <u>Question 3</u>
            </i>
          </b>
        </h1>
        <Form
          form={q3Form}
          style={{
            width: "50%",
          }}
        >
          <Form.Item name="q3">
            <Input placeholder="Question 3" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item name="q3a">
            <Input
              placeholder="Question 3, 1st possible answer(a)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>
          <Form.Item name="q3b">
            <Input
              placeholder="Question 3, 2nd possible answer(b)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item name="q3c">
            <Input
              placeholder="Question 3, 3rd possible answer(c)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item name="q3d">
            <Input
              placeholder="Question 3, 4th possible answer(d)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item name="q3Answer">
            <select
              class="ui dropdown"
              style={{ borderRadius: 10, marginLeft: 170 }}
            >
              <option value="">Select the correct solution</option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </Form.Item>
        </Form>
      </div>
      <div
        id="q4-form"
        style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `#f0f8ff`,
          borderRadius: 20,
          marginTop: 5,
        }}
      >
        <h1>
          <b>
            <i>
              <u>Question 4</u>
            </i>
          </b>
        </h1>
        <Form
          form={q4Form}
          style={{
            width: "50%",
          }}
        >
          <Form.Item name="q4">
            <Input placeholder="Question 4" style={{ borderRadius: 10 }} />
          </Form.Item>

          <Form.Item name="q4a">
            <Input
              placeholder="Question 4, 1st possible answer(a)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>
          <Form.Item name="q4b">
            <Input
              placeholder="Question 4, 2nd possible answer(b)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item name="q4c">
            <Input
              placeholder="Question 4, 3rd possible answer(c)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>

          <Form.Item name="q4d">
            <Input
              placeholder="Question 4, 4th possible answer(d)"
              style={{ borderRadius: 10 }}
            />
          </Form.Item>
          <Form.Item name="q4Answer">
            <select
              class="ui dropdown"
              style={{ borderRadius: 10, marginLeft: 170 }}
            >
              <option value="">Select the correct solution</option>
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </Form.Item>
        </Form>
      </div>
      <Button
        type="primary"
        style={{ marginTop: 10, marginLeft: 470 }}
        onClick={createExam}
      >
        Create Quiz
      </Button>
    </div>
  );
};

export default CreateExamWrapper;
