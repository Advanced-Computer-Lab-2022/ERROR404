import App from "../App";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {
  DesktopOutlined,
  FileOutlined,
  LeftOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Card, Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
    getItem('Go Back', '1', <LeftOutlined />), 
    getItem('Getting Started', 'sub1' , <DesktopOutlined /> , [
        getItem('Welcome to the Course!', '2'),
        getItem('What is JSON', '3'),
        getItem('Why JSON instead of JavaScript', '4'),
        getItem('Join our Online Learning Community', '5'),
  ]),
    getItem('JavaScript Refresher', 'sub2', <UserOutlined />, [
    getItem('Module Introduction', '6'),
    getItem('Understanding "let" and "const"', '7'),
    getItem('Arrow Functions', '8'),
  ]),
  
];
const WrapperLessonPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [courseData, setCourseData] = useState("");
  const [courseDescription, setCourseDescription]= useState("");
  const [courseTitle, setCourseTitle]= useState("");

  useEffect(() => {
    const idSearch = window.location.search;
    

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");
    console.log(idSearch);

    setCourseId(courseId);

    axios
      .get("http://localhost:2020/getCourse/" + courseId)
      .then((response) => {
        setCourseData(response.data);
        console.log(response.data);
        console.log(response.data.subtitles.description.value);
        setCourseTitle(response.data.title.value);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout
      style={{
        minHeight: '100vh',  
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content 
          style={{ 
            backgroundColor:'silver'          
          }}
        >
           
          <Breadcrumb
            style={{
              margin: '16px 5',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>

          <iframe style={{
                marginLeft:150,
                marginTop:10            
             }}   
            width="850" 
                height="500" 
                src={"https://" + courseData.video}

                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
            
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Card style={{
                width: 950,
                marginLeft: 70,
                marginTop:15,
                }} 
                >
                <p style={{
                padding:"30px",
                fontFamily:"-moz-initial",
                // marginLeft:10,
                //marginTop:20, 
                textAlign:"center", 
                fontSize:20

                }} >
                   In this video we will cover everything you need to know about JSON in only 10 minutes.  
                    We will cover what JSON is, why JSON is important, what JSON is used for, the syntax of JSON, and multiple examples of JSON. 
                    JSON is the most popular data representation format, and is one of the most important, and easiest concepts you can learn in programming. 
                    It allows you to create APIs, config files, and structured data. We will be covering all of the terminology, 
                    and going through live examples of all the different JSON types.
                </p>
            </Card>
            
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            backgroundColor:'silver'
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default WrapperLessonPage;