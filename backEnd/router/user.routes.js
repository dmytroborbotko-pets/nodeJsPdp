const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const {
  getUserById,
  editUser,
  deleteUser,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/:id", authenticateToken, getUserById);

router.put("/:id", authenticateToken, editUser);

router.delete("/:id", authenticateToken, deleteUser);

module.exports = router;
