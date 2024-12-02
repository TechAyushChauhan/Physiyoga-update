"use client"; 


import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; 
import "./Register.css"; 

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
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
    setSuccess("");

    const { username, password, confirmPassword } = formData;

    // Basic validation
    if (username === "" || password === "" || confirmPassword === "") {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate successful registration (replace with actual registration logic)
    localStorage.setItem("token", "dummyToken"); // Simulated token
    setSuccess("Registration successful! Redirecting...");
    setTimeout(() => {
      router.push("/dashboard"); // Redirect to the dashboard after successful registration
    }, 2000);
  };

  const handleBack = () => {
    router.push("/"); // Navigate to the home page ("/")
  };

  const handleLoginRedirect = () => {
    router.push("/login"); // Redirect to the login page
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <button className="back-btn" onClick={handleBack}>← Back</button>
        <h2>Register for Physiyoga</h2>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="btn">
            Register
          </button>
        </form>
        <p className="ppp">
          Already a user?{" "}
          <span className="login-link" onClick={handleLoginRedirect}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
