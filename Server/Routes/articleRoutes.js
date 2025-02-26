const express = require("express");
const {
  addArticle,
  getAllArticles,
  getArticlesByUser,
  updateArticle,
  deleteArticle,
} = require("../Controllers/articleController");
const authenticateToken = require("../Middlewares/tokenVelidation");

const router = express.Router();

router.post("/add", authenticateToken, addArticle);
router.get("/all", getAllArticles);
router.get("/user", authenticateToken, getArticlesByUser);
router.put("/update/:articleId", authenticateToken, updateArticle);
router.delete("/delete/:articleId", authenticateToken, deleteArticle);

module.exports = router;
