'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "../../../lib/hooks";
import { callApi } from "../../../lib/callApi";
import toast, { Toaster } from "react-hot-toast";
import { Lock, User, ArrowLeft, LogIn, Eye, EyeOff } from "lucide-react";

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  // const dispatch = useAppDispatch();

  // Hydration-safe state management
  const [isClient, setIsClient] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const user = await callApi('/api/auth/login', 'POST', formData);
      
      if (user.type === 'E') {
        toast.error(user.msg, {
          position: "top-right",
        });
        setError(user.msg);
        setIsLoading(false);
        return;
      }
      localStorage.setItem('authToken', user.token);
      router.push("/dashboard");
      // Store token or user info if needed
      //   localStorage.setItem('userToken', user.token || '');
      
      
      // Reset loading state and navigate
      setIsLoading(false);
      router.push("/dashboard");
    } catch (err) {
      console.log(err)
      toast.error('Login failed. Please try again.', {
        position: "top-right",
      });
      return
  
 
  }
    }


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = formData;

    // Basic validation
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    handleLogin();
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleRegisterRedirect = () => {
    router.push("/register");
  };

  // Prevent rendering on server
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4 relative">
      <button
        type="button"
        className="absolute top-5 left-5 bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors flex items-center"
        onClick={handleBack}
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back
      </button>

      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
          <div className="p-8">
            {/* <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Lock className="h-12 w-12 text-blue-600" />
              </div>
            </div> */}

            <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
             Physiyoga
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full pl-10 pr-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <Lock className="h-5 w-5 text-gray-400" />
  </div>
  <input
    type={passwordVisible ? 'text' : 'password'}
    id="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
    disabled={isLoading}
    className="w-full pl-10 pr-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
    placeholder="Enter your password"
  />
  <button
    type="button"
    className="absolute right-2 top-1/2 transform -translate-y-1/2"
    onClick={togglePasswordVisibility}
    aria-label="Toggle password visibility"
  >
    {passwordVisible ? (
      <EyeOff className="h-5 w-5 text-gray-400" />
    ) : (
      <Eye className="h-5 w-5 text-gray-400" />
    )}
  </button>
</div>
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <LogIn className="h-6 w-6 mr-2" />
                    Login
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                New to our service?{' '}
                <span 
                  onClick={!isLoading ? handleRegisterRedirect : undefined}
                  className={`text-blue-600 hover:text-blue-700 cursor-pointer font-semibold ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                >
                  Create an account
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;