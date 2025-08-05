import { FaRegBookmark } from "react-icons/fa";

function ArticleItem({ article }) {
  return (
    <div className="p-3 bg-white rounded shadow-sm hover:shadow-md ">
      <div className="flex gap-2 cursor-pointer">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-20 h-20 object-contain rounded"
        />
        <div className="flex flex-col justify-between">
          <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 max-w-[250px]">
            {article.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-3 max-w-[250px]">
            {article.description}
          </p>
        </div>
      </div>
      <div className="p-3 flex justify-between items-center">
        <p className="text-[13px]">{article.publishDate}</p>
        <FaRegBookmark className="text-gray-500 hover:text-red-500 cursor-pointer" />
      </div>
    </div>
  );
}

export default ArticleItem;
