import Header from "./Header";

function DefaultLayout({ children }) {
  return (
    <div className="w-full mx-auto">
      <div className=" sticky h-[65px] top-0 z-50 bg-white shadow-[0_4px_6px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-center h-[10vh] max-h-[70px]">
          <Header />
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="w-[1200px]">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
