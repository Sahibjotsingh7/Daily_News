import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/articles/all");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles", error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="articles-container">
      <h1>All Articles</h1>
      {articles.length === 0 ? (
        <p>No articles available</p>
      ) : (
        articles.map((article) => (
          <div key={article._id} className="article-card">
            <h3>{article.heading}</h3>
            <p>{article.description}</p>
            <p className="author">By: {article.author.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Articles;