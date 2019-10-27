const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ContentSchema = new Schema({
  section: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  author: {
    type: String
  }
});

module.exports = Content = mongoose.model("content", ContentSchema);
