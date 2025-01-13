import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
// import About from '../pages/About';
// import Services from '../pages/Services';
// import Contact from '../pages/Contact';

const Calling_all_item = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
     <Router>
        {/* Main Content */}
        {/* <main className={`transition-all duration-300 ${
          isSidebarOpen ? 'md:ml-64' : ''
        } pt-16`}>
          */}
            <Routes>
             <Route path="/" element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              {/* <Route path="/about" element={<About />} /> */}
              {/* <Route path="/services" element={<Services />} /> */}
              {/* <Route path="/contact" element={<Contact />} /> */}
              </Route>
            </Routes>
        {/* </main> */}
    </Router>
    </>
  )
}

export default Calling_all_item
