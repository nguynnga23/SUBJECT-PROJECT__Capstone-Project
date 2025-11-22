import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { BiListUl } from "react-icons/bi";

function AdminLayout({ children }) {
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const closeSidebar = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setIsSidebarOpen(false);
    }, 300);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsSidebarOpen(false);
        setIsAnimating(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative flex w-full mx-auto">
      {/* Sidebar cố định */}
      <div className="hidden xl:block w-[20%]">
        <Sidebar />
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex">
          <div
            className={`
              bg-white mt-[75px] w-[25%] h-full shadow-lg transform
              ${isAnimating ? "animate-slide-out" : "animate-slide-in"}
            `}
          >
            <Sidebar />
          </div>
          <div className="flex-1" onClick={closeSidebar}></div>
        </div>
      )}

      <div className="w-full xl:w-[80%]">
        <div className="sticky top-0 z-50 bg-white shadow-md h-[70px] w-full px-4 flex items-center">
          <BiListUl
            size={30}
            className="xl:hidden mr-4 p-1 border rounded cursor-pointer hover:bg-primary hover:text-white"
            onClick={() => setIsSidebarOpen(true)}
          />

          <Header />
        </div>

        <div className="p-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
