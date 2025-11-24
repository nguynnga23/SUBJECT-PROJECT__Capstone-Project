import { FaSearch, FaRegUser, FaRegBell, FaRegBookmark } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import HoverDropdown from "../../../components/HoverDropdown";
import { useEffect, useState } from "react";
import { current_data } from "../../../assets/sampleData.js";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../../../components/Form/ProfileForm";
import MarkedForm from "../../../components/Form/MarkedForm";
import { useDispatch, useSelector } from "react-redux";
import UpdatePassword from "../../../components/Form/UpdatePassword/UpdatePassword.js";
import NotifyForm from "../../../components/Form/NotifyForm/NotifyForm.js";
import { new_logo, user } from "../../../assets/index.js";
import { logoutOfSlice } from "../../../store/slices/authSlice.js";
import { getAllDepartmentSource } from "../../../apis/department_source.js";
import { useApi } from "../../../hooks/useApi.js";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner.js";
import {
  setCurrentDepartment,
  setListDepartments,
} from "../../../store/slices/departmentSlice.js";
import {
  clearCurrentCategory,
  setCurrentCategory,
} from "../../../store/slices/categorySlice.js";
function Header() {
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const { request: fetchDepartments, loading: loadingFetch } = useApi(
    getAllDepartmentSource
  );
  const departments = useSelector((state) => state.department.departments);
  const [department, setDepartment] = useState(
    useSelector((state) => state.department.currentDepartment) || {}
  );
  useEffect(() => {
    const load = async () => {
      if (departments.length === 0) {
        try {
          const fetched = await fetchDepartments();
          dispatch(setListDepartments(fetched));
        } catch (err) {
          toast.error("Không thể tải dữ liệu");
        }
      }
    };
    load();
  }, [departments, dispatch]);
  const [category, setCategory] = useState(
    useSelector((state) => state.category.currentCategory) || {}
  );
  const [userProfile, setUserProfile] = useState(false);
  const [showUpdatePasswordForm, setShowUpdatePasswordForm] = useState(false);
  const [showNotifyForm, setShowNotifyForm] = useState(false);

  const handleDepartmentSelect = (dept) => {
    setDepartment(dept);
    dispatch(setCurrentDepartment(dept));
    dispatch(clearCurrentCategory());
    navigate(`/department/${dept.documentId}`);
    setCategory(null);
  };

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    dispatch(setCurrentCategory(cat));
    navigate(`/department/${department.documentId}/category/${cat.documentId}`);
  };

  const handleUserProfileSelect = (up) => {
    if (up?.name === "Exit") {
      dispatch(logoutOfSlice());
      return;
    }
    setUserProfile(up);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="p-2 w-[1200px] flex items-center justify-between py-4">
        <div className="flex items-center gap-8">
          <img
            className="h-[55px] cursor-pointer"
            onClick={() => navigate(`/`)}
            src={new_logo}
          />

          <div className="flex items-center gap-6 text-sm text-gray-700]">
            <div className="flex gap-4">
              {!loadingFetch ? (
                <HoverDropdown
                  label={department?.label || "Khoa/Viện"}
                  items={departments || {}}
                  onSelect={handleDepartmentSelect}
                />
              ) : (
                <div className="flex justify-center items-center">
                  <Spinner size={"h-[20px] w-[20px]"} />
                </div>
              )}
            </div>
            <div className="flex gap-4 ">
              <HoverDropdown
                label={category?.categoryName || "Loại tin tức"}
                disable={!department}
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

          {currentUser ? (
            <div className="flex justify-end w-[200px]">
              <div className="flex items-center gap-2">
                <img
                  src={currentUser?.avatar?.url || user}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex items-center gap-4 cursor-pointer relative text-[13px]">
                  <HoverDropdown
                    label={
                      currentUser?.username ||
                      currentUser?.firstname + " " + currentUser?.lastname
                    }
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
                            setShowUpdatePasswordForm={
                              setShowUpdatePasswordForm
                            }
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
              <div className="relative bg-gray-200 p-2 m-3 rounded-[8px] cursor-pointer">
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
              </div>{" "}
            </div>
          ) : (
            <div className="flex w-[160px] items-center text-[12px]">
              <div
                className="px-2 py-1 cursor-pointer border bg-blue-500 rounded text-white mr-1"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </div>
              <div
                className="px-2 py-1 cursor-pointer border hover:bg-blue-500 rounded hover:text-white mr-1"
                onClick={() => navigate("/signup")}
              >
                Đăng ký
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
