import { FaSearch, FaRegUser } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import HoverDropdown from "../../../components/HoverDropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../../../components/Form/ProfileForm";
import { useSelector } from "react-redux";
import UpdatePassword from "../../../components/Form/UpdatePassword/UpdatePassword";
function Header() {
  const currentUser = useSelector((state) => state.auth.user);
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);

  const navigate = useNavigate();
  const user_profile = [
    {
      icon: <FaRegUser />,
      name: "Profile",
    },
    {
      icon: <IoExitOutline />,
      name: "Exit",
    },
  ];

  const [userProfile, setUserProfile] = useState(null);

  const handleUserProfileSelect = (up) => {
    if (up?.name === "Exit") {
      navigate("/");
      return;
    }
    setUserProfile(up);
  };

  return (
    <div className="w-full">
      <div className="p-2 w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-8">
          <h1
            className="text-red-500 font-bold text-sm cursor-pointer"
            onClick={() => navigate(`/`)}
          >
            UNIFEED.news
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-[10px] px-3 py-1 text-sm bg-gray-100">
            <input
              className="bg-transparent focus:outline-none w-[260px] h-[30px] pr-2"
              placeholder="Tìm kiếm thông tin"
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
              {userProfile?.name === "Profile" && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="opacity-0 animate-fadeIn">
                    <ProfileForm
                      setUserProfile={setUserProfile}
                      setShowUpdatePasswordForm={setShowUpdatePasswordForm}
                      currentUser={currentUser}
                    />
                  </div>
                </div>
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
        </div>
      </div>
    </div>
  );
}

export default Header;
