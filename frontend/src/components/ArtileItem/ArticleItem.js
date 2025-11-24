import { FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { thumnailDefault } from "../../assets";
import { LuCalendarClock } from "react-icons/lu";

function ArticleItem({ article }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const isNewArticle = (dateString) => {
    const published = new Date(dateString);
    const now = new Date();

    const diff = now - published;

    const diffDays = diff / (1000 * 60 * 60 * 24);

    return diffDays <= 10;
  };

  const handleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div className="m-3 mt-4 p-3 bg-white rounded-lg shadow-md hover:shadow-lg">
      <div
        className="flex gap-3 cursor-pointer"
        onClick={() => handleClick(article.documentId)}
      >
        <div className="flex justify-center w-[180px]">
          <img
            src={article?.thumbnail}
            alt={article?.title}
            className="h-24 object-cover rounded"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = thumnailDefault;
            }}
          />
        </div>

        <div className="flex flex-col justify-between w-full">
          <div className="flex gap-2">
            <span className="flex items-center gap-2 px-3 py-1 border rounded-full bg-white shadow-sm">
              <LuCalendarClock size={18} className="text-[#F9B200]" />
              <i className="text-[11px]">
                {formatDate(article.externalPublishDate)}
              </i>
            </span>

            {isNewArticle(article.externalPublishDate) && (
              <span className="flex items-center justify-center bg-pink-100 text-pink-600 text-[10px] px-3 py-1 rounded-full">
                Mới
              </span>
            )}
          </div>

          <h3 className="font-semibold text-[13px] text-[#153898] line-clamp-2 mt-1">
            {article.title}
          </h3>

          <p className="text-[10px] text-gray-600 line-clamp-2 mt-1">
            {article?.summary}
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-2 text-[12px]">
        <a
          href={article?.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:border-b"
        >
          Link đến bài viết gốc
        </a>
        <FaRegBookmark className="text-gray-500 hover:text-red-500 cursor-pointer" />
      </div>
    </div>
  );
}

export default ArticleItem;
