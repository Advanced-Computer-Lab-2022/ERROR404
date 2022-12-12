import TraineeDashboard from "../../pages/TraineeDashboard";
import { Statistic, Card } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";

const TraineeMainDashboard = () => {
  return (
    <TraineeDashboard>
      <InstructorStudents />
      <InstructorLikes />
    </TraineeDashboard>
  );
};

const InstructorStudents = () => {
  return (
    <Card>
      <Statistic
        title="Your Students"
        value={1100}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix={<UsergroupDeleteOutlined />}
        suffix="students"
      />
    </Card>
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

export default TraineeMainDashboard;
