import { useState, useRef, useEffect, useCallback } from "react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  itemsPerPage,
  setItemsPerPage,
}) {
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const popupRef = useRef(null);
  const handleClickOutside = useCallback(
    (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowLimitPopup(false);
      }
    },
    [popupRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);
  const getVisiblePages = () => {
    const delta = 2;
    const pages = [];

    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");
    if (end < totalPages) pages.push(totalPages); // nút cuối cùng

    return pages;
  };

  return (
    <div className="absolute right-4 bottom-1">
      <div className=" flex items-center mt-2 space-x-3 relative">
        {/* ----------------- Select items per page ----------------- */}
        <div className="relative">
          <button
            className="border rounded px-3 py-1 text-[12px] bg-white shadow-sm hover:bg-gray-100"
            onClick={() => setShowLimitPopup((prev) => !prev)}
          >
            {itemsPerPage}
          </button>

          {showLimitPopup && (
            <ul
              ref={popupRef}
              className="absolute left-0 bottom-[30px] mt-1 bg-white border shadow rounded text-[12px] z-50"
            >
              {[5, 10, 20, 50].map((num) => (
                <li
                  key={num}
                  className={`px-3 py-1 cursor-pointer hover:bg-gray-100 ${
                    num === itemsPerPage ? "bg-gray-200 font-semibold" : ""
                  }`}
                  onClick={() => {
                    setItemsPerPage(num);
                    setCurrentPage(1);
                    setShowLimitPopup(false);
                  }}
                >
                  {num}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ----------------- Pagination buttons ----------------- */}
        <div className="flex items-center">
          {/* Prev button */}
          <button
            className="p-[2px] text-[10px] w-[20px] h-[20px] border rounded-full disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &lt;
          </button>

          {/* Page numbers */}
          {getVisiblePages().map((page, index) =>
            page === "..." ? (
              <span key={`dots-${index}`} className="px-2 text-[10px]">
                ...
              </span>
            ) : (
              <button
                key={`page-${page}`}
                className={`p-[2px] m-1 text-[10px] w-[20px] h-[20px] border rounded-full ${
                  page === currentPage ? "bg-primary text-white" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          )}

          {/* Next button */}
          <button
            className="p-[2px] text-[10px] w-[20px] h-[20px] border rounded-full disabled:opacity-50"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
