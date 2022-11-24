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
  createUser,
  createAdmin,
  coursePrice,
  createCourse,
  instructorSearch,
  viewCourses,
  createInstructor,
  createCorporate,
  chooseCountry,
  instViewCourses,
  view,
  filterCourses,
  updateViews,
  rateInstructor,
  rateCourse,
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
app.get("/search/:key/:max", search);
app.get("/coursePrice", coursePrice);
app.get("/searchmycourses/:user/:key", instructorSearch);
app.get("/viewCourses", viewCourses);
app.post("/createUser", createUser);
app.post("/createAdmin", createAdmin);
app.post("/createCourse", createCourse);
app.post("/createInstructor", createInstructor);
app.post("/createCorporate", createCorporate);
app.patch("/country", chooseCountry);
app.get("/instViewCourses/:user", instViewCourses);
app.get("/filter/:filterType/:key", filterCourses);
app.patch("/updateViews", updateViews);
app.patch("/rateInstructor/:username/:rate", rateInstructor);
app.patch("/rateCourse/:newRate", rateCourse);

// app.get("/view", view);
