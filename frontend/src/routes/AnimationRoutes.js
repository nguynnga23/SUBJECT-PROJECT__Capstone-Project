import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Department from "../pages/Department";
import Article from "../pages/Article";
import DefaultLayout from "../layouts/DefaultLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import DepartmentManagement from "../pages/DepartmentManagement/DepartmentManagement";
import ArticleManagement from "../pages/ArticleManagement/ArticleManagement";
import UserManagement from "../pages/UserManagement/UserManagement";
import Statistic from "../pages/Statistic/Statistic";
import Setting from "../pages/Setting/Setting";
import Dashboard from "../pages/Dashboard";
import DepartmentDetail from "../pages/DepartmentDetail";
import CategoryDetail from "../pages/CategoryDetail";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/signup"
          element={
            <PageWrapper>
              <Signup />
            </PageWrapper>
          }
        />
        <Route
          path="/admin/dashboard"
          element={<AdminLayout children={<Dashboard />} />}
        />
        <Route
          path="/admin/department"
          element={<AdminLayout children={<DepartmentManagement />} />}
        />
        <Route
          path="/admin/department/:id"
          element={<AdminLayout children={<DepartmentDetail />} />}
        />
        <Route
          path="/admin/department/:id/category/:cat_id"
          element={<AdminLayout children={<CategoryDetail />} />}
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
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}

export default AnimatedRoutes;
