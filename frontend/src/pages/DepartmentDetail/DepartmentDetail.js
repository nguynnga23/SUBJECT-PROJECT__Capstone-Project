import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight, MdAddCircle } from "react-icons/md";
import { toast } from "react-toastify";
import AdditionalCategoryForm from "../../components/Form/AdditionalCategoryForm";
import {
  deleteDepartmentById,
  getDepartmentSourceById,
  putDepartmentById,
} from "../../apis/department_source";
import PopupDelete from "../../components/PopupDelete";

function DepartmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [originalData, setOriginalData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getDepartmentSourceById(id);
      setData(fetchedData);
      setOriginalData(fetchedData);
    };
    fetchData();
  }, [id]);

  const [editMode, setEditMode] = useState(false);

  const [showFormCategory, setShowFormCategory] = useState(false);
  const [preDataCategory, setPreDataCategory] = useState(null);

  const isValid = data.label?.trim() !== "" && data.url?.trim() !== "";
  const isChanged = JSON.stringify(data) !== JSON.stringify(originalData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSave = async (dept_id) => {
    try {
      const newDepartment = {
        label: data.label,
        url: data.url,
      };
      const response = await putDepartmentById({
        id: dept_id,
        newDepartment: newDepartment,
      });
      if (response.status === 200) {
        toast.success(`Đã cập nhật thành công!`);
      }
    } catch (error) {
      toast.error(`Đã cập nhật không thành công. Vui lòng thử lại sau!`);
    }
    setEditMode(false);
  };

  const [popupDeleteOpen, setPopupDeleteOpen] = useState(false);
  const handleDelete = (dept_id) => {
    try {
      deleteDepartmentById(dept_id);
      toast.success(`Đã xóa thành công!`);
      setPopupDeleteOpen(false);
      navigate(`/admin/department`);
    } catch (error) {
      toast.error(`Xóa không thành công. Vui lòng thử lại sau!`);
    }
  };

  if (!data) {
    return (
      <h2 className="text-xl font-bold mb-3 p-3 pt-0 pb-0 flex items-center">
        Không tìm thấy thông tin Khoa/Viện này!
      </h2>
    );
  }
  return (
    <div className="flex-1 relative">
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
            <span className="font-medium">{data.label}</span>
          </h2>

          <div className="p-6 grid grid-cols-2 gap-6">
            <div className="col-span-1 grid grid-cols-1 gap-4">
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Website <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="url"
                  value={data.url || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Tên Khoa <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="label"
                  value={data.label || ""}
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
                      `/admin/department/${data.documentId}/crawler_config`
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
                  {data?.categories?.length > 0 ? (
                    (data?.categories || []).map((c) => (
                      <li
                        key={c.documentId}
                        className="relative border border-blue-400 rounded px-3 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          if (!c.isNew) {
                            navigate(
                              `/admin/department/${data.documentId}/category/${c.documentId}`
                            );
                          } else {
                            setPreDataCategory(c);
                            setShowFormCategory(true);
                          }
                        }}
                      >
                        {c.categoryName}
                        {c.isNew && (
                          <span className="text-primary absolute right-[10px] p-[3px] italic">
                            Chưa lưu
                          </span>
                        )}
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
                      onClick={() => setShowFormCategory(true)}
                    >
                      <MdAddCircle size={24} />
                    </button>
                  )}
                </ul>
              </div>
              <div className="col-span-1 mb-1">{""}</div>
              <div className="col-span-1 mb-1">{""}</div>
            </div>
          </div>
        </div>
        <div>
          {showFormCategory && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="opacity-0 animate-fadeIn">
                <AdditionalCategoryForm
                  department_source={data}
                  preData={preDataCategory}
                  setShowFormCategory={setShowFormCategory}
                  onAddCategory={(newCategory) => {
                    setData((prev) => ({
                      ...prev,
                      categories: [...prev.categories, newCategory],
                    }));
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="p-5 flex justify-end gap-4">
          {!editMode ? (
            <>
              <>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={() => setPopupDeleteOpen(true)}
                >
                  Xóa
                </button>
                <PopupDelete
                  isOpen={popupDeleteOpen}
                  message={`Bạn có muốn xóa ${data.label} ?`}
                  onConfirm={() => handleDelete(id)}
                  onCancel={() => setPopupDeleteOpen(false)}
                />
              </>
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Chỉnh sửa
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setData(originalData); // reset
                  setEditMode(false);
                }}
                className="px-8 py-2 bg-gray-300 rounded"
              >
                Hủy
              </button>
              <button
                className={`px-8 py-2 text-white rounded transition ${
                  isValid && isChanged
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
                onClick={() => handleSave(id)}
                disabled={!isValid || !isChanged}
              >
                Lưu
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default DepartmentDetail;
