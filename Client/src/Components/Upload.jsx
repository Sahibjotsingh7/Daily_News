// Upload.jsx
import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import sideImage from "../Images/freepik__background__95203.png";

const Upload = () => {
  const [article, setArticle] = useState({ topic: "", heading: "", description: "" });

  const handleChange = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8080/api/articles/add", article, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Article added successfully");
      setArticle({ topic: "", heading: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Error adding article", error);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <h1>Share Your Expertise</h1>
        <p className="subtitle">Contribute valuable knowledge to our community</p>
      </div>
      <div className="inner-upload">
        <div className="left-image">
          <img src={sideImage} alt="Decorative background" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="topic">Topic</label>
            <input
              type="text"
              id="topic"
              name="topic"
              value={article.topic}
              placeholder="Enter topic"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="heading">Heading</label>
            <input
              type="text"
              id="heading"
              name="heading"
              value={article.heading}
              placeholder="Enter heading"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={article.description}
              placeholder="Share your knowledge..."
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Publish Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;