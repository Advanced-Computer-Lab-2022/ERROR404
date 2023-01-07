// External variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");

//.env variables
require("dotenv").config();
const { Mongo_URI, Backend_Port } = process.env;
const port = Backend_Port;
const MongoURI = Mongo_URI;
const {
  getUser,
  search,
  createCorporateTrainee,
  createAdmin,
  coursePrice,
  createCourse,
  instructorSearch,
  viewCourses,
  getMyCoursesTrainee,
  createInstructor,
  createIndividualTrainee,
  chooseCountry,
  instViewCourses,
  view,
  filterCourses,
  updateViews,
  rateAndReviewInstructor,
  rateAndReviewCourse,
  viewRatingAndReviews,
  uploadPreviewVideoForCourse,
  editEmail,
  editBio,
  topCourses,
  changePassword,
  viewReviewAndRatingForInstructor,
  insertVideoLinkToCourse,
  addCreditCardInfo,
  getAllReports,
  salary,
  createQuestions,
  createQuiz,
  addCourseToStudent,
  getCourseById,
  submitDiscount,
  getmyGrade,
  createReport,
  updateReportStatus,
  filterByPriceOrRate,
  createCourseChat,
  getCourseChats,
  approveInstructor,
  updateCourseProgress,
  createCorporateRequest,
  getAllRequests,
  updateRequestStatus,
  instructorFilterCourses,
  traineebalance,
  getAllSubtitles,
  login,
  filterByCategory,
  getCategory,
  requestRefund,
  deleteCourse,
  getAllRefundRequests,
  updateRefundRequestStatus,
  payfromBalance,
  setDiscountForAllCourses,
  getRefundRequestsByCourseIdUsername,
  putGrades,
  addToIndivisualTraineeWallet,
  instructorFilterByCategory,
  instructorfilterByPriceOrRate,
  addAverageMark,
  removeReview,
} = require("./routes/routes");

//App variables
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// configurations
// Mongo DB
mongoose
  .connect(MongoURI)
  .then(() => {
    console.log("MongoDB is now connected!");
    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.status(200).send("Server is Running");
});

app.get("/getAllReports", getAllReports);
app.get("/getUser/:username/:userType", getUser);
app.get("/getTopCourses", topCourses);
app.get("/getmygrade/:id/:usertype", getmyGrade);
app.get("/search/:key", search);
app.get("/coursePrice", coursePrice);
app.get("/searchmycourses/:user/:key", instructorSearch);
app.get("/getMyCourses/:usertype/:username", getMyCoursesTrainee);
app.get("/viewCourses", viewCourses);
app.get("/getCourse/:id", getCourseById);
app.get("/instViewCourses/:userId", instViewCourses);
app.get("/filter/:filterType/:key", filterCourses);
app.get("/viewReviewAndRating/:username", viewReviewAndRatingForInstructor);
app.get("/viewRatingAndReviews/:username", viewRatingAndReviews);
//app.get("/getChats/:username/:usertype", getChats);
app.get("/getCourseChats/:id", getCourseChats);
app.get("/getAllRequests", getAllRequests);
//app.get("/getExam/:id", getExamById);
app.get("/filterByPriceOrRate/:type/:min/:max", filterByPriceOrRate);
app.get("/getMyBalance/:username", traineebalance);
app.get("/getAllSubtitles/:id", getAllSubtitles);
app.get(
  "/instructorfilterByPriceOrRate/:username/:type/:min/:max",
  instructorfilterByPriceOrRate
);
app.get(
  "/instructorFilterCourses/:username/:filterType/:key",
  instructorFilterCourses
);
app.get(
  "/instructorFilterByCategory/:username/:category",
  instructorFilterByCategory
);
//app.get("/getChats/:username/:usertype", getChats);
app.get("/filterByCategory/:category", filterByCategory);
app.get("/getCategory", getCategory);
app.get("/login/:username", login);
app.get("/getAllRefundRequests", getAllRefundRequests);
app.get(
  "/getRefundRequestsByCourseIdUsername/:username/:courseId",
  getRefundRequestsByCourseIdUsername
);

app.post("/createCorporateTrainee", createCorporateTrainee);
app.post("/createAdmin", createAdmin);
app.post("/createCourse", createCourse);
app.post("/createInstructor", createInstructor);
app.post("/createIndividualTrainee", createIndividualTrainee);
app.post("/createQuestions", createQuestions);
app.post("/createQuiz", createQuiz);
app.post("/createReport", createReport);
app.post("/createCorporateRequest", createCorporateRequest);
app.post("/requestRefund", requestRefund);

app.patch("/country", chooseCountry);
app.patch("/rateAndReviewInstructor", rateAndReviewInstructor);
app.patch("/rateAndReviewCourse", rateAndReviewCourse);
app.patch("/insertVideoLinkToCourse", insertVideoLinkToCourse);
app.patch("/addCreditCardInfo", addCreditCardInfo);
app.patch("/createCourseChat", createCourseChat);
app.patch("/updateCourseProgress", updateCourseProgress);

app.put("/uploadPreviewVideoForCourse", uploadPreviewVideoForCourse);
app.put("/editEmail", editEmail);
app.put("/editBio", editBio);
app.put("/changePassword", changePassword);
app.put("/salary", salary);
app.put("/addCourseToStudent", addCourseToStudent);
app.put("/submitDiscount", submitDiscount);
app.put("/updateReportStatus", updateReportStatus);
app.put("/updateViews", updateViews);
app.put("/approveInstructor", approveInstructor);
app.put("/updateRequestStatus", updateRequestStatus);
app.put("/deleteCourse", deleteCourse);
app.put("/updateRefundRequestStatus", updateRefundRequestStatus);
app.put("/payfromBalance", payfromBalance);
app.put("/setDiscountForAllCourses", setDiscountForAllCourses);
app.put("/putGrades", putGrades);
app.put("/addToIndivisualTraineeWallet", addToIndivisualTraineeWallet);
app.put("/addAverageMark", addAverageMark);

app.put("/removeReview", removeReview);
