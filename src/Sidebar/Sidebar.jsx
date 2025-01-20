import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Retrieve the user role from local storage
    const role = localStorage.getItem('role');
    if (role) {
      setUserRole(role);
    }
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1 sm:left-40 md:left-48 lg:left-64 z-50 p-2 rounded-md bg-gray-800 text-white"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Sidebar */}
      <div className={`fixed mt-12 left-0 h-full w-35 md:w-48 lg:w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <nav>
            <ul className="space-y-4">
              {userRole === 'admin' && (
                <li>
                  <Link to="/dashboard" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <span>Dashboard</span>
                  </Link>
                </li>
              )}
              {userRole === 'user' && (
                <li>
                  <Link to="/user" className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>User Dashboard</span>
                  </Link>
                </li>
              )}
              {/* Add more links based on roles */}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;