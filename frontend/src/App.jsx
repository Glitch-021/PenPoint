import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Blog } from "./components/blog/Blog";
import AdminPage from "./pages/AdminPage";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <Router>
      <div className="text-center p-4">
        <ToastContainer theme="dark" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/blog/:id" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}
