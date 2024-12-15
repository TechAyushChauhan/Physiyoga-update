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
  const handleRegister=async()=>{
    const user=await callApi('/api/auth/register','POST',{username:formData.username,password:formData.password,mobileOrEmail:formData.mobileOrEmail})
    if (user.type=='E') {
      toast.error(user.msg, {
        position: "top-right",
      
      });
      return
  }; 
  localStorage.setItem('authToken', user.token);
    router.push("/dashboard"); 
  }

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
    handleRegister()
   
  };

  const handleBack = () => {
    router.push("/"); 
  };

  const handleLoginRedirect = () => {
    router.push("/login"); // Redirect to the login page
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#2c3e50] to-[#1a252f] font-sans relative">
      <div className="bg-[#1e2a33] p-10 rounded-xl shadow-lg max-w-md w-full text-center">
        <button 
          className="absolute top-4 left-4 bg-[#34495e] text-[#ecf0f1] text-sm font-bold py-2 px-4 rounded-md hover:bg-[#16a085]"
          onClick={handleBack}
        >
          ← Back
        </button>
        <h2 className="text-[#f39c12] text-2xl font-bold uppercase mb-6">
          Register for Physiyoga
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 text-left">
            <label htmlFor="username" className="block text-[#bdc3c7] text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-[#7f8c8d] rounded-lg bg-[#34495e] text-[#ecf0f1] focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
              required
            />
          </div>
          <div className="mb-6 text-left">
            <label htmlFor="password" className="block text-[#bdc3c7] text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-[#7f8c8d] rounded-lg bg-[#34495e] text-[#ecf0f1] focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
              required
            />
          </div>
          <div className="mb-6 text-left">
            <label htmlFor="confirmPassword" className="block text-[#bdc3c7] text-sm font-bold mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-[#7f8c8d] rounded-lg bg-[#34495e] text-[#ecf0f1] focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
              required
            />
          </div>
          <div className="mb-6 text-left">
            <label htmlFor="mobileOrEmail" className="block text-[#bdc3c7] text-sm font-bold mb-2">Mobile Number or Email</label>
            <input
              type="text"
              id="mobileOrEmail"
              name="mobileOrEmail"
              value={formData.mobileOrEmail}
              onChange={handleChange}
              className="w-full p-3 border border-[#7f8c8d] rounded-lg bg-[#34495e] text-[#ecf0f1] focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
              required
            />
          </div>
          {error && <p className="text-[#e74c3c] text-xs mb-4">{error}</p>}
          {success && <p className="text-[#2ecc71] text-xs mb-4">{success}</p>}
          <button 
            type="submit" 
           
            className="w-full bg-[#f39c12] text-white font-semibold py-3 rounded-lg hover:bg-[#e67e22] focus:outline-none"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-sm text-[#bdc3c7]">
          Already a user?{" "}
          <span 
            className="text-[#f39c12] hover:text-[#e67e22] cursor-pointer"
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
