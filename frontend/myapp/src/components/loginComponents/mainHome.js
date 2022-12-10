import React, { useContext, useEffect, useState } from "react";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Fingerprint from "@mui/icons-material/Fingerprint";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { AppContext } from "../../AppContext";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Button, message, Space, notification } from "antd";

const LoginComponent = () => {
  const {
    loggedIn,
    username,
    userEmail,
    userPassword,
    userMongoId,
    instructorBio,
    userRegion,
    userPhone,
    userType,
  } = useContext(AppContext);
  const [userName, setUsername] = username;
  const [useremail, setUserEmail] = userEmail;
  const [usertype, setUserType] = userType;
  const [userpassword, setUserPassword] = userPassword;
  const [userId, setUserMongoId] = userMongoId;
  const [userPhoneNum, setUserPhoneNum] = userPhone;
  const [region, setRegion] = userRegion;
  const [instructorbio, setInstructorBio] = instructorBio;
  const [isLoggedIn, setIsLoggedIn] = loggedIn;
  const [user, setUser] = useState("");
  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: true,
  });
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
    console.log(values);
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log(values);
    console.log("user " + user);

    axios
      .get(`http://localhost:2020/getUser/${values.username}/${user}`)
      .then((response) => {
        console.log(response);
        if (response.data == null) {
          message.error("You have entered a wrong password, or username", 3);
        } else {
          console.log(response.data);
          let data = response.data;
          if (values.password == response.data.password) {
            message.success(`Welcome Back ${response.data.username}`, 2);
            // setting up context
            setIsLoggedIn(true);
            setRegion(data.country);
            setUserEmail(data.email);
            setUserMongoId(data._id);
            setUsername(data.username);
            setUserPassword(data.password);
            setUserType(user);
            if (user == "instructor") {
              setInstructorBio(data.biography);
              navigate("instructorDashboard");
            }
          } else {
            message.error("You have entered a wrong password, or username", 3);
          }
        }
      })
      .catch((error) => {
        message.error("An erorr has occured " + error, 3);
      });
  };
  return (
    <>
      <Space>
        <Button type="primary" shape="round" icon={<LoginIcon />} size="medium">
          <Link to="/login">Sign In</Link>
        </Button>
        <Button
          type="primary"
          shape="round"
          icon={<PersonAddIcon />}
          size="medium"
        >
          <Link to="/">Create new Account</Link>
        </Button>
      </Space>

      <div
        style={{
          width: "100%",
          height: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          padding: "5%",
          textAlign: "center",
          borderRadius: "10%",
          gap: "2%",
        }}
      >
        <h1>Welcome Back</h1>
        <FormControl sx={{ m: 1, width: "70%" }} variant="standard">
          <TextField
            id="input-with-icon-textfield"
            label="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            variant="standard"
            onChange={handleChange("username")}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "70%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "70%" }} variant="standard">
          <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="User Type"
            onChange={handleUserChange}
          >
            <MenuItem value={"instructor"}>Instructor</MenuItem>
            <MenuItem value={"individual trainee"}>Individual Trainee</MenuItem>
            <MenuItem value={"admin"}>Administrator</MenuItem>
            <MenuItem value={"corporate trainee"}>Corporate Trainee</MenuItem>
          </Select>
        </FormControl>
        <Button type="primary" icon={<Fingerprint />} onClick={handleClick}>
          Login
        </Button>
        <Button type="link">Or Register</Button>
        <hr
          style={{
            height: 5,
          }}
        />

        <Button type="link">Log in with your organization</Button>
      </div>
    </>
  );
};

export default LoginComponent;
