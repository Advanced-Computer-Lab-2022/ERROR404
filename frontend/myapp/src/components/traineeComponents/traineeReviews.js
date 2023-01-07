// import React, { useContext, useEffect, useState } from "react";
// import {
//   LikeOutlined,
//   MessageOutlined,
//   AntDesignOutlined,
// } from "@ant-design/icons";
// import {
//   Avatar,
//   Button,
//   Form,
//   Input,
//   List,
//   message,
//   Popconfirm,
//   Space,
// } from "antd";
// import { IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import axios from "axios";
// import App from "../../App";
// import { Action } from "@remix-run/router";
// import { AppContext } from "../../AppContext";
// import ArticleIcon from "@mui/icons-material/Article";

// const data = Array.from({
//   length: 23,
// }).map((_, i) => ({
//   href: "https://ant.design",
//   title: `ant design part ${i}`,
//   avatar: "https://joeschmoe.io/api/v1/random",
//   description:
//     "Ant Design, a design language for background applications, is refined by Ant UED Team.",
//   content:
//     "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
// }));
// const IconText = ({ icon, text }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );
// const TraineeReviews = ({ reviews, instructor, refresh }) => {
//   const { username } = useContext(AppContext);
//   const [user, setusername] = username;
//   const [instructorReviews, setinstructorReviews] = useState([]);
//   const [refreshing, setrefresh] = refresh;

//   useEffect(() => {
//     axios.get(`http://localhost:2020/login/${instructor}`).then((response) => {
//       console.log("HNNNNA");
//       console.log(response.data);
//       let dezz = [];
//       response.data.review.map((r) => {
//         if (r.username == user) {
//           dezz.push(r);
//         }
//       });
//       setinstructorReviews(dezz);
//     });
//   }, []);

//   const confirm = (e) => {
//     console.log(e);
//     axios.put("http://localhost:2020/removeReview", body).then((res) => {
//       console.log(response);
//       setrefresh(!refreshing);
//       message.success("Review Has been removed");
//     });
//   };

//   const cancel = (e) => {
//     console.log(e);
//     message.error("Click on No");
//   };

//   return (
//     <>
//       {reviews.length == 0 ? (
//         <h4>You have not submitted any reviews yet </h4>
//       ) : (
//         <List
//           className="demo-loadmore-list"
//           itemLayout="horizontal"
//           size="small"
//           dataSource={reviews}
//           renderItem={(item) => (
//             <List.Item
//               actions={[
//                 <Button type="link" key="list-loadmore-edit">
//                   edit
//                 </Button>,
//                 <Popconfirm
//                   title="Delete the review"
//                   description="Are you sure to delete this review?"
//                   onConfirm={confirm(item._id)}
//                   onCancel={cancel}
//                   okText="Yes"
//                   cancelText="No"
//                 >
//                   <Button danger type="link" key="list-loadmore-more">
//                     delete
//                   </Button>
//                 </Popconfirm>,
//               ]}
//             >
//               <List.Item.Meta
//                 avatar={<ArticleIcon />}
//                 title={item.username}
//                 description={item.review}
//               />
//             </List.Item>
//           )}
//         />
//       )}
//       <h2>{"Your Submitted Reviews about Instructor " + instructor}</h2>
//       <hr />
//       {instructorReviews == 0 ? (
//         <h4>You have not submitted any reviews for this instructor</h4>
//       ) : (
//         <List
//           className="demo-loadmore-list"
//           itemLayout="horizontal"
//           size="small"
//           dataSource={instructorReviews}
//           renderItem={(item) => (
//             <List.Item
//               actions={[
//                 <Button type="link" key="list-loadmore-edit">
//                   edit
//                 </Button>,
//                 <Popconfirm
//                   title="Delete the review"
//                   description="Are you sure to delete this review?"
//                   onConfirm={confirm}
//                   onCancel={cancel}
//                   okText="Yes"
//                   cancelText="No"
//                 >
//                   <Button danger type="link" key="list-loadmore-more">
//                     delete
//                   </Button>
//                 </Popconfirm>,
//               ]}
//             >
//               <List.Item.Meta
//                 avatar={<ArticleIcon />}
//                 title={item.username}
//                 description={item.review}
//               />
//               {/* <Form layout="vertical">
//               <Form.Item name="review" label="Review ">
//                 <Input />
//               </Form.Item>
//             </Form> */}
//             </List.Item>
//           )}
//         />
//       )}
//     </>
//   );
// };
// export default TraineeReviews;
