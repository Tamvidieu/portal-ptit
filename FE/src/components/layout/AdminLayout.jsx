// E:\SeftStudy\LTWEB\portal-ptit\FE\src\components\layout\AdminLayout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link
import { Home, FileText, LogOut } from 'lucide-react'; // Import icons (đảm bảo đã cài lucide-react)
import * as authService from '../../services/authService'; // Import service
import './AdminLayout.css'; // Giữ nguyên file CSS tùy chỉnh của bạn

const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    // Lấy thông tin user trực tiếp từ service khi component được render
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login', { replace: true }); // Sử dụng replace: true để không thêm vào lịch sử trình duyệt
    };

    return (
        <div className="admin-layout">
            <header className="admin-header">
                <div className="logo">Admin Portal</div>
                <div className="user-info">
                    {/* Kiểm tra nếu có user thì hiển thị tên */}
                    {user && <span>Chào, {user.username}</span>}
                    <button onClick={handleLogout}>Đăng xuất</button>
                </div>
            </header>
            <div className="admin-main">
                <aside className="admin-sidebar">
                    <nav>
                        <ul>

                            <li>
                                {/* THÊM MỤC MENU QUẢN LÝ BÀI VIẾT */}
                                <Link to="/articles" className="sidebar-link">
                                    <FileText className="icon" /> Quản lý Bài viết
                                </Link>
                            </li>
                            {/* Bạn có thể thêm các mục menu khác tại đây */}
                            {/* Ví dụ: <li><Link to="/users" className="sidebar-link"><Users className="icon" /> Quản lý Người dùng</Link></li> */}
                        </ul>
                    </nav>
                </aside>
                <main className="admin-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
