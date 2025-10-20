import { useState } from "react";
import { LiaTimesCircle } from "react-icons/lia";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postNewCategory } from "../../../apis/category";

function AdditionalCategoryForm({
  preData,
  setShowFormCategory,
  department_source_id,
}) {
  const [formData, setFormData] = useState(preData || {});

  const isValid =
    formData?.category_url &&
    formData.category_url.trim() !== "" &&
    formData?.category_name &&
    formData.category_name.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    try {
      postNewCategory({
        category_name: formData.category_name.trim(),
        category_url: formData?.category_url.trim(),
        department_source_id,
      });
      toast.success(`Đã cập nhật thành công!`);
    } catch (error) {
      toast.error(`Đã cập nhật không thành công. Vui lòng thử lại sau!`);
    }
    setShowFormCategory(false);
  };

  return (
    <div className="relative w-[500px] mx-auto bg-white rounded space-y-6 p-4 shadow text-sm">
      {/* Nút đóng */}
      <LiaTimesCircle
        className="absolute top-4 right-4 text-gray-500 w-[25px] h-[25px] rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
        onClick={() => setShowFormCategory(false)}
      />
      <h2 className="text-xl font-bold mb-3 p-3 pt-0 pb-0 flex items-center h-[40px]">
        Thêm loại tin tức mới
      </h2>
      <div>
        <div className="p-6 grid grid-cols-1 gap-6 h-full">
          {/* ====== Cột 1 + 2: Thông tin chi tiết ====== */}
          <div className="col-span-2 grid grid-cols-1 gap-6">
            {/* Website */}
            <div>
              <label className="block text-blue-700 font-medium mb-1">
                URL tin tức <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category_url"
                value={formData.category_url || ""}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 `}
              />
            </div>
            {/* Tên tin tức */}
            <div>
              <label className="block text-blue-700 font-medium mb-1">
                Tên tin tức <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category_name"
                value={formData.category_name || ""}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 `}
              />
            </div>
            {/* Mốc thời gian thu thập dữ liệu */}
            <div className="w-full flex justify-between items-center">
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Mốc thời gian thu thập
                </label>
                <DatePicker
                  selected={
                    formData.last_external_publish_date
                      ? new Date(formData.last_external_publish_date)
                      : null
                  }
                  onChange={(date) =>
                    handleChange({
                      target: {
                        name: "last_external_publish_date",
                        value: date ? date.toISOString() : "",
                      },
                    })
                  }
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Chọn ngày"
                  popperPlacement="bottom-start"
                  className={`w-full border rounded px-3 py-2 `}
                />
              </div>
              <div>
                {/* Nút hành động */}
                <div className="mt-6 flex justify-end gap-4">
                  <>
                    <button
                      onClick={() => {
                        setShowFormCategory(false);
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalCategoryForm;
