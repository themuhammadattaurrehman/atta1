// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("user"); // Default role
  const navigate = useNavigate();
  const [id, setId] = useState(); // Corrected state variable name
  const [showPassword, setShowPassword] = useState(false); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Submitting login with:", { email, password }); // Debugging line

    try {
      const response = await axios.post('http://localhost:5000/Admin/users/login', { email, password });
      const { token, role: userRole, name, id: userId } = response.data; // Renamed id to userId
      setId(userId); // Set the user ID from the response

      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);
      localStorage.setItem('name', name);
      localStorage.setItem('id', userId); // Store userId in local storage

      if (role === 'user') { 
      handleLogActivity(userId); // Pass userId to log activity
      }
      // Redirect based on user role
      if (userRole === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/user'); // Adjust this route as needed
      }
    } catch (err) {
      console.error("Login error:", err); // Debugging line
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const logUserActivity = async (userId, action, details) => {
    try {
      const response = await fetch('http://localhost:5000/Admin/activity/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, action, details }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to log activity');
      }

      const data = await response.json();
      console.log(data.message); // Log success message
    } catch (error) {
      console.error('Error logging activity:', error.message);
    }
  };

  const handleLogActivity = (userId) => {
    const action = 'login'; // Replace with the actual action
    const details = 'User logged in'; // Additional details

    logUserActivity(userId, action, details); // Pass userId to log activity
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Move this here
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm mb-2 font-medium text-gray-700">Email</label>
          <input
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-sm mb-2 font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div> */}
         <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.001 10.001 0 0112 21c-5.523 0-10-4.477-10-10 0-1.5.308-2.925.875-4.175M21 12c0 1.5-.308 2.925-.875 4.175M15.875 6.825A10.001 10.001 0 0112 3c-5.523 0-10 4.477-10 10 0 1.5.308 2.925.875 4.175"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.001 10.001 0 0112 21c-5.523 0-10-4.477-10-10 0-1.5.308-2.925.875-4.175M21 12c0 1.5-.308 2.925-.875 4.175M15.875 6.825A10.001 10.001 0 0112 3c-5.523 0-10 4.477-10 10 0 1.5.308 2.925.875 4.175"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
        <p className="mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;