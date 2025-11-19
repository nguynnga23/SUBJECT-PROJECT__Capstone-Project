import { useNavigate, useParams } from "react-router-dom";
import { marked } from "marked";
import { FaChevronRight } from "react-icons/fa";
import { RxResume } from "react-icons/rx";
import ArticleSummary from "../../components/ArticleSummary";
import { useEffect, useRef, useState } from "react";
import { getArticleById } from "../../apis/article";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { request: fetchArticle, loading: loadingArticleFetch } =
    useApi(getArticleById);

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

  if (loadingArticleFetch) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
        <Spinner />
      </div>
    );
  }

  return data ? (
    <div className="max-h-[650px] scroll-container overflow-auto flex justify-between mt-3 text-[12px] ">
      <div className="w-[98%]">
        <h2 className="w-[100%] items-center flex truncate text-[14px] p-4 pb-0 h-[45px]">
          <a
            onClick={() =>
              navigate(
                `/admin/department/${data.category.departmentSource.documentId}`
              )
            }
            className="cursor-pointer hover:border-b hover:text-blue-500"
          >
            {data.category.departmentSource.label}
          </a>
          <FaChevronRight size={12} className="m-1" />
          <a
            onClick={() =>
              navigate(
                `/admin/department/${data.category.departmentSource.documentId}/category/${data.category.documentId}`
              )
            }
            className="cursor-pointer hover:border-b hover:text-blue-500"
          >
            {data.category.categoryName}
          </a>
          <FaChevronRight size={12} className="m-1" />
          <a className="max-w-[500px] truncate font-bold">{`${data?.title}`}</a>
        </h2>
        <h1 className="font-bold text-[26px] p-4">{`${data?.title}`}</h1>
        <div className="pl-4 pr-4 pb-4 flex justify-between items-center">
          <i className="text-[13px]">{data.externalPublishDate}</i>
          <i>
            <a
              href={data?.externalUrl}
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
              <ArticleSummary summary={data.summary} />
            </div>
          )}
        </div>
        <div
          contentEditable
          suppressContentEditableWarning
          dangerouslySetInnerHTML={{ __html: marked(data?.content) }}
          onInput={(e) =>
            setData({ ...data, content: e.currentTarget.innerHTML })
          }
          className="prose prose-sm lg:prose-lg max-w-none indent-8 leading-relaxed space-y-1 p-4 pt-0 border rounded"
        ></div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center p-5">
      <i>Xin lỗi. Chúng tôi không tìm được thông tin bài viết này!</i>
    </div>
  );
}

export default ArticleDetail;
