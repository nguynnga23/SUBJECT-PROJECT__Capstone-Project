import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  deleteCategoryById,
  getCategoryById,
  putCategoryById,
} from "../../apis/category";
import Spinner from "../../components/Spinner";
import { useApi } from "../../hooks/useApi";

function CategoryDetail() {
  const { id, cat_id } = useParams();
  const navigate = useNavigate();
  const { request: fetchCategory, loading: loadingFetch } =
    useApi(getCategoryById);
  const { request: updateCategory, loading: loadingUpdate } =
    useApi(putCategoryById);
  const [data, setData] = useState({});
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchCategory(cat_id);
        setData(fetched);
        setOriginalData(fetched);
      } catch (err) {
        toast.error("Không thể tải dữ liệu");
      }
    };
    load();
  }, [cat_id]);

  const [editMode, setEditMode] = useState(false);

  const isValid =
    data?.categoryUrl &&
    data.categoryUrl.trim() !== "" &&
    data?.categoryName &&
    data.categoryName.trim() !== "";
  const isChanged = JSON.stringify(data) !== JSON.stringify(originalData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSave = async () => {
    try {
      const response = await updateCategory({
        id: cat_id,
        newCategory: {
          category_name: data.categoryName,
          category_url: data.categoryUrl,
          last_external_publish_date: data.lastExternalPublishDate
            ? new Date(data.lastExternalPublishDate).toISOString().split("T")[0]
            : null,
        },
      });
      if (response.status === 200) {
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
        Không tìm thấy thông tin loại tin tức này này!
      </h2>
    );
  }

  const handleDelete = (cat_id) => {
    try {
      deleteCategoryById(cat_id);
      toast.success(`Đã xóa thành công!`);
      navigate(`/admin/department/${id}`);
    } catch (error) {
      toast.error(`Xóa không thành công. Vui lòng thử lại sau!`);
    }
  };

  if (loadingFetch) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex-1 w-full">
      {loadingUpdate && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}
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
              onClick={() => navigate(`/admin/department/${id}`)}
            >
              {data?.departmentSource?.label}
            </span>
            <MdChevronRight />
            <span className="font-medium">{data?.categoryName}</span>
          </h2>

          <div className="p-6 grid grid-cols-1 gap-6 h-full w-full">
            {/* ====== Cột 1 + 2: Thông tin chi tiết ====== */}
            <div className="col-span-2 grid grid-cols-1 gap-6 w-full">
              {/* Website */}
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  URL tin tức <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="categoryUrl"
                  value={data.categoryUrl || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              {/* Tên tin tức */}
              <div>
                <label className="block text-blue-700 font-medium mb-1">
                  Tên tin tức <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={data.categoryName || ""}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full border rounded px-3 py-2 ${
                    !editMode ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              {/* Mốc thời gian thu thập dữ liệu */}
              <div className="w-full flex justify-between items-center">
                <div>
                  <label className="block text-blue-700 font-medium mb-1">
                    Mốc thời gian thu thập tin tức{" "}
                  </label>
                  <DatePicker
                    selected={
                      data.lastExternalPublishDate
                        ? new Date(data.lastExternalPublishDate)
                        : null
                    }
                    onChange={(date) =>
                      handleChange({
                        target: {
                          name: "lastExternalPublishDate",
                          value: date ? date.toISOString() : "",
                        },
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Chọn ngày"
                    popperPlacement="bottom-start"
                    disabled={!editMode}
                    className={`w-[500px] border rounded px-3 py-2 ${
                      !editMode ? "bg-gray-100" : ""
                    }`}
                  />
                </div>
                <div>
                  {/* Nút hành động */}
                  <div className="mt-6 flex justify-end gap-4">
                    {!editMode ? (
                      <>
                        <button
                          className="px-4 py-2 bg-red-600 text-white rounded"
                          onClick={() => handleDelete(cat_id)}
                        >
                          Xóa
                        </button>
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
                          onClick={handleSave}
                          disabled={!isValid || !isChanged}
                        >
                          Lưu
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CategoryDetail;
