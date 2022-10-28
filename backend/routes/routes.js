const user = require("../models/User");
const course = require("../models/Courses");
//Methods
const createUser = (req, res) => {
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
};
// create course
const createCourse = async (req, res) => {
  console.log(req.body);
  const instructor = user.find({
    username: req.body.username,
    role: "Instructor",
  });
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
      summary: req.body.summary,
    };
    await course.create(courseDetails, function (err, small) {
      console.log("hello ", small);
      const courseId = small._id;
      if (err) {
        console.log("error with course ", err.message);
      } else {
        console.log("done course");
        user.updateOne(
          { username: instructorUsername, role: "Instructor" },
          { instructorAttributes: { courses: courseId } },
          function (err, small) {
            if (err) {
              console.log("error with instructor ", err.message);
            } else {
              res.status(200).send("all good!!!");
            }
          }
        );
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
  const fName = reqBody.firstName;
  const lName = reqBody.lastName;
  const email = reqBody.email;
  const role = reqBody.role;
  const password = reqBody.password;
  const username = reqBody.userName;
  if (
    fName == null ||
    lName == null ||
    email == null ||
    role == null ||
    password == null ||
    username == null
  ) {
    return res.status(400).send("Required fields are not submitted");
  }
  if (req.body.userRole != "admin") {
    return res.status(401).send("User Not authorized for this action");
  }
  if (role != "admin") {
    return res.status(401).send("User Not authorized for this action");
  }
  const adminData = {
    firstName: fName,
    lastName: lName,
    age: req.body.age == undefined ? "" : req.body.age,
    gender: req.body.gender == undefined ? "" : req.body.gender,
    password: password,
    userName: username,
    email: email,
    role: "admin",
  };

  adminData.create(adminData, function (err, small) {
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
  const data = await course.find(
    {
      $and: [
        { instructor: req.params.user },
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

//admin creates cooprate

module.exports = {
  search,
  createUser,
  createAdmin,
  coursePrice,
  createCourse,
  instSearch,
};
