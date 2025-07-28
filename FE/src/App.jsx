import { Routes, Route } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import Home from "./features/guest/Home";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
