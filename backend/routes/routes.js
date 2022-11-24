const user = require("../models/User");
const course = require("../models/Courses");
const admin = require("../models/Admin");
const Instructor = require("../models/instructor");
const individualTrainee = require("../models/IndividualTrainee");
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
  const instructorUsername = req.body.username;
  const instructor = Instructor.find({ username: req.body.username });
  if (instructor == null && instructor.role != "instructor") {
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
      rating: 5.0,
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

  admin.create(adminData, function (err, small) {
    if (err) {
      res.status(500).send("Database not responding  => " + err.message);
      console.log(err.message);
      return;
    }
    // this means record created
    res.status(200).send("admin " + username + " created Successfully");
  });
};
//search the courses given by him/her based on a subject or price
const search = async (req, res) => {
  let query = {};
  if (req.params.key.valueOf().toLowerCase() == "free") {
    query = {
      price: 0,
    };
  } else {
    query = isNaN(req.params.key)
      ? {
          $or: [
            { title: { $regex: req.params.key } },
            { subject: { $regex: req.params.key } },
            { instructor: { $regex: req.params.key } },
          ],
        }
      : {
          $or: [
            {
              $and: [
                { price: { $gte: parseInt(req.params.key) } },
                { price: { $lte: parseInt(req.params.max) } },
              ],
            },
            { rating: req.params.key },
          ],
        };
  }
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
const instructorSearch = async (req, res) => {
  let query = {};
  if (req.params.key.valueOf().toLowerCase() == "free") {
    query = {
      $and: [{ instructor: req.params.user }, { price: 0 }],
    };
  } else {
    query = isNaN(req.params.key)
      ? {
          $and: [
            { instructor: req.params.user },
            {
              $or: [
                { title: { $regex: req.params.key } },
                { subject: { $regex: req.params.key } },
              ],
            },
          ],
        }
      : {
          $and: [{ instructor: req.params.user }, { price: req.params.key }],
        };
  }

  await course
    .find(query, (err, data) => {
      if (err) {
        res.status(500).send("Server Error");
      } else if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).json("no data found");
      }
    })
    .clone();
};

//admin creates instructor
const createInstructor = async (req, res) => {
  const currentUser = req.body.currentUser;
  const username = req.body.username;
  const password = req.body.password;
  const instData = {
    username: username,
    password: password,
    country: req.body.country == null ? "" : req.body.country,
  };
  if (username == "" || password == "") {
    res.status(400).json("Enter a valid data ");
  } else {
    console.log(currentUser);
    await admin
      .find({ username: [currentUser] }, {}, (err, result) => {
        if (err) {
          res.status(500).send(err.message);
        } else if (result == "") {
          res.status(400).send("not an admin");
        } else {
          Instructor.create(instData, (error, small) => {
            if (error) {
              res.status(400).send(error.message);
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
const createCorporate = async (req, res) => {
  const currentUser = req.body.currentUser;
  const username = req.body.username;
  const password = req.body.password;
  const coopData = {
    username: username,
    password: password,
  };
  if (username == null || password == null) {
    res.status(400).json("Enter a valid data ");
    return;
  }
  const x = await admin
    .find({ username: currentUser }, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (result == null) {
        res.status(400).send("not an admin");
      } else {
        user.create(coopData, (error, small) => {
          if (error) {
            res.status(400).send(error.message);
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
  const a = await course.find({}, { _id: 0 });
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
            Instructor.updateOne(
              { username: username },
              { country: country },
              (err, result) => {
                if (err) {
                  res.status(400).send(err.message);
                } else {
                  res.status(200).json(result);
                }
              }
            );
          } else if (docs) {
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
const instViewCourses = async (req, res) => {
  const a = await course.find(
    { instructor: req.params.user },
    {
      title: 1,
      _id: 0,
    }
  );
  if (a == null) {
    res.status(404).send("no courses available");
  } else {
    res.json(a);
  }
};
//filter
const filterCourses = async (req, res) => {
  const filterType = req.params.filterType;
  const key = req.params.key;
  if (filterType == null || key == null) {
    res.status(404).send("enter a filter type");
  } else {
    await course
      .find()
      .where(filterType, key)
      .exec((err, result) => {
        if (err) {
          res.status(500).send(err.message);
        } else if (result) {
          res.status(200).json(result);
        }
      });
  }
};

const updateViews = async (req, res) => {
  const id = req.body.id;
  await course
    .updateOne({ _id: id }, { $inc: { views: 1 } }, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json(result);
      }
    })
    .clone();
};

const rateInstructor = async (req, res) => {
  const username = req.params.username;
  const rate = req.params.rate;
  let oldrate = 0;
  if (isNaN(rate)) {
    res.status(400).send("invalid rate");
  } else if (rate > 5 || rate < 0) {
    res.status(400).send("invalid rate, the rate must be between 0 and 5");
  } else {
    const x = await Instructor.findOne({ username: username }, { rating: 1 });
    oldrate = x.rating;
    let newRating = rate / 2 + oldrate / 2;
    await Instructor.updateOne(
      { username: username },
      { rating: newRating },
      (err, result) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(200).json(result);
        }
      }
    ).clone();
  }
};
const rateCourse = async (req, res) => {
  const courseId = req.body.id;
  const newRate = req.params.newRate;
  let oldRate = 0;
  if (isNaN(newRate)) {
    res.status(400).send("invalid rate");
  } else if (newRate > 5 || newRate < 0) {
    res.status(400).send("invalid rate, the rate must be between 0 and 5");
  } else {
    const x = await course.findOne({ _id: courseId }, { rating: 1 });
    oldRate = x.rating;
    let rate = oldRate / 2 + newRate / 2;
    await course
      .updateOne({ _id: courseId }, { rating: rate }, (err, result) => {
        if (err) {
          res.status(500).send(err.message);
        } else {
          res.status(200).json(result);
        }
      })
      .clone();
  }
};
const viewRatingAndReviews = async (req, res) => {
  const username = req.params.username;
  await Instructor.find(
    { username: username },
    { review: 1, rating: 1 },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    }
  ).clone();
};
const uploadVideoForCourse = async (req, res) => {
  const id = req.body.id;
  const url = req.body.url;
  course.updateOne({ _id: id }, { video: url }, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(result);
    }
  });
};
const changePassword = async (req, res) => {
  const id = req.body.id;
  const newPassword = req.body.newPassword;
  const usertype = req.body.usertype;
  if (usertype == "corporate trainee") {
    user.updateOne({ _id: id }, { password: newPassword }, (err, result) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.status(200).json(result);
      }
    });
  } else if (usertype == "individual trainee") {
    IndividualTrainee.updateOne(
      { _id: id },
      { password: newPassword },
      (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  } else if (usertype == "instructor") {
    Instructor.updateOne(
      { _id: id },
      { password: newPassword },
      (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(result);
        }
      }
    );
  }
};

const editEmailOrBio = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const bio = req.body.bio;
  const usertype = req.body.usertype;
  if (usertype == "corporate trainee") {
    await user
      .updateOne(
        { username: username },
        { $or: [{ email: email }, { biography: bio }] },
        (err, result) => {
          if (err) {
            res.status(404).json(err);
          } else {
            res.status(200).json(result);
          }
        }
      )
      .clone();
  } else if (usertype == "individual trainee") {
    await individualTrainee
      .updateOne(
        { username: username },
        { $or: [{ email: email }, { biography: bio }] },
        (err, result) => {
          if (err) {
            res.status(404).json(err);
          } else {
            res.status(200).json(result);
          }
        }
      )
      .clone();
  } else if (usertype == "instructor") {
    await Instructor.updateOne(
      { username: username },
      { email: email, biography: bio },
      (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).json(result);
        }
      }
    ).clone();
  }
};
module.exports = {
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
  viewRatingAndReviews,
  uploadVideoForCourse,
  editEmailOrBio,
  changePassword,
};
