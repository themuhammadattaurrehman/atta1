import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Dashboard from '../pages/Dashboard'; // You can keep this if you have a separate Dashboard component
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login'; // Import the Login component
import User from '../pages/User'; // Import the User component
import Registration from '../pages/Registration';

const Calling_all_item = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Router>
        {/* <div className="flex h-screen">
          <div
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? 'lg:ml-64 md:ml-48 ml-40' : 'ml-0'
            }`}
          >
            <main className='h-full'> */}
              <Routes>
                <Route path='/register' element={<Registration />}/>
                <Route path="/" element={<Login />} /> {/* Login route */}
                <Route path="/dashboard" element={<MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}>
                  <Route index element={<Home />} /> {/* Show Home on /dashboard */}
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="/user" element={<MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}>
                  <Route index element={<User />} />
                </Route>
              </Routes>
            {/* </main> */}
          {/* </div> */}
        {/* </div> */}
      </Router>
    </>
  );
}

export default Calling_all_item;