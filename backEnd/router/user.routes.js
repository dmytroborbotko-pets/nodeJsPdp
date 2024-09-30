const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

router.get("/:id", authenticateToken, (req, res) => {
  res.send("Get user by id");
});

router.put("/:id", authenticateToken, (req, res) => {
  res.send("Update user by id");
});

router.delete("/:id", authenticateToken, (req, res) => {
  res.send("Delete user by id");
});

module.exports = router;
