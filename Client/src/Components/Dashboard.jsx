import React, { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "../App.css";
import axios from "axios";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/articles/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles", error);
      }
    };
    fetchArticles();
  }, []);

  const deleteArticle = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/articles/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(articles.filter((article) => article._id !== id));
    } catch (error) {
      console.error("Error deleting article", error);
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  const userInfo = localStorage.getItem("user");
  const userData = userInfo ? JSON.parse(userInfo) : {};

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <FaUserCircle className="user-icon" />
        <h2 className="user-name">{userData?.name || "Guest"}</h2>
        <p className="user-email">{userData?.email || "No email available"}</p>
        <button onClick={logout} className="logout-button">Logout</button>
        <button className="change-password-button" onClick={() => navigate("/reset-password")}>
          Change Password
        </button>
      </div>
      <div className="dashboard-content">
        <h1 className="content-title">Your Articles</h1>
        {articles.length === 0 ? (
          <p>No articles found</p>
        ) : (
          <div>
            {articles.map((article) => (
              <div key={article._id} className="article-item">
                <h3>{article.heading}</h3>
                <p>{article.description}</p>
                <button className="delete-button" onClick={() => deleteArticle(article._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;