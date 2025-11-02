import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegCirclePause } from "react-icons/fa6";
import { BiSkipNextCircle } from "react-icons/bi";
import { IoMdRefresh } from "react-icons/io";
import {
  changePauseStatusWatch,
  checkWatchNow,
  getAllWatch,
  sendMessageToWebhooksRightNow,
} from "../../apis/watch";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import Spinner from "../Spinner";

// helper format date
const formatDateVN = (timestamp) => {
  const now = Date.now();
  const time = timestamp * 1000; // nếu timestamp là giây
  const diff = Math.floor((now - time) / 1000); // chênh lệch theo giây

  if (diff < 60) return `${diff} giây trước`;
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 86400 * 2) return `Hôm qua`;

  // Nếu quá 2 ngày thì hiển thị ngày giờ
  const date = new Date(time);
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");

  return `${dd}/${mm}/${yyyy} - ${hh}:${mi}`;
};

// định nghĩa cột
const allColumns = [
  { key: "title", label: "Tên Trang theo dõi" },
  { key: "url", label: "URL" },
  { key: "last_checked", label: "Kiểm tra gần nhất" },
  { key: "last_changed", label: "Thay đổi gần nhất" },
];

const SettingTable = () => {
  const { request: fetchWatchs, loading: loadingFetch } = useApi(getAllWatch);
  const { request: fetchChangePauseStatus, loading: loadingChange } = useApi(
    changePauseStatusWatch
  );
  const { request: fetchWatchNow, loading: loadingCheck } =
    useApi(checkWatchNow);
  const { request: fetchSendMessageNow, loading: loadingSendMessage } = useApi(
    sendMessageToWebhooksRightNow
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchWatchs();
        setData(fetched);
      } catch (err) {
        toast.error("Không thể tải dữ liệu");
      }
    };
    load();
  }, []);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllWatch();
        const arr = res.map((item) => ({
          id: item.id, // chính là uuid
          title: item.title,
          url: item.url,
          last_checked: item.last_checked,
          last_changed: item.last_changed,
          last_error: item.last_error,
          viewed: item.viewed,
          paused: item.paused,
        }));

        setData(arr);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const hiddenDefaultCols = ["last_checked"];
  const [visibleCols, setVisibleCols] = useState(
    allColumns
      .map((c) => c.key)
      .filter((key) => !hiddenDefaultCols.includes(key))
  );

  // filter
  const [filterField, setFilterField] = useState("title");
  const [filterValue, setFilterValue] = useState("");

  // sort
  const [sortField, setSortField] = useState("");
  const [sortDir, setSortDir] = useState("asc");

  const [openFilter, setOpenFilter] = useState(false);
  const [openCols, setOpenCols] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  // lọc
  let filtered = Array.isArray(data)
    ? data.filter((d) =>
        String(d[filterField] || "")
          .toLowerCase()
          .includes(filterValue.toLowerCase())
      )
    : [];

  // render value theo col
  const renderValue = (value, colKey) => {
    if (colKey === "last_changed" || colKey === "last_checked") {
      return value ? formatDateVN(Number(value)) : "N/A"; // hoặc "-"
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
  // Lấy dữ liệu trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const [loadingLockId, setLoadingLockId] = useState(null);
  const [loadingCheckId, setLoadingCheckId] = useState(null);

  const handleLock = async (row) => {
    try {
      setLoadingLockId(row.id); // chỉ hiển thị loading cho dòng này
      const response = await fetchChangePauseStatus(row.id, !row.paused);
      if (response === "OK") {
        toast.success("Cập nhật theo dõi thành công");
      } else {
        toast.error("Cập nhật theo dõi thất bại");
      }
    } catch (error) {
      toast.error("Cập nhật theo dõi thất bại");
    } finally {
      setLoadingLockId(null); // reset sau khi hoàn tất
    }
  };

  const handleCheckNow = async (row) => {
    try {
      setLoadingCheckId(row.id); // chỉ loading dòng này
      const response = await fetchWatchNow(row.id);
      if (response === "OK") {
        const response_1 = await fetchSendMessageNow(row.url);
        if (response_1) {
          toast.success("Đang tiến hành thu thập");
        } else {
          toast.error("Thu thập thất bại");
        }
      } else {
        toast.error("Thu thập thất bại");
      }
    } catch (error) {
      toast.error("Thu thập thất bại");
    } finally {
      setLoadingCheckId(null);
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

        {/* chọn cột hiển thị */}
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

      {/* Table */}
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
                <th className="border p-2 w-[100px]">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, index) => (
                <tr key={row.id || index}>
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
                        <div>{renderValue(row[col.key], col.key)}</div>
                      </td>
                    ))}
                  <td className="border text-center text-[10px]">
                    <div
                      className="flex justify-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {loadingLockId === row.id ? (
                        <div className="inset-0 flex justify-center items-center z-50">
                          <Spinner size="w-6 h-6" color="text-yellow-400" />
                        </div>
                      ) : !row.paused ? (
                        <FaRegCirclePause
                          title="Dừng theo dõi"
                          size={23}
                          className="text-yellow-400 rounded-full m-2 cursor-pointer"
                          onClick={() => handleLock(row)}
                        />
                      ) : (
                        <BiSkipNextCircle
                          title="Tiếp tục theo dõi"
                          size={26}
                          className="text-primary rounded-full m-2 cursor-pointer"
                          onClick={() => handleLock(row)}
                        />
                      )}
                      {loadingCheckId === row.id ? (
                        <div className="inset-0 flex justify-center items-center z-50">
                          <Spinner size="w-6 h-6" />
                        </div>
                      ) : (
                        <IoMdRefresh
                          size={26}
                          title="Thu thập ngay lập tức"
                          className="text-primary rounded-full m-2 cursor-pointer"
                          onClick={() => handleCheckNow(row)}
                        />
                      )}
                    </div>
                  </td>
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

export default SettingTable;
