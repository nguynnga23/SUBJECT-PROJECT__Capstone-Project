import { FaChevronRight } from "react-icons/fa";
import { useState, useRef } from "react";
import { createPortal } from "react-dom";

function HoverDropdownForCategory({ label, items = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef(null);
  const closeTimeoutRef = useRef(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const startCloseTimeout = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleEnter = () => {
    clearCloseTimeout(); // Đang hover → không tắt popup
    const rect = ref.current.getBoundingClientRect();
    setPos({
      top: rect.top - 10,
      left: rect.right + 20,
    });
    setIsOpen(true);
  };

  return (
    <div
      ref={ref}
      className="relative w-full flex items-center gap-1"
      onMouseEnter={handleEnter}
      onMouseLeave={startCloseTimeout}
    >
      <p className="font-medium truncate">{label}</p>
      <FaChevronRight size={10} className="absolute right-[-10px] ml-1" />

      {isOpen &&
        createPortal(
          <div
            className="fixed z-[99999] bg-white shadow-lg border min-w-[220px]"
            style={{ top: pos.top, left: pos.left }}
            onMouseEnter={clearCloseTimeout}
            onMouseLeave={startCloseTimeout}
          >
            <ul className="text-[12px] text-gray-700 max-h-[250px] overflow-y-auto">
              {items.length > 0 ? (
                items.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-[#F9B200] hover:bg-[#153898]"
                    onClick={() => onSelect(item)}
                  >
                    {item?.name || item?.label || item?.categoryName}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-400 italic">
                  Không có loại thông tin
                </li>
              )}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
}

export default HoverDropdownForCategory;
