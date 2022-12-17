import React from 'react';
import {
    FacebookOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    GithubOutlined,
    YoutubeOutlined,
} from '@ant-design/icons';
import { Space } from 'antd';
const FooterWrapper = () => {


    return (
        <div style={{
            backgroundColor: "black",
            color: "White",
        }}>
            <br></br>
            <div
                style={{
                    display: "Flex",
                    flexDirection: "row",
                    gap: "20%",
                    justifyContent: "left",
                    alignItems: "normal",
                    fontSize: '25px',
                }}>
                <br></br>
                <img src="https://drnajafbeigi.com/wp-content/uploads/404%D8%AB.png"style={{ width: "7%", height: "4%" }} />
                <br></br>
                <br></br>
                <div>
                      <Space>
                        <a style={{
                            color: "white",
                            textDecoration: "none"
                        }} href="https://www.facebook.com/mohamed.tamer.7393264" onClick="return func();"><FacebookOutlined style={{
                            fontSize: '25px',
                        }} /></a>
                        <br></br>
                        <br></br>
                        <a style={{
                            color: "white",
                            textDecoration: "none"
                        }} href="https://twitter.com/Mohamed55549552" onClick="return func();"><TwitterOutlined style={{
                            fontSize: '25px',
                        }} /></a>
                        <br></br>
                        <br></br>
                        <a style={{
                            color: "white",
                            textDecoration: "none"
                        }} href="https://www.linkedin.com/in/mohamed-tamer-68030b22a/" onClick="return func();"><LinkedinOutlined style={{
                            fontSize: '25px',
                        }} /></a>
                        <br></br>
                        <br></br>
                        <a style={{
                            color: "white",
                            textDecoration: "none"
                        }} href="https://www.youtube.com/channel/UCm3-9EhovPw8IVP6PgfActA" onClick="return func();"> <YoutubeOutlined style={{
                            fontSize: '25px',
                        }} /></a>
                        <br></br>
                        <br></br>
                        <a style={{
                            color: "white",
                            textDecoration: "none"
                        }} href="https://github.com/Advanced-Computer-Lab-2022/ERROR404" onClick="return func();">  <GithubOutlined style={{
                            fontSize: '25px',
                        }} /></a>
                        <br></br>
                        <br></br>
                    </Space>
                </div>
            </div>

            <br></br>
            <div
                style={{
                    display: "Flex",
                    flexDirection: "row",
                    gap: "19%",
                    justifyContent: "left",
                    alignItems: "normal",
                    fontSize: "15px",
                    marginLeft: "3em",
                }}
            >
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/" onClick="return func();">Home</a>
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/Acceptagreement" onClick="return func();">InsAgreement</a>
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/ReportaProblem" onClick="return func();">Report</a>

                <p>
                    German Unviersty On Cairo
                </p>

            </div>
            <div
                style={{
                    display: "Flex",
                    flexDirection: "row",
                    gap: "19%",
                    justifyContent: "left",
                    alignItems: "normal",
                    fontSize: "15px",
                    marginLeft: "3em",
                }}
            >
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/viewMyGrades" onClick="return func();">Grades</a>
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="rateAndReviewCourse" onClick="return func();">RateCourses</a>
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/viewAllCourses" onClick="return func();">courses</a>
                <p>
                    MohamedTamer
                </p>

            </div>
            <div
                style={{
                    display: "Flex",
                    flexDirection: "row",
                    gap: "18.4%",
                    justifyContent: "left",
                    alignItems: "normal",
                    fontSize: "15px",
                    marginLeft: "3em",
                }}
            >
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/course/syllabus" onClick="return func();">Syllabus</a>
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/rateAndReviewInstructor" onClick="return func();">RateInstructor</a>
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/SolveExam" onClick="return func();">Exercises</a>

                <p>
                    Egypt(Cairo)
                </p>

            </div>
            <div
                style={{
                    display: "Flex",
                    flexDirection: "row",
                    gap: "18.4%",
                    justifyContent: "left",
                    alignItems: "normal",
                    fontSize: "15px",
                    marginLeft: "3em",
                }}
            >
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/course/reviews" onClick="return func();">Reviews</a>
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/changingPasswordEmail" onClick="return func();">ForgetPassword</a>
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/submitlink" onClick="return func();">Submit</a>

                <p>
                    (20) 1019901235
                </p>

            </div>
            <div
                style={{
                    display: "Flex",
                    flexDirection: "row",
                    gap: "20.2%",
                    justifyContent: "left",
                    alignItems: "normal",
                    fontSize: "15px",
                    marginLeft: "3em",
                }}
            >
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/settings" onClick="return func();">Settings</a>
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/course/about" onClick="return func();">About</a>
                <a style={{
                    color: "white",
                    textDecoration: "none"
                }} href="http://localhost:3000/insertCard" onClick="return func();">InsertCard</a>

            </div>
            <br></br>
            <br></br>
        </div>

    );

};
export default FooterWrapper;