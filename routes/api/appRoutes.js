// TBD
//routes for content
require("dotenv").config();
const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const { createReadStream } = require("fs");
const { createModel } = require("mongoose-gridfs");
var mongo = require("mongodb");

const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

// const atlasDB = process.env.ATLAS_URI;
// console.log(atlasDB);

// const upload = multer({ dest: "uploads/" });
//const upload = multer({ storage: multer.memoryStorage() });
//
//
///
// use default bucket
//const Attachment = createModel();

let conn = mongoose.connection;
//let multer = require('multer');
//let GridFsStorage = require("multer-gridfs-storage");
//let Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;
//let gfs = Grid(conn.db);
//let port = 3000;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("app-logos");
});

////
///
//
//

//Item model
const Content = require("../../models/content");
const App = require("../../models/apps");

// @ route GET api/app
// @ desc get all apps
// @ access Public
router.get("/", (req, res) => {
  console.log("got a api/app request");
  App.find()
    .sort({ date: -1 })
    .then(apps => {
      console.log("found ...");
      console.log(apps);
      res.json(apps);
    });
});

// @ route POST api/app
// @ add a new app
// @ access Public
router.post("/", (req, res) => {
  //  console.log(req.body);

  // console.log(req.body.logoFile);
  // const data = JSON.parse(req.body);
  // console.log(data);
  const formData = req.body;
  // console.log(req.file);
  // console.log("------------------>", req.body);
  // console.log("---------1--------->", req.body.appName);
  // console.log("---------2--------->", req.file.id);

  const newApp = new App({
    appName: req.body.appName,
    appDescription: req.body.appDescription,
    logoFileID: req.file.id,
    authorName: req.body.authorName,
    authorID: req.body.authorID
  });
  console.log("saving to db", newApp);
  newApp.save().then(app => res.json(app));
});

// @ route DELETE api/app
// @ delete a app
// @ access Public
router.delete("/:id", (req, res) => {
  //
  App.findById(req.params.id)
    .then(app => app.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route GET /image/:filename
//gfs.findOne({ _id: '54da7b013706c1e7ab25f9fa'}, function (err, file) {
// @desc Display Image
router.get("/image/:fileID", (req, res) => {
  console.log("request for [" + req.params.fileID + "]");
  // let ObjectID2 = mongoose.mongo.BSONPure.ObjectID; //First, get ObjectID

  //  gfs.files.findOne({ _id: ObjectID2(req.params.fileID) }, (err, file) => {
  gfs.files.findOne(
    { _id: new mongoose.mongo.ObjectID(req.params.fileID) },
    (err, file) => {
      //gfs.files.find({ _id: req.params.fileID }, (err, file) => {
      console.log(file);
      // Check if file
      if (!file || file.length === 0) {
        console.log("no file exists");
        return res.status(404).json({
          err: "No file exists"
        });
      }

      // Check if image
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
      ) {
        // Read output to browser
        console.log("is image");
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image"
        });
      }
    }
  );
});

module.exports = router;
