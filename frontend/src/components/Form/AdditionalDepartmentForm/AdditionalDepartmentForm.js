import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDepartment } from "../../../store/slices/departmentSlice";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

function AdditionalDepartmentForm({ setShowModal }) {
  const [formData, setFormData] = useState({
    website: "",
    code: "",
    name: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isValid =
    formData.website.trim() !== "" &&
    formData.code.trim() !== "" &&
    formData.name.trim() !== "";

  const handleSubmit = () => {
    try {
      const newDepartment = {
        id: uuidv4(),
        name: formData.name,
        code: formData.code,
        leader: formData.leader,
        website: formData.website,
        email: formData.email,
        number: formData.number,
        location: formData.location,
      };

      dispatch(addDepartment(newDepartment));

      toast.success(
        `Đã thêm mới ${newDepartment.name} thành công, hãy bổ sung các loại tin tức của khoa!`
      );
    } catch (error) {
      toast.error(`Thêm mới không thành công. Vui lòng thử lại sau!`);
    }

    setShowModal(false); // đóng modal
  };

  return (
    <div className="relative w-[800px] mx-auto bg-white rounded space-y-6 p-6 shadow">
      {/* Nút đóng */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl flex items-center justify-center w-[25px] h-[25px] rounded-full hover:bg-red-500 hover:text-white"
        onClick={() => setShowModal(false)}
      >
        &times;
      </button>
      <div>
        <h2 className="text-xl font-bold mb-3 p-3 pt-0 pb-0 flex items-center h-[40px]">
          Thêm Khoa/Viện mới
        </h2>
        <div className="p-6 grid grid-cols-2 gap-6">
          {/* ====== Cột 1 + 2: Thông tin chi tiết ====== */}
          <div className="col-span-2 grid grid-cols-2 gap-6">
            {/* Website */}
            <div>
              <label className="block text-blue-700 mb-1">
                Website <span className="text-red-500">(*)</span>
              </label>
              <input
                type="text"
                name="website"
                value={formData.website || ""}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 
                          }`}
              />
            </div>
            {/* Tên khoa */}
            <div>
              <label className="block text-blue-700 mb-1">
                Tên Khoa <span className="text-red-500">(*)</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2`}
              />
            </div>

            {/* Mã khoa */}
            <div>
              <label className="block text-blue-700 mb-1">
                Mã Khoa <span className="text-red-500">(*)</span>
              </label>
              <input
                type="text"
                name="code"
                value={formData.code || ""}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2`}
              />
            </div>

            {/* Trưởng khoa */}
            <div>
              <label className="block text-blue-700 mb-1">Trưởng khoa</label>
              <input
                type="text"
                name="leader"
                value={formData.leader || ""}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 `}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-blue-700 mb-1">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 `}
              />
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-blue-700 mb-1">Số điện thoại</label>
              <input
                type="text"
                name="number"
                value={formData.number || ""}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2`}
              />
            </div>

            {/* Văn phòng */}
            <div className="col-span-2">
              <label className="block text-blue-700 mb-1">Văn phòng</label>
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2`}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
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
  );
}

export default AdditionalDepartmentForm;
