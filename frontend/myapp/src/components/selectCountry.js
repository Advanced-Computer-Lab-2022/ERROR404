import { useMemo, useState, useContext } from "react";
import axios from "axios";
import { message, Select, Form, Item, Button, Input } from "antd";
import App from "../App";
// import Select from 'react-select';
import countryList from "react-select-country-list";
import { UserSettingPage } from "../pages/settingsPage";
import InstructorDashboard from "./instructorComponents/InstructorDashboard";
import TraineeDashboard from "../pages/TraineeDashboard";
import { AppContext } from "../AppContext";

const SelectCountryWrapper = () => {
  const { userType } = useContext(AppContext);
  const [user, setUser] = userType;
  if (user == "instructor") {
    return (
      <InstructorDashboard>
        <UserSettingPage Settings="Select Country">
          <SelectCountry />
        </UserSettingPage>
      </InstructorDashboard>
    );
  } else if(user == "individual") {
    return (
      <TraineeDashboard >
        <UserSettingPage Settings="Select Country">
          <SelectCountry />
        </UserSettingPage>
      </TraineeDashboard >
    );
  }
  
  else {
    return (
      <App>
        <UserSettingPage Settings="Select Country">
          <SelectCountry />
        </UserSettingPage>
      </App>
    );
  }
};

const SelectCountry = () => {
  const { userRegion } = useContext(AppContext);
  const [country, setCountry] = userRegion;
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const { userType, username } = useContext(AppContext);
  const [usertype, setUserType] = userType;
  const [userName, setUserName] = username;

  const changeHandler = (value) => {
    setValue(value);
    console.log("iocnwen ", value);
  };

  const onFinish = async (event) => {
    console.log("Success:", event);
    const country = event.country;

    await selectCountry(country);
  };

  const selectCountry = async (country) => {
    const requestBody = {
      //currentUser: currentUser,
      username: userName,
      country: country,
      usertype: usertype,
    };
    axios
      .patch("http://localhost:2020/country", requestBody)
      .then((response) => {
        message.success("Country " + country + " has been selected", 5);
        setCountry(country);
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
