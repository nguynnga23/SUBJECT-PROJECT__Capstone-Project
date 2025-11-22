import SettingTable from "../../components/SettingTable";

const Setting = () => {
  return (
    <div className="flex-1">
      <main className="p-2">
        <h2 className="text-xl font-bold p-3 pt-0 pb-0 flex items-center h-[40px]">
          Cài đặt
        </h2>
        <SettingTable />
      </main>
    </div>
  );
};

export default Setting;
