import { PiNewspaperLight } from "react-icons/pi";
import ArticleItem from "../ArtileItem";
import Spinner from "../Spinner";

const CategoryList = ({
  categoryName,
  articles,
  loadingFetch,
  isCategoryFilter,
}) => {
  return (
    <div className="p-2 overflow-hidden w-full">
      <div className="flex justify-between items-center p-2 pb-1">
        <h2 className="flex items-center text-base font-semibold text-gray-800">
          <PiNewspaperLight color="#153898" size={20} className="mr-2" />
          {categoryName || "TIN TỨC MỚI"}
        </h2>
      </div>

      <div
        className={`transition-transform duration-700 ease-in-out w-full ${
          !isCategoryFilter && "max-h-[400px]"
        }  overflow-auto scroll-container`}
      >
        {loadingFetch ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Spinner />
          </div>
        ) : articles.length > 0 ? (
          articles.map((article, idx) => (
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
    </div>
  );
};

export default CategoryList;
