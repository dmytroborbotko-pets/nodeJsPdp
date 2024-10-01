const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) return res.sendStatus(403);

    const dbUser = await User.findOne({ email: user.email });
    req.user = dbUser;
    next();
  });
};

module.exports = authenticateToken;
