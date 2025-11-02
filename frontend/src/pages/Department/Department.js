import CategoryList from "../../components/CategoryList";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { getDepartmentSourceById } from "../../apis/department_source";
import { getCategoryById } from "../../apis/category";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllArticles } from "../../apis/article";

function Department() {
  const { id, cat_id } = useParams();
  const { request: fetchDepartment, loading: loadingFetch } = useApi(
    getDepartmentSourceById
  );
  const { request: fetchArticles, loading: loadingArticleFetch } =
    useApi(getAllArticles);
  const [department, setDepartment] = useState({});
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState(
    useSelector((state) => state.category.currentCategory) || null
  );

  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchDepartment(id);
        setDepartment(fetched);
      } catch (err) {
        // toast.error("Không thể tải dữ liệu");
      }
    };
    load();
  }, [id]);
  useEffect(() => {
    const load = async () => {
      try {
        const fetched = await fetchArticles();
        setArticles(fetched);
      } catch (err) {
        toast.error("Không thể tải dữ liệu");
      }
    };
    load();
  }, [id]);

  return department ? (
    <div>
      <div className="bg-gray-50">
        {!category ? (
          department?.categories?.map((category, idx) => (
            <div key={idx}>
              <CategoryList
                isCategoryFilter={false}
                categoryName={category.categoryName}
                articles={articles}
                loadingFetch={loadingFetch}
              />
            </div>
          ))
        ) : (
          <div>
            <div className="mb-2">
              <CategoryList
                isCategoryFilter={true}
                categoryName={category.categoryName}
                articles={articles}
                loadingFetch={loadingFetch}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center p-5">
      Xin lỗi. Chúng tôi không tìm được thông tin khoa/viện này!
    </div>
  );
}

export default Department;
