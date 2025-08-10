import Header from "./Header";

function DefaultLayout({ children }) {
  return (
    <div className="w-[1200px] mx-auto">
      <div className=" sticky top-0 z-50 bg-white shadow-[0_4px_6px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center w-full h-[10vh] max-h-[70px]">
          <Header />
        </div>
      </div>
      <div className="h-[100%]">{children}</div>
    </div>
  );
}

export default DefaultLayout;
