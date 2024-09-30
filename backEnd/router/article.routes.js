const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const router = express.Router();

router.get("/", authenticateToken, (req, res) => {
  res.send("Get articles");
});

router.get("/:id", (req, res) => {
  res.send("Get article by id");
});

router.post("/create", authenticateToken, (req, res) => {
  res.send("Create article");
});

router.put("/:id", authenticateToken, (req, res) => {
  res.send("Update article by id");
});

router.delete("/:id", authenticateToken, (req, res) => {
  res.send("Delete article by id");
});

module.exports = router;
