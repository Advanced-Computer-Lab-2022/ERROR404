import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import GetCoursesByPrice from "./components/getCourses";
import CreateAdminWrapper from "./components/createAdmin";
import CreateInstructorWrapper from "./components/createInst";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

export default function MainApp() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="/courses" element={<GetCoursesByPrice />} />
        <Route path="/adminCreateAdmin" element={<CreateAdminWrapper />} />
        <Route
          path="/adminCreateInstructor"
          element={<CreateInstructorWrapper />}
        />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
