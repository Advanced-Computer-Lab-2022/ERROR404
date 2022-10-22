// External variables
const express = require("express");
const mongoose = require('mongoose');
// THIS IS WRONG NEVER DO THAT !! Only for the task we put the DB Link here!! NEVER DO THAAAT AGAIN !!
//Check db connection links in README file
const MongoURI = 'mongodb+srv://admin:admin@cluster0.vm6qaas.mongodb.net/test';


//App variables
const app = express();
const port = process.env.PORT || "2020";
// const user = require('./Models/User');
// #Importing the userController

// i am here

// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.status(200).send("Hello World")
})

const Drone = mongoose.model('Drone', User);

const drone = new Drone({
    First_name: "SV - Aira 157B",
    Last_name: "Hello" ,
    id: 2455,
    Password: "Photography",
    Email: "Mohamedtamer",
    Country: "Egypt",
})

drone.save(function (err, doc) {
    console.log(doc._id);
});