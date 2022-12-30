import React, { useContext } from "react";
import App from "../App";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";
import { AppContext } from "../AppContext";
import emailjs from "@emailjs/browser";
import "../App.css";
import { jsPDF } from "jspdf";
import { Input, message, Form, Button } from "antd";
const CertificateWrapper = () => {
  const { userEmail, userMongoId, userType, username } = useContext(AppContext);
  const [useremail, setUserEmail] = userEmail;
  const [userId, setId] = userMongoId;
  const [name, setName] = username;

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    var data = {
      name: name,
      userId: userId,
      certificate_url: "http://localhost:3000/certificate",
      recepientEmail: useremail,
    };
    emailjs
      .send("service_5di6lsf", "template_ug4a51m", data, "hIXXOv4x76p3JXKWU")
      .then(
        (result) => message.success("An Email has been sent successfully!! "),
        (error) => {
          message.error("Oops... " + JSON.stringify(error));
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
          platforum content
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
                fontSize: "12pt",
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
        />
      </div>
      <div>
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
          <h4>We will be sending you an email to {useremail}</h4>
          <Form
            name="normal_login"
            className="change-password-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{
                  width: "100%",
                }}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </App>
  );
};
export default CertificateWrapper;
