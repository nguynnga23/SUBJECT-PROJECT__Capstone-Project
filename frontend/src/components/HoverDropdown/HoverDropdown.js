import { FaChevronDown } from "react-icons/fa";
import { useState, useRef } from "react";

function HoverDropdown({ label, items = [], onSelect, disable = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (disable) return;
    clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (disable) return;
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };

  return (
    <div
      className={`flex items-center gap-1 relative ${
        disable
          ? "cursor-not-allowed text-gray-400"
          : "cursor-pointer hover:text-black"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className="font-medium">{label}</p>
      <FaChevronDown
        size={10}
        className={`mt-1 ml-1 ${disable ? "opacity-50" : ""}`}
      />

      {!disable && isHovered && (
        <div className="absolute left-0 top-6 min-w-[130px] whitespace-nowrap bg-white border rounded shadow-md transition duration-300 z-50">
          <ul className="text-[12px] text-gray-700 max-h-[150px] overflow-auto scroll-container">
            {items.length > 0 ? (
              items.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center px-4 py-2 font-normal hover:bg-gray-100 hover:text-red-500 cursor-pointer"
                  onClick={() => onSelect(item)}
                >
                  {item?.icon && <span className="mr-2">{item.icon}</span>}
                  {item?.name || item?.label || item?.categoryName}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-400 italic">
                Không có mục nào
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HoverDropdown;
