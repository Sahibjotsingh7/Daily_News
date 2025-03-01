import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate  , Link} from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext"; // Import useAuth
import '../App.css'

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make your API call to authenticate the user
    const response = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      const userInfo = {
         name:data.userinfo.name,
         email:data.userinfo.email,
         islogedin:true
      }
      login( userInfo, data.token); // Store user data and token in context and localStorage
      navigate("/"); // Redirect to dashboard
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 >Welcome Back</h1>
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        <p style={{color:"black" , marginTop:"10px"}}>
        <Link to="/forgot-password"  style={{  marginTop:"10px"}}>Forgot Password ?</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
