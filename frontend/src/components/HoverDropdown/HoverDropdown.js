import { FaChevronDown } from "react-icons/fa";
import { useState, useRef } from "react";

function HoverDropdown({ label, items = [], onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200); // Delay 500ms
  };

  return (
    <div
      className="flex items-center gap-1 cursor-pointer hover:text-black relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className="font-medium">{label}</p>
      <FaChevronDown size={10} className="mt-1 ml-1" />

      {isHovered && (
        <div className="absolute left-0 top-6 max-w-[180px] min-w-[120px] whitespace-nowrap bg-white border rounded shadow-md transition duration-300 z-50">
          <ul className="text-[12px] text-gray-700">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex items-center px-4 py-2 font-normal hover:bg-gray-100 hover:text-red-500 cursor-pointer"
                onClick={() => onSelect(item)}
              >
                {item?.icon ? <span className="mr-2">{item.icon}</span> : ""}
                {item?.name ? item.name : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default HoverDropdown;
