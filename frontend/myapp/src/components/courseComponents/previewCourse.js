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
  Avatar,
  List,
  Collapse,
} from "antd";

import button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import { Header, header as semanticHeader } from "semantic-ui-react";
import React, { useContext, useEffect, useState } from "react";
import { alignPropType } from "react-bootstrap/esm/types";
import PreviewCourses from "../CourseViewWrapper";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CreateRequestWrapper from "../corporateCreateRequest";
import { AppContext } from "../../AppContext";

const { Panel } = Collapse;

const PreviewCourseWrapper = () => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  const [courseId, setCourseId] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [newPrice, setNewPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [date, setDate] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  const [subtitlesCount, setSubtitlesCount] = useState("");
  const [noOfSubscribers, setNoOfSubscribers] = useState("");
  const [title, setTitle] = useState("");
  const location = useNavigate();
  useEffect(() => {
    const idSearch = window.location.search;
    console.log(idSearch);

    const urlParams = new URLSearchParams(idSearch);
    const courseId = urlParams.get("courseId");
    setCourseId(courseId);
    let body = {
      id: courseId,
    };

    axios
      .put("http://localhost:2020/updateViews", body)
      .then(() => {
        console.log("incrementing views ");
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:2020/getCourse/" + courseId)
      .then((response) => {
        setCourseData(response.data);
        console.log(response.data);
        console.log(response.data.subtitles);
        setSubtitles(response.data.subtitles);

        setSubtitlesCount(response.data.subtitles.length);
        console.log(response.data.subtitles.length);

        setNoOfSubscribers(response.data.numberOfSubscribers);
        console.log(response.data.numberOfSubscribers);

        console.log(response.data.discount.value);
        setOldPrice(response.data.discount.value);
        setDate(response.data.discount.endDate);
        setTitle(response.data.title);
        let newPrice =
          response.data.discount.value == 0
            ? response.data.price
            : response.data.price * (response.data.discount.value / 100);
        setNewPrice(newPrice);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <PreviewCourses courseId={courseId} title={title}>
      <grid centered>
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
              height="550"
              src={"https://" + courseData.preview}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                boxSizing: "border-box",
                padding: "10px",
              }}
            >
              <>
                E£{newPrice}{" "}
                {newPrice != courseData.price ? (
                  <s>E£{courseData.price}</s>
                ) : null}
              </>
              <div class=" text">
                {newPrice != courseData.price ? (
                  <>
                    {oldPrice}% discount valid till {date}!
                  </>
                ) : null}
              </div>
              <Rate disabled allowHalf value={courseData.rating}></Rate>
              {user == "individual" ? (
                <Button type="primary">
                  <Link to={"/pay?courseId=" + courseData._id}>Buy Now</Link>
                </Button>
              ) : (
                <CreateRequestWrapper />
              )}
            </div>
            <div className="course info">
              <h3>This course includes:</h3>
              <ul>
                <li>{courseData.totalHours} hours of content</li>
                <li>
                  {courseData.questions == null
                    ? 0
                    : courseData.questions.length}{" "}
                  Exercises
                </li>
                <li>Certificate of completion</li>
              </ul>
            </div>
            <Collapse ghost defaultActiveKey={1}>
              <Panel header="Subtitles" key="1">
                <List
                  itemLayout="horizontal"
                  dataSource={subtitles}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.subtitle}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
          </div>
          {/* <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "black",
            }}
          >
            E£{newPrice}
            <s>E£{courseData.price}</s>
            <div class="meta">
              <i class="icon clock "></i>
              <div class=" text">
                {oldPrice}% discount valid till {date}!
                <Rate disabled allowHalf value={courseData.rating}></Rate>
              </div>
            </div>
            <div class="ui blue animated button">
              <div class="visible content">Buy now!</div>
              <div class="hidden content">PAY E£{newPrice}</div>
            </div>
            <div class="description">30-Day Money-Back Guarantee.</div>
          </div>

          <h3>This course includes:</h3>

          <div class="extra content">
            <div class="three wide column">
              <i class="icon video play "></i>
              {courseData.totalHours} hours on-demand video
            </div>
          </div>
          <div class="extra content">
            <div class="three wide column">
              <i class="icon file outline "></i>2 articles
            </div>
          </div>
          <div class="extra content">
            <div class="three wide column">
              <i class="icon download "></i>
              50 downlaodable resources
            </div>
          </div>
          <div class="extra content">
            <div class="three wide column">
              <i class="icon question circle "></i>5 practical tests
            </div>
          </div>
          <div class="extra content">
            <div class="three wide column">
              <i class="icon mobile alternate "></i>
              Access on mobile and TV
            </div>
          </div>
          <div class="extra content">
            <div class="three wide column">
              <i class="icon certificate "></i>
              Certificate of completion
            </div>
          </div>
          <div>
            <div class="ui link list">
              <div
                style={{
                  boxSizing: "border-box",
                  padding: "20px",
                }}
              >
                <hr />
                <Collapse ghost>
                  <Panel header="Subtitles" key="1">
                    <List
                      itemLayout="horizontal"
                      dataSource={subtitles}
                      renderItem={(item) => (
                        <List.Item>
                          <List.Item.Meta
                            title={item.subtitle}
                            description={item.description}
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                </Collapse>
              </div>
            </div> */}
          {/* </div> */}
        </div>
      </grid>
    </PreviewCourses>
  );
};

export default PreviewCourseWrapper;
