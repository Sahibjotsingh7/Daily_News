import React, { useState, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import "../App.css";


const AdminPanel = () => {
  const { user, logout } = useAuth();
  const [articles, setArticles] = useState([]);
  const [lostFoundItems, setLostFoundItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const[Userinfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const userInfo = JSON.parse(localStorage.getItem("user"));
      setUserInfo(userInfo);
      try {
        // Fetch articles
        const articlesRes = await fetch("http://localhost:8080/api/articles/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const articlesData = await articlesRes.json();
        console.log("Articles Response:", articlesRes.ok, articlesData);
        if (articlesRes.ok) setArticles(articlesData);
        else console.error("Articles fetch failed:", articlesData.message);

        // Fetch lost & found items
        const lostFoundRes = await fetch("http://localhost:8080/api/lost&found/lost", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const lostFoundData = await lostFoundRes.json();
        console.log("Lost & Found Response:", lostFoundRes.ok, lostFoundData);
        if (lostFoundRes.ok) setLostFoundItems(lostFoundData);
        else console.error("Lost & Found fetch failed:", lostFoundData.message);

        // Fetch users
        const usersRes = await fetch("http://localhost:8080/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const usersData = await usersRes.json();
        console.log("Users Response:", usersRes.ok, usersData);
        if (usersRes.ok) setUsers(usersData);
        else console.error("Users fetch failed:", usersData.message);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    if (user?.isAdmin) fetchData();
  }, [user]);

  const handleDeleteArticle = async (articleId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8080/api/admin/articles/${articleId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setArticles(articles.filter((article) => article._id !== articleId));
        alert("Article deleted successfully");
      } else {
        console.error("Delete article failed:", data.message);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleDeleteLostFound = async (itemId) => {
    const token = localStorage.getItem("token");
    try {
      console.log("Attempting to delete Lost & Found item with ID:", itemId); // Debug log
      const res = await fetch(`http://localhost:8080/api/admin/lost&found/${itemId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("Delete Lost & Found Response:", res.status, data); // Debug log
  
      if (res.ok) {
        setLostFoundItems(lostFoundItems.filter((item) => item._id !== itemId));
        alert("Lost & Found item deleted successfully");
      } else {
        alert(`Failed to delete item: ${data.message || "Unknown error"}`);
        console.error("Delete lost & found failed:", data.message);
      }
    } catch (error) {
      console.error("Error deleting Lost & Found item:", error);
      alert("An error occurred while deleting the item. Please try again.");
    }
  };
  
  const handleBlockUser = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8080/api/admin/users/block/${userId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.map((u) => (u._id === userId ? { ...u, isBlocked: true } : u)));
        alert("User blocked successfully");
      } else {
        console.error("Block user failed:", data.message);
      }
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleUnblockUser = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:8080/api/admin/users/unblock/${userId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.map((u) => (u._id === userId ? { ...u, isBlocked: false } : u)));
        alert("User unblocked successfully");
      } else {
        console.error("Unblock user failed:", data.message);
      }
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  if (!user?.isAdmin) return <div>Access Denied</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-panel" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Admin Panel</h1>
      <button onClick={logout} style={{ float: "right", padding: "10px", background: "#ff4444", color: "white", border: "none" }}>
        Logout
      </button>
      <div className="Admin_info">
         <h2>Welcome</h2>
        <h3> <strong>{Userinfo.name}</strong></h3>
         <span>{Userinfo.email}</span> 

      </div>

      <section style={{ marginBottom: "40px" }}>
        <h2>Articles</h2>
        {articles.length === 0 ? (
          <p>No articles found</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Topic</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Heading</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article._id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{article.topic || "Untitled"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{article.heading || "No heading"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <button
                      onClick={() => handleDeleteArticle(article._id)}
                      style={{ background: "#ff4444", color: "white", border: "none", padding: "5px 10px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Lost & Found Items</h2>
        {lostFoundItems.length === 0 ? (
          <p>No lost & found items found</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Product</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Day of Upload</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {lostFoundItems.map((item) => (
                <tr key={item._id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.productName || "No name"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.description || "No description"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {item.time ? new Date(item.time).toLocaleDateString() : "Unknown"}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <button
                      onClick={() => handleDeleteLostFound(item._id)}
                      style={{ background: "#ff4444", color: "white", border: "none", padding: "5px 10px" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2>Users</h2>
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{u.name}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{u.email}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{u.isBlocked ? "Blocked" : "Active"}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {u.isBlocked ? (
                      <button
                        onClick={() => handleUnblockUser(u._id)}
                        style={{ background: "#44ff44", color: "white", border: "none", padding: "5px 10px" }}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockUser(u._id)}
                        style={{ background: "#ff4444", color: "white", border: "none", padding: "5px 10px" }}
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;