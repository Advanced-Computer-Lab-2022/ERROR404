// External variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//DB connections to be put in .env file
const MongoURI = "mongodb+srv://admin:admin@cluster0.vm6qaas.mongodb.net/test";
const user = require("./models/User");
const course = require("./models/Courses");
//App variables
const app = express();
const port = process.env.PORT || "2020";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
  res.status(200).send("Hello World");
});

//Methods
app.post("/createUser", (req, res) => {
  console.log(req.body);
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
    role: req.body.role,
    gender: req.body.gender,
  };
  user.create(userData, function (err, small) {
    if (err) {
      res.status(500).send("Database not responding  => " + err.message);
      return;
    }
    // this means record created
    res.status(200).send("user Created Successfully");
  });
});

app.post("/createCourse", (req, res) => {
  const instructor = user.find({ username: req.username });
  if (instructor == null && instructor.role == "instructor") {
    res.status(401).send("Username is not found, or unauthorized");
  } else if (
    req.title == null ||
    req.subtitle == null ||
    req.price == null ||
    req.summary == null
  ) {
    res.status(400).send("Required fields were not submitted");
  } else if (req.summary.length < 50) {
    res.status(400).send("Summary should be atleast 50 words long");
  } else {
    const courseDetails = {
      title: req.title,
      subtitle: req.subtitle,
      price: req.price,
      summary: req.summary,
    };

    user.create(courseDetails, function (err, small) {
      if (err) {
        res.status(500).send("Database not responding");
        return handleError(err);
      }
      // this means record created
      res.status(200).send("Course Created Successfully");
    });
  }
});
