const Article = require("../Models/Article");

// Create a new article
exports.addArticle = async (req, res) => {
  try {
    const { topic, heading, description } = req.body;
    const userId = req.user.id; // Extracted from JWT token

    if (!topic || !heading || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newArticle = new Article({
      topic,
      heading,
      description,
      author: userId,
    });

    await newArticle.save();
    res.status(201).json({ message: "Article created successfully", newArticle });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate("author", "name email");
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get articles by a particular user
exports.getArticlesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const articles = await Article.find({ author: userId });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an article
exports.updateArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const { topic, heading, description } = req.body;
    const userId = req.user.id;

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    article.topic = topic || article.topic;
    article.heading = heading || article.heading;
    article.description = description || article.description;

    await article.save();
    res.status(200).json({ message: "Article updated successfully", article });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const { articleId } = req.params;
    const userId = req.user.id;

    const article = await Article.findById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await Article.findByIdAndDelete(articleId);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
