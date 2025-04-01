import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaVolumeUp, FaPause } from "react-icons/fa"; // Added FaPause icon

import "../App.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [playingStates, setPlayingStates] = useState({}); // Track playing state for each article
  const [speechInstances, setSpeechInstances] = useState({}); // Store speech instances

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/articles/all");
        setArticles(response.data);
        setFilteredArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles", error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const results = articles.filter(article =>
      article.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.topic.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(results);
  }, [searchTerm, articles]);

  const toggleAudio = (articleId, text) => {
    const isPlaying = playingStates[articleId];

    if (!isPlaying) {
      // Play audio
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;
      
      // When speech ends, reset state
      speech.onend = () => {
        setPlayingStates(prev => ({ ...prev, [articleId]: false }));
      };

      window.speechSynthesis.speak(speech);
      setSpeechInstances(prev => ({ ...prev, [articleId]: speech }));
      setPlayingStates(prev => ({ ...prev, [articleId]: true }));
    } else {
      // Pause audio
      window.speechSynthesis.pause();
      setPlayingStates(prev => ({ ...prev, [articleId]: false }));
    }
  };

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="articles-container">
      <h1>All Articles</h1>
      <div className="search-container-article ">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input-article"
        />
      </div>
      <div className="inner-articles-container">
        {filteredArticles.length === 0 ? (
          <p className="no-articles">
            {searchTerm ? "No matching articles found" : "No articles available"}
          </p>
        ) : (
          filteredArticles.map((article) => (
            <div key={article._id} className="article-card">
              {playingStates[article._id] ? (
                <FaPause
                  className="play-audio"
                  onClick={() => toggleAudio(article._id, article.description)}
                />
              ) : (
                <FaVolumeUp
                  className="play-audio"
                  onClick={() => toggleAudio(article._id, article.description)}
                />
              )}
              <h4 className="article-topic">{article.topic}</h4>
              <h3 className="article-heading">{article.heading}</h3>
              <p className="article-description">{article.description}</p>
              <div className="article-footer">
                <span className="article-author">{article.author.name}</span>
                <span className="article-date">
                  {new Date(article.time).toDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Articles;