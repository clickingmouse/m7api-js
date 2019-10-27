const jwt = require("jsonwebtoken");

// to get token
function auth(req, res, next) {
  console.log("/user, auth...");
  const token = req.header("x-auth-token");

  //check for token
  console.log(token);
  if (!token)
    return res.status(401).json({ msg: "no token, authorization denied" });

  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    console.log("!!!");
    res.status(400).json({ msg: "token not valid" });
  }
}

module.exports = auth;
