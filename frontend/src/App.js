import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Department from "./pages/Department";
import Article from "./pages/Article";
import DefaultLayout from "./layouts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <div className="flex justify-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />

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
