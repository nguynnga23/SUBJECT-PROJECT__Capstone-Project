import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { BiListUl } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setCurrentDepartment } from "../../store/slices/departmentSlice";
import { getAllDepartment } from "../../apis/department";

function AdminLayout({ children }) {
  const location = useLocation();
  const dispatch = useDispatch();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const closeSidebar = () => {
    setIsAnimating(true); // Bắt đầu animation đóng
    setTimeout(() => {
      setIsAnimating(false);
      setIsSidebarOpen(false); // Đóng sau khi animation xong
    }, 300); // Thời gian trùng với animation
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

  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllDepartment();
        if (data) {
          setDepartment(data);
          dispatch(setCurrentDepartment(data[0]));
        }
      } catch (error) {}
    };
    fetchData();
  }, [department]);

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
          {/* Click vào vùng ngoài để đóng */}
          <div className="flex-1" onClick={closeSidebar}></div>
        </div>
      )}

      {/* Main content */}
      <div className="w-full xl:w-[80%]">
        {/* Header cố định */}
        <div className="sticky top-0 z-50 bg-white shadow-md h-[70px] w-full px-4 flex items-center">
          {/* Nút mở sidebar khi ở mobile */}
          <BiListUl
            size={30}
            className="xl:hidden mr-4 p-1 border rounded cursor-pointer hover:bg-primary hover:text-white"
            onClick={() => setIsSidebarOpen(true)}
          />

          <Header />
        </div>

        {/* Transition chỉ áp dụng cho phần content */}
        <div className="p-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }} // chỉnh tốc độ transition ở đây
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
