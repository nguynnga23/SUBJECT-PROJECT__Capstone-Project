import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { thumnailDefault } from "../../assets";
import { getAllUsers } from "../../apis/user";
import { useApi } from "../../hooks/useApi";
import { user } from "../../assets";
import Spinner from "../Spinner";
// helper format date
const formatDateVN = (dateString) => {
  if (!dateString) return "Đang cập nhật ...";
  const date = new Date(dateString);
  if (isNaN(date)) return "Không hợp lệ";

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

const allColumns = [
  { key: "avatar", label: "Ảnh đại diện" },
  { key: "studentID", label: "Mã sinh viên" },
  { key: "username", label: "Tên tài khoản" },
  { key: "email", label: "Email" },
  { key: "class", label: "Lớp học" },
  { key: "phone", label: "Số điện thoại" },
  { key: "department", label: "Khoa" },
  { key: "createdAt", label: "Ngày tạo TK" },
  { key: "updatedAt", label: "Cập nhật gần nhất" },
];

const UserTable = () => {
  const navigate = useNavigate();
  const [usersPermissionsRoles, setUsersPermissionsRoles] = useState([]);
  const { request: fetchUsers, loading: loadingFetch } = useApi(getAllUsers);

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchUsers();

        if (fetched?.data.usersPermissionsRoles?.length) {
          setUsersPermissionsRoles(fetched?.data.usersPermissionsRoles[1]);
        }
      } catch (err) {
        toast.error("Không thể tải dữ liệu");
      }
    };
    load();
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (usersPermissionsRoles?.users) {
      const normalizedData = usersPermissionsRoles.users.map((user, idx) => ({
        id: idx + 1,
        avatar: user.avatar,
        studentID: user.studentID,
        username: user.username,
        email: user.email,
        class: user.class,
        phone: user.phone,
        department: user.department?.department_name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));
      setData(normalizedData);
    }
  }, [usersPermissionsRoles]);

  const hiddenDefaultCols = ["phone", "department", "createdAt", "updatedAt"];
  const [visibleCols, setVisibleCols] = useState(
    allColumns
      .map((c) => c.key)
      .filter((key) => !hiddenDefaultCols.includes(key))
  );

  // filter
  const [filterField, setFilterField] = useState("studentID");
  const [filterValue, setFilterValue] = useState("");

  // sort
  const [sortField, setSortField] = useState("");
  const [sortDir, setSortDir] = useState("asc");

  const [openFilter, setOpenFilter] = useState(false);
  const [openCols, setOpenCols] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  // lọc
  let filtered = data.filter((d) =>
    String(d[filterField] || "")
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  );

  // render value theo col
  const renderValue = (value, colKey) => {
    if (colKey === "avatar") {
      return (
        <div className="flex justify-center items-center">
          <img
            src={
              value?.url
                ? `${process.env.REACT_APP_API_ENDPOINT_RESOURCE}${value?.url}`
                : user
            }
            alt="avatar"
            className="h-[30px] w-[30px] object-cover rounded-full"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = thumnailDefault;
            }}
          />
        </div>
      );
    }

    if (colKey === "createdAt" || colKey === "updatedAt") {
      return formatDateVN(value);
    }

    if (!value || value?.length === 0) {
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(startIndex, startIndex + itemsPerPage);

  if (loadingFetch) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-3 pb-0">
      {/* Filter + Sort + Column Picker */}
      <div className="flex w-full pb-2 justify-between text-sm">
        {/* filter */}
        <div className="flex gap-2 mb-3 items-center">
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
                  .filter((c) => c.key !== "avatar")
                  .map((c) => (
                    <div
                      key={c.key}
                      onClick={() => {
                        setFilterField(c.key);
                        setOpenFilter(false);
                      }}
                      className={`py-2 px-2 cursor-pointer hover:bg-gray-100 ${
                        filterField === c.key ? "bg-blue-100 font-medium" : ""
                      }`}
                    >
                      {c.label}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Nhập giá trị tìm kiếm"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="border rounded p-2 bg-white w-[260px] focus:outline-none"
          />
        </div>

        {/* sort */}
        <div className="flex gap-2 mb-3 items-center">
          <div className="relative">
            <div
              onClick={() => setOpenSort(!openSort)}
              className="border rounded p-2 bg-white relative w-[180px] cursor-pointer hover:bg-gray-200"
            >
              {sortField
                ? allColumns.find((c) => c.key === sortField)?.label
                : "Chọn cột sắp xếp"}
              <IoIosArrowDown className="absolute right-[5px] top-3" />
            </div>
            {openSort && (
              <div className="absolute mt-1 border bg-white rounded shadow z-10 w-[180px] max-h-[150px] overflow-y-auto scroll-container">
                {allColumns
                  .filter((c) => c.key !== "avatar")
                  .map((c) => (
                    <div
                      key={c.key}
                      onClick={() => {
                        setSortField(c.key);
                        setOpenSort(false);
                      }}
                      className={`py-2 px-2 cursor-pointer hover:bg-gray-100 ${
                        sortField === c.key ? "bg-blue-100 font-medium" : ""
                      }`}
                    >
                      {c.label}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div
            onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
            className="border rounded p-2 bg-white w-[100px] cursor-pointer text-center hover:bg-gray-200"
          >
            {sortDir === "asc" ? "Tăng dần" : "Giảm dần"}
          </div>
        </div>

        <div className="relative inline-block mb-3">
          <div
            onClick={() => setOpenCols(!openCols)}
            className="border rounded p-2 bg-white relative w-[200px] cursor-pointer hover:bg-gray-200"
          >
            Chọn cột hiển thị
            <IoIosArrowDown className="absolute right-[5px] top-3" />
          </div>
          {openCols && (
            <div className="absolute mt-1 border bg-white rounded shadow z-10 w-[200px] max-h-[150px] overflow-y-auto scroll-container">
              {allColumns.map((c) => (
                <label
                  key={c.key}
                  className="flex items-center gap-2 text-sm py-2 px-2 cursor-pointer hover:bg-gray-200"
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
      </div>

      <div className="flex flex-col">
        <div className="flex-1 overflow-y-hidden">
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
              {currentData.map((row, index) => (
                <tr
                  key={row.id || index}
                  className="cursor-pointer hover:bg-sub"
                  onClick={() => navigate(`/admin/user/${row.studentID}`)}
                >
                  <td className="border p-2 text-center">
                    {startIndex + index + 1}
                  </td>
                  {allColumns
                    .filter((c) => visibleCols.includes(c.key))
                    .map((col) => (
                      <td
                        key={col.key}
                        className="border p-2 min-w-[20px] max-w-[200px]"
                      >
                        <div className="line-clamp-2">
                          {renderValue(row[col.key], col.key)}
                        </div>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {currentPage > 1 && (
          <div className="flex justify-center items-center mt-2 space-x-1">
            {/* Prev */}
            <button
              className="p-[2px] text-[10px] w-[20px] h-[20px] border rounded-full disabled:opacity-50"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt;
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  className={`p-[2px] text-[10px] w-[20px] h-[20px] border rounded-full ${
                    page === currentPage ? "bg-primary text-white" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}

            {/* Next */}
            <button
              className="p-[2px] text-[10px] w-[20px] h-[20px] border rounded-full disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
