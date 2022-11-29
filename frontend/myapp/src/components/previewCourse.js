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
} from "antd";

import button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "semantic-ui-css/semantic.min.css";
import { Header, header as semanticHeader } from "semantic-ui-react";
import React from "react";
import { alignPropType } from "react-bootstrap/esm/types";

const PreviewCourse = () => {
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
            src="https://www.youtube.com/embed/dNo_BVzNb28"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="content">
          <a class="price" size="100">
            E£390.99
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
            <div class="hidden content">pay E£390.99</div>
          </div>
          <div class="description">30-Day Money-Back Guarantee.</div>
        </div>

        <h3>This course includes:</h3>

        <div class="extra content">
          <a>
            <div class="three wide column">
              <i class="icon video play "></i>
              44.5 hours on-demand video
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
              <i class="icon share "></i>
              <a class="item">
                <u>Share this course</u>
              </a>
            </div>
          </div>
        </div>
      </div>
    </grid>
  );
};

export default PreviewCourse;
