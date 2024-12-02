'use client'; // Add this at the top of the file to mark the component as a Client Component

// src/app/login/page.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";  // Use "next/navigation" in Next.js 13+
import "./Login.css";  // Import your CSS file

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const { username, password } = formData;
    if (username === "admin" && password === "password") {
      localStorage.setItem("token", "dummyToken"); // Simulated token
      router.push("/dashboard"); // Redirect to the dashboard
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  const handleBack = () => {
    router.push("/"); // Navigate to the home page ("/")
  };

  const handleRegisterRedirect = () => {
    router.push("/register"); // Redirect to the register page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <button className="back-btn" onClick={handleBack}>← Back</button>
        <h2>Physiyoga Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <p className="ppp">
          New user?{" "}
          <span className="register-link" onClick={handleRegisterRedirect}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
