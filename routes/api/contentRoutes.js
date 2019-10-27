// TBD
//routes for content
const express = require("express");
const router = express.Router();

//Item model
const Content = require("../../models/content");

// @ route GET api/content
// @ desc get all content
// @ access Public
router.get("/", (req, res) => {
  Content.find()
    .sort({ date: -1 })
    .then(contents => {
      res.json(contents);
    });
});

// @ route POST api/content
// @ post an item
// @ access Public
router.post("/", (req, res) => {
  console.log("------------------>", req.body);
  const newContent = new Content({
    section: req.body.section,
    title: req.body.title,
    body: req.body.body,
    author: req.body.author
  });

  newContent.save().then(content => res.json(content));
});

// @ route DELETE api/content
// @ delete a content
// @ access Public
router.delete("/:id", (req, res) => {
  //
  Content.findById(req.params.id)
    .then(content => content.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
