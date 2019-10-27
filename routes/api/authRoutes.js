//routes for items
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
//Item model
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const auth = require("../../middleware/auth");
// @ route post api/auth
// @ desc Authenticate the user
// @ access Public
router.post("/", (req, res) => {
  //  console.log("--===>", req.body);
  const { email, password } = req.body;
  //simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }

  // check for existing user.
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    //Validate the password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: { 
              id: user.id, 
              name: user.name, 
              email: user.email 
            }
          });
        }
      );
    });
  });

  //res.send("register");
});

// @ route get api/auth/user
// @ desc Get user data
// @ access Private
router.get("/user", auth, (req, res) => {
  console.log("/user...");
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
