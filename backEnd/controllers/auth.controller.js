const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Session = require("../models/Session");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const session = await Session.create({
      token,
      user: user._id,
    });

    if (!session) {
      return res.status(500).json({ message: "Session creation failed" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const cutToken = req.headers.authorization.split(" ")[1];
    console.log(cutToken)
    await Session.deleteOne({ token: cutToken });
    const isError = await Session.findOne({ token: cutToken });
    if (isError) {
      return res.status(500).json({
        success: false,
        message: "Session not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const isSuccess = await User.findOne({ _id: user._id });
    if (isSuccess) {
      res.status(200).json({
        success: true,
        message: "User created successfully",
      });
    }
    res.status(404).json({
      success: false,
      message: "User created failed",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { login, logout, createUser };
