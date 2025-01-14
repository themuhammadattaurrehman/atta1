import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "../Header/Header"
import Sidebar from "../Sidebar/Sidebar"
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
// import About from '../pages/About';
// import Services from '../pages/Services';
// import Contact from '../pages/Contact';

const Calling_all_item = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <>
     <Router>
     <div className="flex h-screen">
        <div
          className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? 'lg:ml-64 md:ml-48 ml-40' : 'ml-0'
            }`}
        >
          {/* <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
          <main className='h-full'>
            <Routes>
             <Route path="/" element={<MainLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              {/* <Route path="/about" element={<About />} /> */}
              {/* <Route path="/services" element={<Services />} /> */}
              {/* <Route path="/contact" element={<Contact />} /> */}
              </Route>
            </Routes>
            </main>
        </div>
      </div>
    </Router>
    </>
  )
}

export default Calling_all_item
