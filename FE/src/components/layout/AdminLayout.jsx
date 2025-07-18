import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService'; // Import service
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  // Lấy thông tin user trực tiếp từ service khi component được render
  const user = authService.getCurrentUser(); 

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
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
              <li><a href="/">Dashboard</a></li>
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