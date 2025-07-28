import { Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import Home from "./features/guest/Home";
import Articles from "./features/guest/Articles";
import ArticlesDetail from "./features/guest/ArticlesDetail";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticlesDetail />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
