import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import { toast } from "react-toastify";
import { getDepartmentSourceById } from "../../apis/department_source";

function CrawlerConfig() {
  const { id } = useParams();
  const [data, setData] = useState([]);
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
  };

  const handleSave = () => {
    try {
      toast.success(`Đã cập nhật thành công!`);
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
                  name="relative_url_list"
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
                  name="relative_url"
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
                  name="next_pages"
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
                  name="external_publish_date"
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
