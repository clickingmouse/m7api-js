const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const appSchema = new Schema({
  appName: {
    type: String,
    required: true
  },
  appDescription: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  },
  logoFileID: {
    type: Schema.Types.ObjectId // There is no need to create references here
  },
  authorName: { type: String, required: true },
  authorID: { type: String, required: true }
});

//module.exports = Content = mongoose.model("content", ContentSchema);
module.exports = App = mongoose.model("app", appSchema);
