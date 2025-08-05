import BannerSlider from "../../components/BannerSlider";
import ContactInfo from "../../components/ContactInfo";
import CategoryList from "../../components/CategoryList";
import { departments } from "../../assets/sampleData";

function Department() {
  return (
    <div>
      <div className="flex items-center h-[300px]">
        <BannerSlider list={departments[0].bannerSliderList} />
      </div>
      <div>
        <ContactInfo info={departments[0].info} />
      </div>
      <div className="bg-gray-50">
        {departments[0]?.categories?.map((category, idx) => (
          <div key={idx} className="mb-3">
            <CategoryList categoryName={category.name} list={category.list} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Department;
