import React, { useState } from "react";
import axios from "axios";
import "../App.css";

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
    } catch (error) {
      console.error("Error adding article", error);
    }
  };

  return (
    <div className="upload-container">
      <h2>Add Article</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="topic" placeholder="Topic" onChange={handleChange} required />
        <input type="text" name="heading" placeholder="Heading" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required />
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Upload;