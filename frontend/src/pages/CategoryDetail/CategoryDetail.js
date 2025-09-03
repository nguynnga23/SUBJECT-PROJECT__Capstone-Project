import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight, MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateDepartment } from "../../store/slices/departmentSlice";
import { toast } from "react-toastify";

function CategoryDetail() {
  const { id, cat_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.listDepartment);
  const department = departments.find((a) => a.id.toString() === id);
  const category = department.categories.find(
    (c) => c.id.toString() === cat_id
  );

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(department || {});

  const isValid =
    formData.website.trim() !== "" &&
    formData.code.trim() !== "" &&
    formData.name.trim() !== "";

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
        Không tìm thấy thông tin loại tin tức này này!
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
              {department.name}
            </span>
            <MdChevronRight />
            <span className="font-medium">{category.name}</span>
          </h2>

          <div className="p-6 grid grid-cols-2 gap-6">
            {/* ====== Cột 1 + 2: Thông tin chi tiết ====== */}
            <div className="col-span-2 grid grid-cols-2 gap-6">
              {/* Website */}
              <div>
                <label className="block text-blue-700 mb-1">
                  URL tin tức <span className="text-red-500">(*)</span>
                </label>
                <input
                  type="text"
                  name="website"
                  value={formData.website || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              {/* Tên tin tức */}
              <div>
                <label className="block text-blue-700 mb-1">
                  Tên tin tức <span className="text-red-500">(*)</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>

              {/* Mốc thời gian thu thập dữ liệu */}
              <div>
                <label className="block text-blue-700 mb-1">
                  Mốc thời gian thu thập{" "}
                  <span className="text-red-500">(*)</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code || ""}
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
          <div className="mt-6 flex justify-end gap-4">
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
                    setFormData(department); // reset
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

export default CategoryDetail;
