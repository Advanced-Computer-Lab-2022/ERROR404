// External variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cors = require("cors");
//DB connections to be put in .env file
const MongoURI = "mongodb+srv://admin:admin@cluster0.vm6qaas.mongodb.net/test";
const {
  getUser,
  search,
  createCorporateTrainee,
  createAdmin,
  coursePrice,
  createCourse,
  instructorSearch,
  viewCourses,
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
  // noOfSubscribers,
  //reviewInstructor,
  salary,
  createQuestions,
  createQuiz,
  addCourseToStudent,
  getCourseById,
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

app.get("/getUser/:userId/:userType", getUser);
app.get("/getTopCourses", topCourses);
app.get("/search/:key", search);
app.get("/coursePrice", coursePrice);
app.get("/searchmycourses/:user/:key", instructorSearch);
app.get("/viewCourses", viewCourses);
app.get("/getCourse/:id", getCourseById);
app.post("/createCorporateTrainee", createCorporateTrainee);
app.post("/createAdmin", createAdmin);
app.post("/createCourse", createCourse);
app.post("/createInstructor", createInstructor);
app.post("/createIndividualTrainee", createIndividualTrainee);
app.patch("/country", chooseCountry);
app.get("/instViewCourses/:userId", instViewCourses);
app.get("/filter/:filterType/:key", filterCourses);
app.put("/updateViews", updateViews);
app.patch("/rateAndReviewInstructor", rateAndReviewInstructor);
app.patch("/rateAndReviewCourse", rateAndReviewCourse);
app.get("/viewRatingAndReviews/:username", viewRatingAndReviews);
app.put("/uploadPreviewVideoForCourse", uploadPreviewVideoForCourse);
app.put("/editEmail", editEmail);
app.put("/editBio", editBio);
app.put("/changePassword", changePassword);
app.get("/viewReviewAndRating/:username", viewReviewAndRatingForInstructor);
app.patch("/insertVideoLinkToCourse", insertVideoLinkToCourse);
app.patch("/addCreditCardInfo", addCreditCardInfo);
//app.put("/noOfSubscribers", noOfSubscribers);
//app.put("/reviewInstructor", reviewInstructor);
app.put("/salary", salary);
app.post("/createQuestions", createQuestions);
app.post("/createQuiz", createQuiz);
app.put("/addCourseToStudent", addCourseToStudent);
