const express = require("express");
const { login, createUser, logout } = require("../controllers/auth.controller");
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

router.post("/login", login);

router.get("/logout", authenticateToken, logout);

router.post("/register", createUser);

module.exports = router;
