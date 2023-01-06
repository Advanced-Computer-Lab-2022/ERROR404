const corporateTrainee = require("../models/corporateTrainee");
const courses = require("../models/courses");
const Courses = require("../models/courses");
const admin = require("../models/admin");
const instructor = require("../models/instructor");
const individualTrainee = require("../models/IndividualTrainee");
const corporateRequests = require("../models/corporateRequests");
const questions = require("../models/questions");
const quizzes = require("../models/quizzes");
const Reports = require("../models/reports");
const chats = require("../models/chats");
const usernames = require("../models/usernames");
const refundRequests = require("../models/refundRequests");
const { truncate } = require("fs");

//Methods
const createIndividualTrainee = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const age = req.body.age;
  const gender = req.body.gender;
  const email = req.body.email;
  let x;
  await usernames
    .find({ name: username })
    .count({ limit: 1 })
    .then((count) => {
      x = count;
    });
  //const country = req.body.country;
  const userData = {
    firstname: firstname,
    lastname: lastname,
    age: age,
    gender: gender,
    username: username,
    password: password,
    email: email,
    // country: country,
  };
  if (
    username == null ||
    password == null ||
    firstname == null ||
    lastname == null ||
    age == null ||
    gender == null ||
    email == null
    // country == null
  ) {
    return res.status(400).json("Valid data not submitted");
  } else if (x == 1) {
    return res.status(409).json("username already in use");
  } else {
    await individualTrainee.create(userData, async function (err, small) {
      if (err) {
        res.status(500).send("Database not responding  => " + err);
      } else {
        await usernames.create({ name: username });
        res.status(200).send("Individual Trainee Created Successfully");
      }
    });
  }
};

const getUser = async (req, res) => {
  const username = req.params.username;
  const userType = req.params.userType;

  let query = { username: username };

  if (userType == "instructor") {
    await instructor
      .findOne(query, function (err, data) {
        if (err) {
          res.status(400).send("An erorr has occured");
        } else {
          res.status(200).json(data);
        }
      })
      .clone();
  } else if (userType == "admin") {
    await admin
      .findOne(query, function (err, data) {
        if (err) {
          res.status(400).send("An erorr has occured");
        } else {
          res.status(200).json(data);
        }
      })
      .clone();
  } else if (userType == "corporate") {
    await corporateTrainee
      .findOne(query, function (err, data) {
        if (err) {
          res.status(400).send("An erorr has occured");
        } else {
          res.status(200).json(data);
        }
      })
      .clone();
  } else if (userType == "individual") {
    await individualTrainee
      .findOne(query, function (err, data) {
        if (err) {
          res.status(400).send("An erorr has occured");
        } else {
          res.status(200).json(data);
        }
      })
      .clone();
  }

  // we need to implement new schema
};
const login = async (req, res) => {
  const username = req.params.username;
  await corporateTrainee
    .findOne({ username: username }, async (err, result) => {
      if (result == null) {
        await admin
          .findOne(
            { username: username },

            async (err, result) => {
              if (result == null) {
                await individualTrainee
                  .findOne(
                    { username: username },

                    async (err, result) => {
                      if (result == null) {
                        await instructor
                          .findOne(
                            { username: username },

                            async (err, result) => {
                              if (result == null) {
                                res
                                  .status(403)
                                  .send("username or password are invalid");
                              } else {
                                res.status(200).send(result);

                                console.log(result);
                              }
                            }
                          )
                          .clone();
                      } else {
                        res.status(200).send(result);

                        console.log(result);
                      }
                    }
                  )
                  .clone();
              } else {
                res.status(200).send(result);

                console.log(result);
              }
            }
          )
          .clone();
      } else {
        res.status(200).send(result);
        console.log(result);
      }
    })
    .clone();
};

const reportProblem = async (req, res) => {
  if (req.body == null) {
    console.log("here");
  }

  const username = req.body.username;

  if (username == null) {
    res.status(401).send("Username is not found");
  } else if (req.body.problemType == null || req.body.problem == null) {
    res.status(400).send("Required fields were not submitted");
  } else {
    const reportDetails = {
      problemType: req.body.problemType,
      problem: req.body.problem,
    };
    Reports.create(reportDetails, (err, small) => {
      if (err) {
        console.log("error with report ", err.message);
      } else {
        res.status(200).send();
      }
    });
  }
};

const createCourse = async (req, res) => {
  console.log(req.body);
  const instructorId = req.body.id;
  const instructorData = await instructor.findOne({ _id: instructorId });
  if (instructorData == null) {
    res.status(401).send("Username is not found, or unauthorized");
  } else if (
    req.body.title == null ||
    req.body.subject == null ||
    req.body.subtitles == null ||
    req.body.price == null ||
    req.body.summary == null ||
    req.body.totalHours == null
  ) {
    console.log("Required fields were not submitted");
    res.status(400).send("Required fields were not submitted");
  } else if (req.body.summary.length < 5) {
    res.status(400).send("Summary should be atleast 5 words long");
  } else {
    const name = instructorData.username;
    const courseDetails = {
      title: req.body.title,
      subject: req.body.subject,
      instructor: name,
      totalHours: req.body.totalHours,
      rating: req.body.rating,
      price: req.body.price,
      subtitles: req.body.subtitles,
      exercises: req.body.exercises,
      summary: req.body.summary,
      discount: {
        value: req.body.discount,
        endDate: req.body.date,
      },
      image: req.body.image,
      prerequisite: req.body.prerequisite,
      preview: req.body.previewURL,
      category: req.body.category,
      totalHours: req.body.totalHours,
    };
    courses.create(courseDetails, (err, small) => {
      if (err) {
        console.log("error with course ", err.message);
      } else {
        res.status(200).send();
      }
    });
  }
};

const coursePrice = async (req, res) => {
  const c = await courses.find({}, { title: 1, price: 1, _id: 0 });
  if (c == null) {
    res.status(404).send("no course found");
  } else {
    res.json(c);
  }
};
const createAdmin = async (req, res) => {
  const Admin = req.body.admin;
  const password = req.body.password;
  const username = req.body.username;
  let x;
  await usernames
    .find({ name: username })
    .count({ limit: 1 })
    .then((count) => {
      x = count;
    });
  if (
    password == null ||
    username == null ||
    admin == null ||
    admin.length == 0 ||
    password.length == 0 ||
    username.length == 0
  ) {
    return res.status(400).send("Required fields are not submitted");
  } else if (x == 1) {
    return res.status(409).json("username already in use");
  } else {
    await admin
      .find({ username: Admin }, (err, data) => {
        if (err) {
          return res.status(500).send(err);
        } else {
          if (data.length == 0) {
            return res.status(401).send("Unautherized access");
          } else {
            const adminData = {
              password: password,
              username: username,
            };
            admin.create(adminData, async function (err, small) {
              if (err) {
                res
                  .status(500)
                  .send("Database not responding  => " + err.message);
                console.log(err.message);
                return;
              }
              // this means record created

              await usernames.create({ name: username });
              res
                .status(200)
                .send("admin " + username + " created Successfully");
            });
          }
        }
      })
      .clone();
  }
};
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
            { title: { $regex: req.params.key, $options: "i" } },
            { subject: { $regex: req.params.key }, $options: "i" },
            { instructor: { $regex: req.params.key, $options: "i" } },
          ],
        }
      : {
          $or: [
            { price: parseInt(req.params.key) },
            { rating: req.params.key },
          ],
        };
  }
  await courses
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

  await courses
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
const createInstructor = async (req, res) => {
  const Admin = req.body.admin;
  const username = req.body.username;
  const password = req.body.password;
  let x;
  await usernames
    .find({ name: username })
    .count({ limit: 1 })
    .then((count) => {
      x = count;
    });
  const instData = {
    // firstname: req.body.firstname,
    // lastname: req.body.lastname,
    // age: req.body.age,
    // gender: req.body.gender,
    username: username,
    password: password,
    email: username,
    // email: req.body.email,
    // country: req.body.country,
    // biography: req.body.biography,
    // phoneNumber: req.body.phoneNumber,
  };
  if (username == null || password == null) {
    res.status(400).json("Enter a valid data ");
  } else if (x == 1) {
    return res.status(409).json("username already in use");
  } else {
    await admin
      .find({ username: Admin }, async (err, result) => {
        if (err) {
          res.status(500).send(err.message);
        } else if (result == "") {
          res.status(404).send("not an admin");
        } else {
          await usernames.create({ name: username });
          instructor.create(instData, (error, data) => {
            if (error) {
              res.status(400).send(error.message);
            } else {
              res.status(200).json(data);
            }
          });
        }
      })
      .clone();
  }
};
const createCorporateTrainee = async (req, res) => {
  const Admin = req.body.admin;
  const password = req.body.password;
  const username = req.body.username;
  let x;
  await usernames
    .find({ name: username })
    .count({ limit: 1 })
    .then((count) => {
      x = count;
    });
  const corpData = {
    firstname: "firstname",
    lastname: "lastname",
    gender: "Not Defined",
    username: username,
    password: password,
    email: username,
  };
  if (username == null || password == null) {
    res.status(400).json("Enter a valid data ");
  } else if (x == 1) {
    return res.status(409).json("username already in use");
  } else {
    await admin
      .findOne({ username: Admin }, (err, result) => {
        if (err) {
          res.status(400).send("Error: " + err);
        } else {
          corporateTrainee.create(corpData, (error, small) => {
            if (error) {
              res.status(500).send(error);
              console.log(error);
            } else {
              usernames.create({ name: username });
              res.status(200).send("user is created");
            }
          });
        }
      })
      .clone();
  }
};
const viewCourses = async (req, res) => {
  const a = await courses.find({});
  if (a == null) {
    res.status(404).send("no courses available");
  } else {
    res.json(a);
  }
};
const chooseCountry = async (req, res) => {
  console.log(req.body);
  const { username, country, usertype } = req.body;
  if (username == "" || country == "") {
    res.status(400).send("valid data required");
  } else {
    if (usertype == "instructor") {
      instructor.updateOne(
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
    } else if (usertype == "individual") {
      individualTrainee.updateOne(
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
    } else if (usertype == "corporate") {
      corporateTrainee.updateOne(
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
    }
  }
};

const submitDiscount = (req, res) => {
  console.log(req.body);
  const courseId = req.body.courseId;
  const discount = req.body.discount;
  const date = req.body.date;

  const discountBody = {
    value: discount,
    endDate: date,
  };

  courses.updateOne(
    { _id: courseId },
    { discount: discountBody },
    (err, response) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send();
      }
    }
  );
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
  const instructorCourses = await courses.find(
    { instructor: req.params.userId }
    // {
    //   title: 1,
    //   description: 1,
    //   image: 1,
    //   summary: 1,
    //   _id: 1,
    // }
  );
  if (instructorCourses == null) {
    res.status(404).send("no courses available");
  } else {
    res.status(200).json(instructorCourses);
  }
};
const filterCourses = async (req, res) => {
  const filterType = req.params.filterType;
  const key = req.params.key;
  if (filterType == null || key == null) {
    res.status(404).send("enter a filter type");
  } else {
    courses
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
const filterByCategory = async (req, res) => {
  const category = req.params.category;
  courses.find({ category: category }, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(result);
    }
  });
};
const getCategory = async (req, res) => {
  courses.distinct("category", (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(result);
    }
  });
};

const filterByPriceOrRate = async (req, res) => {
  const { type, min, max } = req.params;
  if (type == "price") {
    courses.find(
      { $and: [{ price: { $lte: max } }, { price: { $gte: min } }] },
      (err, result) => {
        if (err) {
          res.status(500).send();
        } else {
          res.status(200).json(result);
        }
      }
    );
  }
  if (type == "rate") {
    courses.find(
      { $and: [{ rating: { $lte: max } }, { rating: { $gte: min } }] },
      (err, result) => {
        if (err) {
          res.status(500).send();
        } else {
          res.status(200).json(result);
        }
      }
    );
  }
};
const updateViews = async (req, res) => {
  const id = req.body.id;
  await courses
    .updateOne({ _id: id }, { $inc: { views: 1 } }, (err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).json(result);
      }
    })
    .clone();
};
const rateAndReviewInstructor = async (req, res) => {
  const username = req.body.username;
  const rate = req.body.rate;
  const review = req.body.review;
  let oldrate = 0;
  if (isNaN(rate)) {
    res.status(400).send("invalid rate");
  } else if (rate > 5 || rate < 0) {
    res.status(400).send("invalid rate, the rate must be between 0 and 5");
  } else {
    await instructor
      .findOne({ username: username }, { rating: 1 }, (err, result) => {
        if (err) {
          res.status(500).send();
        } else {
          oldrate = result.rating;
          let newRating = rate / 2 + oldrate / 2;
          let num = newRating.toFixed(1);
          instructor
            .updateOne(
              { username: username },
              { rating: num, $push: { review: review } },
              (err, result) => {
                if (err) {
                  res.status(500).send(err.message);
                } else {
                  res.status(200).json(result);
                }
              }
            )
            .clone();
        }
      })
      .clone();
  }
};
const rateAndReviewCourse = async (req, res) => {
  const courseId = req.body.courseId;
  const review = req.body.review;
  const newRate = req.body.newRate;
  console.log(req.body);
  let oldRate = 0;
  if (isNaN(newRate)) {
    res.status(400).send("invalid rate");
  } else if (newRate > 5 || newRate < 0) {
    res.status(400).send("invalid rate, the rate must be between 0 and 5");
  } else {
    await courses
      .findById({ _id: courseId }, { rating: 1 }, (err, result) => {
        if (err) {
          res.status(500).send();
        } else {
          oldRate = result.rating;
          let newRating = newRate / 2 + oldRate / 2;
          let num = newRating.toFixed(1);
          courses
            .updateOne(
              { _id: courseId },
              { rating: num, $push: { review: review } },
              (err, result) => {
                if (err) {
                  res.status(500).send(err.message);
                } else {
                  res.status(200).json(result);
                }
              }
            )
            .clone();
        }
      })
      .clone();
  }
};

const viewRatingAndReviews = async (req, res) => {
  const username = req.params.username;
  await instructor
    .find({ username: username }, { review: 1, rating: 1 }, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    })
    .clone();
};

const changePassword = async (req, res) => {
  const id = req.body.id;
  const newPassword = req.body.newPassword;
  const usertype = req.body.usertype;
  if (usertype == "corporate") {
    corporateTrainee.updateOne(
      { _id: id },
      { password: newPassword },
      (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      }
    );
  } else if (usertype == "individual") {
    individualTrainee.updateOne(
      { _id: id },
      { password: newPassword },
      (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      }
    );
  } else if (usertype == "instructor") {
    instructor.updateOne(
      { _id: id },
      { password: newPassword },
      (err, result) => {
        if (err) {
          res.status(500).json(err);
          console.log(err);
        } else {
          console.log(result);
          res.status(200).send(result);
        }
      }
    );
  }
};
const editEmail = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const usertype = req.body.usertype;
  if (usertype == "corporate") {
    await corporateTrainee
      .updateOne({ username: username }, { email: email }, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      })
      .clone();
  } else if (usertype == "individual") {
    await individualTrainee
      .updateOne({ username: username }, { email: email }, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      })
      .clone();
  } else if (usertype == "instructor") {
    console.log(req.body);
    await instructor
      .updateOne({ username: username }, { email: email }, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      })
      .clone();
  }
};
const editBio = async (req, res) => {
  const username = req.body.username;
  const bio = req.body.bio;
  const usertype = req.body.usertype;
  if (usertype == "corporate") {
    await user
      .updateOne({ username: username }, { biography: bio }, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      })
      .clone();
  } else if (usertype == "individual") {
    await individualTrainee
      .updateOne({ username: username }, { biography: bio }, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      })
      .clone();
  } else if (usertype == "instructor") {
    await instructor
      .updateOne({ username: username }, { biography: bio }, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      })
      .clone();
  }
};
const viewReviewAndRatingForInstructor = async (req, res) => {
  const username = req.params.username;
  await courses
    .find(
      { instructor: username },
      { _id: 0, title: 1, rating: 1, review: 1 },
      (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(result);
        }
      }
    )
    .clone();
};

const traineebalance = async (req, res) => {
  const username = req.params.username;
  await individualTrainee
    .find({ username: username }, { _id: 0, balance: 1 }, (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(result);
      }
    })
    .clone();
};

const uploadPreviewVideoForCourse = async (req, res) => {
  const id = req.body.id;
  const url = req.body.url;
  courses.updateOne({ _id: id }, { preview: url }, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).send();
    }
  });
};
//insert inside the subtitles in course
const insertVideoLinkToCourse = async (req, res) => {
  const courseId = req.body.courseId;
  const instructorId = req.body.instructorId;
  const link = req.body.link;
  const x = await instructor.findOne({ _id: instructorId });
  if (instructorId == x._id) {
    await courses
      .updateOne(
        { _id: courseId },
        { $addToSet: { video: link } },
        (err, result) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(result);
          }
        }
      )
      .clone();
  } else {
    res.status(404).json("instructor not found");
  }
};
const addCreditCardInfo = async (req, res) => {
  const username = req.body.username;
  const creditCard = {
    holderName: req.body.holderName,
    cardNumber: req.body.cardNumber,
    cvv: req.body.cvv,
    expirationDate: req.body.expirationDate,
  };
  await individualTrainee
    .findOneAndUpdate(
      { username: username },
      { $addToSet: { creditCardInfo: creditCard } },
      (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).send();
        }
      }
    )
    .clone();
};
// //route to inc no of subs'
// const noOfSubscribers = async (req, res) => {
//   const id = req.body.id;
//   await course
//     .updateOne(
//       { _id: id },
//       { $inc: { numberOfSubscribers: 1 } },
//       (err, result) => {
//         if (err) {
//           res.status(500).send();
//         } else {
//           res.status(200).send(result);
//         }
//       }
//     )
//     .clone();
// };

const topCourses = async (req, res) => {
  const topCourses = await courses.find({}).sort({ views: -1 }).limit(5);
  res.status(200).json(topCourses);
};

const salary = async (req, res) => {
  const courseId = req.body.courseId;
  const x = await courses.findOne(
    { _id: courseId },
    { instructor: 1, price: 1 }
  );
  if (x == null) {
    res.status(404).json("course not found");
  } else {
    let username = x.instructor;
    let price = x.price;
    price *= 0.8;
    console.log(username + " " + price);
    const y = await instructor.findOne({ username: username }, { wallet: 1 });
    let newWallet = y.wallet;
    newWallet += price;
    console.log(newWallet);
    await instructor
      .updateOne(
        { username: username },
        { wallet: newWallet },
        (err, result) => {
          if (err) {
            res.status(500).send();
          } else {
            courses
              .updateOne(
                { _id: req.body.courseId },
                { $inc: { numberOfSubscribers: 1 } },
                (err, result) => {
                  if (err) {
                    res.status(500).send();
                  } else {
                    res.status(200).send(result);
                  }
                }
              )
              .clone();
          }
        }
      )
      .clone();
  }
};

const createQuestions = async (req, res) => {
  const username = req.body.username;
  const question1 = req.body.question1;
  const answer1 = req.body.answer1;
  const answer2 = req.body.answer2;
  const answer3 = req.body.answer3;
  const answer4 = req.body.answer4;
  const answerQes1 = req.body.answerQes1;
  //
  const question2 = req.body.question2;
  const answer21 = req.body.answer21;
  const answer22 = req.body.answer22;
  const answer23 = req.body.answer23;
  const answer24 = req.body.answer24;
  const answerQes2 = req.body.answerQes2;
  //
  const question3 = req.body.question3;
  const answer31 = req.body.answer31;
  const answer32 = req.body.answer32;
  const answer33 = req.body.answer33;
  const answer34 = req.body.answer34;
  const answerQes3 = req.body.answerQes3;
  //
  const question4 = req.body.question4;
  const answer41 = req.body.answer41;
  const answer42 = req.body.answer42;
  const answer43 = req.body.answer43;
  const answer44 = req.body.answer44;
  const answerQes4 = req.body.answerQes4;
  const x = await instructor.findOne({ username: username });
  if (x == [] || null) {
    res.status(404).json("instructor not found or not authorized");
  } else {
    const options1 = {
      a: answer1,
      b: answer2,
      c: answer3,
      d: answer4,
    };
    const body1 = {
      description: question1,
      answer: answerQes1,
      options: options1,
    };
    //
    const options2 = {
      a: answer21,
      b: answer22,
      c: answer23,
      d: answer24,
    };
    const body2 = {
      description: question2,
      answer: answerQes2,
      options: options2,
    };
    //
    const options3 = {
      a: answer31,
      b: answer32,
      c: answer33,
      d: answer34,
    };
    const body3 = {
      description: question3,
      answer: answerQes3,
      options: options3,
    };
    //
    const options4 = {
      a: answer41,
      b: answer42,
      c: answer43,
      d: answer44,
    };
    const body4 = {
      description: question4,
      answer: answerQes4,
      options: options4,
    };
    const array = [body1, body2, body3, body4];
    questions
      .insertMany(array)
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).send();
      });
  }
};
const createQuiz = async (req, res) => {
  console.log(req.body.questions);
  const username = req.body.username;
  const courseId = req.body.courseId;
  const subtitle = req.body.subtitle;

  const questions = req.body.questions;

  const x = await instructor.findOne({ username: username });
  if (x == [] || null) {
    res.status(404).json("instructor not found or not authorized");
  } else {
    courses
      .findByIdAndUpdate(
        { _id: courseId },
        { $addToSet: { questions: req.body.questions } },
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.status(200).send(result);
          }
        }
      )
      .clone();
  }
};
const addCourseToStudent = async (req, res) => {
  console.log("helloz " + JSON.stringify(req.body));
  const username = req.body.username;
  const courseId = req.body.courseId;
  const usertype = req.body.usertype;

  const progress = {
    course: courseId,
    progress: 0,
  };
  if (usertype == "corporate") {
    corporateTrainee
      .updateOne(
        { username: username },
        { $push: { Regcourses: courseId, progress: progress } },
        (err, result) => {
          if (err) {
            res.status(500).send();
          } else {
            courses
              .updateOne(
                { _id: courseId },
                { $inc: { numberOfSubscribers: 1 } },
                (err, result) => {
                  if (err) {
                    res.status(500).send();
                  } else {
                    res.status(200).send(result);
                  }
                }
              )
              .clone();
          }
        }
      )
      .clone();
  } else if (usertype == "individual") {
    individualTrainee
      .updateOne(
        { username: username },
        { $addToSet: { Regcourses: courseId, progress: progress } },
        (err, result) => {
          if (err) {
            res.status(500).send();
          } else {
            courses
              .updateOne(
                { _id: courseId },
                { $inc: { numberOfSubscribers: 1 } },
                (err, result) => {
                  if (err) {
                    res.status(500).send();
                  } else {
                    res.status(200).send(result);
                  }
                }
              )
              .clone();
          }
        }
      )
      .clone();
  } else {
    res.status(404).send("Student not found");
  }
};

const getCourseById = async (req, res) => {
  const courseId = req.params.id;
  await courses
    .findOne({ _id: courseId }, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.status(200).json(result);
      }
    })
    .clone();
};

const getMyCoursesTrainee = (req, res) => {
  const usertype = req.params.usertype;
  const username = req.params.username;
  let ids = [];
  if (usertype == "corporate") {
    corporateTrainee
      .findOne({ username: username }, { Regcourses: 1 }, (err, data) => {
        if (err) {
          res.status(500).send();
        } else {
          if (data == null) {
            return res.status(200).send("no courses found");
          }
          ids = data.Regcourses;
          courses.find({ _id: ids }, (err, data) => {
            if (err) {
              res.status(500).send();
            } else {
              res.status(200).json(data);
            }
          });
        }
      })
      .clone();
  } else if (usertype == "individual") {
    individualTrainee
      .findOne({ username: username }, { Regcourses: 1 }, (err, data) => {
        if (err) {
          res.status(500).send();
        } else {
          if (data == null) {
            return res.status(200).send("no courses found");
          }
          ids = data.Regcourses;
          courses.find({ _id: ids }, (err, data) => {
            if (err) {
              res.status(500).send();
            } else {
              res.status(200).json(data);
            }
          });
        }
      })
      .clone();
  } else {
    res.status(404).send("user type not found");
  }
};

const getmyGrade = async (req, res) => {
  const id = req.params.id;
  const usertype = req.params.usertype;
  if (usertype == "corporate") {
    await corporateTrainee
      .findOne({ _id: id }, (err, result) => {
        if (err) {
          req.status(500).send();
        } else {
          res.status(200).json(result);
        }
      })
      .clone();
  } else if (usertype == "individual") {
    await individualTrainee
      .findOne({ _id: id }, (err, result) => {
        if (err) {
          req.status(500).send();
        } else {
          res.status(200).json(result);
        }
      })
      .clone();
  }
};
const approveInstructor = async (req, res) => {
  const username = req.body.username;

  instructor.findOneAndUpdate(
    { username: username },
    { approved: true },
    (err, result) => {
      if (err) {
        res.status(500).json();
      } else {
        res.status(200).json();
      }
    }
  );
};

const getAllReports = async (req, res) => {
  await Reports.find({}, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send();
    }
  }).clone();
};
const createReport = async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const usertype = req.body.usertype;
  const description = req.body.description;
  const reportType = req.body.reportType;

  if (username == null || username.length == 0) {
    return res.status(400).send("username not sent");
  } else if (usertype == null || usertype.length == 0) {
    return res.status(400).send("usertype not sent");
  } else if (description == null || description.length == 0) {
    return res.status(400).send("description not sent");
  } else if (reportType == null || reportType.length == 0) {
    return res.status(400).send("Report Type not sent");
  } else {
    const body = {
      user: username,
      usertype: usertype,
      description: description,
      problemType: reportType,
    };
    Reports.create(body, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        res.status(200).send(result);
      }
    });
  }
};

const updateReportStatus = async (req, res) => {
  const reportId = req.body.id;

  if (reportId == null || reportId.length == 0) {
    return res.status(400).send("Id not provided");
  } else {
    await Reports.findByIdAndUpdate(
      { _id: reportId },
      { $set: { status: req.body.status } },
      { runValidators: true },
      (err, data) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).send();
        }
      }
    ).clone();
  }
};

const createCourseChat = (req, res) => {
  const chat = {
    sender: req.body.sender,
    message: req.body.message,
    usertype: req.body.usertype,
  };

  Courses.findByIdAndUpdate(
    { _id: req.body.id },
    { $push: { chat: chat } },
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send();
      }
    }
  );
};

const getCourseChats = async (req, res) => {
  await Courses.findOne({ _id: req.params.id }, { chat: 1 }, (err, data) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).json(data);
    }
  }).clone();
};

const createCorporateRequest = (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const usertype = req.body.usertype;
  const courseId = req.body.courseId;

  if (usertype !== "corporate") {
    return res.status(400).send("Error occured");
  } else if (username == null || username.length == 0) {
    return res.status(400).send("Please enter your username");
  } else if (courseId == null || courseId.length == 0) {
    return res.status(400).send("Please enter the course title");
  } else {
    const body = {
      username: username,
      userType: usertype,
      courseId: courseId,
    };
    corporateRequests.create(body, (err, data) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
};

const getAllRequests = async (req, res) => {
  await corporateRequests
    .find({}, (err, data) => {
      if (err) {
        res.status(500).json(err);
      } else if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send();
      }
    })
    .clone();
};

const updateCourseProgress = async (req, res) => {
  let model;
  if (req.body.usertype == "individual") {
    model = individualTrainee;
  } else if (req.body.usertype == "corporate") {
    model = corporateTrainee;
  }

  await model
    .findOneAndUpdate(
      { _id: req.body.id, "progress.course": req.body.courseId },
      { $set: { "progress.$.progress": req.body.progress } },
      (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
      }
    )
    .clone();
};
const updateRequestStatus = (req, res) => {
  const requestId = req.body.id;

  if (requestId == null || requestId.length == 0) {
    return res.status(400).send("Id not provided");
  } else {
    corporateRequests
      .findByIdAndUpdate(
        { _id: requestId },
        { $set: { status: req.body.status } },
        { runValidators: true },
        (err, data) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).send();
          }
        }
      )
      .clone();
  }
};

const getAllSubtitles = async (req, res) => {
  const courseId = req.params.id;
  await courses
    .findOne({ _id: courseId }, { subtitles: 1 }, (err, data) => {
      if (err) {
        res.status(500).json(err);
      } else if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send();
      }
    })
    .clone();
};

const instructorFilterCourses = async (req, res) => {
  const username = req.params.username;
  const filterType = req.params.filterType;
  const key = req.params.key;
  if (filterType == null || key == null) {
    res.status(404).send("enter a filter type");
  } else {
    courses
      .find({ instructor: username })
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

const instructorFilterByCategory = async (req, res) => {
  const username = req.params.username;
  const category = req.params.category;
  courses.find({ instructor: username, category: category }, (err, result) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(result);
    }
  });
};
const instructorfilterByPriceOrRate = async (req, res) => {
  const { username, type, min, max } = req.params;
  if (type == "price") {
    courses.find(
      {
        instructor: username,
        $and: [{ price: { $lte: max } }, { price: { $gte: min } }],
      },
      (err, result) => {
        if (err) {
          res.status(500).send();
        } else {
          res.status(200).json(result);
        }
      }
    );
  }
  if (type == "rate") {
    courses.find(
      {
        instructor: username,
        $and: [{ rating: { $lte: max } }, { rating: { $gte: min } }],
      },
      (err, result) => {
        if (err) {
          res.status(500).send();
        } else {
          res.status(200).json(result);
        }
      }
    );
  }
};
const requestRefund = async (req, res) => {
  console.log("request " + req.body);
  const username = req.body.username;
  const courseId = req.body.courseId;
  const userType = req.body.userType;

  if (userType !== "individual" || username == null) {
    return res.status(400).send("Error occured");
  } else if (courseId == null) {
    res.status(400).send("Please enter the course");
  } else {
    refundRequests.create(
      {
        username: username,
        userType: userType,
        courseId: courseId,
        coursePrice: req.body.coursePrice,
      },
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      }
    );
  }
};
const getRefundRequestsByCourseIdUsername = async (req, res) => {
  console.log(req.params);
  await refundRequests
    .findOne(
      { username: req.params.username, courseId: req.params.courseId },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json(data);
        }
      }
    )
    .clone();
};
const addToIndivisualTraineeWallet = (req, res) => {
  const username = req.body.username;
  const refund = req.body.refund;

  individualTrainee.findOneAndUpdate(
    { username: username },
    { $inc: { balance: refund } },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
};
const getAllRefundRequests = async (req, res) => {
  await refundRequests
    .find({}, (err, data) => {
      if (err) {
        res.status(500).json(err);
      } else if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send();
      }
    })
    .clone();
};
const updateRefundRequestStatus = (req, res) => {
  const requestId = req.body.id;
  if (requestId == null || requestId.length == 0) {
    return res.status(400).send("Id not provided");
  } else {
    refundRequests
      .findByIdAndUpdate(
        { _id: requestId },
        { $set: { status: req.body.status } },
        { runValidators: true },
        (err, data) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).send();
          }
        }
      )
      .clone();
  }
};
const deleteCourse = async (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const courseId = req.body.courseId;

  if (username == null || courseId == null) {
    return res.status(400).send("Please enter valid data");
  }
  await individualTrainee
    .findOneAndUpdate(
      { username: username },
      { $pull: { Regcourses: courseId } },
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          courses
            .updateOne(
              { _id: courseId },
              { $inc: { numberOfSubscribers: -1 } },
              (err, result) => {
                if (err) {
                  res.status(500).send();
                } else {
                  res.status(200).send(result);
                }
              }
            )
            .clone();
        }
      }
    )
    .clone();
};
const payfromBalance = async (req, res) => {
  const username = req.body.username;
  const courseId = req.body.courseId;

  const p = await individualTrainee.findOne(
    { username: username },
    { balance: 1 }
  );
  const x = await courses.findOne({ _id: courseId }, { price: 1 });

  if (p.balance == 0 || p.balance < x.price) {
    res.status(401).json("Balance is insufficient");
  } else {
    console.log(x.price);
    let newBalance = p.balance;
    newBalance = newBalance - x.price;
    console.log(newBalance);
    console.log(x.price);
    await individualTrainee
      .updateOne(
        { username: username },
        { $set: { balance: newBalance } },
        (err, result) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(result);
          }
        }
      )
      .clone();
  }
};
const setDiscountForAllCourses = async (req, res) => {
  const courseId = req.body.courseId;
  const value = req.body.value;
  const endDate = req.body.endDate;
  courses
    .updateMany(
      { _id: courseId },
      {
        $set: {
          discount: {
            value: value,
            endDate: endDate,
          },
        },
      },
      { multi: true },
      (err, result) => {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(result);
        }
      }
    )
    .clone();
};
const putGrades = async (req, res) => {
  const username = req.body.username;
  const usertype = req.body.usertype;
  const grade = req.body.grade;
  const subject = req.body.subject;
  if (usertype == "individual") {
    await individualTrainee
      .updateOne(
        { username: username },
        {
          $push: {
            grades: {
              subject: subject,
              grade: grade,
            },
          },
        },
        (err, result) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(result);
          }
        }
      )
      .clone();
  }
  if (usertype == "corporate") {
    await corporateTrainee
      .updateOne(
        { username: username },
        {
          $push: {
            grades: {
              subject: subject,
              grade: grade,
            },
          },
        },
        (err, result) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(result);
          }
        }
      )
      .clone();
  }
};

const addAverageMark = async (req, res) => {
  const courseId = req.body.courseId;
  const mark = req.body.mark;

  await Courses.findOne({ _id: courseId }, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      let newResult;

      if (result.averageMark == -1) {
        newResult = mark;
      } else {
        newResult = (result.averageMark + mark) / 2;
      }
      Courses.findOneAndUpdate(
        { _id: courseId },
        { averageMark: newResult },
        (err, result) => {
          if (err) {
            res.status(500).json(err);
          } else {
            res.status(200).json(result);
          }
        }
      ).clone();
    }
  }).clone();
};
module.exports = {
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
  traineebalance,
  uploadPreviewVideoForCourse,
  editEmail,
  editBio,
  changePassword,
  viewReviewAndRatingForInstructor,
  insertVideoLinkToCourse,
  addCreditCardInfo,
  // noOfSubscribers,
  topCourses,
  salary,
  createQuestions,
  createQuiz,
  addCourseToStudent,
  getCourseById,
  submitDiscount,
  getMyCoursesTrainee,
  getmyGrade,
  getAllReports,
  createReport,
  updateReportStatus,
  createCorporateRequest,
  getAllRequests,
  getCourseChats,
  updateRequestStatus,
  createCourseChat,
  updateCourseProgress,
  instructorFilterCourses,
  instructorfilterByPriceOrRate,
  instructorFilterByCategory,
  approveInstructor,
  filterByPriceOrRate,
  getAllSubtitles,
  login,
  filterByCategory,
  getCategory,
  requestRefund,
  getAllRefundRequests,
  updateRefundRequestStatus,
  deleteCourse,
  //adminRefundTrainee,
  payfromBalance,
  filterByPriceOrRate,
  setDiscountForAllCourses,
  getRefundRequestsByCourseIdUsername,
  putGrades,
  addToIndivisualTraineeWallet,
  addAverageMark,
};
