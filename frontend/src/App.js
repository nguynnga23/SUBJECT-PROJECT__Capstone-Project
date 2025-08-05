import Department from "./pages/Department";
import DefaultLayout from "./layouts";

function App() {
  return (
    <div className="flex justify-center">
      <DefaultLayout children={<Department />} />
    </div>
  );
}

export default App;
