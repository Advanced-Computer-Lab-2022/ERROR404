import React, { useContext, useEffect, useState } from "react";
import App from "../App";
import { SettingTwoTone, EditOutlined } from "@ant-design/icons";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import { Space, Image, Input, Button, Form, message, Tabs } from "antd";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LanguageIcon from "@mui/icons-material/Language";
import PaymentsIcon from "@mui/icons-material/Payments";
import { AppContext } from "../AppContext";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ChangePasswordPageWrapper from "./changePassword";
import InsertCreditCardInfoWrapper from "./traineeComponents/insertCreditCardinfo";

const SettingsPageSider = () => {
  const { userType } = useContext(AppContext);
  const [usertype, setUser] = userType;
  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="settings-list-subheader">
            <Space>
              <SettingTwoTone />
              Account Settings
            </Space>
          </ListSubheader>
        }
      >
        <Link to="/settings">
          <ListItemButton>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Personal Information" />
          </ListItemButton>
        </Link>
        <Link to="/changePassword">
          <ListItemButton>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Password" />
          </ListItemButton>
        </Link>
        <Link to="/SelectCountry">
          <ListItemButton>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Country" />
          </ListItemButton>
        </Link>
        {usertype == "indivisual" ? (
          <Link to="/insertCard">
            <ListItemButton>
              <ListItemIcon>
                <PaymentsIcon />
              </ListItemIcon>
              <ListItemText primary="Payment Methods" />
            </ListItemButton>
          </Link>
        ) : null}
      </List>
    </>
  );
};

const PersonalInformationTab = () => {
  const {
    userType,
    userMongoId,
    userPhone,
    userEmail,
    userRegion,
    username,
    instructorBio,
  } = useContext(AppContext);
  const [userName, setUserName] = username;
  const [user, setUser] = userType;
  const [userId, setUserId] = userMongoId;
  const [email, setEmail] = userEmail;
  const [phone, setPhone] = userPhone;
  const [region, setRegion] = userRegion;
  const [bio, setInstructorBio] = instructorBio;

  const [newPhone, setNewPhone] = useState("");
  const [newPhoneChanged, setNewPhoneChanged] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newEmailChanged, setNewEmailChanged] = useState(false);
  const [newRegion, setNewRegion] = useState("");
  const [newRegionChanged, setNewRegionChanged] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [newBioChanged, setnewBioChanged] = useState(false);

  const [formDisabled, setFormDisabled] = useState(true);

  const handleChange = (event) => {
    let value = event.target.value;
    console.log(event.target.name);
    if (event.target.name == "phone") {
      setNewPhone(value);
      setNewPhoneChanged(true);
      console.log("phone => ", value);
    } else if (event.target.name == "region") {
      setNewRegion(value);
      setNewRegionChanged(true);
      console.log("region => ", value);
    } else if (event.target.name == "email") {
      setNewEmail(value);
      setNewEmailChanged(true);
      console.log("email => ", value);
    } else if (event.target.name == "bio") {
      setnewBioChanged(true);
      setNewBio(value);
    }
  };

  const handleSubmit = () => {
    if (newPhoneChanged) {
      if (newPhone.length == 0) {
        message.error("new phone shouldnt be empty");
      } else {
        //axios
      }
    }
    if (newBioChanged) {
      if (newBio.length == 0) {
        message.error("new bio shouldnt be empty");
      } else {
        let body = {
          username: userName,
          bio: newBio,
          usertype: user,
        };
        axios
          .put(`http://localhost:2020/editBio`, body)
          .then(() => {
            message.success("bio changed successfully!!");
            setInstructorBio(newBio);
            setnewBioChanged(false);
            setNewBio("");
          })
          .catch((err) => {
            message.error("An unexpected error has occured", 5);
            console.log("error at change ", JSON.stringify(err));
          });
      }
    }
    if (newEmailChanged) {
      if (newEmail.length == 0) {
        message.error("new email shouldnt be empty");
      } else {
        let body = {
          username: userName,
          email: newEmail,
          usertype: user,
        };
        axios
          .put(`http://localhost:2020/editEmail`, body)
          .then(() => {
            message.success("email changed successfully!!");
            setEmail(newEmail);
            setNewEmailChanged(false);
            setNewEmail("");
          })
          .catch((err) => {
            message.error("An unexpected error has occured", 5);
            console.log("error at change ", JSON.stringify(err));
          });
      }
    }
    if (newRegionChanged) {
      if (newRegion.length == 0) {
        message.error("new country shouldnt be empty");
      } else {
        const requestBody = {
          username: userName,
          country: newRegion,
          usertype: user,
        };
        axios
          .patch("http://localhost:2020/country", requestBody)
          .then(() => {
            message.success("Country " + newRegion + " has been changed", 5);
            setRegion(newRegion);
            setNewRegionChanged(false);
            setNewRegion("");
          })
          .catch((error) => {
            console.log("erorr ", error.message);
            message.error(
              "Unexpected Error occured" + error.response.message,
              5
            );
          });
      }
    }
    setFormDisabled(true);
  };

  return (
    <Tabs
      tabPosition="left"
      defaultActiveKey="1"
      items={[
        {
          label: `Basic Information`,
          key: "1",
          children: (
            <div
              style={{
                boxSizing: "border-box",
                paddingLeft: "10%",
              }}
            >
              <h1>Basic Information</h1>
              <Button
                icon={<EditOutlined />}
                onClick={() => setFormDisabled(!formDisabled)}
              ></Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  height: "80vh",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5%",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "40%",
                  }}
                >
                  <Image
                    width="50%"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "100%",
                      gap: "20%",
                    }}
                  >
                    <h1>{userName}</h1>
                    {user == "instructor" ? (
                      <TextField
                        style={{
                          width: "60%",
                          height: "50%",
                        }}
                        required
                        disabled={formDisabled}
                        id="outlined-textarea"
                        label="Bio"
                        name="bio"
                        defaultValue={bio}
                        onChange={handleChange}
                      />
                    ) : null}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",

                    width: "40%",
                  }}
                >
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label="Username"
                    name="username"
                    defaultValue={userName}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    disabled={formDisabled}
                    id="outlined-textarea"
                    label="Email"
                    name="email"
                    defaultValue={email}
                    onChange={handleChange}
                  />
                  <TextField
                    required
                    disabled={formDisabled}
                    id="outlined-textarea"
                    label="Phone number"
                    name="phone"
                    defaultValue={phone}
                    onChange={handleChange}
                  />

                  <TextField
                    required
                    disabled={formDisabled}
                    id="outlined-textarea"
                    name="region"
                    label="Country"
                    defaultValue={region}
                    onChange={handleChange}
                  />
                  {formDisabled == false ? (
                    <Button
                      type="primary"
                      style={{ width: "40%" }}
                      onClick={handleSubmit}
                    >
                      Save Changes
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          ),
        },
        {
          label: `Security`,
          key: "2",
          children: <ChangePasswordPageWrapper />,
        },
        user == "individual"
          ? {
              label: `Payment Methods`,
              key: "3",
              children: <InsertCreditCardInfoWrapper />,
            }
          : null,
      ]}
    />
  );
};

export { SettingsPageSider, PersonalInformationTab };
