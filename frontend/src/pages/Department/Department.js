import BannerSlider from "../../components/BannerSlider";
import ContactInfo from "../../components/ContactInfo";
import CategoryList from "../../components/CategoryList";
import { useParams } from "react-router-dom";
import { departments } from "../../assets/sampleData";

function Department() {
  const { id, cat_id } = useParams();
  const departmentId = id ?? departments[0].id.toString();
  const foundDepartment = departments.find(
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
            <div key={idx} className="mb-3">
              <CategoryList categoryName={category.name} list={category.list} />
            </div>
          ))
        ) : (
          <div>
            <div className="mb-3">
              <CategoryList
                categoryName={foundCategory.name}
                list={foundCategory.list}
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
