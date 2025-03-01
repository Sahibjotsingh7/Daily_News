import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaVolumeUp } from "react-icons/fa";

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

  const playAudio = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1; // Speed of speech
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="articles-container">
      <h1>All Articles</h1>
       <div className="inner-articles-container">
       {articles.length === 0 ? (
        <p className="no-articles">No articles available</p>
      ) : (
        articles.map((article) => (
          <div key={article._id} className="article-card">
            <FaVolumeUp className="play-audio" onClick={() => playAudio(article.description)} />
            <h4 className="article-topic">{article.topic}</h4>
            <h3 className="article-heading">{article.heading}</h3>
            <p className="article-description">{article.description}</p>
            <div className="article-footer">
              <span className="article-author">{article.author.name}</span>
              <span className="article-date">{new Date(article.time).toDateString()}</span>
            </div>
          </div>
        ))
      )}
       </div>
    </div>
  );
};

export default Articles;
