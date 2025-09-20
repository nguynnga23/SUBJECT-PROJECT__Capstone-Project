import Header from "./Header";
import Sidebar from "./Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

function AdminLayout({ children }) {
  const location = useLocation();

  return (
    <div className="relative flex w-full mx-auto">
      {/* Sidebar cố định */}
      <div className="hidden xl:block w-1/5">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="w-full xl:w-4/5">
        {/* Header cố định */}
        <div className="sticky top-0 z-50 bg-white shadow-md h-[70px] w-full px-4">
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
