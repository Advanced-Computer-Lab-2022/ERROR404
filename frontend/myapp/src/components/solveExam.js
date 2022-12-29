import React, { useState } from "react";
import {
  QuestionOutlined,
  SmileOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import {
  Select,
  Radio,
  Space,
  Input,
  Card,
  Steps,
  Button,
  message,
  Modal,
  Result,
} from "antd";
import CoursePage from "./CoursePage";

const { Option } = Select;

const SolveExamWrapper = () => {
  return (
    <CoursePage>
      <SolveExam />
    </CoursePage>
  );
};

const SolveExam = () => {
  const [current, setCurrent] = useState(0);
  const [valueQ1, setValueQ1] = useState("");
  const [valueQ2, setValueQ2] = useState("");
  const [valueQ3, setValueQ3] = useState("");
  const [valueQ4, setValueQ4] = useState("");

  const onChange = (event) => {
    let value = event.target.value;
    let target = event.target.name;
    if (target == "q1") {
      setValueQ1(value);
    } else if (target == "q2") {
      setValueQ2(value);
    } else if (target == "q3") {
      setValueQ3(value);
    } else if (target == "q4") {
      setValueQ4(value);
    }
  };

  const solve = () => {
    // lw succeedded
    if (valueQ4 == "a") {
      const modal = Modal.success();
      modal.update({
        title: "Good Job, You aced the exam",
        width: "50%",
        content: (
          <Result
            icon={<SmileOutlined />}
            title="Great, all answers were correct!"
          />
        ),
      });
    } else {
      const modal = Modal.error();
      modal.update({
        title: "OOOPS, some answers were incorrect",
        width: "50%",
        content: (
          <Result
            status="error"
            icon={<FrownOutlined />}
            title="Question 4 was incorrect!"
          />
        ),
      });
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "First Question",
      content: (
        <div>
          <h4>QUESTION 1</h4>
          <Radio.Group onChange={onChange} name="q1" value={valueQ1}>
            <Space direction="vertical">
              <Radio value="a">Option A</Radio>
              <Radio value="b">Option B</Radio>
              <Radio value="c">Option C</Radio>
              <Radio value="d">Option D</Radio>
            </Space>
          </Radio.Group>
        </div>
      ),
      icon: <QuestionOutlined />,
    },
    {
      title: "Second Question",
      content: (
        <div>
          <h4>QUESTION 2</h4>
          <Radio.Group onChange={onChange} name="q2" value={valueQ2}>
            <Space direction="vertical">
              <Radio value="a">Option A</Radio>
              <Radio value="b">Option B</Radio>
              <Radio value="c">Option C</Radio>
              <Radio value="d">Option D</Radio>
            </Space>
          </Radio.Group>
        </div>
      ),
      icon: <QuestionOutlined />,
    },
    {
      title: "Last Question",
      content: (
        <div>
          <h4>QUESTION 3</h4>
          <Radio.Group onChange={onChange} name="q3" value={valueQ3}>
            <Space direction="vertical">
              <Radio value="a">Option A</Radio>
              <Radio value="b">Option B</Radio>
              <Radio value="c">Option C</Radio>
              <Radio value="d">Option D</Radio>
            </Space>
          </Radio.Group>
        </div>
      ),
      icon: <QuestionOutlined />,
    },
    {
      title: "Last Question",
      content: (
        <div>
          <h4>QUESTION 4</h4>
          <Radio.Group onChange={onChange} name="q4" value={valueQ4}>
            <Space direction="vertical">
              <Radio value="a">Option A</Radio>
              <Radio value="b">Option B</Radio>
              <Radio value="c">Option C</Radio>
              <Radio value="d">Option D</Radio>
            </Space>
          </Radio.Group>
        </div>
      ),
      icon: <QuestionOutlined />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  return (
    <>
      <Steps current={current} items={items} />
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={solve}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
export default SolveExamWrapper;
