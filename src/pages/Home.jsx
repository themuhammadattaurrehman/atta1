import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import Actions from "./Actions";
import Status from "./Status";
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const [users, setUsers] = useState([]);
  // const [error, setError] = useState(""); // Added error state
  const [logs, setLogs] = useState([]);
  const [pageViews, setPageViews] = useState([]);
  const history = useNavigate();
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [activeUserwCount, setActiveUserwCount] = useState(0);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('daily');
  const [periodw, setPeriodw] = useState('daily');
  useEffect(() => {

    
      const token = localStorage.getItem('token'); // Check for the token
  
      if (!token) {
        // If token is not present, redirect to the login page
        history('/'); // Adjust the path based on your routing setup
      }
      fetchweeklyUsers();
      fetchActiveUsers();
      fetchPageViews();
    fetchUsers();
    getActivityLogs();
  }, [history]);
  const fetchPageViews = async () => {
    try {
      const response = await fetch('http://localhost:5000/Admin/analytics/page-views');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      setPageViews(data.pageViews[0].views);
    } catch (error) {
      setError(error.message);
    }
  };


  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Admin/users'); // Ensure this endpoint is correct
      console.log(response.data); // Log the response data
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching users:", err); // Log the error for debugging
      setError(err.response?.data?.message || 'Failed to fetch users');
    }
  };

  const fetchActiveUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/Admin/analytics/active-users?period=${period}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data)
      setActiveUserCount(data.activeUsers);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchweeklyUsers = async () => {
    try {
      const response = await fetch(`http://localhost:5000/Admin/analytics/active-users?period=${periodw}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setActiveUserwCount(data.activeUsers);
    } catch (error) {
      setError(error.message);
    }
  }; 

  const getActivityLogs = async () => {
    try {
      // Construct the query parameters
      // const queryParams = new URLSearchParams();
      // if (userId) queryParams.append('userId', userId);
      // if (action) queryParams.append('action', action);
      // if (timestamp) queryParams.append('timestamp', timestamp);
  
      // Make the GET request to the API
      const response = await fetch(`http://localhost:5000/Admin/activity`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch activity logs');
      }
  
      const logs = await response.json();
      console.log(logs); // Log the fetched activity logs
      setLogs(logs);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    }
  };
  

  
  return (
    <div className="h-full bg-gray-100">
      <div className="flex gap-4 bg-gray-100 mb-4">
        <div className="flex-1 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden p-4">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-blue-600">Daily Active User</h2>
            <p className="text-gray-600">{activeUserCount}</p>
            <p className="text-sm text-gray-500">Views today</p>
          </div>
        </div>

        <div className="flex-1 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden p-4">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-green-600">Weekly Active User</h2>
            <p className="text-gray-600">{activeUserwCount}</p>
            <p className="text-sm text-gray-500">Views this week</p>
          </div>
        </div>

        <div className="flex-1 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden p-4">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-purple-600">Total Page Views</h2>
            <p className="text-gray-600">{pageViews}</p>
            <p className="text-sm text-gray-500">Total views</p>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
      <Status users={users} fetchusers={fetchUsers} />
      <Actions logs={logs} get={getActivityLogs}/>
    </div>
  );
};

export default Home;