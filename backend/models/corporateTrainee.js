const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const corporateTrainee = new Schema(
  {
    firstname: {
      type: String,

      validate: {
        validator: (value) => /^[A-Za-z]+$/.test(value),
        message: "firstname is not a valid name!",
      },
      required: [true, "Name is required"],
    },
    lastname: {
      type: String,

      validate: {
        validator: (value) => /^[A-Za-z]+$/.test(value),
        message: "lastname not a valid name!",
      },
      required: [true, "Name is required"],
    },
    age: {
      type: Number,
      //required: [true, "Age is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "Not Defined"],
      default: "Not Defined",
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
    },
    email: {
      type: String,

      default: "",
      //  unique: true,
      //required: [true, "Vaild email is required"],
    },
    country: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "corporate",
    },
    Regcourses: {
      type: Map,
      default: "",
    },
    Procourses: [
      {
        courseId: {
          type: String,
          default: "",
        },
        progress: {
          type: Number,
          default: 0,
        },
      },
    ],
    grades: {
      type: Map,
      default: "",
    },
    chats: {
      type: ObjectId,
      ref: "Chats",
    },
    progress: [
      {
        course: {
          type: String,
        },
        progress: {
          type: Number,
        },
      },
    ],
  },

  { timestamps: true }
);

const CorporateTrainee = mongoose.model("corporateTrainee", corporateTrainee);
module.exports = CorporateTrainee;
