import axios from "axios";
import { useState, useEffect } from "react";
import App from "../App";
import "semantic-ui-css/semantic.min.css";

import {
  Layout,
  Button,
  Dropdown,
  Form,
  Input,
  Select,
  message,
  Divider,
} from "antd";

import { Header, Container } from "semantic-ui-react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import InstructorDashboard from "./instructorComponents/InstructorDashboard";


const { Option } = Select;

const CreateExamWrapper = () => {
  return (
    <InstructorDashboard>
      <CreateExam />
    </InstructorDashboard>
  );
};

const CreateExam = () => {
  const [q1, setQuestion1] = useState([]);
    const [q2, setQuestion2] = useState([]);
    const [q3, setQuestion3] = useState([]);
    const [q4, setQuestion4] = useState([]);
    // const [exam, setExam] = useState([]);


   
  const createExam = async () => {
    console.log(q1);
    console.log(q2);
    console.log(q3);
    console.log(q4);
    const requestBody = {
     username:"abdelrahman",
     courseId: "638501f2a9b064e47ee7e0ed",
     question1: q1[0],
     answer1:q1[1],
     answer2:q1[2], 
     answer3:q1[3],
     answer4:q1[4],
     answerQes1:q1[5],
     question2:q2[0],
     answer21:q2[1],
     answer22:q2[2],
     answer23:q2[3],
     answer24:q2[4],
     answerQes2:q2[5],
     question3:q3[0],
     answer31:q3[1],
     answer32:q3[2], 
     answer33:q3[3],
     answer34:q3[4],
     answerQes3:q3[5],
     question4:q4[0],
     answer41:q4[1],
     answer42:q4[2], 
     answer43:q4[3],
     answer44:q4[4],
     answerQes4:q4[5],


    };
    axios
      .post("http://localhost:2020/createQuestions", requestBody)
      
      .then((response) => {
        // axios
        // .post("http://localhost:2020/createQuiz", 
        // q1._id,
        // q2._id,
        // q3._id,
        // q4._id, )

        
        // .then((response) => {
        //   message.success("Exam has been created", 5);
        //  console.log("success");
        //  console.log(q1._id);
        // })
        // .catch((error) => {
        //   console.log("erorr ", error.message);
        //   message.error("Unexpected Error occured" +" "+ error.response.message, 5);
        // });

         
      })
      .catch((error) => {
        console.log("erorr ", error.message);
        message.error("Unexpected Error occured" +" "+ error.response.message, 5);
      });
  };

  // const createQuiz = async () => {
  //   const requestBody = {

  //     username:"abdelrahman",
  //     courseId: "638501f2a9b064e47ee7e0ed",
  //     // question1: 

  //   }

  //   axios
  //   .post("http://localhost:2020/createQuiz", requestBody)

  //   .then((response) => {
  //     message.success("Quiz has been created", 5);
  //   })
  //   .catch((error) => {
  //     console.log("erorr ", error.message);
  //     message.error("Unexpected Error occured" +" "+ error.response.message, 5);
  //   });


  // }


    const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };



  return (

    <div>

    <h2 style={{marginLeft:600, marginTop:20}}><u> Question 1</u></h2>
     
     <Input
                    placeholder="First question"
                    style={{
                      // marginTop:40,
                      marginLeft:350,
                      width: '50%',
                    }}
                    onChange={(e)=>setQuestion1([e.target.value,q1[1],q1[2],q1[3],q1[4],q1[5]])}
                  />

     

     {/* ------------- */}

      
     
     <Input
                    placeholder="First possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion1([q1[0],e.target.value,q1[2],q1[3],q1[4],q1[5]])}
                  />

     

    {/* --------------- */}

     
     
     <Input
                    placeholder="Second possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion1([q1[0],q1[1],e.target.value,q1[3],q1[4],q1[5]])}
                  />

      

      {/* ------------------ */}


      
     
     <Input
                    placeholder="Third possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion1([q1[0],q1[1],q1[2],e.target.value,q1[4],q1[5]])}
                  />

      

      {/* --------------------- */}


     
     
     <Input
                    placeholder="Fourth possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion1([q1[0],q1[1],q1[2],q1[3],e.target.value,q1[5]])}
                  />

      

  
      <select class="ui dropdown" style={{marginLeft:570, marginTop:10}} onChange={(e)=>setQuestion1([q1[0],q1[1],q1[2],q1[3],q1[4],e.target.value])}>
  <option value="">Select the correct solution</option>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
  <option value="d">D</option>
</select>

    <Divider plain> </Divider>

{/* /////////////////////////////////// */}

    <h2 style={{marginLeft:600, marginTop:20}}><u> Question 2</u></h2>

   
     
     <Input
                    placeholder="Second question"
                    style={{
                      marginLeft:350,
                      width: '50%',
                    }}
                    onChange={(e)=>setQuestion2([e.target.value,q2[1],q2[2],q2[3],q2[4],q2[5]])}
                  />

      
     
     <Input
                    placeholder="First possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion2([q2[0],e.target.value,q2[2],q2[3],q2[4],q2[5]])}
                  />


    {/* --------------- */}

     
     
     <Input
                    placeholder="Second possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion2([q2[0],q2[1],e.target.value,q2[3],q2[4],q2[5]])}
                  />

      

      {/* ------------------ */}


     
     <Input
                    placeholder="Third possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion2([q2[0],q2[1],q2[2],e.target.value,q2[4],q2[5]])}
                  />

      

      {/* --------------------- */}


    
     
     <Input
                    placeholder="Fourth possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion2([q2[0],q2[1],q2[2],q2[3],e.target.value,q2[5]])}
                  />

      

      
      <select class="ui dropdown" style={{marginLeft:570, marginTop:10}} onChange={(e)=>setQuestion2([q2[0],q2[1],q2[2],q2[3],q2[4],e.target.value])}>
      <option value="">Select the correct solution</option>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
  <option value="d">D</option>
</select>
    <Divider plain> </Divider>

    {/* /////////////////////////////////// */}

    <h2 style={{marginLeft:600, marginTop:20}}><u> Question 3</u></h2>


 

 
 <Input
                placeholder="Third question"
                style={{
                  marginLeft:350,
                      width: '50%',
                }}
                onChange={(e)=>setQuestion3([e.target.value,q3[1],q3[2],q3[3],q3[4],q3[5]])}
              />

 
     
     <Input
                    placeholder="First possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion3([q3[0],e.target.value,q3[2],q3[3],q3[4],q3[5]])}
                  />

 

    {/* --------------- */}

      
     
     <Input
                    placeholder="Second possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion3([q3[0],q3[1],e.target.value,q3[3],q3[4],q3[5]])}
                  />

      

      {/* ------------------ */}


     
     
     <Input
                    placeholder="Third possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion3([q3[0],q3[1],q3[2],e.target.value,q3[4],q3[5]])}
                  />

     

      {/* --------------------- */}


     
     
     <Input
                    placeholder="Fourth possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion3([q3[0],q3[1],q3[2],q3[3],e.target.value,q3[5]])}
                  />

      

  
      <select class="ui dropdown" style={{marginLeft:570, marginTop:10}} onChange={(e)=>setQuestion3([q3[0],q3[1],q3[2],q3[3],q3[4],e.target.value])}>
      <option value="">Select the correct solution</option>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
  <option value="d">D</option>
</select>


<Divider plain> </Divider>

{/* ////////////////////////////// */}

<h2 style={{marginLeft:600, marginTop:20}}><u> Question 4</u></h2>


 
 <Input
                placeholder="Fourth question"
                style={{
                  marginLeft:350,
                      width: '50%',
                }}
                onChange={(e)=>setQuestion4([e.target.value,q4[1],q4[2],q4[3],q4[4],q4[5]])}
              />

 

  
     
     <Input
                    placeholder="First possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion4([q4[0],e.target.value,q4[2],q4[3],q4[4],q4[5]])}
                  />

     

    {/* --------------- */}

     
     
     <Input
                    placeholder="Second possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion4([q4[0],q4[1],e.target.value,q4[3],q4[4],q4[5]])}
                  />

     

      {/* ------------------ */}


      
     
     <Input
                    placeholder="Third possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion4([q4[0],q4[1],q4[2],e.target.value,q4[4],q4[5]])}
                  />

     

      {/* --------------------- */}


      
     
     <Input
                    placeholder="Fourth possible solution"
                    style={{
                      marginTop:10,
                      marginLeft:400,
                      width: '40%',
                    }}
                    onChange={(e)=>setQuestion4([q4[0],q4[1],q4[2],q4[3],e.target.value,q4[5]])}
                  />

    


      <select class="ui dropdown" style={{marginLeft:570, marginTop:10}} onChange={(e)=>setQuestion4([q4[0],q4[1],q4[2],q4[3],q4[4],e.target.value])}>
      <option value="">Select the correct solution</option>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
  <option value="d">D</option>
</select>

  


<Divider plain> </Divider>
{/* ///////////////////////// */}

<Button 
 onClick={createExam}
 style={{marginLeft:515, marginTop:10, width:300, marginBottom:30}}>Add questions</Button> 
<br></br>

 {/* <Button type="primary" 
onClick={createQuiz} 
block style={{marginLeft:490, marginTop:20, width:400}}>
      Create quiz
    </Button>  */}

    </div>

    


  );
};

export default CreateExamWrapper;
