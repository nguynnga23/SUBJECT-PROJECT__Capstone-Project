import Header from "./Header";

function DefaultLayout({ children }) {
  return (
    <div className="w-[1200px]">
      <div className="flex items-center w-[100%] h-[10vh] max-h-[70px]">
        <Header />
      </div>
      <div className="h-[100%]">{children}</div>
    </div>
  );
}

export default DefaultLayout;
