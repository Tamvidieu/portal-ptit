import React, { useState, useMemo } from "react";
import TitleManager from "../../ui/admin/TitleManager";
import ListBtnAction from "../../ui/admin/ListBtnAction";
import Table from "../../ui/admin/Table";
import Pagination from "../../ui/admin/Pagination";
import Dialog from "../../ui/admin/Dialog";
import { Edit, Eye, Plus, UserCog, Mail, Phone, Lock, Save, User } from "lucide-react";

function UserManager() {
  const [users] = useState([
    {
      id: 1,
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      phone: "0123456789",
      role: "admin",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      fullName: "Trần Thị B",
      email: "tranthib@gmail.com",
      phone: "0987654321",
      role: "user",
      status: "inactive",
      createdAt: "2024-01-14",
    },
    // Add more sample users as needed
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    type: null,
    data: null,
  });

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.phone.includes(searchValue)
    );
  }, [users, searchValue]);

  // Column configuration
  const columns = [
    {
      key: "fullName",
      header: "Họ và tên",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-500" />
          </div>
          <div className="font-medium text-gray-900">{item.fullName}</div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (item) => (
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{item.email}</span>
        </div>
      ),
    },
    {
      key: "role",
      header: "Vai trò",
      render: (item) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          item.role === "admin" 
            ? "bg-purple-100 text-purple-800" 
            : "bg-blue-100 text-blue-800"
        }`}>
          {item.role === "admin" ? "Quản trị viên" : "Người dùng"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Trạng thái",
      render: (item) => (
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          item.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}>
          {item.status === "active" ? "Hoạt động" : "Đã khóa"}
        </span>
      ),
    },
  ];

  const getDialogIcon = (type) => {
    switch (type) {
      case "add":
        return <Plus className="h-5 w-5" />;
      case "edit":
        return <Edit className="h-5 w-5" />;
      case "view":
        return <Eye className="h-5 w-5" />;
      default:
        return <UserCog className="h-5 w-5" />;
    }
  };

  const renderDialogContent = () => {
    const { type, data } = dialogConfig;
    const isViewMode = type === "view";

    return (
      <div className="space-y-6">
        {/* Header with icon */}
        <div className={`flex items-center gap-3 p-4 rounded-xl border ${
          type === "add"
            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
            : type === "view"
            ? "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
            : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-100"
        }`}>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
            type === "add" 
              ? "bg-blue-100" 
              : type === "view"
              ? "bg-gray-100"
              : "bg-green-100"
          }`}>
            {getDialogIcon(type)}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">
              {type === "add" 
                ? "Thêm người dùng mới"
                : type === "view"
                ? "Chi tiết người dùng"
                : "Chỉnh sửa người dùng"}
            </h4>
            <p className="text-sm text-gray-600">
              {type === "add"
                ? "Điền thông tin để tạo người dùng mới"
                : type === "view"
                ? "Xem thông tin chi tiết người dùng"
                : "Cập nhật thông tin người dùng"}
            </p>
          </div>
        </div>

        {/* Form fields */}
        <div className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <User className="h-4 w-4" />
                Họ và tên
              </label>
              <input
                type="text"
                defaultValue={data?.fullName}
                disabled={isViewMode}
                placeholder="Nhập họ và tên..."
                className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                  isViewMode
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <input
                type="email"
                defaultValue={data?.email}
                disabled={isViewMode}
                placeholder="Nhập địa chỉ email..."
                className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                  isViewMode
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }`}
              />
            </div>
          </div>

          {type === "add" && (
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Lock className="h-4 w-4" />
                Mật khẩu
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Phone className="h-4 w-4" />
                Số điện thoại
              </label>
              <input
                type="tel"
                defaultValue={data?.phone}
                disabled={isViewMode}
                placeholder="Nhập số điện thoại..."
                className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                  isViewMode
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }`}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <UserCog className="h-4 w-4" />
                Vai trò
              </label>
              <select
                defaultValue={data?.role}
                disabled={isViewMode}
                className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                  isViewMode
                    ? "border-gray-200 bg-gray-50"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }`}
              >
                <option value="user">Người dùng</option>
                <option value="admin">Quản trị viên</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() => setDialogConfig({ isOpen: false, type: null, data: null })}
            className="flex-1 sm:flex-none px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50"
          >
            {isViewMode ? "Đóng" : "Hủy bỏ"}
          </button>
          {!isViewMode && (
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800">
              <Save className="h-4 w-4" />
              {type === "add" ? "Tạo người dùng" : "Cập nhật"}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <TitleManager
          title="Quản lý người dùng"
          subtitle="Quản lý tất cả người dùng trên hệ thống"
        />

        <ListBtnAction
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onAdd={() => setDialogConfig({ isOpen: true, type: "add", data: null })}
          onFilter={() => console.log("Filter users")}
          addButtonText="Thêm người dùng"
          searchPlaceholder="Tìm kiếm người dùng..."
        />

        <Table
          columns={columns}
          data={filteredUsers}
          onEdit={(user) => setDialogConfig({ isOpen: true, type: "edit", data: user })}
          onDelete={(user) => console.log("Delete user:", user)}
          onView={(user) => setDialogConfig({ isOpen: true, type: "view", data: user })}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
          totalItems={filteredUsers.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />

        <Dialog
          isOpen={dialogConfig.isOpen}
          onClose={() => setDialogConfig({ isOpen: false, type: null, data: null })}
          title={
            dialogConfig.type === "add"
              ? "Thêm người dùng mới"
              : dialogConfig.type === "edit"
              ? "Chỉnh sửa người dùng"
              : "Chi tiết người dùng"
          }
          maxWidth="2xl"
        >
          {renderDialogContent()}
        </Dialog>
      </div>
    </div>
  );
}

export default UserManager;
