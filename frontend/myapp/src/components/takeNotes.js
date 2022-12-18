import App from "../App";
import React, {useState, useRef} from 'react';
import {
    Button,
    EditOutlined,
  } from '@ant-design/icons';
  import { Input,Modal } from 'antd';
  import { Form, Space } from 'antd';
import { blueGrey, green, lightBlue } from "@mui/material/colors";


const TakeNotesWrapper = () => {

    const { TextArea } = Input;
    const [value, setValue] = useState('');
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
  const componentRef = useRef();

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById('input').value],    
                {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element);
    element.click();
  }

  
  
    return (
      
<div>


    
        <iframe style= {{width:560,height:315, marginLeft:400, marginTop:10}} src="https://www.youtube.com/embed/nbHlVrkA0wk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       
        <br></br>

        <Modal ref= {componentRef} title="Write your notes!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{marginTop:350, marginLeft:420}}>



<div>
   <Form> 
             <Form.Item>
            <TextArea id= "input" placeholder="Type here.." autoSize />
      <div/>
            </Form.Item> 
            </Form>
  <br>
  </br>
  <button primary onClick= {downloadTxtFile} style={{ marginLeft:130,  backgroundColor: "lightBlue", borderRadius:10, width:200}} > Download</button>
</div>
            
      </Modal>

        <button style={{marginLeft:600, width:130, marginTop:10, backgroundColor: "lightBlue", borderRadius:10, borderColor:"grey"}} onClick={showModal}>
            Take notes <EditOutlined />
        </button>
        </div>

     
      
    );
  };


  

export default TakeNotesWrapper;