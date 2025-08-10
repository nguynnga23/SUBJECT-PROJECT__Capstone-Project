import { useState, useRef } from "react";

const mockDepartments = [
  {
    id: 1,
    name: "Trang thông tin chính thức",
    code: "iuh",
    number: "0283 8940 390",
    leader: "Nguyễn Thị Nga",
    email: "đang cập nhật...",
    website: "ctsv.iuh.edu.vn",
    location:
      "Tầng trệt nhà D - 12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Tp. HCM",
  },
  {
    id: 2,
    name: "Khoa Công nghệ thông tin",
    code: "fit",
    number: "0283 8940 390",
    leader: "Nguyễn Thị Nga",
    email: "đang cập nhật...",
    website: "ctsv.iuh.edu.vn",
    location:
      "Tầng trệt nhà D - 12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Tp. HCM",
  },
  {
    id: 3,
    name: "Phòng công tác sinh viên",
    code: "ctsv",
    number: "0283 8940 390",
    leader: "Nguyễn Thị Nga",
    email: "đang cập nhật...",
    website: "ctsv.iuh.edu.vn",
    location:
      "Tầng trệt nhà D - 12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Tp. HCM",
  },
  {
    id: 3,
    name: "Phòng đào tạo",
    code: "pdt",
    number: "0283 8940 390",
    leader: "Nguyễn Thị Nga",
    email: "đang cập nhật...",
    website: "ctsv.iuh.edu.vn",
    location:
      "Tầng trệt nhà D - 12 Nguyễn Văn Bảo, Phường 1, Quận Gò Vấp, Tp. HCM",
  },
];

const DepartmentTable = () => {
  const [departments, setDepartments] = useState(mockDepartments);
  const [showModal, setShowModal] = useState(false);
  const [newDept, setNewDept] = useState({ name: "", code: "" });

  const handleAdd = () => {
    setDepartments([
      ...departments,
      { ...newDept, id: departments.length + 1 },
    ]);
    setShowModal(false);
    setNewDept({ name: "", code: "" });
  };

  const tableRef = useRef(null);

  const initResize = (e, colIndex) => {
    const startX = e.clientX;
    const table = tableRef.current;
    const th = table.querySelectorAll("th")[colIndex];
    const startWidth = th.offsetWidth;

    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      th.style.width = `${newWidth}px`;

      // Resize all corresponding <td> in that column
      table.querySelectorAll("tr").forEach((row) => {
        const cell = row.children[colIndex];
        if (cell) cell.style.width = `${newWidth}px`;
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
  return (
    <div className="p-1 w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Danh sách Khoa</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-[12px] px-2 py-2 rounded"
        >
          Thêm Khoa
        </button>
      </div>

      <table ref={tableRef} className=" border text-[14px] table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 w-[50px]">STT</th>
            <th className="border p-2 relative group ">
              Tên Khoa
              <div
                className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent group-hover:bg-blue-300"
                onMouseDown={(e) => initResize(e, 1)}
              ></div>
            </th>
            <th className="border p-2 relative group">
              Mã Khoa{" "}
              <div
                className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent group-hover:bg-blue-300"
                onMouseDown={(e) => initResize(e, 2)}
              ></div>
            </th>
            <th className="border p-2 relative group">
              Trưởng khoa{" "}
              <div
                className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent group-hover:bg-blue-300"
                onMouseDown={(e) => initResize(e, 3)}
              ></div>
            </th>
            <th className="border p-2 relative group">
              Website{" "}
              <div
                className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent group-hover:bg-blue-300"
                onMouseDown={(e) => initResize(e, 4)}
              ></div>
            </th>
            <th className="border p-2 relative group">
              Email{" "}
              <div
                className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent group-hover:bg-blue-300"
                onMouseDown={(e) => initResize(e, 5)}
              ></div>
            </th>
            <th className="border p-2 relative group">
              Số điện thoại{" "}
              <div
                className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent group-hover:bg-blue-300"
                onMouseDown={(e) => initResize(e, 6)}
              ></div>
            </th>
            <th className="border p-2 relative group">
              Văn phòng{" "}
              <div
                className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent group-hover:bg-blue-300"
                onMouseDown={(e) => initResize(e, 7)}
              ></div>
            </th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, index) => (
            <tr key={dept.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2 truncate max-w-[300px]">{dept.name}</td>
              <td className="border p-2 truncate min-w-[100px]">{dept.code}</td>
              <td className="border p-2 truncate min-w-[150px]">
                {dept.leader}
              </td>
              <td className="border p-2 truncate min-w-[100px]">
                {dept.website}
              </td>
              <td className="border p-2 truncate min-w-[100px]">
                {dept.email}
              </td>
              <td className="border p-2 truncate min-w-[100px]">
                {dept.number}
              </td>
              <td className="border p-2 truncate max-w-[300px]">
                {dept.location}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-semibold mb-4">Thêm Khoa Mới</h3>
            <input
              type="text"
              placeholder="Tên khoa"
              value={newDept.name}
              onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
              className="w-full border px-3 py-2 mb-3 rounded"
            />
            <input
              type="text"
              placeholder="Mã khoa"
              value={newDept.code}
              onChange={(e) => setNewDept({ ...newDept, code: e.target.value })}
              className="w-full border px-3 py-2 mb-3 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentTable;
