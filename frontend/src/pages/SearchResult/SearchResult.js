import { IoList } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { getSearch } from "../../apis/search";
import { useApi } from "../../hooks/useApi";
import Spinner from "../../components/Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ArticleItem from "../../components/ArtileItem";

export default function SearchResult() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const keyword = params.get("query");
  const { request: fetchSearch, loading: loadingFetchSearch } =
    useApi(getSearch);

  const [data, setData] = useState(null);
  useEffect(() => {
    const load = async () => {
      if (keyword.length !== 0) {
        try {
          const fetched = await fetchSearch(keyword);
          setData(fetched);
        } catch (err) {
          toast.error("Không thể tải dữ liệu");
        }
      }
    };
    load();
  }, [keyword]);

  if (loadingFetchSearch) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {data?.aiAnswer && (
        <div>
          <div className="mb-4 p-2 bg-blue-50 border-l-4 border-blue-400 rounded">
            <h2 className="text-[14px] font-semibold">Thông tin tổng hợp:</h2>
            <p className="text-gray-700 text-[12px]">{data.aiAnswer}</p>
          </div>
          <div>
            <i className="text-red-500 flex justify-end">
              ! Thông tin từ AI có thể sẽ không chính xác hoàn toàn.
            </i>
          </div>
        </div>
      )}

      <h2 className="flex items-center text-base font-semibold text-gray-800 mt-4 p-2 pl-0">
        <IoList size={20} className="mr-2" />
        CÁC BÀI VIẾT LIÊN QUAN
      </h2>

      <div className="space-y-4">
        {data?.sources && data?.sources.length > 0 ? (
          data?.sources.map((item, index) => (
            <div key={index}>
              <ArticleItem article={item} />
            </div>
          ))
        ) : (
          <p className="text-gray-500">Không tìm thấy kết quả nào.</p>
        )}
      </div>
    </div>
  );
}
