import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { mockDepartments } from "../../assets/sampleData";

const allColumns = [
  { key: "name", label: "Tên Khoa" },
  { key: "code", label: "Mã Khoa" },
  { key: "leader", label: "Trưởng khoa" },
  { key: "website", label: "Website" },
  { key: "email", label: "Email" },
  { key: "number", label: "Số điện thoại" },
  { key: "location", label: "Văn phòng" },
];

const DepartmentTable = () => {
  const [departments] = useState(mockDepartments);
  const navigate = useNavigate();
  const [visibleCols, setVisibleCols] = useState(allColumns.map((c) => c.key));

  const [showModal, setShowModal] = useState(false);

  // filter
  const [filterField, setFilterField] = useState("name");
  const [filterValue, setFilterValue] = useState("");

  // sort
  const [sortField, setSortField] = useState("");
  const [sortDir, setSortDir] = useState("asc");

  // dropdown toggle
  const [openCols, setOpenCols] = useState(false);

  // lọc
  let filtered = departments.filter((d) =>
    String(d[filterField]).toLowerCase().includes(filterValue.toLowerCase())
  );

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
        <div className="flex gap-2 mb-3 items-center p-2 border rounded">
          <select
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
            className="focus:outline-none cursor-pointer"
          >
            {allColumns.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nhập giá trị tìm kiếm ..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border-l px-2  focus:outline-none w-[300px]"
          />
        </div>

        <div className="flex gap-2 mb-3 items-center border rounded p-2">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className=" focus:outline-none cursor-pointer "
          >
            <option value="">-- Chọn cột sắp xếp --</option>
            {allColumns.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
          <select
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value)}
            className="border-l px-2 focus:outline-none cursor-pointer"
          >
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>

        <div className="relative inline-block mb-3">
          <div
            onClick={() => setOpenCols(!openCols)}
            className="border rounded p-2 bg-white  relative w-[160px] cursor-pointer"
          >
            Chọn cột hiển thị{" "}
            <IoIosArrowDown className="absolute right-[5px] top-3" />
          </div>
          {openCols && (
            <div className="absolute mt-1 border bg-white rounded shadow p-2 z-10 w-[180px] max-h-60 overflow-y-auto">
              {allColumns.map((c) => (
                <label
                  key={c.key}
                  className="flex items-center gap-2 text-sm py-2"
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
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-400 hover:bg-blue-700 text-white text-[12px] h-[35px] p-2 rounded"
        >
          Thêm mới
        </button>
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
                    className={`border p-2 ${
                      dept[col.key].length !== 0 ? "" : "italic"
                    }`}
                    onClick={() => handleShowDepartmentDetail(dept.id)}
                  >
                    {dept[col.key].length !== 0
                      ? dept[col.key]
                      : "Đang cập nhật ..."}
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
