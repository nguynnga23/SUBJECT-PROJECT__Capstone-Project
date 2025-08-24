import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header";
import { useLocation } from "react-router-dom";

function DefaultLayout({ children }) {
  const location = useLocation();
  return (
    <div className="w-[1200px]  mx-auto">
      <div className=" sticky h-[65px] top-0 z-50 bg-white shadow-[0_4px_6px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center w-full h-[10vh] max-h-[70px]">
          <Header />
        </div>
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
}

export default DefaultLayout;
