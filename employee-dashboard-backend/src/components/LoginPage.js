import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../services/api';

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!id || !password) {
      setError("Please enter both ID and password");
      return;
    }
    if (id === "admin" && password === "adminpass") {
      navigate("/admin-dashboard");
    } else if (id === "employee" && password === "employeepass") {
      navigate("/employee-dashboard");
    } else {
      setError("Invalid ID or password");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div>
        <label>ID</label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
