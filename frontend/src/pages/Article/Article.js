import { useNavigate, useParams } from "react-router-dom";
import { list } from "../../assets/sampleData";
import { marked } from "marked";
import { BsSend } from "react-icons/bs";
import { FaRegBookmark, FaChevronRight } from "react-icons/fa";
import { RxResume } from "react-icons/rx";
import ArticleItem from "../../components/ArtileItem/ArticleItem";
import ArticleSummary from "../../components/ArticleSummary";
import { useState } from "react";

function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const foundArticle = list.find((l) => l.id.toString() === id);
  const [showSummary, setShowSummary] = useState(false);

  const ShowSummary = () => {
    setShowSummary(!showSummary);
  };

  return foundArticle ? (
    <div className="h-full flex justify-between mt-3 text-[12px] ">
      <div className="w-[73%]">
        <h2 className="w-[100%] items-center flex truncate text-[14px] p-4 pb-0 h-[45px]">
          <a
            onClick={() => navigate("/department/1")}
            className="cursor-pointer hover:border-b hover:text-blue-500"
          >{`Khoa Công Nghệ Thông Tin`}</a>
          <FaChevronRight size={12} className="m-1" />
          <a
            onClick={() => navigate("/department/1/category/1")}
            className="cursor-pointer hover:border-b hover:text-blue-500"
          >{`Thông Tin Sinh Viên`}</a>
          <FaChevronRight size={12} className="m-1" />
          <a className="max-w-[500px] truncate font-bold">{`${foundArticle.title}`}</a>
        </h2>
        <h1 className="font-bold text-[26px] p-4">{foundArticle.title}</h1>
        <div className="pl-4 pr-4 pb-4 flex justify-between items-center">
          <i className="text-[13px]">{foundArticle.publishDate}</i>
          <i>
            <a
              href={foundArticle?.external_url}
              className="text-[13px] text-blue-500 hover:border-b"
            >
              Link đến bài viết gốc
            </a>
          </i>
        </div>
        <div className="p-4 pt-0">
          <button
            className={`border p-2 rounded bg-gray-300 hover:bg-blue-400 hover:text-white flex items-center ${
              !showSummary ? "bg-gray-300" : "bg-blue-400 text-white"
            }`}
            onClick={ShowSummary}
          >
            <RxResume className="mr-1" />
            Xem tóm tắt
          </button>
          {showSummary && (
            <div>
              <ArticleSummary summary={foundArticle.summary} />
            </div>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: marked(foundArticle.content) }}
          className="prose prose-sm lg:prose-lg max-w-none indent-8 leading-relaxed space-y-1 p-4 pt-0"
        ></div>
      </div>
      <div className="sticky top-[85px] w-[26%] h-[500px] border-b p-1 ">
        <div className="flex border-b">
          <div className="flex items-center justify-center p-2 bg-gray-200 rounded m-2 mr-0 text-gray-500 hover:text-red-500 cursor-pointer">
            <BsSend className="mr-2" />
            <span>Share</span>
          </div>
          <div className="flex items-center justify-center p-2 bg-gray-200 rounded m-2 text-gray-500 hover:text-red-500 cursor-pointer">
            <FaRegBookmark className="mr-2" />
            <span>Mark</span>
          </div>
        </div>
        <div className=" max-h-[550px] overflow-auto mt-2">
          <div className="flex items-center p-2 ">
            <span className="text-red-500 font-bold mr-2">■</span>
            <p className="font-medium">Tin tức tương tự</p>
          </div>

          {list.map((l, idx) => (
            <div key={idx} className="p-1 ">
              <ArticleItem article={l} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center p-5">
      <i>Xin lỗi. Chúng tôi không tìm được thông tin bài viết này!</i>
    </div>
  );
}

export default Article;
