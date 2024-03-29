import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/antd.css";
import GetCoursesByPrice from "./components/getCourses";
import GetAllInstructorCoursesWrapper from "./components/instructorComponents/getAllInstructorCourses";
import ViewAllCoursesPriceWrapper from "./components/viewallCoursesPrice";
import WrapperCreateCourses from "./components/createCourse";
import SelectCountryWrapper from "./components/selectCountry";
import ViewAllCoursesWrapper from "./components/viewAllCourses";
import InstViewCoursesWrapper from "./components/instViewCourses";
import HomePageWrapper from "./components/homePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChangePasswordPageWrapper from "./components/changePassword";
import ChangingPaswword from "./components/changePasswordAfterEmail";
import { AppContext } from "./AppContext";
import UploadLink from "./components/instructorComponents/uploudYoutubeVid";
import CoreCirWrapper from "./components/coreCirriculum";
import InstructorReviewWrapper from "./components/instructorComponents/instructorReviews";
import InstructorBalanceWrapper from "./components/instructorComponents/instructorBalance";
import InstructorSettingsWrapper from "./components/instructorComponents/instructorSettings";
import InstructorMainDashboard from "./components/instructorComponents/instructorMainDashboard";
import InsertCreditCardInfoWrapper from "./components/traineeComponents/insertCreditCardinfo";
import SettingsPageWrapper from "./pages/settingsPage";
import InstructorViewAllTitlesWrapper from "./components/instructorComponents/instructorCourses";
import TraineeMainDashboard from "./components/traineeComponents/traineeMainDashboard";
import {
  ChangeBio,
  ChangeEmail,
  UserChangeEmail,
} from "./components/instructorComponents/instructorChangeSetting";
import ReviewComponent from "./components/StudentrateAndReviewInstructor";
import LoadSearchedCourses from "./components/loadSearchedCoursesComp";
import CreateExamWrapper from "./components/createExam";
import SolveExamWrapper from "./components/solveExam";
import PreviewCourseWrapper from "./components/courseComponents/previewCourse";
import CourseReview from "./components/courseComponents/courseReview";
import UserCourses from "./components/courseComponents/userClassRoom";
import ReviewCourseComponent from "./components/rateAndReviewCourse";
import SubmitDiscount from "./components/instructorComponents/instructorSubmitDiscount";
import InstructorCourseReview from "./components/instructorComponents/instructorCourseReviews";
import ViewGradeWrapper from "./components/traineeComponents/viewGrade";
import AcceptAgreWrapper from "./components/instructorComponents/AcceptAgreement";
import Filter from "./components/filter";
import LoginPageWrapper from "./components/loginComponents/mainHome";
import AdminReportsWrapper from "./components/adminComponents/adminReports";
import AdminMainDashboardWrapper from "./components/adminComponents/adminMainDashboard";
import CreateUserWrapper from "./components/adminComponents/adminCreateUser";
import NoPage from "./components/NoPage";
import MyPrograms from "./components/traineeComponents/myPrograms";
import WrapperLessonPage from "./components/lessonPage";
import WrapperSignUp from "./components/loginComponents/signUp";
import TraineeSettingsWrapper from "./components/traineeComponents/traineeSettings";
import ReportaProblemWrapper from "./components/reportProblem";
import FooterWrapper from "./components/footer";
import CertificateWrapper from "./components/certificate";
import ProgressWrapper from "./components/courseComponents/courseProgress";
import AboutWrapper from "./components/about";
import Terms from "./components/termsAndConditions";
import CourseConversation from "./components/courseComponents/courseConversation";
import TraineeReportsWrapper from "./components/traineeComponents/reportsFollowUp";
import AdminFilterReports from "./components/adminComponents/adminFilterReports";
import AdminRequestsWrapper from "./components/adminComponents/adminViewCourseRequests";
import TakeNotesWrapper from "./components/takeNotes";
import CreateRequestWrapper from "./components/corporateCreateRequest";
import Subtitles from "./components/subtitles";
import InstructorFilteredCourses from "./components/instructorComponents/instructorFilteredCourses";
import CourseSubtitles from "./components/courseComponents/courseSyllabes";
import CourseSubtitleViewWrapper, {
  CoursePreview,
} from "./components/courseComponents/courseSubtitlesView";
import RefundRequestsWrapper from "./components/adminComponents/adminRequestRefunds";
import ForgotPasswordPageWrapper from "./components/forgotPassword";

import AdminViewCourseComponent from "./components/adminComponents/adminViewCourses";
import PayForCourse from "./components/traineeComponents/payForCourse";
import TakeQuiz from "./components/traineeComponents/takeQuiz";
import TraineeBalanceWrapper from "./components/traineeComponents/traineeBalance";
import InstructorCourse from "./components/instructorComponents/instructorCourseReviews";
export default function MainApp() {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userMongoId, setUserMongoId] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const [region, setRegion] = useState("");
  const [instructorBio, setInstructorBio] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [traineeCourses, setTraineeCourses] = useState([]);

  const values = {
    username: [username, setUsername],
    userEmail: [userEmail, setUserEmail],
    userType: [userType, setUserType],
    userPassword: [userPassword, setUserPassword],
    userMongoId: [userMongoId, setUserMongoId],
    userPhone: [userPhoneNum, setUserPhoneNum],
    userRegion: [region, setRegion],
    instructorBio: [instructorBio, setInstructorBio],
    loggedIn: [isLoggedIn, setIsLoggedIn],
    traineeCourses: [traineeCourses, setTraineeCourses],
  };

  return (
    <AppContext.Provider value={values}>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePageWrapper />} />
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
          <Route path="/trainee/balance" element={<TraineeBalanceWrapper />} />
          <Route
            path="/instructorDashBoard/settings"
            element={<InstructorSettingsWrapper />}
          />
          <Route
            path="/instructorDashBoard/allMyCourses"
            element={<InstructorViewAllTitlesWrapper />}
          />
          <Route
            path="/instructorDashBoard/createCourse"
            element={<WrapperCreateCourses />}
          />
          <Route path="/createQuiz" element={<CreateExamWrapper />} />
          <Route
            path="/instructorDashBoard/editEmail"
            element={<ChangeEmail />}
          />
          <Route path="/trainee/takequiz" element={<TakeQuiz />} />

          <Route exact path="/" element={<HomePageWrapper />} />
          <Route path="/courses" element={<GetCoursesByPrice />} />
          <Route path="/adminCreateAdmin" element={<CreateUserWrapper />} />
          <Route path="/createCourse" element={<WrapperCreateCourses />} />
          <Route path="/aboutTeam" element={<AboutWrapper />} />
          <Route
            path="/getAllInstructorCourses"
            element={<GetAllInstructorCoursesWrapper />}
          />
          <Route
            path="/viewallCoursesPrice"
            element={<ViewAllCoursesPriceWrapper />}
          />
          <Route path="/SelectCountry" element={<SelectCountryWrapper />} />
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

          <Route path="/user/editEmail" element={<UserChangeEmail />} />
          <Route path="/instructorDashBoard/editBio" element={<ChangeBio />} />
          <Route
            path="/rateAndReviewInstructor"
            element={<ReviewComponent />}
          />
          <Route
            path="/rateAndReviewCourse"
            element={<ReviewCourseComponent />}
          />
          <Route path="/searchedItems" element={<LoadSearchedCourses />} />
          <Route path="/course/about" element={<PreviewCourseWrapper />} />
          <Route path="/course/conversation" element={<CourseConversation />} />
          <Route path="/course/reviews" element={<InstructorCourse />} />
          <Route path="/course/syllabus" element={<CourseSubtitles />} />
          <Route path="/SolveExam" element={<SolveExamWrapper />} />
          <Route path="/user/myPrograms" element={<MyPrograms />} />

          <Route path="/user/classroom" element={<UserCourses />} />
          <Route path="/lessonPage" element={<WrapperLessonPage />} />
          <Route
            path="/instructorDashBoard/addDiscount"
            element={<SubmitDiscount />}
          />

          <Route path="/Acceptagreement" element={<AcceptAgreWrapper />} />

          <Route
            path="/InstructorFilter"
            element={<InstructorFilteredCourses />}
          />
          <Route path="/user/reports" element={<TraineeReportsWrapper />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/ReportaProblem" element={<ReportaProblemWrapper />} />
          <Route path="/filter" element={<Filter />} />
          <Route
            path="/instructorFilter"
            element={<InstructorFilteredCourses />}
          />
          <Route path="/footer" element={<FooterWrapper />} />
          <Route path="/certificate" element={<CertificateWrapper />} />
          <Route path="/login" element={<LoginPageWrapper />} />
          <Route path="/About" element={<AboutWrapper />} />
          <Route path="/Progress" element={<ProgressWrapper />} />
          <Route
            path="/adminDashboard"
            element={<AdminMainDashboardWrapper />}
          />
          <Route
            path="/adminDashboard/reports"
            element={<AdminReportsWrapper />}
          />

          <Route
            path="/adminDashboard/requests"
            element={<AdminRequestsWrapper />}
          />
          <Route
            path="/AdminViewCourseComponent"
            element={<AdminViewCourseComponent />}
          />
          <Route path="*" element={<NoPage />} />
          <Route path="/signUp" element={<WrapperSignUp />} />
          <Route path="/traineeDashBoard" element={<TraineeMainDashboard />} />
          <Route
            path="/traineeDashboard/viewGrade"
            element={<ViewGradeWrapper />}
          />
          <Route
            path="/traineeDashboard/settings"
            element={<TraineeSettingsWrapper />}
          />
          <Route path="/subtitles" element={<Subtitles />} />
          <Route path="/TakeNotes" element={<TakeNotesWrapper />} />
          <Route path="/AdminFilterReports" element={<AdminFilterReports />} />
          <Route
            path="/adminDashboard/refundrequests"
            element={<RefundRequestsWrapper />}
          />
          <Route
            path="/corporateCreateRequest"
            element={<CreateRequestWrapper />}
          />
          <Route path="/trainee/course" element={<CoursePreview />} />
          <Route
            path="/forgotpassword"
            element={<ForgotPasswordPageWrapper />}
          />

          <Route
            path="/trainee/course/subtitle"
            element={<CourseSubtitleViewWrapper />}
          />
          <Route path="/pay" element={<PayForCourse />} />
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
