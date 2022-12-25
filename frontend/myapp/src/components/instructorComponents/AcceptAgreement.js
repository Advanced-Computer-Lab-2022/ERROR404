import { message, Form, Button, Checkbox } from "antd";
import App from "../../App";
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import { jsPDF } from "jspdf";

const AcceptAgreWrapper = () => {
  const actions = [
    {
      icon: (
        <SaveIcon
          onClick={() => {
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
    {
      icon: (
        <PrintIcon
          onClick={() => {
            const input = document.getElementById("pdf-element");
            const pdf = new jsPDF("p", "pt", "a4");
            pdf.html(input).then(() => {
              pdf.autoPrint();
              pdf.output("dataurlnewwindow");
            });
          }}
        />
      ),
      name: "Print",
    },
  ];

  return (
    <App>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifycontent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <h1>Insructor Agreement </h1>

        <div
          id="pdf-element"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "normal",
            fontSize: "15px",
            width: "100%",
            height: "100%",
            lineheight: "3em",
            overflow: "scroll",
            border: "thin #000 solid",
            padding: "5px",
          }}
        >
          <p>
            <h5>1. Terms of Payment:</h5> The company will take 15% on each
            video per registered trainee .
          </p>
          <p>
            <h5>2. Method of Instruction:</h5> Contractor acknowledges that
            Instructor shall: 1) satisfy the learning objectives set by CCIM for
            the Course as outlined in the course material; 2) achieve a
            satisfactory pass rate by the students of the exam to be
            administered at the conclusion of the Course; and 3) receive
            satisfactory evaluation by students attending theCourse.
          </p>
          <p>
            <h5> 3. Promotion of other Courses:</h5> Contractor agrees that
            Instructor will not promote other nonCCIM courses or course
            providers on site at the Course which is the subject of this
            Agreement.
          </p>
          <p>
            <h5> 4. Reference Material:</h5> agrees to provide the posted videos
            only in the Course.
          </p>
          <p>
            <h5> 5. Warranties:</h5> Contractor represents that Instructor's
            lectures shall contain nothing of such a nature that could be
            reasonably considered scandalous, defamatory or obscene. Contractor
            further represents that any and all educational materials utilized
            in the Course shall not violate, infringe, or impede the legal or
            equitable rights of any person, firm, corporation, or other
            organization.
          </p>
          <p>
            <h5>6. Tax Duties and Responsibilities:</h5> Neither federal, nor
            state, nor local income tax nor payroll tax of any kind shall be
            withheld or paid . on behalf of Contractor or the employees,
            officers, or shareholders of Contractor. The person provided by the
            Contractor to perform services hereunder shall not be treated as an
            employee with respect to the services performed hereunder for
            federal or state tax purposes. Contractor understands that it is
            responsible to pay, according to law, all applicabletaxes.
          </p>
          <p>
            <h5> 7. Termination With Cause:</h5> With reasonable cause, either
            party may terminate this Agreement effective immediately upon the
            giving of written notice of termination with cause. Reasonable cause
            shall include, without limitation: a) material violation of this
            Agreement; b) any act exposing the other party to liability to
            others for personal injury or property damage; c) cancellation of
            the subject event; d) any circumstance beyond the control of either
            party. Reasonable cause on the part of the Contractor does not
            include a low number of fullypaid registrars resulting in a
            commensurate reduction in Teaching Fees.
          </p>
          <p>
            <h5>8. Notices:</h5> Any notice given in connection with this
            Agreement shall be in writing and shall be delivered in writing to
            the party at the party's address stated herein. Any party may change
            its address stated herein by giving notice of the change in
            accordance with this paragraph.
          </p>
          <p>
            <h5> 9. Choice of Law:</h5> Any dispute under this Agreement or
            related to this Agreement shall be decided in accordance with the
            law of the State of Illinois.
          </p>
          <p>
            <h5> 10. Arbitration:</h5> Any dispute under this Agreement or
            related to this Agreement shall be submitted to binding arbitration
            by the American Arbitration Association. Damages shall be for actual
            damages only, punitive damages shall not be awarded.
          </p>
        </div>
        <Form onFinish={() => message.success("Your request has been sent", 3)}>
          <Form.Item name="accept" label="I agree to the Terms of Service">
            <Checkbox
              onChange={() => {
                document.getElementById("submit_button").disabled =
                  !document.getElementById("submit_button").disabled;
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button id="submit_button" htmlType="subimt" disabled>
              Accept Agreement
            </Button>
          </Form.Item>
        </Form>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "normal",
            alignItems: "center",
            fontSize: "20px",
          }}
        >
          <div>
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
          </div>
        </div>
      </div>
    </App>
  );
};

export default AcceptAgreWrapper;
