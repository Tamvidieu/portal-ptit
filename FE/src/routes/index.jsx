// E:\SeftStudy\LTWEB\portal-ptit\FE\src\routes\index.jsx
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import * as authService from '../services/authService';
import Login from '../pages/auth/Login';
import AdminLayout from '../components/layout/AdminLayout';
import ArticleManagementPage from '../pages/admin/ArticleManagement'; // Import trang quản lý bài viết

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

// Component Dashboard mẫu (có thể thay thế bằng trang mặc định của admin)
const Dashboard = () => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Chào mừng đến với Trang quản trị!</h1>
            <p className="text-gray-600">Sử dụng menu bên cạnh để điều hướng đến các chức năng quản lý.</p>
        </div>
    );
};

const AppRoutes = () => {
    return (
        <Routes>
            {/* Route cho trang đăng nhập */}
            <Route path="/login" element={<Login />} />

            {/* Các route được bảo vệ bởi ProtectedRoute và AdminLayout */}
            <Route
                path="/*" // Match tất cả các path con
                element={
                    <ProtectedRoute>
                        <AdminLayout>
                            {/* Các route con của trang admin */}
                            <Routes>
                                <Route path="/" element={<Dashboard />} /> {/* Trang Dashboard mặc định */}
                                <Route path="/articles" element={<ArticleManagementPage />} /> {/* Trang quản lý bài viết */}
                                {/* Thêm các route admin khác ở đây nếu có */}
                                {/* Ví dụ: <Route path="/users" element={<UserManagementPage />} /> */}
                                {/* Chuyển hướng về dashboard nếu không khớp route nào khác */}
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </AdminLayout>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;