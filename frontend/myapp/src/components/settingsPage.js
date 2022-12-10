import React, { useContext, useEffect, useState } from "react";
import App from "../App";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import { SettingTwoTone } from "@ant-design/icons";
import { Space, Image, Input, Button } from "antd";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LanguageIcon from "@mui/icons-material/Language";
import PaymentsIcon from "@mui/icons-material/Payments";
import { AppContext } from "../AppContext";

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
  return (
    <div>
      <h1>Basic Information</h1>
      <Image
        width={200}
        src="https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg"
      />
      {user == "instructor" ? (
        <TextField disabled id="outlined-disabled" label="Bio" value={bio} />
      ) : null}
      <TextField
        disabled
        id="outlined-disabled"
        label="Username"
        value={userName}
      />
      <TextField disabled id="outlined-disabled" label="Email" value={email} />
      <TextField
        disabled
        id="outlined-disabled"
        label="Phone number"
        value={phone}
      />

      <TextField
        disabled
        id="outlined-disabled"
        label="Country"
        value={region}
      />
      <Space>
        {user == "instructor" ? (
          <Link to="/instructorDashboard/editEmail">
            <Button type="primary">Change Email</Button>
          </Link>
        ) : (
          <Link to="/user/editEmail">
            <Button type="primary">Change Email</Button>
          </Link>
        )}

        <Link to="/changePassword">
          {" "}
          <Button type="primary">Change Password</Button>
        </Link>
        <Link to="/SelectCountry1">
          <Button type="primary">Change Country</Button>
        </Link>
        <Link to="/insertCard">
          <Button type="primary">Insert Credit Card</Button>
        </Link>
        {user == "instructor" ? (
          <Link to="/instructorDashboard/editBio">
            <Button type="primary">Change Bio</Button>
          </Link>
        ) : null}
      </Space>
    </div>
  );
};

export { SettingsPageSider, PersonalInformationTab };
