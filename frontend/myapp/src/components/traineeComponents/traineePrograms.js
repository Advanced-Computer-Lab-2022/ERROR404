import React, { useContext, useEffect, useState } from "react";
import {
  MessageOutlined,
  EyeOutlined,
  HourglassOutlined,
  DollarOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { List, Space, Rate, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import ReviewComponent from "../StudentrateAndReviewInstructor";
import ReviewCourseComponent from "../rateAndReviewCourse";
import { AppContext } from "../../AppContext";
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const TraineePrograms = ({ courses }) => {
  let navigation = useNavigate();
  const { username } = useContext(AppContext);
  const [userName, setUserName] = username;

  useEffect(() => {}, []);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const openReviewInstructor = (user) => {
    const modal = Modal.info();
    modal.update({
      title: "Review Instructor",
      content: <ReviewComponent instructor={user} username={userName} />,
    });
  };
  const openReviewCourse = (id, title, user) => {
    const modal = Modal.info();

    modal.update({
      title: "Review course " + title,
      content: (
        <ReviewCourseComponent Id={id} title={title} username={userName} />
      ),
    });
  };
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
          window.scrollTo(0, 0);
        },
        pageSize: 5,
      }}
      dataSource={courses}
      renderItem={(item) => (
        <div>
          <List.Item
            key={item._id}
            actions={[
              <IconText
                icon={EyeOutlined}
                text={item.views}
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text={item.review.length}
                key="list-vertical-message"
              />,
              <IconText
                icon={HourglassOutlined}
                text={item.totalHours + " hours"}
                key="list-vertical-message"
              />,
              <IconText
                icon={DollarOutlined}
                text={item.price === 0 ? "FREE" : item.price}
                key="list-vertical-message"
              />,
              <IconText
                icon={UsergroupDeleteOutlined}
                text={item.numberOfSubscribers}
                key="list-vertical-message"
              />,
              <Button
                type="link"
                style={{
                  alignItems: "flex-start",
                }}
                onClick={() => {
                  navigation("/trainee/course?courseId=" + item._id);
                }}
              >
                Continue Learning
              </Button>,
            ]}
            extra={
              <Space>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    alignItems: "left",
                  }}
                >
                  <Button
                    style={{ width: "100%" }}
                    type="dashed"
                    onClick={() => {
                      openReviewInstructor(item.instructor);
                    }}
                  >
                    Review Instructor
                  </Button>
                  <Button
                    style={{ width: "100%" }}
                    type="dashed"
                    onClick={() => {
                      openReviewCourse(item._id, item.title);
                    }}
                  >
                    Review Course
                  </Button>
                </div>

                <img
                  width={250}
                  alt="logo"
                  src={
                    item.image == null ||
                    item.image == undefined ||
                    item.image == ""
                      ? "https://m.media-amazon.com/images/I/61nKTBvX5GL.jpg"
                      : item.image
                  }
                />
              </Space>
            }
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.summary}
            />

            {
              <Rate
                allowHalf
                defaultValue={item.rating}
                disabled={true}
                style={{
                  color: "red",
                }}
              />
            }
          </List.Item>
        </div>
      )}
    />
  );
};

export default TraineePrograms;
