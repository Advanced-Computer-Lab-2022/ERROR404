import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import GetCoursesByPrice from "./components/getCourses";
import GetAllInstructorCoursesWrapper from "./components/getAllInstructorCourses";
import ViewAllCoursesPriceWrapper from "./components/viewallCoursesPrice";
import CreateAdminWrapper from "./components/createAdmin";
import CreateInstructorWrapper from "./components/createInst";
import WrapperCreateCourses from "./components/createCourse";
import SelectCountryWrapper from "./components/selectCountry1";
import CreateCorporateWrapper from "./components/createCorp";
import ViewAllCoursesWrapper from "./components/viewAllCourses";
import InstViewCoursesWrapper from "./components/instViewCourses";
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
        <Route path="/createCourse" element={<WrapperCreateCourses />} />
        <Route
          path="/getAllInstructorCourses"
          element={<GetAllInstructorCoursesWrapper />}
        />
        <Route
          path="/viewallCoursesPrice"
          element={<ViewAllCoursesPriceWrapper />}
        />
        <Route path="/createCorp" element={<CreateCorporateWrapper />} />
        <Route path="/SelectCountry1" element={<SelectCountryWrapper />} />
        <Route path="/viewAllCourses" element={<ViewAllCoursesWrapper />} />
        <Route path="/instViewCourses" element={<InstViewCoursesWrapper />} />
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
