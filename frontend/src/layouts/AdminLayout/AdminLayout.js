import Header from "./Header";
import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  return (
    <div className="relative flex w-full mx-auto">
      <div className="hidden xl:block w-1/6">
        <Sidebar />
      </div>

      <div className="w-full xl:w-5/6">
        <div className="sticky top-0 z-50 bg-white shadow-md h-[70px] w-full px-4">
          <Header />
        </div>

        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
