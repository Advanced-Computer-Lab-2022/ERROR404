const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
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
    chats: {
      type: ObjectId,
      ref: "Chats",
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", admin);
module.exports = Admin;
