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
  suggestedBy: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  logoFileID: {
    type: Schema.Types.ObjectId // There is no need to create references here
  },
  suggestedBy: { type: String, required: true },
  authorID: { type: Number, required: true }
});

//module.exports = Content = mongoose.model("content", ContentSchema);
module.exports = App = mongoose.model("app", appSchema);
