const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema(
  {
    firstName: {
      type: String,
      minLength: 3,
      validate: {
        validator: (value) => /^[A-Za-z]+$/.test(value),
        message: (props) => `${props.value} is not a valid name!`,
      },
      required: [true, "Name is required"],
    },
    lastName: {
      type: String,
      minLength: 3,
      validate: {
        validator: (value) => /^[A-Za-z]+$/.test(value),
        message: (props) => `${props.value} is not a valid name!`,
      },
      required: [true, "Name is required"],
    },
    age: {
      type: Number,
    },
    gender: {
      enum: ["Male", "Female"],
    },
    password: { type: String, required: true },

    userName: {
      type: String,
      unique: true,
      required: true,
    },

    email: { type: String, unique: true, required: true },

    country: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["Instructor", "Individual-trainee", "Admin", "Corporate-trainee"],
      required: [true, "UserType is required"]
    },
    courses: { type: Schema.Types.ObjectId, ref: 'Courses' },
    biography: {
      type: String,
      validator : {
        $jsonSchema : {
        bsonType: "userType",
        required: ["Instructor"],
      message: (props) => `${props.value} is not a valid usertype!`,
        }
      }
    },
    creditCardInfo: [{
      holderName: {
        type: String
      },
      cardNumber: {
        type: String
      },
      cvv:{
        type:Number,
        validator:(value)=>{
            value.toString().length == 3;
        }
      }, 
      expirationDate: {
        type: Date,
        validator:(value)=>{
          value > Date.now();
      }
      },
      wallet:{
        type:Number,
      },
    }]},{ timestamps: true });


const User = mongoose.model("User", user);
Module.exports = User;
