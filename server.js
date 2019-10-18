require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const db = process.env.MONGO_URI;
const atlasDB = process.env.ATLAS_URI;

//Connect to Mongo
// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));
mongoose
  .connect(atlasDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("Atlas DB Connected"))
  .catch(err => console.log(err));

const port = process.env.PORT || 5005;

app.listen(port, () => console.log(`server started on port ${port}`));
