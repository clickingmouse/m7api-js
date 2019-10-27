const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Scehma
const ReplySchema = new Schema({
  postID: {
    type: Number,
    rerquired: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  reply: {
    type: String
  },
  author: {
    type: String,
    required: true
  }
});

module.exports = Reply = mongoose.model("reply", ReplySchema);
