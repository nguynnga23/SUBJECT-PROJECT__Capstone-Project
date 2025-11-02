import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdditionalCategoryForm from "../AdditionalCategoryForm";
import { MdAddCircle } from "react-icons/md";
import { LiaTimesCircle } from "react-icons/lia";
import { postNewDepartmentSource } from "../../../apis/department_source";

function AdditionalDepartmentForm({ setShowModal }) {
  const [formData, setFormData] = useState({
    url: "",
    label: "",
    crawler_config: {},
    categories: [],
  });
  const [showFormCategory, setShowFormCategory] = useState(false);
  const [preDataCategory, setPreDataCategory] = useState(null);
  const [errors, setErrors] = useState({});
  const department = useSelector(
    (state) => state.department.currentDepartment || {}
  );
  const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Nếu là field url thì kiểm tra regex
    if (name === "url") {
      if (!urlRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          url: "URL không hợp lệ (VD: https://example.com)",
        }));
      } else {
        setErrors((prev) => ({ ...prev, url: "" }));
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValid =
    formData.url.trim() !== "" && formData.label.trim() !== "" && !errors.url;

  const handleSubmit = () => {
    if (errors.url) {
      alert("Vui lòng nhập URL hợp lệ trước khi lưu!");
      return;
    }
    try {
      postNewDepartmentSource({
        url: formData.url,
        label: formData.label,
        department_id: department.documentId,
      });

      toast.success(`Đã thêm mới thành công`);
    } catch (error) {
      toast.error(`Thêm mới không thành công. Vui lòng thử lại sau!`);
    }
    setShowModal(false); // đóng modal
  };

  return (
    <div className="relative">
      <div
        className={`w-[500px] mx-auto bg-white rounded space-y-6 p-6 shadow ${
          showFormCategory ? "hidden" : ""
        }`}
      >
        {/* Nút đóng */}
        <LiaTimesCircle
          className="absolute top-4 right-4 text-gray-500 w-[25px] h-[25px] rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
          onClick={() => setShowModal(false)}
        />

        <div className="relative h-[300px]">
          <h2 className="text-xl font-bold mb-3 p-3 pt-0 pb-0 flex items-center h-[40px]">
            Thêm Khoa/Viện mới
          </h2>
          <div className="overflow-y-scroll">
            <div className="p-6 grid grid-cols-1 gap-6">
              <div className="col-span-1 grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-blue-700 font-medium mb-1">
                    Website <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="url"
                    value={formData.url || ""}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2`}
                  />
                  {errors?.url && (
                    <p className="text-red-500 text-[10px] mt-1">
                      {errors.url}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-blue-700 font-medium mb-1">
                    Tên Khoa <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="label"
                    value={formData.label || ""}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 `}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-2 right-2 flex gap-4">
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="px-8 py-2 bg-gray-300 rounded"
            >
              Hủy
            </button>
            <button
              className={`px-8 py-2 text-white rounded ${
                isValid ? "bg-green-600" : "bg-gray-300"
              }`}
              onClick={handleSubmit}
              disabled={!isValid}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
      <div>
        {showFormCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="animate-slide-in">
              <AdditionalCategoryForm
                preData={preDataCategory}
                setShowFormCategory={setShowFormCategory}
                onAddCategory={(newCategory) => {
                  setFormData((prev) => ({
                    ...prev,
                    categories: [...prev.categories, newCategory],
                  }));
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdditionalDepartmentForm;
