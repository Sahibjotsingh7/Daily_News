import React, { useEffect, useState, useCallback } from "react";
import "../App.css"; // Import CSS file
import defaultImage from "../Images/defaultnewsimage.jpg";
import AdComponent from "./Add";

// Updated API Key and Base URL for currentsapi
const API_KEY = "iIiFsXASZEXAAR0FZb7Vb6exFlEPX4-M6vm43K56sIqD-gJL"; // Your updated API key
const sample = "smaple";
const CATEGORIES = [
  "world",
  "regional",
  "sports",
  "business",
  "technology",
  "finance",
  "health",
  "food",
];
const COUNTRIES = {
  India: "in",
  "United States": "us",
  "United Kingdom": "gb",
  Pakistan: "pk",
  Canada: "ca",
};

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("world");
  const [country, setCountry] = useState("India"); // Default country
  const [modalArticle, setModalArticle] = useState(null);
  const [showBreakingNews, setShowBreakingNews] = useState(true); // State to control breaking news visibility

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const countryCode = COUNTRIES[country]; // Get the country code from the selected country
      const url = `https://api.currentsapi.services/v1/latest-news?category=${category}&country=${countryCode}&apiKey=${sample}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log(data); // Log to check the response structure

      // Check if the 'news' array is available and not empty
      if (data.news && data.news.length === 0) {
        console.warn("No more news to load.");
      }

      // Update the articles state
      setArticles(data.news || []);

      // Reset the breaking news visibility whenever new data is fetched
      setShowBreakingNews(true);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  }, [category, country]);

  useEffect(() => {
    fetchNews();
  }, [category, country, fetchNews]);

  const openModal = (article) => {
    setModalArticle(article);
  };

  const closeModal = () => {
    setModalArticle(null);
  };

  return (
    <div className="news-container">
      {/* Navbar with Category Filter and Country Selector */}
      <nav style={{ padding: '10px', margin: "10px 0px", background: "#A1A1A1", borderRadius: "5px"  , marginTop:"50px", width:"90%"}}>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", alignItems: "center" }}>
          {/* Category Filter */}
          <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', margin: 0, padding: 0, gap: "10px" }}>
            {CATEGORIES.map((cat) => (
              <li key={cat} style={{ margin: '0 5px' }}>
                <button
                  style={{
                    color: category === cat ? 'red' : 'black',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '16px',
                    background: "transparent",
                  }}
                  onClick={() => setCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          {/* Country Selector */}
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            style={{
              padding: "5px",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              background: "gray"
            }}
          >
            {Object.keys(COUNTRIES).map((countryName) => (
              <option key={countryName} value={countryName}>
                {countryName}
              </option>
            ))}
          </select>
        </div>
      </nav>
    
      {/* Breaking News Section */}
      {showBreakingNews && articles.length > 0 && (
        <div
          className="breaking_news"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
            background: "red",
            color: "white",
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <span>Breaking News: {articles[0].title}</span>
          <button
            onClick={() => setShowBreakingNews(false)} // Hide the breaking news
            style={{
              background: "transparent",
              border: "none",
              color: "white",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            &times;
          </button>
        </div>
      )}
      <AdComponent/>

      {/* News Feed */}
      <div className="news-feed">
        {articles.length > 0 && (
          <>
            {/* First News Card (Distinct Style) */}
            <div
              className="featured-news-card"
              onClick={() => openModal(articles[0])}
              style={{
                backgroundImage: `url(${articles[0].image || defaultImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px",
                position: "relative",
                marginBottom: "20px",
                borderRadius: "10px",
                overflow: "hidden",
                gridColumn: "span 2", // Span two columns
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  background: "rgba(0, 0, 0, 0.1)",
                  color: "white",
                  padding: "15px",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <h2 style={{ margin: "0", fontSize: "24px" }}>{articles[0].title}</h2>
              </div>
            </div>

            {/* Remaining News Cards */}
            <div style={{ display: "contents" }}>
              {articles.slice(1).map((article, index) => (
                <div
                  key={index}
                  className="news-card"
                  onClick={() => openModal(article)}
                  style={{
                    gridColumn: "span 1", // Each card spans one column
                  }}
                >
                  <img
                    src={article.image || defaultImage}
                    alt={article.title}
                    className="news-image"
                    onError={(e) => { e.target.src = defaultImage; }} // Fallback in case the image fails to load
                  />
                  <div className="news-content">
                    <h2 className="news-heading">{article.title}</h2>
                    <div className="news-footer">
                      <span className="news-source">{article.author}</span>
                      <span className="news-date">
                        {new Date(article.published).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Loading Indicator */}
      {loading && <p className="loading-text">Loading news...</p>}

      {/* Modal */}
      {modalArticle && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            {modalArticle.image && (
              <img src={modalArticle.image} alt={modalArticle.title} className="modal-image" />
            )}
            <h2 className="modal-title">{modalArticle.title}</h2>
            <p className="modal-description">{modalArticle.description || "No description available."}</p>
            <a href={modalArticle.url} target="_blank" rel="noopener noreferrer" className="modal-news-link">
              Read Full Article →
            </a>
            <div className="modal-footer">
              <span>{modalArticle.author}</span>
              <span>{new Date(modalArticle.published).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;