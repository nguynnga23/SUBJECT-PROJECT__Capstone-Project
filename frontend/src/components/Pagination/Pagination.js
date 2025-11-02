import { useState, useRef, useEffect } from "react";

export default function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  itemsPerPage,
  setItemsPerPage,
}) {
  const [showLimitPopup, setShowLimitPopup] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowLimitPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mt-3">
      <div className="flex justify-end items-center mt-2 space-x-3 relative">
        {/* Lựa chọn số dòng mỗi trang */}
        <div className="relative">
          <button
            className="border rounded px-3 py-1 pb-0 text-[12px] bg-white shadow-sm hover:bg-gray-100"
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

        <div>
          <button
            className="p-[2px] text-[10px] w-[20px] h-[20px] border rounded-full disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`p-[2px] m-1 text-[10px] w-[20px] h-[20px] border rounded-full ${
                  page === currentPage ? "bg-primary text-white" : ""
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="p-[2px] text-[10px] w-[20px] h-[20px] border rounded-full disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
