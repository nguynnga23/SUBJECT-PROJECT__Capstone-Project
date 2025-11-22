import DepartmentTable from "../../components/DepartmentTable";

const DepartmentManagement = () => {
  return (
    <div className="flex-1">
      <main className="p-2">
        <h2 className="text-xl font-bold p-3 pt-0 pb-0 flex items-center h-[40px]">
          Danh sách Khoa/Viện
        </h2>
        <DepartmentTable />
      </main>
    </div>
  );
};

export default DepartmentManagement;
