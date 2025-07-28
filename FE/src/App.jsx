import { Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import Home from "./features/guest/Home";
import Articles from "./features/guest/Articles";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/articles" element={<Articles />} />
    </Routes>
  );
}

export default App;
