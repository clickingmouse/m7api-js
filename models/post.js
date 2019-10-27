const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Scehma
const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  post: {
    type: String
  },
  author: {
    type: String,
    required: true
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
