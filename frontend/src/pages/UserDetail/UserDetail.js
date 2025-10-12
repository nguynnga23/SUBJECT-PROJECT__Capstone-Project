import { useNavigate, useParams } from "react-router-dom";
import { users } from "../../assets/sampleData";
import {
  MdChevronRight,
  MdMarkEmailRead,
  MdOutlineMailLock,
} from "react-icons/md";
import { useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";

const UserDetail = () => {
  const { studentID } = useParams();
  const user = users.find((u) => u.studentID === studentID);
  const [blocked, setBlocked] = useState(user.blocked);
  const [confirmed, setConfirmed] = useState(user.confirmed);
  const navigate = useNavigate();

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
  return (
    <div className="flex-1 relative">
      <main className="p-2">
        <div>
          <h2 className="text-xl font-bold mb-3 p-3 pt-0 pb-0 flex items-center h-[40px]">
            <span
              className=" cursor-pointer hover:border-b"
              onClick={() => navigate("/admin/user")}
            >
              Danh sách người dùng
            </span>
            <MdChevronRight />
            <span className="font-medium">{user.studentID}</span>
          </h2>
          <div className="p-6  gap-6">
            {/* Header */}
            <div className="flex items-center gap-6 border-b pb-4">
              <img
                src={user.avatar?.url}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
              <div>
                <h2 className="text-2xl font-semibold flex items-center">
                  {`${user.username}`}
                  <span>
                    {!blocked ? (
                      <FaLock
                        title="Khóa tài khoản"
                        size={25}
                        className="text-yellow-400 rounded-full border m-2 cursor-pointer p-1"
                        onClick={() => setBlocked(true)}
                      />
                    ) : (
                      <FaLockOpen
                        title="Mở khóa tài khoản"
                        size={25}
                        className="text-yellow-400 rounded-lg border m-2 cursor-pointer p-1"
                        onClick={() => setBlocked(false)}
                      />
                    )}
                  </span>
                </h2>
                <p className="text-gray-600 flex">
                  {user.email}
                  <span>
                    {confirmed ? (
                      <MdMarkEmailRead
                        title="Xác minh email"
                        size={18}
                        className="text-primary rounded m-1"
                      />
                    ) : (
                      <MdOutlineMailLock
                        title="Hủy xác minh email"
                        size={18}
                        className="text-red-500 rounded m-1"
                      />
                    )}
                  </span>
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem label="Mã sinh viên" value={user.studentID} />
              <DetailItem label="Lớp học" value={user.class} />
              <DetailItem label="Số điện thoại" value={user.phone} />
              <DetailItem
                label="Khoa"
                value={user.department?.department_name}
              />
              <DetailItem
                label="Ngày tạo TK"
                value={formatDateVN(user.createdAt)}
              />
              <DetailItem
                label="Cập nhật gần nhất"
                value={formatDateVN(user.updatedAt)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="block text-blue-700 font-medium mb-1">{label}</label>
    <span className="font-medium">{value || "Đang cập nhật..."}</span>
  </div>
);

export default UserDetail;
