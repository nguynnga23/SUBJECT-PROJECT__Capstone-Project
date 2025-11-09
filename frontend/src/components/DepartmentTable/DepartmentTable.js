import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AdditionalDepartmentForm from "../Form/AdditionalDepartmentForm/AdditionalDepartmentForm";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import {
  deleteDepartmentById,
  getAllDepartmentSource,
} from "../../apis/department_source";
import PopupDelete from "../PopupDelete";
import Spinner from "../../components/Spinner";
import { useApi } from "../../hooks/useApi";
import Pagination from "../Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDepartmentSource,
  setDepartmentSources,
} from "../../store/slices/departmentSourceSlice";

const allColumns = [
  { key: "label", label: "Tên Khoa/Viện" },
  { key: "url", label: "Website" },
  { key: "categories", label: "Loại tin tức" },
  { key: "crawler_config", label: "Cấu hình thu thập" },
  { key: "createdAt", label: "Ngày tạo" },
  { key: "updatedAt", label: "Ngày cập nhật" },
];

// helper format date
const formatDateVN = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date)) return "Không hợp lệ";

  // Map thứ trong tuần
  const weekdays = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

  const dayOfWeek = weekdays[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${dayOfWeek}, ngày ${day}/${month}/${year}`;
};

const DepartmentTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request: fetchDepartments, loading: loadingFetch } = useApi(
    getAllDepartmentSource
  );
  const { request: fetchDeleteDepartmentSource, loading: loadingFetchDelete } =
    useApi(deleteDepartmentById);
  const data = useSelector((state) => state.departmentSource.list);

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchDepartments();
        if (fetched?.length) {
          dispatch(setDepartmentSources(fetched));
        }
      } catch (err) {
        toast.error("Không thể tải dữ liệu");
      }
    };
    load();
  }, []);

  const hiddenDefaultCols = ["createdAt", "crawler_config"];

  const [visibleCols, setVisibleCols] = useState(
    allColumns
      .map((c) => c.key)
      .filter((key) => !hiddenDefaultCols.includes(key))
  );

  const [showModal, setShowModal] = useState(false);

  // filter
  const [filterField, setFilterField] = useState("label");
  const [filterValue, setFilterValue] = useState("");

  // sort
  const [sortField, setSortField] = useState("");
  const [sortDir, setSortDir] = useState("asc");
  const [openFilter, setOpenFilter] = useState(false);

  // dropdown toggle
  const [openCols, setOpenCols] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const [arrayPopup, setArrayPopup] = useState({
    open: false,
    data: [],
    position: { top: 0, left: 0, width: 0 },
    departmentId: null,
  });

  // lọc
  let filtered = data.filter((d) =>
    String(d[filterField] || "")
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  );

  const renderValue = (value, colKey, rowId) => {
    if (colKey === "url" && typeof value === "string") {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {value}
        </a>
      );
    }

    // format ngày
    if (colKey === "createdAt" || colKey === "updatedAt") {
      return formatDateVN(value);
    }
    if (!value || value?.length === 0) {
      return "N/A";
    }
    if (Array.isArray(value)) {
      return (
        <button
          className="text-blue-500 hover:underline"
          onClick={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            setArrayPopup({
              open: true,
              data: value,
              position: {
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
              },
              departmentId: rowId,
            });
          }}
        >
          {value.length} loại tin tức
        </button>
      );
    }

    if (typeof value === "object" && value !== null) {
      return `Đã cập nhật`;
    }
    return value;
  };

  const popupRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setArrayPopup({
          open: false,
          data: [],
          position: { top: 0, left: 0, width: 0 },
        });
      }
    }

    if (arrayPopup.open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [arrayPopup.open]);

  // sắp xếp
  if (sortField) {
    filtered = [...filtered].sort((a, b) => {
      let valA = a[sortField] || "";
      let valB = b[sortField] || "";
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }

  const toggleColumn = (key) => {
    setVisibleCols((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Tính toán dữ liệu hiển thị theo phân trang
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handleShowDepartmentDetail = (department) => {
    navigate(`${department.documentId}`, { state: department });
  };

  const [popupDeleteOpen, setPopupDeleteOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);

  const handleDelete = async (row) => {
    try {
      const success = await fetchDeleteDepartmentSource(row.documentId);
      if (success) {
        dispatch(deleteDepartmentSource(row.documentId));
        toast.success(`Đã xóa ${row.label} thành công`);
      } else {
        toast.error("Xóa không thành công. Vui lòng thử lại!");
      }
    } catch (err) {
      toast.error("Có lỗi trong quá trình xóa. Vui lòng thử lại!");
    } finally {
      setPopupDeleteOpen(false);
    }
  };

  if (loadingFetch || loadingFetchDelete) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="flex w-full pb-2 justify-between text-sm">
        <div className="flex gap-2 mb-3 items-center">
          {/* chọn cột để lọc */}
          <div className="relative">
            <div
              onClick={() => setOpenFilter(!openFilter)}
              className="border rounded p-2 bg-white relative w-[180px] cursor-pointer hover:bg-gray-200"
            >
              {allColumns.find((c) => c.key === filterField)?.label}

              <IoIosArrowDown className="absolute right-[5px] top-3" />
            </div>
            {openFilter && (
              <div className="absolute mt-1 border bg-white rounded shadow z-10 w-[180px] max-h-[150px] overflow-y-auto scroll-container">
                {allColumns
                  .filter((a) => a.key !== "crawler_config")
                  .map((c) => (
                    <div
                      key={c.key}
                      onClick={() => {
                        setFilterField(c.key);
                        setOpenFilter(false);
                      }}
                      className={`py-2 px-2 cursor-pointer rounded hover:bg-gray-100 ${
                        filterField === c.key ? "bg-blue-100 font-medium" : ""
                      }`}
                    >
                      {c.label}
                    </div>
                  ))}
              </div>
            )}
          </div>
          {/* input nhập giá trị lọc */}
          <input
            type="text"
            placeholder="Nhập giá trị tìm kiếm"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border rounded p-2 bg-white w-[260px] focus:outline-none cursor-pointer"
          />
        </div>

        <div className="flex gap-2 mb-3 items-center">
          {/* chọn cột sắp xếp */}
          <div className="relative">
            <div
              onClick={() => setOpenSort(!openSort)}
              className="border rounded p-2 bg-white relative w-[180px] cursor-pointer hover:bg-gray-200"
            >
              {sortField
                ? allColumns.find((c) => c.key === sortField)?.label
                : " Chọn cột sắp xếp "}
              <IoIosArrowDown className="absolute right-[5px] top-3" />
            </div>
            {openSort && (
              <div className="absolute mt-1 border bg-white rounded shadow z-10 w-[180px] max-h-[150px] overflow-y-auto scroll-container">
                {allColumns.map((c) => (
                  <div
                    key={c.key}
                    onClick={() => {
                      setSortField(c.key);
                      setOpenSort(false);
                    }}
                    className={`py-2 px-2 cursor-pointer rounded hover:bg-gray-100 ${
                      sortField === c.key ? "bg-blue-100 font-medium" : ""
                    }`}
                  >
                    {c.label}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* chọn hướng sắp xếp */}
          <div className="relative">
            <div
              onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
              className="border rounded p-2 bg-white w-[100px] cursor-pointer text-center hover:bg-gray-200"
            >
              {sortDir === "asc" ? "Tăng dần" : "Giảm dần"}
            </div>
          </div>
        </div>

        <div className="relative inline-block mb-3">
          <div
            onClick={() => setOpenCols(!openCols)}
            className="border rounded p-2 bg-white relative w-[200px] cursor-pointer hover:bg-gray-200"
          >
            Chọn cột hiển thị{" "}
            <IoIosArrowDown className="absolute right-[5px] top-3" />
          </div>
          {openCols && (
            <div className="absolute mt-1 border bg-white rounded shadow z-10 w-[200px] max-h-[150px] overflow-y-auto scroll-container">
              {allColumns.map((c) => (
                <label
                  key={c.key}
                  className="flex items-center gap-2 text-sm py-2 p-2 cursor-pointer hover:bg-gray-200"
                >
                  <input
                    type="checkbox"
                    checked={visibleCols.includes(c.key)}
                    onChange={() => toggleColumn(c.key)}
                  />
                  {c.label}
                </label>
              ))}
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-sub text-white text-[12px] h-[35px] p-2 rounded"
          >
            Thêm mới
          </button>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="opacity-0 animate-fadeIn">
                <AdditionalDepartmentForm setShowModal={setShowModal} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto max-h-[65vh] min-h-[300px]">
        <table className="border w-full text-sm table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 w-[50px]">STT</th>
              {allColumns
                .filter((c) => visibleCols.includes(c.key))
                .map((col) => (
                  <th key={col.key} className="border p-2">
                    {col.label}
                  </th>
                ))}
              <th className="border p-2 w-[100px]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((dept, index) => (
              <tr key={dept.id} className="cursor-pointer hover:bg-sub">
                <td className="border p-2 text-center">{index + 1}</td>
                {allColumns
                  .filter((c) => visibleCols.includes(c.key))
                  .map((col) => (
                    <td
                      key={col.key}
                      className="border p-2"
                      onClick={() => handleShowDepartmentDetail(dept)}
                    >
                      {renderValue(dept[col.key], col.key, dept.documentId)}
                    </td>
                  ))}
                <td className="border text-center text-[10px]">
                  <div className="flex justify-center">
                    <RiDeleteBin6Fill
                      title="Xóa khoa viện"
                      size={25}
                      className="text-red-400 rounded-full border m-1 cursor-pointer p-1"
                      onClick={() => {
                        setSelectedDept(dept);
                        setPopupDeleteOpen(true);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(data.length / itemsPerPage)}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
      <PopupDelete
        isOpen={popupDeleteOpen}
        message={`Bạn có muốn xóa ${selectedDept?.label} ?`}
        onConfirm={() => handleDelete(selectedDept)}
        onCancel={() => setPopupDeleteOpen(false)}
      />
      {arrayPopup.open && (
        <div
          className="absolute bg-white border shadow rounded z-50"
          style={{
            top: arrayPopup.position.top,
            left: arrayPopup.position.left,
            minWidth: arrayPopup.position.width,
          }}
        >
          <ul
            className="max-h-[300px] text-[12px] overflow-y-auto"
            ref={popupRef}
          >
            {arrayPopup.data.map((item, index) => (
              <li
                className="p-2.5 hover:bg-gray-200 cursor-pointer"
                key={index}
                onClick={() =>
                  navigate(
                    `/admin/department/${arrayPopup.departmentId}/category/${item.documentId}`
                  )
                }
              >
                {JSON.stringify(item?.categoryName)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;
