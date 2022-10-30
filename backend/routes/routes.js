const user = require("../models/User");
const course = require("../models/Courses");
const admin = require("../models/Admin");
const Admin = require("../models/Admin");
//Methods
const createUser = (req, res) => {
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
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
};

const createCourse = async (req, res) => {
  const instructor = user.find({ username: req.body.username });
  const instructorUsername = req.body.username;
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
    res.status(400).send("Summary should be atleast 5 words long");
  } else {
    const courseDetails = {
      title: req.body.title == null ? "" : req.body.title,
      subtitles: req.body.subtitle == null ? "" : req.body.subtitle,
      subject: req.body.subject == null ? "" : req.body.subject,
      price: req.body.price == null ? 0 : req.body.price,
      instructor: instructorUsername,
      totalHours: req.body.totalHours == null ? "" : req.body.totalHours,
      image: req.body.image == null ? "" : req.body.image,
      video: req.body.video == null ? "" : req.body.video,
      prerequisite: req.body.prerequisite == null ? "" : req.body.prerequisite,
      summary: req.body.summary == null ? "" : req.body.summary,
    };

    console.log(courseDetails);

    await course.create(courseDetails, (err, small) => {
      console.log("hello ", small);
      if (err) {
        console.log("error with course ", err.message);
      } else {
        res.status(200).json(small);
      }
    });
  }
};

//view the price of each course
const coursePrice = async (req, res) => {
  console.log(req.params);
  const c = await course.find({}, { title: 1, price: 1, _id: 0 });
  if (c == null) {
    res.status(404).send("no course found");
  } else {
    res.json(c);
  }
};
//Admin creation
const createAdmin = (req, res) => {
  const reqBody = req.body;
  // const fName = reqBody.firstname;
  // const lName = reqBody.lastname;
  // const email = reqBody.email;
  // const role = "Admin";
  const password = reqBody.password;
  const username = reqBody.username;
  if (
    // fName == null ||
    // lName == null ||
    // email == null ||
    password == null ||
    username == null
  ) {
    return res.status(400).send("Required fields are not submitted");
  }
  // if (req.body.userRole != "admin") {
  //   return res.status(401).send("User Not authorized for this action");
  // }
  // if (role != "admin") {
  //   return res.status(401).send("User Not authorized for this action");
  // }
  const adminData = {
    // firstname: fName,
    // lastname: lName,
    // age: req.body.age == undefined ? "" : req.body.age,
    // gender: req.body.gender == undefined ? "" : req.body.gender,
    password: password,
    username: username,
    //email: email,
    // role: "admin",
  };

  Admin.create(adminData, function (err, small) {
    if (err) {
      res.status(500).send("Database not responding  => " + err.message);
      return;
    }
    // this means record created
    res.status(200).send("admin " + username + " created Successfully");
  });
};
//filter the courses given by him/her based on a subject or price
const search = async (req, res) => {
  const query = isNaN(req.params.key)
    ? {
        $or: [
          { title: { $regex: req.params.key } },
          { subject: { $regex: req.params.key } },
          { instructor: { $regex: req.params.key } },
        ],
      }
    : { $or: [{ price: req.params.key }, { rating: req.params.key }] };
  await course
    .find(query, function (err, results) {
      if (err) {
        res.status(500).send("Server not responding " + err.message);
      } else if (results.length == 0) {
        res.status(404).send("no result found");
      } else {
        res.status(200).json(results);
      }
    })
    .clone();
};
//instructor searches for his courses validation based on user
const instSearch = async (req, res) => {
  const data = await course
    .find(
      {
        $and: [
          { username: req.params.user },
          {
            $or: [
              { title: { $regex: req.params.key } },
              { subject: { $regex: req.params.key } },
            ],
          },
        ],
      },
      function (err, data) {
        if (err) {
          res.status(500).send("Server Error");
        } else if (data.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json("no data found");
        }
      }
    )
    .clone();
};

//admin creates instructor
const createInstr = async (req, res) => {
  const currentUser = req.body.currentUser;
  const username = req.body.username;
  const password = req.body.password;
  const instData = {
    username: username,
    password: password,
    role: "Instructor",
  };
  if (username == "" || password == "") {
    res.status(400).json("Enter a valid data ");
  } else {
    console.log(currentUser);
    await admin
      .find({ username: [currentUser] }, {}, (err, result) => {
        if (err) {
          res.status(500).send(err.message + "eeeee");
        } else if (result == "") {
          res.status(400).send("not an admin");
        } else {
          user.create(instData, (error, small) => {
            if (error) {
              res.status(400).send(error.message + "eeeeee");
            } else {
              res.status(200).json(result);
            }
          });
        }
      })
      .clone();
  }
};

//admin creates cooprate
const createCoop = async (req, res) => {
  const currentUser = req.body.currentUser;
  const username = req.body.username;
  const password = req.body.password;
  const coopData = {
    username: username,
    password: password,
    role: "Corporate-trainee",
  };
  if (username == null || password == null) {
    res.status(400).json("Enter a valid data ");
    return;
  }
  const x = await admin
    .find({ username: currentUser }, (err, result) => {
      if (err) {
        res.status(500).send(err.message + "eeeee");
      } else if (result == null) {
        res.status(400).send("not an admin");
      } else {
        user.create(coopData, (error, small) => {
          if (error) {
            res.status(400).send(error.message + "eeeeee");
          } else {
            res.status(200).send("user is created");
          }
        });
      }
    })
    .clone();
};

//
const viewCourses = async (req, res) => {
  const a = await course.find(
    {},
    { title: 1, totalHours: 1, rating: 1, _id: 0 }
  );
  if (a == null) {
    res.status(404).send("no courses available");
  } else {
    res.json(a);
  }
};
//choose country
const chooseCountry = async (req, res) => {
  const { username, country } = req.body;
  if (username == "" || country == "") {
    res.status(400).send("valid data required");
  } else {
    await user
      .updateOne(
        { username: username },
        { country: country },
        (error, docs) => {
          if (error) {
            res.status(400).send(error);
          } else if (docs == null) {
            res.status(404).send("error not found");
          } else {
            res.status(200).json(docs);
          }
        }
      )
      .clone();
  }
};
const view = async (req, res) => {
  const data = await user
    .find({}, {}, (err, result) => {
      if (result) {
        res.status(200).json(data);
      } else if (err) {
        res.json(err);
      }
    })
    .clone();
};
module.exports = {
  search,
  createUser,
  createAdmin,
  coursePrice,
  createCourse,
  instSearch,
  viewCourses,
  createInstr,
  createCoop,
  chooseCountry,
  view,
};
