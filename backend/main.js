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

// create course ~alighieth
app.post("/createCourse", async (req, res) => {
  console.log(req.body)
  const instructor = user.find({ username: req.body.username, role: "Instructor" });
  const instructorUsername = req.body.username
  if (instructor == null && instructor.role == "instructor") {
    res.status(401).send("Username is not found, or unauthorized");
  } else if (
    req.body.title == null ||
    req.body.subtitle == null ||
    req.body.price == null ||
    req.body.summary == null
  ) {
    res.status(400).send("Required fields were not submitted");
  } else if (req.body.summary.length < 5) {
    res.status(400).send("Summary should be atleast 50 words long");
  } else {
    const courseDetails = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      subject: req.body.subject,
      price: req.body.price,
      instructor: instructorUsername,
      totalHours: req.body.totalHours,
      image: req.body.image,
      video: req.body.video,
      prerequisite: req.body.prerequisite,
      summary: req.body.summary
    };
    //try
   
    await course.create(courseDetails, function (err, small) {
      console.log("hello ",small)
      const courseId  = small._id;
      if(err) {
        console.log("error with course ", err.message )
      } else {
        console.log("done cousrse")
        user.updateOne(
          { username: instructorUsername, role: "Instructor" },
          { instructorAttributes: {courses:  courseId} }, 
          function (err, small) {
            if(err) {
            console.log("error with instructor ", err.message ) }
            else {
              res.status(200).send("all good!!!");
            }
          }
        );
      }
    })             
  }
});

//view the price of each course 
app.get('/coursePrice', async (req,res)=>{
  console.log(req.params);
  const c = await course.find({},{title:1 ,price:1,_id:0 });
  if(c==null){
    res.status(404).send('no course found');
  }
  else{res.json(c);}
})

//filter the courses based on price 

app.get("/filter/:price", async (req, res) => {
  if(req.params.price < 0){
    res.status(400).send("Price should not be a negaitve number")
  }else{
  const courseData = await course.find({price:req.params.price},{_id:0})
  if(!courseData.length){
    res.status(500).send("No courses found")
  }
  res.status(200).json(courseData);
 }
});

//filter the courses given by him/her based on a subject or price

app.get("/search/:key", async (req, res) => {
  const query = (isNaN(req.params.key)) ? {subject: { $regex: req.params.key }} : {price: req.params.key};
  await course
    .find(
      query,
      function (err, results) {
        if (err) {
          res.status(500).json("Server not responding "+ err.message);
        }
        else if (results.length == 0) {
          res.status(404).json("no result found");
        } else {
          res.status(200).json(results);
        }
      }
    )
    .clone();
});

