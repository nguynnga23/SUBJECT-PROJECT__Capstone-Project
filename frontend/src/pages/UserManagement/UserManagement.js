import UserTable from "../../components/UserTable";

function UserManagement() {
  return (
    <div className="flex-1">
      <main className="p-2">
        <h2 className="text-xl font-bold mb-3 p-3 pt-0 pb-0 flex items-center h-[40px]">
          Danh sách người dùng
        </h2>
        <UserTable />
      </main>
    </div>
  );
}

export default UserManagement;
