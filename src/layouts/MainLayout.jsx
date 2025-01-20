import React, { useState ,useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const MainLayout = ({setIsSidebarOpen,isSidebarOpen}) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
     <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
     <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    {/* Main Content with Outlet */}
    {/* <main className={`transition-all duration-300 ${
      isSidebarOpen ? 'md:ml-64' : ''
    } pt-16`}> */}
      {/* <div
  className={`fixed top-0 left-0 h-full bg-white shadow-md z-20 transition-transform ${
    isSidebarOpen ? 'ml-35 md:ml-48 lg:ml-64' : 'ml-0'
  }`}
> */}
 <div className="flex h-screen">
          <div
            className={`flex-1 transition-all duration-300 ${
              isSidebarOpen ? 'lg:ml-64 md:ml-48 ml-40' : 'ml-0'
            }`}
          >
            <main className=' bg-gray-100'>
      <div className="lg:max-w-full md:max-w-full max-w-fit mx-auto px-4 sm:px-6 lg:px-8 py-20 h-full">
        <Outlet />
      </div>
     </main>
      </div>
      </div>
  </div>
  );
};

export default MainLayout; 