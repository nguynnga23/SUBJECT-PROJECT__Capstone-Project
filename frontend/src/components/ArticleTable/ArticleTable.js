import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { thumnailDefault } from "../../assets";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getAllArticles, getArticleCount } from "../../apis/article";
import Spinner from "../../components/Spinner";
import { useApi } from "../../hooks/useApi";
import { toast } from "react-toastify";
import Pagination from "../Pagination";
import { setPageData, setTotal } from "../../store/slices/articleSlice";
import { selectCurrentPageData } from "../../store/selector/articleSelectors";
import { useDispatch, useSelector } from "react-redux";

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

// định nghĩa cột
const allColumns = [
  { key: "thumbnail", label: "Thumbnail" },
  { key: "title", label: "Tên bài viết" },
  { key: "externalUrl", label: "Bài viết gốc" },
  { key: "externalPublishDate", label: "Ngày đăng" },
  { key: "departmentSource", label: "Khoa/Viện" },
  { key: "category", label: "Loại tin tức" },
  { key: "createdAt", label: "Ngày thu thập" },
  { key: "updatedAt", label: "Ngày cập nhật" },
];

const ArticleTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { request: fetchArticles, loading: loadingFetch } =
    useApi(getAllArticles);
  const { request: fetchArticlesCount, loading: loadingFetchCount } =
    useApi(getArticleCount);

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialPageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialPageSize);
  const totalItems = useSelector((state) => state.article.total);
  const data = useSelector((state) =>
    selectCurrentPageData(state, currentPage)
  );

  useEffect(() => {
    setSearchParams({
      page: currentPage,
      pageSize: itemsPerPage,
    });
  }, [currentPage, itemsPerPage, setSearchParams]);

  useEffect(() => {
    const loadTotal = async () => {
      try {
        const count = await fetchArticlesCount();
        dispatch(setTotal(count));
      } catch {
        toast.error("Không thể lấy tổng số bài viết");
      }
    };
    loadTotal();
  }, [dispatch]);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const fetched = await fetchArticles({ currentPage, itemsPerPage });
        dispatch(setPageData({ page: currentPage, items: fetched }));
      } catch {
        toast.error("Không thể tải dữ liệu trang này");
      }
    };
    loadPage();
  }, [currentPage, itemsPerPage, dispatch]);

  const normalizedData = data.map((a) => ({
    id: a.documentId,
    title: a.title,
    externalUrl: a.externalUrl,
    externalPublishDate: a.externalPublishDate,
    departmentSource: a.category?.departmentSource.label,
    category: a.category?.categoryName,
    thumbnail: a.thumbnail,
    createdAt: a.createdAt,
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
  }));

  const hiddenDefaultCols = ["category", "createdAt"];
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

  let filtered = normalizedData.filter((d) =>
    String(d[filterField] || "")
      .toLowerCase()
      .includes(filterValue.toLowerCase())
  );

  const renderValue = (value, colKey) => {
    if (colKey === "externalUrl" && typeof value === "string") {
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
    if (colKey === "thumbnail") {
      return (
        <div className="flex justify-center items-center">
          <img
            src={value}
            alt="thumbnail"
            className="h-[30px] object-cover rounded items-center"
            onError={(e) => {
              e.target.onerror = null; // tránh loop
              e.target.src = thumnailDefault;
            }}
          />
        </div>
      );
    }
    if (colKey === "external_url" && typeof value === "string") {
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {value}
        </a>
      );
    }

    if (
      colKey === "externalPublishDate" ||
      colKey === "createdAt" ||
      colKey === "updatedAt"
    ) {
      return formatDateVN(value);
    }

    if (!value || value?.length === 0) {
      return "Đang cập nhật ...";
    }

    return value;
  };

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

  const handleDelete = (row) => {
    alert(row.title);
  };
  const handleLock = (row) => {
    alert(row.title);
  };
  const handleUnlock = (row) => {
    alert(row.title);
  };

  if (loadingFetch) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spinner />
      </div>
    );
  }
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <div className="p-3 pb-0 flex flex-col ">
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
                  .filter((c) => c.key !== "thumbnail")
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
                  .filter((c) => c.key !== "thumbnail")
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

      {/* Table */}
      <div className="flex-1 overflow-auto max-h-[67vh] min-h-[300px]">
        <table className="border w-full text-[11px] table-auto">
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
            {normalizedData.map((row, index) => (
              <tr
                key={row.id || index}
                className="cursor-pointer hover:bg-sub"
                onClick={() => navigate(`/admin/article/${row.id}`)}
              >
                <td className="border p-2 text-center">
                  {startIndex + index + 1}
                </td>
                {allColumns
                  .filter((c) => visibleCols.includes(c.key))
                  .map((col) => (
                    <td
                      key={col.key}
                      className="border p-1.5 min-w-[20px] max-w-[200px]"
                    >
                      <div className="line-clamp-2">
                        {renderValue(row[col.key], col.key)}
                      </div>
                    </td>
                  ))}
                <td className="border text-center text-[10px]">
                  <div className="flex justify-center">
                    <RiDeleteBin6Fill
                      title="Xóa bài viết"
                      size={25}
                      className="text-red-400 rounded-full border m-1 cursor-pointer p-1"
                      onClick={() => handleDelete(row)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleTable;
