import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import { toast } from "react-toastify";
import { getDepartmentSourceById } from "../../apis/department_source";
import {
  postNewCrawlerConfig,
  putCrawlerConfig,
} from "../../apis/crawler_config";
import { useApi } from "../../hooks/useApi";
import Spinner from "../../components/Spinner";

function CrawlerConfig() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const { request: updateCrawlerConfig, loading: loadingUpdateCrawlerConfig } =
    useApi(putCrawlerConfig);
  const { request: postCrawlerConfig, loading: loadingPostCrawlerConfig } =
    useApi(postNewCrawlerConfig);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDepartmentSourceById(id);
      setData(data);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  const isValid = true;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      crawlerConfig: {
        ...prev.crawlerConfig,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const crawler_config_id = data?.crawlerConfig?.documentId;
      let response = null;
      if (crawler_config_id) {
        response = await updateCrawlerConfig({
          id: crawler_config_id,
          department_source_id: id,
          relative_url_list: data?.crawlerConfig.relativeUrlList,
          relative_url: data?.crawlerConfig.relativeUrl,
          thumbnail: data?.crawlerConfig.thumbnail,
          next_pages: data?.crawlerConfig.nextPages,
          title: data?.crawlerConfig.title,
          content: data?.crawlerConfig.content,
          external_publish_date: data?.crawlerConfig.externalPublishDate,
        });
      } else {
        response = await postCrawlerConfig({
          id: crawler_config_id,
          department_source_id: id,
          relative_url_list: data?.crawlerConfig.relativeUrlList,
          relative_url: data?.crawlerConfig.relativeUrl,
          thumbnail: data?.crawlerConfig.thumbnail,
          next_pages: data?.crawlerConfig.nextPages,
          title: data?.crawlerConfig.title,
          content: data?.crawlerConfig.content,
          external_publish_date: data?.crawlerConfig.externalPublishDate,
        });
      }
      if (response?.status === 200) {
        toast.success(`Đã cập nhật thành công!`);
      }
    } catch (error) {
      toast.error(`Đã cập nhật không thành công. Vui lòng thử lại sau!`);
    }
    setEditMode(false);
  };

  if (!data) {
    return (
      <h2 className="text-xl font-bold mb-3 p-3 pt-0 pb-0 flex items-center">
        Không tìm thấy thông tin Khoa/Viện này!
      </h2>
    );
  }

  if (loadingUpdateCrawlerConfig || loadingPostCrawlerConfig) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex-1">
      <main className="p-2">
        <div>
          <h2 className="text-xl font-bold mb-3 p-3 pt-0 pb-0 flex items-center h-[40px]">
            <span
              className=" cursor-pointer hover:border-b"
              onClick={() => navigate("/admin/department")}
            >
              Danh sách Khoa/Viện
            </span>
            <MdChevronRight />
            <span
              className=" cursor-pointer hover:border-b"
              onClick={() => navigate(`/admin/department/${data?.documentId}`)}
            >
              {data?.label}
            </span>
            <MdChevronRight />
            <span className="font-medium">{"Cấu hình thu thập tin tức"}</span>
          </h2>

          <div className="p-6 grid grid-cols-2 gap-6">
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  relative_url_list
                </label>
                <input
                  type="text"
                  name="relativeUrlList"
                  value={data?.crawlerConfig?.relativeUrlList || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  relative_url
                </label>
                <input
                  type="text"
                  name="relativeUrl"
                  value={data?.crawlerConfig?.relativeUrl || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  next_pages
                </label>
                <input
                  type="text"
                  name="nextPages"
                  value={data?.crawlerConfig?.nextPages || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  content
                </label>
                <input
                  type="text"
                  name="content"
                  value={data?.crawlerConfig?.content || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  thumbnail
                </label>
                <input
                  type="text"
                  name="thumbnail"
                  value={data?.crawlerConfig?.thumbnail || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  title
                </label>
                <input
                  type="text"
                  name="title"
                  value={data?.crawlerConfig?.title || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  external_publish_date
                </label>
                <input
                  type="text"
                  name="externalPublishDate"
                  value={data?.crawlerConfig?.externalPublishDate || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Nút hành động */}
          <div className="mt-6 p-5 flex justify-end gap-4">
            {!editMode ? (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Chỉnh sửa
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setEditMode(false);
                  }}
                  className="px-8 py-2 bg-gray-300 rounded"
                >
                  Hủy
                </button>
                <button
                  className={`px-8 py-2 text-white rounded ${
                    isValid ? "bg-green-600" : "bg-gray-300"
                  }`}
                  onClick={handleSave}
                  disabled={!isValid}
                >
                  Lưu
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CrawlerConfig;
