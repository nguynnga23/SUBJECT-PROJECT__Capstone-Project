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
import ScrollToTopButton from "../../components/ScrollToTopButton";
import { checkBookMark, postBookMark } from "../../apis/marked";

function Article() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isMarked, setIsMarked] = useState(false);
  const { request: fetchArticle, loading: loadingArticleFetch } =
    useApi(getArticleById);
  const { request: fetchCheckBookMark, loading: loadingfetchCheckBookMark } =
    useApi(checkBookMark);

  const listArticle = useSelector((state) => selectCurrentPageData(state, "1"));

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchArticle(id);
        setData(fetched);
      } catch (err) {
        toast.error("Không thể tải dữ liệu");
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    const load = async () => {
      if (data) {
        try {
          const fetched = await fetchCheckBookMark({
            userId: currentUser.documentId,
            articleId: data.documentId,
          });
          setIsMarked(fetched.isBookmarked);
        } catch (err) {}
      }
    };
    load();
  }, [data]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const handleSwitchPage = () => {
    try {
      navigate(`/category/${data.category.documentId}`);
    } catch (error) {
      navigate(`/`);
    }
  };
  const { request: fetchPostBookMark, loading: loadingfetchPostBookMark } =
    useApi(postBookMark);
  const currentUser = useSelector((state) => state.auth.user);
  const handleMark = async ({ userId, articleId }) => {
    if (!isMarked) {
      try {
        await fetchPostBookMark({ userId, articleId });
        setIsMarked(true);
      } catch (error) {
        toast.error("Không thể đánh dấu bài viết này. Vui lòng thử lại sau");
      }
    } else {
      toast.warning("Bài viết này đã được đánh dấu trước đó");
    }
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
            onClick={handleSwitchPage}
            className="flex items-center cursor-pointer border-b hover:text-blue-500"
          >
            <IoArrowBackOutline size={20} className="mr-2" />
            {`${data.category?.departmentSource?.label} - ${data.category?.categoryName}`.toUpperCase()}
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
          className="prose prose-sm max-w-none indent-8 leading-relaxed space-y-1 p-4 pt-0 text-justify-custom"
        ></div>
      </div>
      <div className="sticky top-[85px] w-[30%] p-1 ">
        <div className="flex items-center w-full">
          {loadingfetchPostBookMark || loadingfetchCheckBookMark ? (
            <div>
              <Spinner size="h-[20px] w-[20px]" />
            </div>
          ) : (
            currentUser && (
              <div
                className={`flex mr-2 items-center justify-center p-2 bg-white rounded border m-2 ${
                  isMarked ? "text-gray-500" : "text-yellow-500"
                } hover:text-red-500 cursor-pointer`}
                onClick={() =>
                  handleMark({
                    userId: currentUser.documentId,
                    articleId: data.documentId,
                  })
                }
              >
                <FaRegBookmark className="mr-2" />
                <span>{isMarked ? "Đã đánh dấu" : "Đánh dấu"}</span>
              </div>
            )
          )}

          <div className="flex items-center bg-white rounded text-[12px] p-2 border">
            <a
              href={data?.externalUrl}
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
        <div className="max-h-[80vh] overflow-auto mt-2 mb-6 border rounded-lg">
          <div className="flex items-center p-2 pb-0">
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
      <ScrollToTopButton />
    </div>
  ) : (
    <div className="flex justify-center p-5">
      <i>Xin lỗi. Chúng tôi không tìm được thông tin bài viết này!</i>
    </div>
  );
}

export default Article;
