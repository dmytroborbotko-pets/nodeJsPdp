const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken");
const {
  getArticles,
  getArticleById,
  createArticle,
  editArticle,
  deleteArticle,
} = require("../controllers/article.controller");
const router = express.Router();

router.get("/", getArticles);

router.get("/:id", getArticleById);

router.post("/create", authenticateToken, createArticle);

router.put("/:id", authenticateToken, editArticle);

router.delete("/:id", authenticateToken, deleteArticle);

module.exports = router;
