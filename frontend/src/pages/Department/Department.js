import CategoryList from "../../components/CategoryList";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { getAllDepartmentSource } from "../../apis/department_source";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllArticles,
  getAllArticlesByCatId,
  getArticleByCategoryCount,
  getArticleCount,
} from "../../apis/article";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import { setPageData, setTotal } from "../../store/slices/articleSlice";
import { selectCurrentPageData } from "../../store/selector/articleSelectors";
import { IoList } from "react-icons/io5";
import { getCategoryById } from "../../apis/category";
import HoverDropdownForCategory from "../../components/HoverDropdownForCategory";
import ScrollToTopButton from "../../components/ScrollToTopButton";

function Department() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cat_id } = useParams();
  const { request: fetchDepartments, loading: loadingFetchDepartments } =
    useApi(getAllDepartmentSource);
  const { request: fetchCategory, loading: loadingFetchCategory } =
    useApi(getCategoryById);
  const [departments, setDepartments] = useState([]);
  const [category, setCategory] = useState(
    useSelector((state) => state.category.currentCategory) || null
  );

  useEffect(() => {
    const load = async () => {
      if (departments.length === 0) {
        try {
          const fetched = await fetchDepartments();
          setDepartments(fetched);
        } catch (err) {
          toast.error("Không thể tải dữ liệu");
        }
      }
    };
    load();
  }, [departments]);
  const [searchParams, setSearchParams] = useSearchParams();

  const { request: fetchArticles, loading: loadingFetchArticles } =
    useApi(getAllArticles);

  const {
    request: fetchArticlesByCategory,
    loading: loadingFetchArticlesByCategory,
  } = useApi(getAllArticlesByCatId);
  const { request: fetchArticlesCount, loading: loadingFetchCount } = useApi(
    cat_id ? getArticleByCategoryCount : getArticleCount
  );

  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const initialPageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialPageSize);
  const totalItems = useSelector((state) => state.article.total);

  const data = useSelector((state) =>
    selectCurrentPageData(state, currentPage)
  );

  useEffect(() => {
    const load = async () => {
      if (cat_id) {
        try {
          const fetched = await fetchCategory(cat_id);
          setCategory(fetched);
        } catch (err) {
          // toast.error("Không thể tải dữ liệu");
        }
      }
    };
    load();
  }, [cat_id]);

  useEffect(() => {
    setSearchParams({
      page: currentPage,
      pageSize: itemsPerPage,
    });
  }, [currentPage, itemsPerPage, setSearchParams]);

  useEffect(() => {
    const loadTotal = async () => {
      try {
        let count = null;
        if (cat_id) {
          count = await fetchArticlesCount(cat_id);
        } else {
          count = await fetchArticlesCount();
        }
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
        let fetched;

        if (cat_id) {
          fetched = await fetchArticlesByCategory({
            cat_id,
            currentPage,
            itemsPerPage,
          });
        } else {
          fetched = await fetchArticles({
            currentPage,
            itemsPerPage,
          });
        }

        dispatch(setPageData({ page: currentPage, items: fetched }));
      } catch {
        toast.error("Không thể tải dữ liệu trang này");
      }
    };

    loadPage();
  }, [cat_id, currentPage, itemsPerPage, dispatch]);

  const handleCategorySelect = (cat) => {
    navigate(`/category/${cat.documentId}`);
  };

  return (
    <div className="flex w-full">
      <div className="w-[25%] h-[100vh] pt-2 pr-2">
        <h2 className="flex items-center text-base font-semibold text-gray-800 mt-4">
          <IoList size={20} className="m-2" />
          DANH SÁCH CÁC KHOA/VIỆN
        </h2>
        {loadingFetchDepartments ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Spinner />
          </div>
        ) : (
          <div className="whitespace-nowrap truncate h-[100vh] transition duration-300 z-50">
            <ul className="text-[12px]">
              {departments.length > 0 ? (
                departments.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center bg-[#153898] text-white border rounded-lg px-4 py-2 mt-2 font-normal hover:text-[#F9B200] cursor-pointer"
                  >
                    <HoverDropdownForCategory
                      label={(item?.name || item?.label)?.toUpperCase()}
                      items={item.categories}
                      onSelect={handleCategorySelect}
                    />
                  </li>
                ))
              ) : (
                <li className="px-4 py-4 text-gray-400 italic">
                  Không có mục nào
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      <div className=" w-[75%] pt-3 mf-2 ">
        <div className=" relative pb-4">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(totalItems / itemsPerPage)}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
          <div className="mb-2">
            {loadingFetchArticles || loadingFetchArticlesByCategory ? (
              <div className="flex justify-center items-center h-[80vh]">
                <Spinner />
              </div>
            ) : (
              <CategoryList
                isCategoryFilter={true}
                categoryName={
                  cat_id && category
                    ? `${category.departmentSource?.label} - ${category.categoryName}`.toUpperCase()
                    : null
                }
                articles={data}
              />
            )}
          </div>
        </div>
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default Department;
