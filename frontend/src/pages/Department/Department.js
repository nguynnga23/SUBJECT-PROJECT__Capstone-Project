import ContactInfo from "../../components/ContactInfo";
import CategoryList from "../../components/CategoryList";
import { useParams } from "react-router-dom";
import { current_data, articles } from "../../assets/sampleData";
import BannerSlider from "../../components/BannerSlider";

function Department() {
  const { id, cat_id } = useParams();
  const departmentId = id ?? current_data.department_sources[0].id.toString();
  const foundDepartment = current_data.department_sources.find(
    (dept) => dept.id.toString() === departmentId
  );

  const foundCategory = foundDepartment?.categories.find(
    (cat) => cat.id.toString() === cat_id
  );

  return foundDepartment ? (
    <div>
      {foundDepartment?.bannerSliderList && (
        <div className="flex items-center h-[300px]">
          <BannerSlider list={foundDepartment.bannerSliderList} />
        </div>
      )}

      <div className="bg-gray-50">
        {!foundCategory ? (
          foundDepartment?.categories?.map((category, idx) => (
            <div key={idx} className="mb-2">
              <CategoryList
                categoryName={category.category_name}
                articles={articles}
              />
            </div>
          ))
        ) : (
          <div>
            <div className="mb-2">
              <CategoryList
                categoryName={foundCategory.name}
                articles={articles}
              />
            </div>
          </div>
        )}
      </div>
      {foundDepartment?.info && (
        <div>
          <ContactInfo info={foundDepartment.info} />
        </div>
      )}
    </div>
  ) : (
    <div className="flex justify-center p-5">
      Xin lỗi. Chúng tôi không tìm được thông tin khoa/viện này!
    </div>
  );
}

export default Department;
