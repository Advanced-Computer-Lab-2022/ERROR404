const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const admin = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", admin);
module.exports = Admin;
