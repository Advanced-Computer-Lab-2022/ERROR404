const corporateTrainee = require("../models/corporateTrainee");
const course = require("../models/Courses");
const admin = require("../models/Admin");
const Instructor = require("../models/instructor");
const individualTrainee = require("../models/IndividualTrainee");
const IndividualTrainee = require("../models/IndividualTrainee");
const Courses = require("../models/Courses");
const Questions = require("../models/questions");
const Quizzes = require("../models/quizzes");
const { default: mongoose } = require("mongoose");
const CorporateTrainee = require("../models/corporateTrainee");

//Methods
const createIndividualTrainee = (req, res) => {
  // const username = req.body.username;
  // const password = req.body.password;
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    country: req.body.country,
  };
  // if (username == null || password == null) {
  //   return res.status(400).json("Enter a valid data ");
  // } else {
  individualTrainee.create(userData, function (err, small) {
    if (err) {
      res.status(500).send("Database not responding  => " + err);
    } else {
      res.status(200).send("Individual Trainee Created Successfully");
    }
  });
  // }
};

const getUser = async (req, res) => {
  const userId = req.params.userId;
  const userType = req.params.userType;

  let query = { _id: userId };

  if (userType == "instructor") {
    await Instructor.findOne(query, function (err, data) {
      if (err) {
        res.status(400).send("An erorr has occured");
      } else {
        res.status(200).json(data);
      }
    }).clone();
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
  } else if (userType == "indivisual") {
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

const createCourse = async (req, res) => {
  const instructorId = req.body.id;
  const instructor = await Instructor.findOne({ _id: instructorId });
  if (instructor == null) {
    res.status(401).send("Username is not found, or unauthorized");
  } else if (
    req.body.title == null ||
    req.body.subject == null ||
    // req.body.instructor == null ||
    // req.body.subtitle == null ||
    req.body.price == null ||
    req.body.summary == null ||
    req.body.totalHours == null
  ) {
    res.status(400).send("Required fields were not submitted");
  } else if (req.body.summary.length < 5) {
    res.status(400).send("Summary should be atleast 5 words long");
  } else {
    const name = instructor.username;
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
      preview: req.body.preview,
      category: req.body.category,
    };
    course.create(courseDetails, (err, small) => {
      if (err) {
        console.log("error with course ", err.message);
      } else {
        res.status(200).send();
      }
    });
  }
};
const coursePrice = async (req, res) => {
  console.log(req.params);
  const c = await course.find({}, { title: 1, price: 1, _id: 0 });
  if (c == null) {
    res.status(404).send("no course found");
  } else {
    res.json(c);
  }
};
const createAdmin = (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  if (password == null || username == null) {
    return res.status(400).send("Required fields are not submitted");
  }
  const adminData = {
    password: password,
    username: username,
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
const createInstructor = async (req, res) => {
  const currentUser = req.body.currentUser;
  const instData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    country: req.body.country,
    biography: req.body.biography,
    phoneNumber: req.body.phoneNumber,
  };
  if (username == "" || password == "") {
    res.status(400).json("Enter a valid data ");
  } else {
    await admin
      .find({ username: currentUser }, {}, (err, result) => {
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
const createCorporateTrainee = async (req, res) => {
  const corpData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    age: req.body.age,
    gender: req.body.gender,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    country: req.body.country,
  };
  // if (username == null || password == null) {
  //   res.status(400).json("Enter a valid data ");
  // } else {
  corporateTrainee.create(corpData, (error, small) => {
    if (error) {
      res.status(400).send(error.message);
    } else {
      res.status(200).send("user is created");
    }
  });
  // }
};
const viewCourses = async (req, res) => {
  const a = await course.find({});
  if (a == null) {
    res.status(404).send("no courses available");
  } else {
    res.json(a);
  }
};
const chooseCountry = async (req, res) => {
  const { username, country, usertype } = req.body;
  if (username == "" || country == "") {
    res.status(400).send("valid data required");
  } else {
    if (usertype == "instructor") {
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
    } else if (usertype == "individual trainee") {
      IndividualTrainee.updateOne(
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
    } else if (usertype == "corporate trainee") {
      CorporateTrainee.updateOne(
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
  const courseId = req.body.courseId;
  const discount = req.body.discount;
  const date = req.body.date;

  const discountBody = {
    value: discount,
    endDate: date,
  };

  Courses.updateOne(
    { _id: courseId },
    { discount: discountBody },
    (err, response) => {
      if (err) {
        res.status(500).send();
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
  const instructorCourses = await course.find(
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
const rateAndReviewInstructor = async (req, res) => {
  const username = req.body.username;
  const rate = req.body.rate;
  const review = req.body.review;
  console.log(req.body);
  let oldrate = 0;
  if (isNaN(rate)) {
    res.status(400).send("invalid rate");
  } else if (rate > 5 || rate < 0) {
    res.status(400).send("invalid rate, the rate must be between 0 and 5");
  } else {
    await Instructor.findOne(
      { username: username },
      { rating: 1 },
      (err, result) => {
        if (err) {
          res.status(500).send();
        } else {
          oldrate = result.rating;
          let newRating = rate / 2 + oldrate / 2;
          Instructor.updateOne(
            { username: username },
            { rating: newRating, $push: { review: review } },
            (err, result) => {
              if (err) {
                res.status(500).send(err.message);
              } else {
                res.status(200).json(result);
              }
            }
          ).clone();
        }
      }
    ).clone();
  }
};
const rateAndReviewCourse = async (req, res) => {
  const courseId = req.body.id;
  const review = req.body.review;
  const newRate = req.body.newRate;
  console.log(req.body);
  let oldRate = 0;
  if (isNaN(newRate)) {
    res.status(400).send("invalid rate");
  } else if (newRate > 5 || newRate < 0) {
    res.status(400).send("invalid rate, the rate must be between 0 and 5");
  } else {
    await course
      .findById({ _id: courseId }, { rating: 1 }, (err, result) => {
        if (err) {
          res.status(500).send();
        } else {
          oldRate = result.rating;
          let newRating = newRate / 2 + oldRate / 2;
          course
            .updateOne(
              { _id: courseId },
              { rating: newRating, $push: { review: review } },
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
const changePassword = async (req, res) => {
  const id = req.body.id;
  const newPassword = req.body.newPassword;
  const usertype = req.body.usertype;
  if (usertype == "corporate trainee") {
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
  } else if (usertype == "individual trainee") {
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
    Instructor.updateOne(
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
  if (usertype == "corporate trainee") {
    await corporateTrainee
      .updateOne({ username: username }, { email: email }, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      })
      .clone();
  } else if (usertype == "individual trainee") {
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
    await Instructor.updateOne(
      { username: username },
      { email: email },
      (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      }
    ).clone();
  }
};
const editBio = async (req, res) => {
  const username = req.body.username;
  const bio = req.body.bio;
  const usertype = req.body.usertype;
  if (usertype == "corporate trainee") {
    await user
      .updateOne({ username: username }, { biography: bio }, (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      })
      .clone();
  } else if (usertype == "individual trainee") {
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
    await Instructor.updateOne(
      { username: username },
      { biography: bio },
      (err, result) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.status(200).send();
        }
      }
    ).clone();
  }
};
const viewReviewAndRatingForInstructor = async (req, res) => {
  const username = req.params.username;
  await course
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
const uploadPreviewVideoForCourse = async (req, res) => {
  const id = req.body.id;
  const url = req.body.url;
  course.updateOne({ _id: id }, { preview: url }, (err, result) => {
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
  const x = await Instructor.findOne({ _id: instructorId });
  if (instructorId == x._id) {
    await course
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
  console.log(creditCard);
  await IndividualTrainee.findOneAndUpdate(
    { username: username },
    { $addToSet: { creditCardInfo: creditCard } },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).send();
      }
    }
  ).clone();
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
  const topCourses = await Courses.find({}).sort({ views: -1 }).limit(5);
  res.status(200).json(topCourses);
};

const salary = async (req, res) => {
  const courseId = req.body.courseId;
  const x = await course.findOne(
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
    const y = await Instructor.findOne({ username: username }, { wallet: 1 });
    let newWallet = y.wallet;
    newWallet += price;
    console.log(newWallet);
    await Instructor.updateOne(
      { username: username },
      { wallet: newWallet },
      (err, result) => {
        if (err) {
          res.status(500).send();
        } else {
          res.status(200).send(result);
        }
      }
    ).clone();
  }
};
// const reviewInstructor = async (req, res) => {
//   const username = req.body.username;
//   const review = req.body.review;
//   await Instructor.updateOne(
//     { username: username },
//     { $addToSet: { review: review } },
//     (err, result) => {
//       if (err) {
//         res.status(500).send();
//       } else {
//         res.status(200).send();
//       }
//     }
//   ).clone();
// };
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
  const x = await Instructor.findOne({ username: username });
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
    Questions.create(body1, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send();
      }
    });
    Questions.create(body2, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send();
      }
    });
    Questions.create(body3, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send();
      }
    });
    Questions.create(body4, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send();
      }
    });
  }
};
const createQuiz = async (req, res) => {
  const username = req.body.username;
  const courseId = req.body.courseId;
  const x = await Instructor.findOne({ username: username });
  if (x == [] || null) {
    res.status(404).json("instructor not found or not authorized");
  } else {
    const question1 = mongoose.Types.ObjectId(req.body.question1);
    const question2 = mongoose.Types.ObjectId(req.body.question2);
    const question3 = mongoose.Types.ObjectId(req.body.question3);
    const question4 = mongoose.Types.ObjectId(req.body.question4);

    const query = {
      questions: [question1, question2, question3, question4],
    };
    Quizzes.create(query, (err, result) => {
      if (err) {
        res.status(500).send();
      } else {
        Courses.findOneAndUpdate(
          { _id: courseId },
          { $addToSet: { exercises: result._id } },
          (err, result) => {
            if (err) {
              res.status(500).send();
            } else {
              res.status(200).send(result);
            }
          }
        ).clone();
      }
    });
  }
};
const addCourseToStudent = async (req, res) => {
  const username = req.body.username;
  const courseId = req.body.courseId;
  const usertype = req.body.usertype;
  if (usertype == "corporate trainee") {
    corporateTrainee
      .updateOne(
        { username: username },
        { $addToSet: { Regcourses: courseId } },
        (err, result) => {
          if (err) {
            res.status(500).send();
          } else {
            course
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
  } else if (usertype == "individual trainee") {
    individualTrainee
      .updateOne(
        { username: username },
        { $addToSet: { Regcourses: courseId } },
        (err, result) => {
          if (err) {
            res.status(500).send();
          } else {
            course
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

  await Courses.findOne({ _id: courseId }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.status(200).json(result);
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
  uploadPreviewVideoForCourse,
  editEmail,
  editBio,
  changePassword,
  viewReviewAndRatingForInstructor,
  insertVideoLinkToCourse,
  addCreditCardInfo,
  // noOfSubscribers,
  topCourses,
  //reviewInstructor,
  salary,
  createQuestions,
  createQuiz,
  addCourseToStudent,
  getCourseById,
  submitDiscount,
};
