"use client";  

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { callApi } from "../../../lib/callApi";

import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

// Define the type for the form data
interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
  mobileOrEmail: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmPassword: "",
    mobileOrEmail: "",
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

  const handleRegister = async () => {
    const user = await callApi("/api/auth/register", "POST", {
      username: formData.username,
      password: formData.password,
      mobileOrEmail: formData.mobileOrEmail,
    });
    if (user.type === "E") {
      toast.error(user.msg, {
        position: "top-right",
      });
      return;
    }
    localStorage.setItem("authToken", user.token);
    router.push("/dashboard");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, password, confirmPassword, mobileOrEmail } = formData;

    if (username === "" || password === "" || confirmPassword === "" || mobileOrEmail === "") {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    localStorage.setItem("token", "dummyToken"); // Simulated token
    setSuccess("Registration successful! Redirecting...");
    handleRegister();
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleLoginRedirect = () => {
    router.push("/login"); // Redirect to the login page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 font-sans relative">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <button 
          className="absolute top-4 left-4 bg-gray-300 text-gray-700 text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gray-400"
          onClick={handleBack}
        >
          ← Back
        </button>
        <h2 className="text-gray-800 text-2xl font-bold uppercase mb-6">
          Register for Physiyoga
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 text-left">
            <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6 text-left">
            <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6 text-left">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6 text-left">
            <label htmlFor="mobileOrEmail" className="block text-gray-700 text-sm font-medium mb-2">Mobile Number or Email</label>
            <input
              type="text"
              id="mobileOrEmail"
              name="mobileOrEmail"
              value={formData.mobileOrEmail}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
          {success && <p className="text-green-500 text-xs mb-4">{success}</p>}
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-sm text-gray-600">
          Already a user?{" "}
          <span 
            className="text-blue-500 hover:text-blue-600 cursor-pointer"
            onClick={handleLoginRedirect}
          >
            Login here
          </span>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
