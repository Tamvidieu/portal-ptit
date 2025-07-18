import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import * as authService from '../services/authService'; // Import service
import Login from '../pages/auth/Login';
import AdminLayout from '../components/layout/AdminLayout';

// Component để tạo route bảo vệ
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = authService.isAuthenticated(); // Kiểm tra trực tiếp từ service

  if (!isAuth) {
    // Chuyển hướng đến trang login và lưu lại vị trí hiện tại
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Component Dashboard mẫu
const Dashboard = () => {
    return <h1>Chào mừng đến với Trang quản trị!</h1>
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              {/* Các route con của trang admin sẽ nằm ở đây */}
              <Routes>
                  <Route path="/" element={<Dashboard />} />
                  {/* Ví dụ: <Route path="/users" element={<UserManagement />} /> */}
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;