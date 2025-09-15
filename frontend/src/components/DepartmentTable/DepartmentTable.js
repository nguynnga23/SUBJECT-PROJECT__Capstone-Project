import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import AdditionalDepartmentForm from "../Form/AdditionalDepartmentForm/AdditionalDepartmentForm";
import { current_data } from "../../assets/sampleData";

const allColumns = [
  { key: "label", label: "Tên Khoa/Viện" },
  { key: "url", label: "Website" },
  { key: "categories", label: "Loại tin tức" },
  { key: "crawler_config", label: "Cấu hình thu thập" },
  { key: "createdAt", label: "Ngày tạo" },
  { key: "updatedAt", label: "Ngày cập nhật" },
];

const DepartmentTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(current_data?.department_sources || {});

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

  // lọc
  let filtered = data.filter((d) =>
    String(d[filterField] || "")
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  );

  const renderValue = (value) => {
    if (Array.isArray(value)) {
      return `Array(${value.length})`;
    } else if (typeof value === "object" && value !== null) {
      return `Object(${Object.keys(value).length})`;
    } else if (!value || value?.length === 0) {
      return "Đang cập nhật ...";
    }
    return value;
  };

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

  const handleShowDepartmentDetail = (departmentId) => {
    navigate(`${departmentId}`);
  };

  return (
    <div className="p-3">
      <div className="flex w-full pb-2 justify-between  text-sm">
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
                : "-- Chọn cột sắp xếp --"}
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
            className="bg-blue-400 hover:bg-blue-700 text-white text-[12px] h-[35px] p-2 rounded"
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
          </tr>
        </thead>
        <tbody>
          {filtered.map((dept, index) => (
            <tr key={dept.id} className="hover:bg-blue-50 cursor-pointer">
              <td className="border p-2">{index + 1}</td>
              {allColumns
                .filter((c) => visibleCols.includes(c.key))
                .map((col) => (
                  <td
                    key={col.key}
                    className="border p-2"
                    onClick={() => handleShowDepartmentDetail(dept.id)}
                  >
                    {renderValue(dept[col.key])}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
