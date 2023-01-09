import {
  Button,
  Card,
  message,
  Statistic,
  Steps,
  Space,
  Input,
  Radio,
  List,
} from "antd";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import TraineeDashboard from "./TraineeDashboard";
import axios from "axios";

const { Step } = Steps;
const PayForCourse = () => {
  const location = useLocation();
  const { username, userType } = useContext(AppContext);
  const [courseId, setCourseId] = useState("");
  const [userName, setUserName] = username;
  const [user, setUser] = userType;
  const [newPrice, setNewPrice] = userType;
  const [course, setCourse] = useState("");
  const [userData, setUserData] = useState({});
  const [value, setValue] = useState(1);
  const [steps, setSteps] = useState(3);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const navigate = useNavigate();

  const { Meta } = Card;

  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");
    setCourseId(courseId);

    if (username == "" || user == "") {
      navigate("/");
      message.info("You need to login or sign up to be able to pay for course");
    } else {
      axios
        .get("http://localhost:2020/getCourse/" + courseId)
        .then((response) => {
          console.log(response.data);
          setCourse(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("http://localhost:2020/getUser/" + userName + "/" + user)
        .then((response) => {
          console.log("USER =>" + JSON.stringify(response.data));
          setUserData(response.data);
          console.log(userData);
        });
    }
  }, [location]);

  const buyCourse = (price) => {
    if (value == "balance") {
      if (userData.balance < price) {
        message.error("insufficient funds, choose another payment method", 2);
        return;
      } else {
        const reqBody = {
          usertype: user,
          courseId: courseId,
          username: userName,
        };
        const body = {
          username: userName,
          refund: -price,
        };
        axios
          .put("http://localhost:2020/addToIndivisualTraineeWallet", body)
          .then(() => {})
          .catch((err) => console.log(err));
        axios
          .put("http://localhost:2020/addCourseToStudent", reqBody)
          .then(() => {
            message.success("Succesfully purchased Course", 1);
          })
          .catch((err) => console.log("error at updating courses" + err));
      }
    } else {
      const reqBody = {
        usertype: user,
        courseId: courseId,
        username: userName,
      };
      axios
        .put("http://localhost:2020/addCourseToStudent", reqBody)
        .then(() => {
          message.success("Succesfully purchased Course", 1);
        })
        .catch((err) => console.log("error at updating courses" + err));
    }

    let b = {
      courseId: courseId,
    };
    axios.put("http://localhost:2020/salary", b);
    navigate("/user/myPrograms");
  };
  return (
    <TraineeDashboard>
      <div
        style={{
          width: "100%",

          boxSizing: "border-box",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Steps
          items={[
            {
              title: "Login",
              status: "finish",
              icon: <UserOutlined />,
            },
            {
              title: "Verification",
              status: "finish",
              icon: <SolutionOutlined />,
            },
            {
              title: "Pay",
              status: "process",
              icon: <LoadingOutlined />,
            },
            {
              title: "Done",
              status: "wait",
              icon: <SmileOutlined />,
            },
          ]}
        />
        <Card
          style={{
            boxSizing: "border-box",
            padding: "20px",
          }}
          hoverable
          // style={{ width: 240 }}
          cover={
            <iframe
              width="850"
              height="500"
              src={"https://" + course.preview}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          }
        >
          <Meta title={course.title} description={course.summary} />
        </Card>
        <div>
          <h4>Choose Payment Method</h4>
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value="balance">
                Use Balance Credit
                <span>{" ( $" + userData.balance + " )"}</span>
              </Radio>
              <h6>Or Choose Credit Card</h6>
              <List
                size="small"
                dataSource={userData.creditCardInfo}
                renderItem={(item) => (
                  <Radio value={item.cardNumber}>{item.cardNumber}</Radio>
                )}
              />
            </Space>
          </Radio.Group>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Statistic
            title="Payment Due"
            value={course.price}
            precision={2}
            prefix="$"
          />
          {course.discount != null && course.discount.value > 0 ? (
            <>
              <Statistic
                value={course.discount.value}
                suffix="% (Discount)"
                prefix="-"
              />
              <hr />
              <Statistic
                description="New Total"
                value={
                  course.price - (course.discount.value / 100) * course.price
                }
                prefix="$"
              />
            </>
          ) : null}

          <Button
            style={{ marginTop: 16 }}
            type="primary"
            onClick={() => {
              buyCourse(
                course.price - (course.discount.value / 100) * course.price
              );
            }}
          >
            Purchase Course
          </Button>
        </div>
      </div>
    </TraineeDashboard>
  );
};

export default PayForCourse;
