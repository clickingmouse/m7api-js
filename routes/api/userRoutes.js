//routes for items
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//Item model
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
// @ route GET api/users
// @ desc Register new user
// @ access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  //simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  // check for existing user.
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password
    });

    // create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          //jwt insert

          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: { id: user.id, name: user.name, email: user.email }
              });
            }
          );

          // res.json({
          //   user: { id: user.id, name: user.name, email: user.email }
          // });
        });
      });
    });
  });

  //res.send("register");
});

module.exports = router;
