import { useMemo, useState } from "react";
import axios from "axios";
import { message, Select, Form, Item, Button, Input } from "antd";
import App from "../App";
// import Select from 'react-select';
import countryList from "react-select-country-list";
import { UserSettingPage } from "../pages/settingsPage";

const SelectCountryWrapper = () => {
  return (
    <>
      <App>
        <UserSettingPage>
          <SelectCountry1 />
        </UserSettingPage>
      </App>
    </>
  );
};

const SelectCountry1 = () => {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
    console.log("iocnwen ", value);
  };

  const onFinish = async (event) => {
    console.log("Success:", event);
    const username = event.username;
    const country = event.country;

    await selectCountry(username, country);
  };

  const selectCountry = async (username, country) => {
    const requestBody = {
      //currentUser: currentUser,
      username: username,
      country: country,
    };
    axios
      .patch("http://localhost:2020/country", requestBody)
      .then((response) => {
        message.success("Country " + country + " has been selected", 5);
      })
      .catch((error) => {
        console.log("erorr ", error.message);
        message.error("Unexpected Error occured" + error.response.message, 5);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: "Please input your country!" }]}
      >
        <Select
          style={{
            textAlign: "center",
            width: 120,
          }}
          onChange={changeHandler}
          placeholder="Select a country"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          options={options}
          value={value}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SelectCountryWrapper;
