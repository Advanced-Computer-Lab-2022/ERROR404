import React from "react";
import { Button, Space, message, Form } from "antd";
import App from "../../App";


const AcceptAgreWrapper = () => {
  // const onChange = (e) => {
  //   console.log(e);
  // };
  // function terms_changed(termsCheckBox){
  //   //If the checkbox has been checked
  //   if(termsCheckBox.checked){
  //       //Set the disabled property to FALSE and enable the button.
  //       document.getElementById("submit_button").disabled = false;
  //   } else{
  //       //Otherwise, disable the submit button.
  //       document.getElementById("submit_button").disabled = true;
  //   }
  // }

  return (
    <App>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        <h1>InsructorAgreement :</h1>

        <p>
          <a
            href="https://drive.google.com/file/d/1Af0GnFEtfENbn2ubAj-RYCFSyLHv0YWm/view?usp=sharing"
            target="_blank"
          >
            Click Here
          </a>
        </p>
        <Form method="post">
    <div>
        <label for="terms_and_conditions">I agree to the Terms of Service:</label>
        <input type="checkbox" id="terms_and_conditions" value="1" onClick={ () => {
                  document.getElementById("submit_button").disabled = !document.getElementById("submit_button").disabled ;                  ;
        }}/>
    </div>
    <div>
    <Space wrap>
          <Button id="submit_button" disabled={true} onClick={
                        message.success("Your request has been sent", 3)}>Sign Up</Button>
        </Space>
    </div>
</Form>
      </div>
    </App>
  );
};

export default AcceptAgreWrapper;
