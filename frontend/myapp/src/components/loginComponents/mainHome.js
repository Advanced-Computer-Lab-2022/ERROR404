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
import { Button, message, Space, notification, Alert } from "antd";

const LoginComponent = ({ values }) => {
  const { modal, drawer } = values;
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
    traineeCourses,
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
  const [traineeEnrolledCourses, setTraineeCourses] = traineeCourses;
  const [user, setUser] = useState("");
  const [value, setValues] = useState({
    username: "",
    password: "",
    showPassword: true,
  });
  const [isModalOpen, setIsModalOpen] = modal;
  const [isDrawerOpen, setIsDrawerOpen] = drawer;

  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...value, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...value,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
    console.log(value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log(value);
    console.log("user " + user);

    if (value.username == "" || value.password == "") {
      message.warning("All fields must be filled first", 3);
    } else {
      axios
        .get(`http://localhost:2020/login/${value.username}`)
        .then((response) => {
          console.log(response);
          if (response.data == null) {
            message.error("You have entered a wrong password, or username", 1);
          } else {
            console.log(response.data);
            let data = response.data;
            if (value.password == response.data.password) {
              message.success(`Welcome Back ${response.data.username}`, 1);
              // setting up context
              setIsLoggedIn(true);
              setRegion(data.country);
              setUserEmail(data.email);
              setUserMongoId(data._id);
              setUsername(data.username);
              setUserPassword(data.password);
              setUserType(data.role);
              console.log(usertype);
              if (data.role == "instructor") {
                setInstructorBio(data.biography);
              } else if (
                data.role == "individual" ||
                data.role == "corporate"
              ) {
                console.log(data.Regcourses);
                setTraineeCourses(data.Regcourses);
                console.log(traineeEnrolledCourses);
              }
              setIsModalOpen(false);
            } else {
              setVisible(true);
              // message.error(
              //   "You have entered a wrong username, or password",
              //   3
              // );
            }
          }
        })
        .catch((error) => {
          console.log(error.response.status);
          message.error("An erorr has occured " + error.response.data, 3);
        });
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
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
        {visible && (
          <Alert
            message="You have entered a wrong username, or password"
            type="error"
            closable
            afterClose={handleClose}
          />
        )}
        <br />
        <FormControl sx={{ m: 1, width: "70%" }} variant="standard" required>
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
        <FormControl sx={{ m: 1, width: "70%" }} variant="standard" required>
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            required
            id="standard-adornment-password"
            type={value.showPassword ? "text" : "password"}
            value={value.password}
            onChange={handleChange("password")}
            endAdornment={
              <>
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {value.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              </>
            }
          />
        </FormControl>

        <br />
        <Button type="primary" icon={<Fingerprint />} onClick={handleClick}>
          Login
        </Button>
        <br />
        <Link to="/forgotpassword">Forgot Password</Link>
        <br />
        <br />
        <h6>Have not joined us yet?</h6>

        <Link
          type="link"
          style={{
            color: "blue",
            textDecoration: "none",
          }}
          onClick={() => {
            setIsModalOpen(false);
            setIsDrawerOpen(true);
          }}
        >
          {" "}
          Create new Account
        </Link>

        <hr
          style={{
            height: 5,
          }}
        />
      </div>
    </>
  );
};

export default LoginComponent;
