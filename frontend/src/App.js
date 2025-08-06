import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Department from "./pages/Department";
import Article from "./pages/Article";
import DefaultLayout from "./layouts";

function App() {
  return (
    <Router>
      <div className="flex justify-center">
        <Routes>
          <Route
            path="/"
            element={<DefaultLayout children={<Department />} />}
          />
          <Route
            path="/department/:id"
            element={<DefaultLayout children={<Department />} />}
          />
          <Route
            path="/department/:id/category/:cat_id"
            element={<DefaultLayout children={<Department />} />}
          />
          <Route
            path="/article/:id"
            element={<DefaultLayout children={<Article />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
