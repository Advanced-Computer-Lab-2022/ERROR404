import React from "react";
import App from "../App";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";
import "../App.css";
import { jsPDF } from "jspdf";
import { Input } from "antd";
import { useState } from "react";
const CertificateWrapper = () => {
  const [username, setUserName] = useState("");
  const actions = [
    {
      icon: (
        <SaveIcon
          onClick={() => {
            window.print();
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
  ];
  const handleChange = (event) => {
    console.log(event.target.value);
    setUserName(event.target.value);
  };
  return (
    <App>
      <div
        id="Hello"
        style={{
          display: "Flex",
          flexDirection: "column",
          gap: "20%",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "25px",
        }}
      >
        <h3>
          Congratulations on completing the course , We wish you enjoyed our
          platforum content
        </h3>
      </div>
      <br></br>
      <br></br>
      <div>
        <div
          id="pdf-element"
          style={{
            position: "absolute",
            left: "160mm",
            top: "55mm",
            height: "150mm",
            width: "147mm",
            border: "1mm solid #991B1B",
            backgroundcolor: "#d6d6e4",
          }}
        >
          <div
            className="content"
            style={{
              position: "absolute",
              left: "10mm",
              top: "10mm",
              height: "128mm",
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
                height: "118mm",
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
                  marginTop: "5mm",
                }}
              >
                This Certificate Is Proudly Presented To
              </h3>
              <p
                style={{
                  fontSize: "12pt",
                }}
              >
                {username}
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
                PrintCSS Basics Course
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
                Feburary 5, 2021
              </p>
              <div
                className="badge"
                style={{
                  width: "40mm",
                  height: "40mm",
                  position: "static",
                  right: "10mm",
                  bottom: "10mm",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "40mm",
          height: "40mm",
          position: "static",
          right: "10mm",
          bottom: "10mm",
        }}
      >
        <h5>Enter your name please</h5>
        <Input.TextArea
          onChange={handleChange}
          placeholder="Enter you name please"
        />
      </div>
      <div>
        <Box
          sx={{
            height: 400,
            width: 1050,
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
      </div>
    </App>
  );
};
export default CertificateWrapper;
