import { useEffect, useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom';
const User = () => {
  const [id, setId] = useState('');
  const history = useNavigate();
  // Sample data to be downloaded as CSV
  const data = [
    { name: 'John Doe', email: 'john@example.com', age: 28 },
    { name: 'Jane Smith', email: 'jane@example.com', age: 34 },
    { name: 'Alice Johnson', email: 'alice@example.com', age: 25 },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token'); // Check for the token
  
    if (!token) {
      // If token is not present, redirect to the login page
      history('/'); // Adjust the path based on your routing setup
    }
    const storedId = localStorage.getItem('id');
    if (storedId) {
      setId(storedId); // Set the ID in state
      handleLogActive(storedId); // Log activity only if ID is available
    }
}, []);

  // Function to convert data to CSV format
  const convertToCSV = (array) => {
    const header = Object.keys(array[0]).join(',') + '\n';
    const rows = array.map(obj => Object.values(obj).join(',')).join('\n');
    return header + rows;
  };

  // Function to handle CSV download
  const downloadCSV = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.csv'); // Set the file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
    handleLogActivity(id); // Pass the ID to log activity
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
    const action = 'download'; // Replace with the actual action
    const details = 'User downloaded something'; // Additional details

    logUserActivity(userId, action, details);
  };

  const handleLogActive = (userId) => {
    const action = 'view'; // Replace with the actual action
    const details = 'User viewed dashboard'; // Additional details

    logUserActivity(userId, action, details);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          User Dashboard
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Welcome to the user dashboard! Here you can manage your profile, view your activities, and access important information.
        </p>
        <button 
          onClick={downloadCSV} 
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default User; 