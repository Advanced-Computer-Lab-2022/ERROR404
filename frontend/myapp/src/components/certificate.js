import React, { useContext, useEffect, useState } from "react";
import App from "../App";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";
import { AppContext } from "../AppContext";
import emailjs from "@emailjs/browser";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import "../App.css";
import { jsPDF } from "jspdf";
import { Input, message, Form, Button } from "antd";
import axios from "axios";
import { useLocation } from "react-router-dom";

const CertificateWrapper = () => {
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const [email, setemail] = useState("");
  const [name, setName] = useState("");

  const location = useLocation();
  useEffect(() => {
    const idSearch = window.location.search;
    const urlParams = new URLSearchParams(idSearch);
    const course = urlParams.get("courseTitle");
    const user = urlParams.get("user");

    setTitle(course);
    axios.get(`http://localhost:2020/login/${user}`).then((response) => {
      console.log(response.data);
      setUser(response.data);
      setemail(response.data.email);
    });
  }, [location]);

  const onFinish = () => {
    var data = {
      name: name,
      certificate_url:
        "http://localhost:3000/certificate?courseTitle=" +
        title +
        "&user=" +
        user.username,
      recepientEmail: email,
    };
    emailjs
      .send("service_5di6lsf", "template_ug4a51m", data, "hIXXOv4x76p3JXKWU")
      .then(
        (result) => message.success("An Email has been sent successfully!! "),
        (error) => {
          message.error("Oops... " + JSON.stringify(error), 1);
          console.log(JSON.stringify(error));
        }
      );
  };
  const actions = [
    {
      icon: (
        <SaveIcon
          onClick={() => {
            console.log("aaaaaaaaa");
            const input = document.getElementById("pdf-element");
            const pdf = new jsPDF("p", "pt", "a2");
            pdf.html(input).then(() => {
              pdf.save("certificate.pdf");
            });
          }}
        />
      ),
      name: "Save",
    },
    {
      icon: (
        <AttachEmailIcon
          onClick={() => {
            console.log("aaaaaaaaa");
            onFinish();
          }}
        />
      ),
      name: "Send Via Email",
    },
  ];
  const handleChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };
  return (
    <App>
      <div
        id="Hello"
        style={{
          display: "Flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "25px",
        }}
      >
        <h3>
          Congratulations on completing the course , We wish you enjoyed our
          platform content
        </h3>
      </div>
      <br></br>
      <br></br>
      <div
        id="pdf-element"
        style={{
          display: "Flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "25px",
        }}
      >
        <div
          className="content"
          style={{
            height: "118mm",
            width: "125mm",
            border: "1mm solid #991B1B",
            background: "white",
          }}
        >
          <div
            className="inner-content"
            style={{
              border: "1mm solid #991B1B",
              margin: "4mm",
              padding: "10mm",
              height: "108mm",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                textTransform: "uppercase",
                fontSize: "30pt",
                marginBottom: "0",
              }}
            >
              Certificate
            </h1>
            <h2
              style={{
                fontSize: "24pt",
                marginTop: "0",
                paddingBottom: "1mm",
                display: "inline-block",
                borderBottom: "1mm solid #991B1B",
              }}
            >
              of Excellence
            </h2>
            <h3
              style={{
                fontSize: "20pt",
                marginBottom: "0",
                marginTop: "1mm",
              }}
            >
              This Certificate Is Proudly Presented To
            </h3>
            <p
              style={{
                fontSize: "15pt",
                fontStyle: "bolder",
              }}
            >
              {name}
            </p>
            <h3
              style={{
                fontSize: "20pt",
                marginBottom: "0",
                marginTop: "2mm",
              }}
            >
              Has Completed
            </h3>
            <p
              style={{
                fontSize: "12pt",
              }}
            >
              {title}
            </p>
            <h3
              style={{
                fontSize: "20pt",
                marginBottom: "0",
                marginTop: "2mm",
              }}
            >
              On
            </h3>
            <p
              style={{
                fontSize: "12pt",
              }}
            >
              {new Date().toLocaleDateString("de-DE")}
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "40mm",
          height: "40mm",
          position: "absolute",
          top: "30%",
          left: "10%",
        }}
      >
        <h5>Enter the name to be shown on the certificate</h5>
        <Input.TextArea
          onChange={handleChange}
          placeholder="Enter you name please"
          maxLength={30}
        />
      </div>

      <Box
        sx={{
          height: "50%",
          width: "80%",
          transform: "translateZ(100px)",
          flexGrow: 2,
        }}
      >
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
    </App>
  );
};
export default CertificateWrapper;
