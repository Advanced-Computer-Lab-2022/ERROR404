import React, { useContext, useEffect, useState } from "react";
import {
  LockOutlined,
  UserOutlined,
  FontColorsOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Avatar,
  message,
  DatePicker,
} from "antd";
import axios from "axios";
import { AppContext } from "../AppContext";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DialpadIcon from "@mui/icons-material/Dialpad";
import App from "../App";
import { UserSettingPage } from "../pages/settingsPage";
import TraineeDashboard from "./traineeComponents/TraineeDashboard";

const monthFormat = "YYYY/MM";

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const InsertCreditCardInfoWrapper = () => {
  const { userEmail, username } = useContext(AppContext);
  const [email, setEmail] = userEmail;
  const [user, setUsername] = username;

  const onFinish = (values) => {
    const holderName = values.holderName;
    const cardNumber = values.cardNumber;
    const expDate = values.expDate;
    const cvv = values.cvv;
    var GivenDate = new Date(values.expDate);
    var currentDate = new Date();
    if (values.cardNumber.length != 14) {
      message.error("Card number must be 14 digits long");
      return;
    } else if (GivenDate < currentDate) {
      message.error(
        "The expiration data must be Bigger or Equal to today's date"
      );
      return;
    } else if (values.cvv.length != 3) {
      message.error("cvv must be 3 numbers");
      return;
    } else {
      let body = {
        holderName: holderName,
        cardNumber: cardNumber,
        expirationDate: expDate,
        cvv: cvv,
        username: user,
      };
      axios
        .patch("http://localhost:2020/addCreditCardInfo", body)
        .then(() => {
          message.success("Credit card info has been saved successfully", 5);
        })
        .catch((error) => {
          message.error("An unexpected error has occured", 5);
          console.log("error at credit card info ", JSON.stringify(error));
        });
      console.log("Received values of form: ", values);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50%",
        }}
      >
        <Form
          name="creditCard-inerting-form"
          className="changingpassword-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="cardNumber"
            label="Card Number"
            rules={[
              { required: true, message: "Please input your card number!" },
            ]}
          >
            <Input
              prefix={<CreditCardIcon className="site-form-item-icon" />}
              placeholder="Card Number"
            />
          </Form.Item>
          <Form.Item
            name="holderName"
            label="Card Holder Name"
            rules={[
              {
                required: true,
                message: "Please input your card holder name!",
              },
            ]}
          >
            <Input
              prefix={<FontColorsOutlined className="site-form-item-icon" />}
              placeholder="Card Holder Name"
            />
          </Form.Item>
          <Form.Item
            name="cvv"
            label="CVV"
            rules={[
              { required: true, message: "Please Confirm New Password!" },
            ]}
          >
            <Input.Password
              prefix={<DialpadIcon className="site-form-item-icon" />}
              placeholder="CVV"
            />
          </Form.Item>
          <Form.Item name="expDate" label="Expiry Date" {...config}>
            <DatePicker format={monthFormat} picker="month" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "20%",
                textAlign: "center",
              }}
            >
              Add Credit Card
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default InsertCreditCardInfoWrapper;
