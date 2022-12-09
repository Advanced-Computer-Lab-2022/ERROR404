import React, { Component } from "react";
import "../../App.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { Link } from "react-router-dom";
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
import Button from "@mui/material/Button";
import Fingerprint from "@mui/icons-material/Fingerprint";

const MainHome = () => {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: true,
  });

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
  return (
    <div className="App">
      <div className="appAside" />
      <div className="appForm">
        <div className="pageSwitcher">
          <Link
            to="/sign-in"
            activeClassName="pageSwitcherItem-active"
            className="pageSwitcherItem"
          >
            Sign In
          </Link>
          <Link
            exact
            to="/"
            activeClassName="pageSwitcherItem-active"
            className="pageSwitcherItem"
          >
            Sign Up
          </Link>
        </div>

        <div
          className="formTitle"
          style={{
            width: "100%",
            height: "60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            padding: "5%",
            backgroundColor: "#40434e",
            textAlign: "center",
            borderRadius: "10%",
            gap: "2%",
          }}
        >
          <FormControl sx={{ m: 1, width: "50%" }} variant="standard">
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
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "50%" }} variant="standard">
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
          <Button variant="contained" startIcon={<Fingerprint />}>
            Login
          </Button>
          <Button variant="text">Or Register</Button>
        </div>
      </div>
    </div>
  );
};

export default MainHome;
