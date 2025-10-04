import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight, MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateDepartment } from "../../store/slices/departmentSlice";
import { toast } from "react-toastify";

function CrawlerConfig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.listDepartment);
  const department = departments.find((a) => a.id.toString() === id);
  const crawler_config = department.crawler_config;

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(crawler_config || {});

  const isValid = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    try {
      dispatch(
        updateDepartment({
          id: department.id,
          data: formData,
        })
      );
      toast.success(`Đã cập nhật thành công!`);
    } catch (error) {
      toast.error(`Đã cập nhật không thành công. Vui lòng thử lại sau!`);
    }
    setEditMode(false);
  };

  if (!department) {
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
              onClick={() => navigate(`/admin/department/${department.id}`)}
            >
              {department.label}
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
                  value={formData.relative_url_list || ""}
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
                  value={formData.relative_url || ""}
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
                  value={formData.next_pages || ""}
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
                  value={formData.content || ""}
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
                  value={formData.thumbnail || ""}
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
                  value={formData.title || ""}
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
                  value={formData.external_publish_date || ""}
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
                    setFormData(crawler_config); // reset
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
