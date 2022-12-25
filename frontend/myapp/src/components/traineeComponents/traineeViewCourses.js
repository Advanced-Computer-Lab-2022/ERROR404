import TraineeDashboard from "../../pages/TraineeDashboard";
import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, Card, Tooltip } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { Avatar, List, Space, Rate } from "antd";
import { AppContext } from "../../AppContext";
import { SearchOutlined } from "@ant-design/icons";
import CourseComponent from "../coursesListComponent";


const TraineeViewCourses = () => {
  const { userType, username } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [user, setUser] = userType;
  const [data, setData] = useState([]);
  const [neverChangedCourses, setNeverCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:2020/getMyCourses/" + user + "/" + userName)
      .then((responce) => responce.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
        setNeverCourses(data);
      });
  }, []);

  const values = {
    coursesData: [courses, setCourses],
    originalData: [neverChangedCourses, setNeverCourses],
  };
  return (
    <TraineeDashboard>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* <Tooltip title="Filter">
          <Button
            type="primary"
            shape="round"
            icon={<FilterOutlined />}
            onClick={showModal}
          />
        </Tooltip> */}
      </div>

      <CourseComponent courses={courses} viewType="individual" />
    </TraineeDashboard>
  );
};

export default TraineeViewCourses;
