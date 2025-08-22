import { FaSearch, FaRegUser, FaRegBell, FaRegBookmark } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import HoverDropdown from "../../../components/HoverDropdown";
import { useState } from "react";
import { departments } from "../../../assets/sampleData.js";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../../../components/Form/ProfileForm";
import MarkedForm from "../../../components/Form/MarkedForm";
import { useSelector } from "react-redux";
import UpdatePassword from "../../../components/Form/UpdatePassword/UpdatePassword.js";
import NotifyForm from "../../../components/Form/NotifyForm/NotifyForm.js";
function Header() {
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const user_profile = [
    {
      icon: <FaRegUser />,
      name: "Profile",
    },
    {
      icon: <FaRegBookmark />,
      name: "Marked",
    },
    {
      icon: <IoExitOutline />,
      name: "Exit",
    },
  ];

  const [department, setDepartment] = useState(departments[0] || null);
  const [category, setCategory] = useState(null);
  const [userProfile, setUserProfile] = useState(false);
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
  const [showNotifyForm, setShowNotifyForm] = useState(false);

  const handleDepartmentSelect = (dept) => {
    setDepartment(dept);
    navigate(`/department/${dept.id}`);
    setCategory(null);
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    navigate(`/department/${department.id}/category/${cat.id}`);
  };

  const handleUserProfileSelect = (up) => {
    if (up?.name === "Exit") {
      navigate("/");
      return;
    }
    setUserProfile(up);
  };

  return (
    <div className="p-2 w-[1200px] flex items-center justify-between py-4">
      <div className="flex items-center gap-8">
        <h1
          className="text-red-500 font-bold text-sm cursor-pointer"
          onClick={() => navigate(`/`)}
        >
          UNIFEED.news
        </h1>
        <div className="flex items-center gap-6 text-sm text-gray-700">
          <div className="flex gap-4 ">
            <HoverDropdown
              label={department.name || "Không có thông tin khoa nào"}
              items={departments}
              onSelect={handleDepartmentSelect}
            />
          </div>
          <div className="flex gap-4 ">
            <HoverDropdown
              label={category?.name || "Loại tin tức"}
              items={department.categories}
              onSelect={handleCategorySelect}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-[10px] px-3 py-1 text-sm bg-gray-100">
          <input
            className="bg-transparent focus:outline-none w-[260px] h-[30px] pr-2"
            placeholder="Tìm kiếm tin tức"
          />
          <FaSearch size={16} className="mr-1 text-gray-600" />
        </div>

        <div className="flex items-center gap-2">
          <img
            src={currentUser?.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex gap-4 cursor-pointer relative">
            <HoverDropdown
              label={currentUser?.username}
              items={user_profile}
              onSelect={handleUserProfileSelect}
            />
            {userProfile?.name === "Marked" ? (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="opacity-0 animate-fadeIn">
                  <MarkedForm setUserProfile={setUserProfile} />
                </div>
              </div>
            ) : (
              (userProfile?.name === "Profile" || userProfile) && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="opacity-0 animate-fadeIn">
                    <ProfileForm
                      setUserProfile={setUserProfile}
                      setShowUpdatePasswordForm={setShowUpdatePasswordForm}
                      currentUser={currentUser}
                    />
                  </div>
                </div>
              )
            )}

            {showUpdatePasswordForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="opacity-0 animate-fadeIn">
                  <UpdatePassword
                    setShowUpdatePasswordForm={setShowUpdatePasswordForm}
                    setUserProfile={setUserProfile}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative bg-gray-200 p-2 rounded-[8px] cursor-pointer">
          <FaRegBell
            className={`${
              showNotifyForm ? "text-red-500" : "text-gray-500"
            } hover:text-red-500`}
            onClick={() => setShowNotifyForm(!showNotifyForm)}
          />
          {showNotifyForm && (
            <div className="absolute top-[35px] right-0 animate-slideUp">
              <NotifyForm setShowNotifyForm={setShowNotifyForm} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
