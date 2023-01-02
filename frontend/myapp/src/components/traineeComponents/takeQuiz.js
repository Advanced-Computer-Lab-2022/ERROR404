import { Button, Form, List, Radio } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TakeQuiz = () => {
  const location = useLocation();
  const [courseId, setcourseId] = useState("");
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);
  const onChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
  };
  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");
    setcourseId(courseId);

    axios.get("http://localhost:2020/getCourse/" + courseId).then((data) => {
      console.log(data.data.questions);
      setData(data.data.questions);
    });
  }, [location]);
  return (
    <div>
      <List
        size="large"
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Form>
              <List
                size="large"
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={item.questions}
                renderItem={(question) => {
                  let index = 0;
                  index++;
                  return (
                    <List.Item
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span>{question.question}</span>

                      <Form.Item name="answer">
                        <Radio.Group onChange={onChange} name={index}>
                          <Radio value="a">{question.answerA}</Radio>
                          <Radio value="b">{question.answerB}</Radio>
                          <Radio value="c">{question.answerC}</Radio>
                          <Radio value="d">{question.answerD}</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </List.Item>
                  );
                }}
              />
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Question
                </Button>
              </Form.Item>
            </Form>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TakeQuiz;
