import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Department from "./pages/Department";
import Article from "./pages/Article";
import DefaultLayout from "./layouts/DefaultLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import DepartmentManagement from "./pages/DepartmentManagement/DepartmentManagement";
import ArticleManagement from "./pages/ArticleManagement/ArticleManagement";
import UserManagement from "./pages/UserManagement/UserManagement";
import Statistic from "./pages/Statistic/Statistic";
import Setting from "./pages/Setting/Setting";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="flex justify-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/admin/dashboard"
            element={<AdminLayout children={<Dashboard />} />}
          />

          <Route
            path="/admin/department"
            element={<AdminLayout children={<DepartmentManagement />} />}
          />
          <Route
            path="/admin/article"
            element={<AdminLayout children={<ArticleManagement />} />}
          />
          <Route
            path="/admin/user"
            element={<AdminLayout children={<UserManagement />} />}
          />
          <Route
            path="/admin/statistic"
            element={<AdminLayout children={<Statistic />} />}
          />
          <Route
            path="/admin/setting"
            element={<AdminLayout children={<Setting />} />}
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
