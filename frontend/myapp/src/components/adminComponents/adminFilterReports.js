// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal, Form, Input, Select } from "antd";
// import { Collapse } from "antd";
// const { Option } = Select;

// const { Panel } = Collapse;

// const AdminFilterReports = () => {
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   useEffect(() => {
//     console.log("data =>  ", data);
//   }, [data]);

//   const filterReports = (filterType, value) => {
//     setIsModalOpen(true);
//     console.log("filename ", filterType);
//     axios({
//       method: "get",
//       url: "http://localhost:2020/filter/" + filterType + "/" + value,
//     })
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.log("erorr ", error.message);
//       });
//   };

//   const [form] = Form.useForm();
//   const onFinish = async (event) => {
//     console.log(" => ", event);
//     const value = event.value;
//     const filterType = event.filterType;
//     console.log(value);

//     await getAllReports(filterType, value);
//   };

//   const onReset = () => {
//     form.resetFields();
//   };

//   return (
//     <>
//       <Form onFinish={onFinish} form={form} name="control-hooks">
//         <Form.Item label="Filter By:" name="filterType">
//           <Select
//             placeholder="Select a option and change input text above"
//             allowClear
//           >
//             <Option value="title" key="Title">
//               technical
//             </Option>
//             <Option value="price" key="Price">
//               financial
//             </Option>
//             <Option value="subject" key="Subject">
//               Other
//             </Option>
//           </Select>
//         </Form.Item>
//         <Form.Item name="value" label="value" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//           <Button htmlType="button" onClick={onReset}>
//             Reset
//           </Button>
//         </Form.Item>
//       </Form>

//       <Modal
//         title="Basic Modal"
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Collapse defaultActiveKey={["1"]}>
//           {data.map((Reports) => {
//             console.log("here");
//             return (
//              <Panel header={course.title} key={course._id}>
//                 <p>description: {Reports.description}</p>
//                 {/* <p>Summary: {course.summary}</p> */}
//               </Panel>
//             );
//           })}
//         </Collapse>
//       </Modal>
//     </>
//   );
// };

// export default AdminFilterReports;
