// External variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
//Check db connection links in README file
const MongoURI = "mongodb+srv://admin:admin@cluster0.vm6qaas.mongodb.net/test";
const user = require("./models/User");

//App variables
const app = express();
const port = process.env.PORT || "2020";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// const user = require('./Models/User');
// #Importing the userController

app.post("/createUser", (req, res) => {
  console.log(req.body);
  const userData = {
    First_name: req.body.First_name,
    Last_name: req.body.Last_name,
    Email: req.body.Email,
    Username: req.body.Username,
    Password: req.body.Password,
  };
  user.create(userData, function (err, small) {
    if (err) {
      res.status(500).send("Database not responding");
      return;
    }
    // this means record created
    res.status(200).send("user Created Successfully");
  });
});

// i am here

// configurations
// Mongo DB
mongoose.connect(MongoURI)
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
