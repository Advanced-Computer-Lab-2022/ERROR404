import InstructorDashboard from "./InstructorDashboard";
import { Statistic, Card } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Column } from "@ant-design/plots";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../../AppContext";

const InstructorMainDashboard = () => {
  return (
    <InstructorDashboard>
      <InstructorStudents />
      <InstructorLikes />
    </InstructorDashboard>
  );
};

const InstructorStudents = () => {
  const { userMongoId, username } = useContext(AppContext);
  const [userId, setUserId] = userMongoId;
  const [userName, setUserName] = username;
  const [pieData, setPieData] = useState([]);
  const [totalStudents, setTotalStrudent] = useState(0);

  useEffect(() => {
    console.log(pieData.length);
    axios
      .get(`http://localhost:2020/instViewCourses/${userName}`)
      .then((response) => {
        console.log("hello ", response.data);
        let courses = response.data;
        let students = 0;
        let data = [];
        courses.map((course) => {
          console.log(course.numberOfSubscribers);
          students += course.numberOfSubscribers;

          let pie = {
            title: course.title,
            numberStudents: course.numberOfSubscribers,
          };
          data.push(pie);
        });

        setTotalStrudent(students);
        console.log(totalStudents);
      })
      .catch((error) => {
        console.log("error at getting instructor info");
      });
  }, []);

  return (
    <>
      <Card>
        <Statistic
          title="Your Students"
          value={totalStudents}
          valueStyle={{ color: "#3f8600" }}
          prefix={<UsergroupDeleteOutlined />}
          suffix="students"
        />
      </Card>
    </>
  );
};

const InstructorLikes = () => {
  return (
    <div>
      <Card>
        <Statistic
          title="Positive Feedback"
          value={1128}
          prefix={<LikeOutlined />}
        />
      </Card>
      <Card>
        <Statistic
          title="Negative Feedback"
          value={1128}
          prefix={<DislikeOutlined />}
        />
      </Card>
    </div>
  );
};

export default InstructorMainDashboard;
