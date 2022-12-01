import {
  Layout,
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Breadcrumb,
  Menu,
  Image,
  Rate,
} from "antd";

import button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import { Header, header as semanticHeader } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import { alignPropType } from "react-bootstrap/esm/types";
import PreviewCourses from "../CourseViewWrapper";
import axios from "axios";

const PreviewCourseWrapper = () => {
  return (
    <PreviewCourses>
      <PreviewCourse />
    </PreviewCourses>
  );
};

const PreviewCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [courseData, setCourseData] = useState("");

  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");

    setCourseId(courseId);

    axios
      .get("http://localhost:2020/getCourse/" + courseId)
      .then((response) => {
        setCourseData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <grid centered>
      {/* <semanticHeader>
        preview course:
    </semanticHeader> */}
      <div
        centered
        class="ui centered card"
        style={{
          width: "100%",
          fontSize: "14px",
        }}
      >
        <div class="video">
          <iframe
            width="100%"
            height="300"
            src={"https://" + courseData.preview}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="content">
          <a class="price" size="100">
            E£{courseData.price}
          </a>
          <a> </a>
          <s>
            <a class="meta">E£1300.99 </a>
          </s>

          <div class="meta">
            <i class="icon clock "></i>
            {/* <div class=" text"> */}
            70% discount valid till tomorrow!
            {/* </div> */}
          </div>
          <p></p>
          <p></p>
          {/* <div class="ui blue animated button">
            <div class="visible content">
                Add to cart
            </div>
            <div class="hidden content">
            <i class="icon cart "></i>
            </div>
        </div> */}
          <p></p>
          <div class="ui blue animated button">
            <div class="visible content">Buy now!</div>
            <div class="hidden content">PAY E£{courseData.price}</div>
          </div>
          <div class="description">30-Day Money-Back Guarantee.</div>
        </div>

        <h3>This course includes:</h3>

        <div class="extra content">
          <a>
            <div class="three wide column">
              <i class="icon video play "></i>
              {courseData.totalHours} hours on-demand video
            </div>
          </a>
        </div>
        <div class="extra content">
          <a>
            <div class="three wide column">
              <i class="icon file outline "></i>2 articles
            </div>
          </a>
        </div>
        <div class="extra content">
          <a>
            <div class="three wide column">
              <i class="icon download "></i>
              50 downlaodable resources
            </div>
          </a>
        </div>
        <div class="extra content">
          <a>
            <div class="three wide column">
              <i class="icon question circle "></i>5 practical tests
            </div>
          </a>
        </div>
        <div class="extra content">
          <a>
            <div class="three wide column">
              <i class="icon mobile alternate "></i>
              Access on mobile and TV
            </div>
          </a>
        </div>
        <div class="extra content">
          <a>
            <div class="three wide column">
              <i class="icon certificate "></i>
              Certificate of completion
            </div>
          </a>
        </div>
        <div>
          <div class="ui link list">
            <div>
              <a class="item">
                <Rate disabled allowHalf value={courseData.rating}></Rate>
              </a>
            </div>
          </div>
        </div>
      </div>
    </grid>
  );
};

export default PreviewCourseWrapper;
