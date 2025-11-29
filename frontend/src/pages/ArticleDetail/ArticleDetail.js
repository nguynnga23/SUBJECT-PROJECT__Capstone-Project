import { useNavigate, useParams } from "react-router-dom";
import { marked } from "marked";
import ArticleSummary from "../../components/ArticleSummary";
import { useEffect, useState } from "react";
import {
  getArticleById,
  postNewSummary,
  putNewSummary,
} from "../../apis/article";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import { LuCalendarClock } from "react-icons/lu";
import Spinner from "../../components/Spinner";
import { IoArrowBackOutline } from "react-icons/io5";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import { IoRefresh } from "react-icons/io5";
import { TbCancel } from "react-icons/tb";

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { request: fetchArticle, loading: loadingArticleFetch } =
    useApi(getArticleById);
  const { request: fetchPutNewSummary, loading: loadingPutNewSummaryFetch } =
    useApi(putNewSummary);
  const [preSummary, setPreSummary] = useState("");
  const [isEditingSummary, setIsEditingSummary] = useState(false);

  const { request: fetchPostNewSummary, loading: loadingPostNewSummary } =
    useApi(postNewSummary);

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchArticle(id);
        setData(fetched);
        setPreSummary(fetched.summary);
      } catch {
        toast.error("Không thể tải dữ liệu");
      }
    };
    load();
  }, [id]);

  const handleSwitchPage = () => {
    try {
      navigate(`/admin/article`);
    } catch (error) {
      navigate(`/`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const handleChangeSummary = async () => {
    try {
      const res = await fetchPostNewSummary(data.summary);

      if (res?.summary) {
        setPreSummary(res.summary);
        setIsEditingSummary(true);
      }
    } catch {
      toast.error("Không thể tải dữ liệu. Vui lòng thử lại sau");
    }
  };

  const handlePutNewSummary = async () => {
    try {
      const res = await fetchPutNewSummary({
        articleId: data.documentId,
        summary: preSummary,
      });

      if (res) {
        setData((prev) => ({ ...prev, summary: preSummary }));
        setIsEditingSummary(false);
        toast.success("Cập nhật tóm tắt thành công");
      }
    } catch {
      toast.error("Không thể cập nhật dữ liệu. Vui lòng thử lại sau");
    }
  };

  if (loadingArticleFetch) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
        <Spinner />
      </div>
    );
  }

  return data ? (
    <div className="relative max-h-[85vh] overflow-auto flex justify-between mt-3 text-[12px] ">
      <div className="w-[98%]">
        <h2 className="w-[100%] flex justify-between items-center flex truncate text-[16px] p-4 pb-0 h-[45px] font-bold">
          <a
            onClick={handleSwitchPage}
            className="flex items-center cursor-pointer border-b hover:text-blue-500"
          >
            <IoArrowBackOutline size={20} className="mr-2" />

            {"DANH SÁCH BÀI VIẾT"}
          </a>
          <i>
            {`${data.category?.departmentSource?.label} - ${data.category?.categoryName}`.toUpperCase()}
          </i>
        </h2>

        <h1 className="font-bold text-[26px] p-4">{data.title}</h1>
        <div className="pl-4 pr-4 pb-4 flex justify-between items-center">
          <div className="w-full flex justify-between items-center gap-2">
            <span className="flex items-center gap-2 px-3 py-1 border rounded-full bg-white shadow-sm">
              <LuCalendarClock size={18} className="text-[#F9B200]" />
              <i className="text-[11px]">
                {formatDate(data.externalPublishDate)}
              </i>
            </span>
            {isEditingSummary ? (
              <div className="flex items-center">
                <button
                  className="flex items-center border rounded-lg px-2 py-1 bg-green-500 text-white mr-2"
                  onClick={handlePutNewSummary}
                >
                  <IoRefresh className="mr-2" size={20} />
                  Lưu tóm tắt mới
                </button>

                <button
                  className="flex items-center border rounded-lg px-2 py-1 bg-red-500 text-white"
                  onClick={() => {
                    setPreSummary(data.summary);
                    setIsEditingSummary(false);
                  }}
                >
                  <TbCancel className="mr-2" size={20} />
                  Hủy
                </button>
              </div>
            ) : (
              <button
                className="flex items-center border rounded-lg px-2 py-1 bg-blue-500 text-white"
                onClick={handleChangeSummary}
              >
                <IoRefresh className="mr-2" size={20} />
                Đổi tóm tắt mới
              </button>
            )}
          </div>
        </div>
        <div className="p-4 pt-0">
          {loadingPostNewSummary || loadingPutNewSummaryFetch ? (
            <div className="flex justify-center items-center h-[30vh]">
              <Spinner />
            </div>
          ) : (
            <div>
              <ArticleSummary summary={preSummary || data.summary} />
            </div>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: marked(data?.content) }}
          className="prose prose-sm max-w-none indent-8 leading-relaxed space-y-1 p-4 pt-0 text-justify-custom"
        ></div>
      </div>
      <ScrollToTopButton />
    </div>
  ) : (
    <div className="flex justify-center p-5">
      <i>Xin lỗi. Chúng tôi không tìm được thông tin bài viết này!</i>
    </div>
  );
}

export default ArticleDetail;
