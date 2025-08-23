import AnimatedRoutes from "./routes";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="flex w-full page-container">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
