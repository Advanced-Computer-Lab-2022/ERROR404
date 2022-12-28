import React, { useContext, useEffect, useId, useState } from "react";
import App from "../../App";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  LoginOutlined,
  SettingFilled,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Image, Empty } from "antd";
import { Link } from "react-router-dom";
import { AppContext } from "../../AppContext";
import axios from "axios";
import CoreCirWrapper, { CoreCurricullum } from "../coreCirriculum";

const { Header, Footer, Sider, Content } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to="/">Home</Link>, "17", <HomeOutlined />),
  getItem(<Link to="/">Sigin | Login</Link>, "12", <LoginOutlined />),

  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Ali Ghieth", "6"),
    getItem("Abdelrahman Ali", "8"),
    getItem("موهمد تامر ", "9"),
    getItem("Dina Tamer", "10"),
    getItem("Malak Amr ", "11"),
  ]),
  getItem(<Link to="/settings">Settings</Link>, "15", <SettingFilled />),
];

// const MyClassroomWrapper = ({ children }) => {
//   return (
//     <App>
//       <Breadcrumb>
//         <Breadcrumb.Item>
//           <Link to="/">Home</Link>
//         </Breadcrumb.Item>
//         <Breadcrumb.Item>My Classroom</Breadcrumb.Item>
//         <Breadcrumb.Item>courseName</Breadcrumb.Item>
//       </Breadcrumb>
//       <Layout>
//         <Sider>
//           <Menu
//             theme="dark"
//             mode="inline"
//             defaultSelectedKeys={["1"]}
//             defaultOpenKeys={["sub1"]}
//             style={{
//               height: "100%",
//               borderRight: 0,
//             }}
//             items={items}
//           />
//         </Sider>
//         <Layout>
//           <Header>Your Classroom</Header>
//           <Content
//             style={{
//               boxSizing: "border-box",
//               padding: "2%",
//             }}
//           >
//             {children}
//           </Content>
//         </Layout>
//       </Layout>
//     </App>
//   );
// };

const UserCourses = () => {
  const { userMongoId, userType } = useContext(AppContext);
  const [userId, setId] = userMongoId;
  const [usertype, setUserType] = userType;
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get(`/getUser/${userId}/${usertype}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log("error at getting user");
      });
  }, []);
  return (
    <App>
      <CoreCirWrapper />
    </App>
  );
};

export default UserCourses;
