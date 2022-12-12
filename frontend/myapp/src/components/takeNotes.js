import App from "../App";
import React, {useState, useRef} from 'react';
import {
    EditTwoTone,
    Button,
    EditOutlined,
  } from '@ant-design/icons';
  import { Input,Modal } from 'antd';
  import { Form, Space } from 'antd';
  import {useReactToPrint}  from "react-to-print"; 
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
  const handlePrint = useReactToPrint({
    content:() => componentRef.current,
    documentTitle: 'My notes',
    onAfterPrint: () => alert(' print success')

  });

  
    return (
      
<div>


    
        <iframe style= {{width:560,height:315, marginLeft:400, marginTop:10}} src="https://www.youtube.com/embed/nbHlVrkA0wk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
       
        <br></br>

        <Modal ref= {componentRef} title="Write your notes!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{marginTop:400, marginLeft:420}}>

        <Form>
            <Form.Item>
            <TextArea placeholder="Type here.." autoSize />
      <div
        style={{
          marginLeft:300,
        }}
      />
            </Form.Item>
            {/* <button  onClick={handlePrint}>
               Print or save notes
            </button>  */}
            </Form>

            
      </Modal>

        <button style={{marginLeft:600, width:130, marginTop:10, backgroundColor: "lightBlue", borderRadius:10, borderColor:"grey"}} onClick={showModal}>
            Take notes <EditOutlined />
        </button>
        </div>

     
      
    );
  };


  

export default TakeNotesWrapper;