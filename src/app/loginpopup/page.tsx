// @ayushchauhan use this component as BridgeFlowOutput

// const YourComponent = () => {
//     const [isLoginOpen, setIsLoginOpen] = useState(false);
  
//     return (
//       <>
//         <button onClick={() => setIsLoginOpen(true)}>
//           Login
//         </button>
  
//         <LoginModal 
//           isOpen={isLoginOpen}
//           onClose={() => setIsLoginOpen(false)}
//         />
//       </>
//     );
//   };



'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { callApi } from "../../../lib/callApi";
import toast, { Toaster } from "react-hot-toast";
import { Lock, User, LogIn, Eye, EyeOff, X } from "lucide-react";
import { BridgeFlowOutput } from "aws-sdk/clients/mediaconnect";

interface FormData {
  username: string;
  password: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isLoading, onClose]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      onClose();
      router.push("/dashboard");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.error('Login failed. Please try again.', {
        position: "top-right",
      });
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    handleLogin();
  };

  const handleRegisterRedirect = () => {
    onClose();
    router.push("/register");
  };

  if (!isClient || !isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 transition-opacity"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all animate-modal-entry"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={!isLoading ? onClose : undefined}
            disabled={isLoading}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>

          <div className="p-8">
            <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
              Welcome to Physiyoga
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full pl-10 pr-3 py-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50 transition-colors"
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
                    className="w-full pl-10 pr-10 py-2.5 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white disabled:opacity-50 transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
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
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
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

      <style jsx global>{`
        @keyframes modalEntry {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-entry {
          animation: modalEntry 0.2s ease-out;
        }
      `}</style>
      
      <Toaster />
    </>
  );
};

export default LoginModal;