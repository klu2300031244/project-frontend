import { useState } from "react";
import "../css/LoginForm.css";
import HomeNavbar from "../NavBars/HomeNavbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8081/auth/login", null, {
        params: { email, password },
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        const { id, role, name } = response.data;

        // Store user details
        localStorage.setItem("employeeId", id);
        localStorage.setItem("role", role);
        localStorage.setItem("userName", name || (role === "MANAGER" ? "Manager" : "Employee"));

        // For managers, set managerId (assuming id is same as managerId)
        if (role === "MANAGER") {
          localStorage.setItem("managerId", id);
        }

        // Redirect based on role
        if (role === "MANAGER") {
          navigate("/managerdashboard");
        } else if (role === "EMPLOYEE") {
          navigate("/employeedashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div>
      <HomeNavbar />
      <div className="container">
        <div className="card">
          <a className="login">Log in</a>
          <div className="inputBox">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="user">Email</span>
          </div>
          <div className="inputBox">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>Password</span>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button className="enter" onClick={handleLogin}>
            Enter
          </button>
          <div className="message">
            Dont have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;