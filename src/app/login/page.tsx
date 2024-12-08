'use client';

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { increment } from "../../../store/slices/counterSlice";
import { callApi } from "../../../lib/callApi";
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch()
  console.log(count)
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
  const handleLogin=async()=>{

    const user=await callApi('/api/auth/login','POST',formData)
    if (user.type=='E') {
      toast.error(user.msg, {
        position: "top-right",
      
      });
      return
  }; 
  router.push("/dashboard");
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setError("");

    // const { username, password } = formData;
    handleLogin()
    
    // if (username === "admin" && password === "password") {

    //   localStorage.setItem("token", "dummyToken");
    //   router.push("/dashboard");
    // } else {
    //   setError("Invalid username or password. Please try again.");
    // }
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
    return
    handleIncrement()
  };
  const handleIncrement = () => {
    dispatch(increment());
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#2c3e50] to-[#1a252f] font-sans relative">
    

      
      <button
        className="absolute top-5 left-5 bg-[#34495e] text-[#ecf0f1] px-3 py-2 rounded-md text-sm font-bold hover:bg-[#16a085] hover:text-white"
        onClick={handleBack}
      >
        ← Back
      </button>

      {/* Login Box */}
      <div className="bg-[#1e2a33] p-10 rounded-xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-[#f39c12] text-xl font-bold uppercase mb-6">
          Physiyoga Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="text-left">
            <label htmlFor="username" className="block text-[#bdc3c7] text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-[#34495e] text-[#ecf0f1] border border-[#7f8c8d] focus:outline-none focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12]"
            />
          </div>

          {/* Password Field */}
          <div className="text-left">
            <label htmlFor="password" className="block text-[#bdc3c7] text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md bg-[#34495e] text-[#ecf0f1] border border-[#7f8c8d] focus:outline-none focus:ring-2 focus:ring-[#f39c12] focus:border-[#f39c12]"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-[#e74c3c] text-sm">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#f39c12] text-white py-3 rounded-md font-bold text-lg hover:bg-[#e67e22] transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="pt-5">
          New user?{" "}
          <span
            className="text-[#f39c12] cursor-pointer underline hover:text-[#e67e22]"
            onClick={handleRegisterRedirect}
          >
            Register here
          </span>
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
