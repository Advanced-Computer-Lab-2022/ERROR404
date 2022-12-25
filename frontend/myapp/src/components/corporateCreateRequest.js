import App from "../App";
import React, {useState, useRef, useEffect,useContext} from 'react';
import {
    Button,
    EditOutlined,
  } from '@ant-design/icons';
  import { Input,Modal } from 'antd';
  import { Form, Space } from 'antd';
import { blueGrey, green, lightBlue } from "@mui/material/colors";
import { AppContext } from "../AppContext";
import axios from "axios";



const CreateRequestWrapper = () => {

    const { username } = useContext(AppContext);
    const { TextArea } = Input;
    const [value, setValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [requestId, setRequest] = useState("");
    const [request] = Form.useForm();

    useEffect(() => {
        const idSearch = window.location.search;
        const urlParams = new URLSearchParams(idSearch);
        const request = urlParams.get("requestId");
    
        setRequest(request);
      }, []);
    

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

const creatRequest = async ()=>{
    const requestBody = {
        username: username,
        courseTitle: request.getFieldValue("courseTitle"),
        userType: request.getFieldValue("userType"),
    };
    console.log(requestBody);

    axios.
      post("http://localhost:2020/createCorporateRequest", requestBody)
    .then((data) => {
       // message.success("request sent");
        let ids = [];
        data.data.map((request)=>{
            console.log(request);
            ids.push(request._id);
        });
        console.log(ids);
        let reqBody={
            username:username,
            requestId: requestId,

        };
    })
    .catch((err) => console.log(err));
};


  const componentRef = useRef();


  
  
    return (
      
<div>       
        <br></br>

        <Modal ref= {componentRef} title="Request access to this course" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{marginTop:120, marginLeft:420, height:500}}>



<div>
<div
        id="request"
        style={{
          border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: `#f0f8ff`,
          borderRadius:20,
        }}
      >
        {/* <h4><i>request access to this course</i></h4> */}
        <br></br>
        <br></br>
        <Form
          form={request}
          style={{
            width: "50%",
          }}
        >
          <Form.Item name="username" >
            <Input placeholder="please enter your username"style={{borderRadius:10}}/>
          </Form.Item>

          <Form.Item name="courseTitle">
            <Input placeholder="please enter the course title" style={{borderRadius:10}}/>
          </Form.Item>

          <Form.Item name="userType">
            <select class="ui dropdown" style={{borderRadius:10, marginLeft:40}}>
              <option value="">Select user type</option>
              <option value="a">individual trainee</option>
              <option value="b">corporate trainee</option>
            </select>
          </Form.Item>
        </Form>
      </div>

      <button style={{marginLeft:170, width:130,height:40, marginTop:10, backgroundColor: "lightBlue", borderRadius:10, borderColor:"grey"}} onClick={creatRequest}>
            Send Request
        </button>

 
</div>
            
      </Modal>

        <button style={{marginLeft:600, width:130,height:50, marginTop:10, backgroundColor: "lightBlue", borderRadius:10, borderColor:"grey"}} onClick={showModal}>
            Access course
        </button>
        </div>

     
      
    );
  };


  

export default CreateRequestWrapper;