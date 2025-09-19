import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight, MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { updateDepartment } from "../../store/slices/departmentSlice";
import { toast } from "react-toastify";
import AdditionalCategoryForm from "../../components/Form/AdditionalCategoryForm";

function DepartmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.listDepartment);
  const department = departments.find((a) => a.id.toString() === id);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(department || {});

  const [showFormCategory, setShowFormCategory] = useState(false);

  const isValid =
    formData.website?.trim() !== "" &&
    formData.code?.trim() !== "" &&
    formData.name?.trim() !== "";

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
            <span className="font-medium">{department.label}</span>
          </h2>

          <div className="p-6 grid grid-cols-2 gap-6">
            <div className="col-span-1 grid grid-cols-1 gap-4">
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Website <span className="text-red-500">(*)</span>
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Tên Khoa <span className="text-red-500">(*)</span>
                </label>
                <input
                  type="text"
                  name="label"
                  value={formData.label || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Cấu hình thu thập tin tức
                </label>
                <div
                  className="border border-blue-400 rounded px-3 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/admin/department/${department.id}/crawler_config`
                    )
                  }
                >
                  {"Cập nhật"}
                </div>
              </div>
            </div>
            <div className="col-span-1 grid grid-cols-1">
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Các loại thông tin bài viết
                </label>
                <ul className="space-y-2 relative">
                  {formData.categories?.length > 0 ? (
                    (formData.categories || []).map((c) => (
                      <li
                        key={c.id}
                        className="border border-blue-400 rounded px-3 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          navigate(
                            `/admin/department/${department.id}/category/${c.id}`
                          )
                        }
                      >
                        {c.category_name}
                      </li>
                    ))
                  ) : (
                    <i className="text-[12px] text-center">
                      Chưa có loại tin tức nào
                    </i>
                  )}
                  {editMode && (
                    <button
                      className="absolute bottom-[-30px] right-[50%] text-green-600 hover:text-green-800"
                      title="Thêm loại tin tức mới"
                    >
                      <MdAddCircle size={24} />
                    </button>
                  )}
                  {showFormCategory && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                      <div className="opacity-0 animate-fadeIn">
                        <AdditionalCategoryForm
                          setShowFormCategory={setShowFormCategory}
                        />
                      </div>
                    </div>
                  )}
                </ul>
              </div>
              <div className="col-span-1 mb-1">{""}</div>
              <div className="col-span-1 mb-1">{""}</div>
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

export default DepartmentDetail;
