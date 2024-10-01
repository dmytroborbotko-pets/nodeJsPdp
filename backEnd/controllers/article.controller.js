const Article = require("../models/Article");

const getArticles = async (req, res) => {
  try {
    let articles;
    if (req.headers.authorization) {
      articles = await Article.find({});
    } else {
      articles = await Article.find({ type: "public" });
    }
    let updArticles = articles.map((article) => {
      return { _id: article._id, title: article.title };
    });
    const { search, limit } = req.query;

    if (search) {
      updArticles = articles.filter((article) =>
        article.title.includes(search)
      );
    }

    if (limit) {
      updArticles = articles.slice(0, limit);
    }

    if (updArticles.length < 1) {
      res.status(200).json({ success: true, data: [] });
    }

    res.status(200).json({ success: true, data: updArticles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);
    const article = await Article.findOne({ _id: newArticle._id });
    if (!article) {
      return res.status(400).json({ error: "Failed to create article" });
    }
    res
      .status(201)
      .json({ success: true, message: "Article created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    if (article.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to edit this article" });
    }

    const updatedArticle = await Article.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    if (!updatedArticle) {
      return res.status(400).json({ error: "Failed to update article" });
    }

    res.status(200).json({
      success: true,
      message: "Article updated successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    if (article.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this article" });
    }
    await Article.findOneAndDelete({ _id: req.params.id });
    res
      .status(200)
      .json({ success: true, message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  editArticle,
  deleteArticle,
};
