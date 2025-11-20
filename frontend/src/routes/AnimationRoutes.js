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
import CrawlerConfig from "../pages/CrawlerConfig";
import UserDetail from "../pages/UserDetail";
import ArticleDetail from "../pages/ArticleDetail";
import ProtectedRoute from "./ProtectedRoute";

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
        <Route path="/" element={<DefaultLayout children={<Department />} />} />
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
          element={
            <ProtectedRoute>
              <AdminLayout children={<Dashboard />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/department"
          element={
            <ProtectedRoute>
              <AdminLayout children={<DepartmentManagement />} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/department/:id"
          element={
            <ProtectedRoute>
              <AdminLayout children={<DepartmentDetail />} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/department/:id/category/:cat_id"
          element={
            <ProtectedRoute>
              <AdminLayout children={<CategoryDetail />} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/department/:id/crawler_config"
          element={
            <ProtectedRoute>
              <AdminLayout children={<CrawlerConfig />} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/article"
          element={
            <ProtectedRoute>
              <AdminLayout children={<ArticleManagement />} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/article/:id"
          element={
            <ProtectedRoute>
              <AdminLayout children={<ArticleDetail />} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user"
          element={
            <ProtectedRoute>
              <AdminLayout children={<UserManagement />} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/user/:studentID"
          element={
            <ProtectedRoute>
              <AdminLayout children={<UserDetail />} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/statistic"
          element={
            <ProtectedRoute>
              <AdminLayout children={<Statistic />} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/setting"
          element={
            <ProtectedRoute>
              <AdminLayout children={<Setting />} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/department"
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
    </AnimatePresence>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}

export default AnimatedRoutes;
