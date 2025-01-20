import React, { useState,useEffect } from "react";
import Logo from "../assets/img/logo.png";
import profile from "../assets/img/profile-img.jpg";
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [id,setId]=useState('');
  useEffect(() => {
    // Retrieve the role from local storage
    const name = localStorage.getItem('name');
    if (name) {
      setName(name); // Set the role in state
    }
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole); // Set the role in state
    }
    const id = localStorage.getItem('id');
    if (id) {
      setId(id); // Set the role in state
    }
  }, []);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const router = useNavigate();
  const notificationDropdown = () => {
    setNotificationOpen(!notificationOpen);
  };

  const messageDropdown = () => {
    setMessagesOpen(!messagesOpen);
  };
  const handleSignOut = () => {
    if (role === 'user') {
      handleLogActivity();
    }
    // Clear user data (e.g., remove token from local storage)
    localStorage.removeItem('token'); // Adjust based on your storage method
    localStorage.clear();
    // Redirect to the login page
    router('/'); // Adjust the path based on your routing setup
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

  const handleLogActivity = () => {
    const userId = id; // Replace with actual user ID
    const action = 'logout'; // Replace with the actual action
    const details = 'User logged out'; // Additional details

    logUserActivity(userId, action, details);
  };

  return (
    <>
      <header className="h-12 header fixed top-0 left-0 w-full flex items-center bg-white shadow-md z-10">
        <div className="flex items-center justify-between w-full px-4 lg:px-8">
          {/* Logo */}
          <a href="/dashboard" className="logo flex items-center">
            <img src={Logo} alt="Logo" className="h-8" />
            <span className="hidden lg:block ml-2 font-bold text-lg">
            {role ? role : ''}
            </span>
          </a>
          <button className="text-xl lg:hidden focus:outline-none">
            <i className="bi bi-list"></i>
          </button>
        </div>

        {/* Search Bar */}
        {/* <div className="hidden lg:flex ml-4 mr-4">
        <form className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            name="query"
            placeholder="Search"
            className="bg-transparent focus:outline-none flex-1 text-sm"
          />
          <button type="submit" className="text-gray-500">
            <i className="bi bi-search"></i>
          </button>
        </form>
      </div> */}

        {/* Navigation */}
        <nav className="ml-auto">
          <ul className="flex items-center space-x-4">
            {/* Profile */}
            <li className="relative mr-2">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-500 focus:outline-none"
              >
                <img
                  src={profile}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="hidden md:block ml-4 mr-10 font-medium">
                  {name}
                </span>
              </button>
              {/* Profile Dropdown */}
              {isOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48">
                  <div className="p-4 border-b text-center">
                    <h6 className="font-bold">{name}</h6>
                    <span className="text-sm text-gray-500">{role}</span>
                  </div>
                  <div className="p-4 space-y-2">
                    {[
                      // {
                      //   text: "My Profile",
                      //   icon: "bi-person",
                      //   href: "users-profile.html",
                      // },
                      // {
                      //   text: "Account Settings",
                      //   icon: "bi-gear",
                      //   href: "users-profile.html",
                      // },
                      // {
                      //   text: "Need Help?",
                      //   icon: "bi-question-circle",
                      //   href: "pages-faq.html",
                      // },
                      {
                        text: "Sign Out",
                        icon: "bi-box-arrow-right",
                        href: "#",
                      },
                    ].map((item, index) => (
                      <a
                        key={index}
                        href={item.href === "#" ? undefined : item.href} // Prevent default for Sign Out
                        onClick={
                          item.text === "Sign Out" ? handleSignOut : undefined
                        } // Call sign out function
                        className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md"
                      >
                        <i className={`bi ${item.icon} text-gray-500`}></i>
                        <span>{item.text}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
