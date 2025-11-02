import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ArticleItem from "../ArtileItem";
import { useState, useEffect } from "react";
import Spinner from "../Spinner";

const itemsPerPage = 10;

const CategoryList = ({
  categoryName,
  articles,
  loadingFetch,
  isCategoryFilter,
}) => {
  const [displayedArticles, setDisplayedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchArticlesByPage = (page) => {
    setLoading(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        const total = articles.length;
        const totalPages = Math.ceil(total / itemsPerPage);

        const startIdx = page * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const paginated = articles.slice(startIdx, endIdx);

        resolve({ articles: paginated, totalPages });
      }, 500);
    });
  };

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchArticlesByPage(currentPage);
      setDisplayedArticles(result.articles);
      setTotalPages(result.totalPages);
      setLoading(false);
    };
    loadData();
  }, [currentPage, articles]);

  const nextSlide = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevSlide = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="p-2 overflow-hidden w-full">
      {/* Header */}
      <div className="flex justify-between items-center p-3">
        <h2 className="text-base font-semibold text-gray-800">
          <span className="text-red-500 font-bold">■</span>{" "}
          {categoryName || "Danh sách bài viết"}
        </h2>
        <div className="flex text-gray-500">
          <button
            onClick={prevSlide}
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
            onClick={nextSlide}
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
        className={`transition-transform duration-700 ease-in-out w-full ${
          !isCategoryFilter && "max-h-[400px]"
        }  overflow-auto scroll-container`}
      >
        {loading || loadingFetch ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Spinner />
          </div>
        ) : displayedArticles.length > 0 ? (
          displayedArticles.map((article, idx) => (
            <div key={idx}>
              <ArticleItem article={article} />
            </div>
          ))
        ) : (
          <i className="flex w-full items-center justify-center">
            Hiện tại chưa có tin tức nào mới
          </i>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center m-3 mb-0 space-x-1">
          {Array.from({ length: totalPages }).map((_, pageIdx) => (
            <button
              key={pageIdx}
              onClick={() => setCurrentPage(pageIdx)}
              className={`flex items-center justify-center text-[9px] p-2 w-[20px] h-[20px] rounded-full ${
                currentPage === pageIdx
                  ? "bg-blue-400 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {pageIdx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
