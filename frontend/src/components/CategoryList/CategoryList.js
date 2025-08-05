import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ArticleItem from "../ArtileItem";
import { useState } from "react";

const itemsPerPage = 6;

const CategoryList = ({ categoryName, list }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(list.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };
  const handleManualNav = (direction) => {
    direction === "next" ? nextSlide() : prevSlide();
  };

  return (
    <div className="p-2 overflow-hidden w-full">
      <div className="flex justify-between items-center m-2">
        <h2 className="text-base font-semibold text-gray-800">
          <span className="text-red-500 font-bold pl-4 mr-2">■</span>{" "}
          {categoryName}
        </h2>
        <div className="flex text-gray-500">
          <button
            onClick={() => handleManualNav("prev")}
            disabled={currentPage === 0}
            className={`p-2 rounded transition ${
              currentPage === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            onClick={() => handleManualNav("next")}
            disabled={currentPage >= totalPages - 1}
            className={`p-2 rounded transition ${
              currentPage >= totalPages - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      </div>

      <div
        className={`flex transition-transform duration-700 ease-in-out`}
        style={{
          width: `${100 * totalPages}%`,
          transform: `translateX(-${(100 / totalPages) * currentPage}%)`,
        }}
      >
        {list.length > 0 ? (
          Array.from({ length: totalPages }).map((_, pageIdx) => (
            <div
              key={pageIdx}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full shrink-0 gap-2"
              style={{ width: `${100 / totalPages}%` }}
            >
              {list
                .slice(
                  pageIdx * itemsPerPage,
                  pageIdx * itemsPerPage + itemsPerPage
                )
                .map((article, idx) => (
                  <div key={idx} className="w-full max-w-sm">
                    <ArticleItem article={article} />
                  </div>
                ))}
            </div>
          ))
        ) : (
          <i className="flex w-full items-center justify-center">
            Hiện tại chưa có tin tức nào mới
          </i>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
