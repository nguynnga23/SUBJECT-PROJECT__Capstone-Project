import { FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ArticleItem({ article }) {
  const navigate = useNavigate();

  const handleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div className="m-2 p-3 bg-white rounded shadow-md hover:shadow-lg ">
      <div
        className=" flex gap-2 cursor-pointer"
        onClick={() => {
          handleClick(article.documentId);
        }}
      >
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-20 h-20 object-contain rounded truncate"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://iuh.edu.vn/templates/2015/image/img_default.png";
          }}
        />
        <div className="flex flex-col justify-between m-2 w-full">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-[#262261] line-clamp-2 max-w-[850px]">
              {article.title}
            </h3>
            <i className="text-[11px] p-2 text-[#7a736e]">
              {article.publishedAt}
            </i>
          </div>
          <p className="text-xs text-gray-600 line-clamp-2 max-w-[850px]">
            {article?.summary}
          </p>
        </div>
      </div>

      <i className="flex justify-between">
        <a
          href={article?.external_url}
          className="text-[12px] text-blue-500 hover:border-b"
        >
          Link đến bài viết gốc
        </a>
        <FaRegBookmark className="text-gray-500 hover:text-red-500 cursor-pointer" />
      </i>
    </div>
  );
}

export default ArticleItem;
