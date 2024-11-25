import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "editor", password: "editor123", role: "editor" },
    { username: "viewer", password: "viewer123", role: "viewer" },
  ];

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password, role } = credentials;

    if (username && password && role) {
      const user = users.find(
        (u) =>
          u.username === username && u.password === password && u.role === role
      );

      if (user) {
        localStorage.setItem("userRole", role);
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } else {
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={credentials.role}
          onChange={handleChange}
          required
        >
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="viewer">Viewer</option>
        </select>
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
