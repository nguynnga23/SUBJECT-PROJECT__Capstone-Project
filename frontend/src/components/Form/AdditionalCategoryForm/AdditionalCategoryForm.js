import { useState } from "react";
import { LiaTimesCircle } from "react-icons/lia";

function AdditionalCategoryForm({ setShowFormCategory }) {
  const [formData, setFormData] = useState({});
  const isValid = true;
  return (
    <div className="relative w-[500px] mx-auto bg-white rounded space-y-6 p-6 shadow">
      {/* Nút đóng */}
      <LiaTimesCircle
        className="absolute top-4 right-4 text-gray-500 w-[25px] h-[25px] rounded-full hover:bg-red-500 hover:text-white cursor-pointer"
        onClick={() => setShowFormCategory(false)}
      />
      abdds
    </div>
  );
}

export default AdditionalCategoryForm;
