import { useNavigate, useParams } from "react-router-dom";
import { marked } from "marked";
import { FaExternalLinkAlt, FaRegBookmark } from "react-icons/fa";
import ArticleItem from "../../components/ArtileItem/ArticleItem";
import ArticleSummary from "../../components/ArticleSummary";
import { useEffect, useState } from "react";
import { getArticleById } from "../../apis/article";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import { LuCalendarClock } from "react-icons/lu";
import Spinner from "../../components/Spinner";
import { PiNewspaperLight } from "react-icons/pi";
import { useSelector } from "react-redux";
import { selectCurrentPageData } from "../../store/selector/articleSelectors";
import { IoArrowBackOutline } from "react-icons/io5";

function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { request: fetchArticle, loading: loadingArticleFetch } =
    useApi(getArticleById);

  const listArticle = useSelector((state) => selectCurrentPageData(state, "1"));

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchArticle(id);
        console.log(fetched);

        setData(fetched);
      } catch (err) {
        toast.error("Không thể tải dữ liệu");
      }
    };
    load();
  }, [id]);

  const [showSummary, setShowSummary] = useState(false);

  const ShowSummary = () => {
    setShowSummary(!showSummary);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  if (loadingArticleFetch) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner />
      </div>
    );
  }

  return data ? (
    <div className="h-full flex justify-between mt-3 text-[12px] ">
      <div className="w-[70%]">
        <h2 className="w-[100%] items-center flex truncate text-[16px] p-4 pb-0 h-[45px] font-bold">
          <a
            onClick={() => navigate(`/category/${data.category.documentId}`)}
            className="flex items-center cursor-pointer border-b hover:text-blue-500"
          >
            <IoArrowBackOutline size={20} className="mr-2" />
            {`${data.category.departmentSource?.label} - ${data.category.categoryName}`.toUpperCase()}
          </a>
        </h2>
        <h1 className="font-bold text-[26px] p-4">{data.title}</h1>
        <div className="pl-4 pr-4 pb-4 flex justify-between items-center">
          <div className="flex gap-2">
            <span className="flex items-center gap-2 px-3 py-1 border rounded-full bg-white shadow-sm">
              <LuCalendarClock size={18} className="text-[#F9B200]" />
              <i className="text-[11px]">
                {formatDate(data.externalPublishDate)}
              </i>
            </span>
          </div>
        </div>
        <div className="p-4 pt-0">
          <div>
            <ArticleSummary summary={data.summary} />
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: marked(data?.content) }}
          className="prose prose-sm lg:prose-lg max-w-none indent-8 leading-relaxed space-y-1 p-4 pt-0"
        ></div>
      </div>
      <div className="sticky top-[85px] w-[30%] h-[500px] border-b p-1 ">
        <div className="flex border-b w-full">
          <div className="flex mr-2 items-center justify-center p-2 bg-gray-200 rounded m-2 text-gray-500 hover:text-red-500 cursor-pointer">
            <FaRegBookmark className="mr-2" />
            <span>Đánh dấu</span>
          </div>
          <div className="flex items-center bg-gray-200 rounded text-[12px] m-2 p-2">
            <a
              href={data?.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center text-blue-500 pl-2 cursor-pointer"
            >
              <FaExternalLinkAlt
                size={15}
                title="Dẫn đến bài viết gốc"
                className="mr-2"
              />
              <span>Trang gốc</span>
            </a>
          </div>
        </div>
        <div className=" max-h-[80vh] overflow-auto mt-2">
          <div className="flex items-center p-2 ">
            <PiNewspaperLight color="#153898" size={20} className="mr-2" />
            <p className="font-medium text-[14px]">TIN TỨC KHÁC</p>
          </div>

          {listArticle.map((l, idx) => (
            <div key={idx} className=" ">
              <ArticleItem article={l} size={"small"} />
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
