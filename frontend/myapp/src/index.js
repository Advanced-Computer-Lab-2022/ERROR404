import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import GetCoursesByPrice from "./components/getCourses";
import GetAllInstructorCoursesWrapper from "./components/instructorComponents/getAllInstructorCourses";
import ViewAllCoursesPriceWrapper from "./components/viewallCoursesPrice";
import CreateAdminWrapper from "./components/createAdmin";
import CreateInstructorWrapper from "./components/createInst";
import WrapperCreateCourses from "./components/createCourse";
import SelectCountryWrapper from "./components/selectCountry";
import CreateCorporateWrapper from "./components/createCorp";
import ViewAllCoursesWrapper from "./components/viewAllCourses";
import InstViewCoursesWrapper from "./components/instViewCourses";
import HomePageWrapper from "./components/homePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ChangePasswordPageWrapper from "./components/changePassword";
import ChangingPaswword from "./components/changePasswordAfterEmail";
import { AppContext } from "./AppContext";
import UploadLink from "./components/instructorComponents/uploudYoutubeVid";
import CoursePage from "./components/CoursePage";
import CoreCirWrapper from "./components/coreCirriculum";
import InstructorDashboard from "./pages/InstructorDashboard";
import ReviewNavigation from "./components/reviewComponents";
import InstructorReviewWrapper from "./components/instructorComponents/instructorReviews";
import InstructorBalanceWrapper from "./components/instructorComponents/instructorBalance";
import InstructorSettingsWrapper from "./components/instructorComponents/instructorSettings";
import InstructorMainDashboard from "./components/instructorComponents/instructorMainDashboard";
import InsertCreditCardInfoWrapper from "./components/insertCreditCardinfo";
import SettingsPageWrapper from "./pages/settingsPage";

export default function MainApp() {
  const [userName, setUserName] = useState("alighieth");
  const [userEmail, setUserEmail] = useState("alighieth2709@gmail.com");
  const [userType, setUserType] = useState("admin");
  const [userPassword, setUserPassword] = useState("123");
  const [userMongoId, setUserMongoId] = useState("635da1ab0d1a4a14753e1aa0");

  const values = {
    userName: [userName, setUserName],
    userEmail: [userEmail, setUserEmail],
    userType: [userType, setUserType],
    userPassword: [userPassword, setUserPassword],
    userMongoId: [userMongoId, setUserMongoId],
  };

  return (
    <AppContext.Provider value={values}>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePageWrapper />} />
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
          <Route
            path="/changePassword"
            element={<ChangePasswordPageWrapper />}
          />
          <Route path="/changingPasswordEmail" element={<ChangingPaswword />} />
          <Route path="/submitlink" element={<UploadLink />} />
          <Route path="/coursePage" element={<CoreCirWrapper />} />
          <Route path="/settings" element={<SettingsPageWrapper />} />
          <Route path="/insertCard" element={<InsertCreditCardInfoWrapper />} />
          <Route
            path="/instructorDashBoard"
            element={<InstructorMainDashboard />}
          />
          <Route
            path="/instructorDashBoard/reviews"
            element={<InstructorReviewWrapper />}
          />
          <Route
            path="/instructorDashBoard/balance"
            element={<InstructorBalanceWrapper />}
          />
          <Route
            path="/instructorDashBoard/settings"
            element={<InstructorSettingsWrapper />}
          />
        </Routes>
      </Router>
    </AppContext.Provider>
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
