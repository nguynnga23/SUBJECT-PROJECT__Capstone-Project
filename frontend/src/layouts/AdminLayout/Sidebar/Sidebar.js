import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaNewspaper,
  FaUsers,
  FaCog,
} from "react-icons/fa";

const menuItems = [
  { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
  {
    label: "Quản lý Khoa/Viện",
    icon: <FaBuilding />,
    path: "/admin/department",
  },
  { label: "Bài Viết", icon: <FaNewspaper />, path: "/admin/article" },
  { label: "Người Dùng", icon: <FaUsers />, path: "/admin/user" },
  { label: "Cài đặt", icon: <FaCog />, path: "/admin/setting" },
];

const Sidebar = () => {
  return (
    <aside className="h-screen w-full bg-white border-r shadow-sm  left-0 top-0 z-10">
      <div className="p-4 font-bold text-[17px] text-primary flex justify-center">
        Khoa Công Nghệ Thông Tin
      </div>
      <nav className="flex flex-col gap-1 px-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sub text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
