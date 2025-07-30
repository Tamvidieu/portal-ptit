import { Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import Home from "./features/guest/Home";
import Articles from "./features/guest/Articles";
import ArticlesDetail from "./features/guest/ArticlesDetail";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./features/admin/Dashboard";
import ArticleManager from "./features/admin/ArticleManager";
import UserManager from "./features/admin/UserManager";
import CategoryManager from "./features/admin/CategoryManager";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticlesDetail />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManager />} />
        <Route path="categories" element={<CategoryManager />} />
        <Route path="articles" element={<ArticleManager />} />
      </Route>
    </Routes>
  );
}

export default App;
