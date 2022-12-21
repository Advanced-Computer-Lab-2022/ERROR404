import React from "react";
import App from "../App";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import "../App.css";
import { jsPDF } from "jspdf";
const CertificateWrapper = () => {
  const actions = [
    {
      icon: (
        <SaveIcon
          onClick={() => {
            console.log("aaaaaaaaa");
            const input = document.getElementById("pdf-element");
            const pdf = new jsPDF("p", "pt", "a4");
            pdf.html(input).then(() => {
              pdf.save("test.pdf");
            });
          }}
        />
      ),
      name: "Save",
    },
  ];
  return (
    <App>
      <div
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
      <div
        style={{
          display: "Flex",
          flexDirection: "row",
          gap: "10%",
          justifyContent: "center",
          alignItems: "normal",
          fontSize: "25px",
        }}
      >
        <div
          style={{
            display: "Flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "25px",
          }}
        >
          <h4>Please enter your email</h4>
          <form
            style={{
              display: "Flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "25px",
            }}
          >
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email here"
              required
            />
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </form>
        </div>
        <div id="pdf-element">
          <div style={{
            position: "absolute",
            left: "4mm",
          }}>
            <div class="content">
              <div class="inner-content">
                <h1>Certificate</h1>
                <h2>of Excellence</h2>
                <h3>This Certificate Is Proudly Presented To</h3>
                <p>Jane Doe</p>
                <h3>Has Completed</h3>
                <p>PrintCSS Basics Course</p>
                <h3>On</h3>
                <p>Feburary 5, 2021</p>
                <div class="badge"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Box
        sx={{
          height: 100,
          width: 1100,
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
