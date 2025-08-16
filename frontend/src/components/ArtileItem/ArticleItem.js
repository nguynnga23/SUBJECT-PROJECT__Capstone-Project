import { FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ArticleItem({ article }) {
  const navigate = useNavigate();

  const handleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div className="p-3 bg-white rounded shadow-md hover:shadow-lg ">
      <div
        className="flex gap-2 cursor-pointer"
        onClick={() => {
          handleClick(article.id);
        }}
      >
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-20 h-20 object-contain rounded"
        />
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 max-w-[250px]">
            {article.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2 max-w-[250px]">
            {article?.summary}
          </p>
        </div>
      </div>
      <div className="p-1 flex justify-between items-center">
        <i className="text-[11px]">{article.publishDate}</i>
        <FaRegBookmark className="text-gray-500 hover:text-red-500 cursor-pointer" />
      </div>
      <i>
        <a
          href={article?.external_url}
          className="text-[12px] text-blue-500 hover:border-b"
        >
          Link đến bài viết gốc
        </a>
      </i>
    </div>
  );
}

export default ArticleItem;
