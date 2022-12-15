const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chats = new Schema(
  {
    sender: {
      type: String,
    },
    reciver: { type: String },
    senderRole: {
      type: String,
      enum: ["instructor", "individual", "corporate", "admin"],
    },
    reciverRole: {
      type: String,
      enum: ["instructor", "individual", "corporate", "admin"],
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chats = mongoose.model("chats", chats);
module.exports = Chats;
