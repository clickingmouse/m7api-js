require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const multer = require("multer");

//const upload = multer({ storage: multer.memoryStorage() });
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

const app = express();

const contentRoutes = require("./routes/api/contentRoutes");
const appRoutes = require("./routes/api/appRoutes");
const userRoutes = require("./routes/api/userRoutes");
const authRoutes = require("./routes/api/authRoutes");
//app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);

// for parsing multipart/form-data
//app.use(upload.none());
//app.use(express.static("public"));

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

console.log("...", mongoose.connection.readyState);
//--
//-
const storage = new GridFsStorage({
  url: atlasDB,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // if you are using a separate collection to store data
      // there is no need to save this information on the metadata
      // because you'll probably never use it
      //console.log("fileName", buf.toString("hex"));
      console.log(file);
      console.log(file.originalname);
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "app-logos"
        };
        console.log("[" + fileInfo.filename + "]");
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({
  storage
});

//app.use("/api/content", contentRoutes);

app.use("/api/apps", upload.single("logoFile"), appRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
//app.use("/api/apps", appRoutes);
const port = process.env.PORT || 5005;

app.listen(port, () => console.log(`server started on port ${port}`));
