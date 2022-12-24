// External variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
//DB connections to be put in .env file
const MongoURI = "mongodb+srv://admin:admin@cluster0.vm6qaas.mongodb.net/test";
// const stripe = require ("stripe")(
//   "sk_test_51MItYHEGgskyidzzbKBojcag9DhVxeE6ejqQcGGMFJZvEKEJYqbMjA2MKFZAqeaOrGtbm6dlfogqOGcKcb1F3J73003K1qMk3b"
//   );
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
  // noOfSubscribers,
  //reviewInstructor,
  salary,
  createQuestions,
  createQuiz,
  addCourseToStudent,
  getCourseById,
  submitDiscount,
  getmyGrade,
  createReport,
  updateReportStatus,
  filterByPrice,
  getChats,
  createCourseChat,
  getCourseChats,
  approveInstructor,
  updateCourseProgress,
  createCorporateRequest,
  getAllRequests,
  updateRequestStatus,
  getExamById,
  createCorporateRequest,
  getAllRequests,
  updateRequestStatus,
} = require("./routes/routes");

//App variables
const app = express();
const port = process.env.PORT || "2020";
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
app.get("/filterByPrice/:min/:max", filterByPrice);
app.get("/getChats/:username/:usertype", getChats);
app.get("/getCourseChats/:id", getCourseChats);
app.get("/getAllRequests", getAllRequests);
app.get("/getExam/:id", getExamById);
app.get("/getAllRequests", getAllRequests);

app.post("/createCorporateTrainee", createCorporateTrainee);
app.post("/createAdmin", createAdmin);
app.post("/createCourse", createCourse);
app.post("/createInstructor", createInstructor);
app.post("/createIndividualTrainee", createIndividualTrainee);
app.post("/createQuestions", createQuestions);
app.post("/createQuiz", createQuiz);
app.post("/createReport", createReport);
app.post("/createCorporateRequest", createCorporateRequest);

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
//app.put("/noOfSubscribers", noOfSubscribers);
app.put("/salary", salary);
app.put("/addCourseToStudent", addCourseToStudent);
app.put("/submitDiscount", submitDiscount);
app.put("/updateReportStatus", updateReportStatus);
app.put("/updateViews", updateViews);
app.get("/filterByPrice/:min/:max", filterByPrice);
app.get("/getChats/:username/:usertype", getChats);
app.put("/approveInstructor", approveInstructor);
app.put("/updateRequestStatus", updateRequestStatus);
app.put("/updateRequestStatus", updateRequestStatus);
