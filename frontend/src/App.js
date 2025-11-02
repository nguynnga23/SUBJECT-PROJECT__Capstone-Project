import AnimatedRoutes from "./routes";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="flex w-full ">
        <AnimatedRoutes />
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </Router>
  );
}

export default App;
