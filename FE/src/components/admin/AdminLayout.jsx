import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="">
        <Sidebar />
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        {/* Main area - thêm flex-1 để chiếm hết không gian còn lại */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto">
          {/* Content will be rendered here */}
          <Outlet />
        </main>
        {/* Footer - thêm mt-auto để đẩy xuống dưới */}
        <Footer />
      </div>
    </div>
  );
}

export default AdminLayout;
