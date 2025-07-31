import React, { useState, useMemo } from "react";
import TitleManager from "../../ui/admin/TitleManager";
import ListBtnAction from "../../ui/admin/ListBtnAction";
import Table from "../../ui/admin/Table";
import Pagination from "../../ui/admin/Pagination";
import Dialog from "../../ui/admin/Dialog";
import { Edit, Eye, Plus, FileText, Tag, Save, User } from "lucide-react";
import TextEditor from "../../ui/admin/TextEditor";

function ArticleManager() {
  const [articles] = useState([
    {
      id: 1,
      title: "Hướng dẫn sử dụng React Hook",
      author: "Nguyễn Văn A",
      category: "Technology",
      status: "published",
      createdAt: "2024-01-15",
      views: 1234,
    },
    {
      id: 2,
      title: "Thiết kế giao diện với TailwindCSS",
      author: "Trần Thị B",
      category: "Design",
      status: "draft",
      createdAt: "2024-01-14",
      views: 567,
    },
    {
      id: 3,
      title: "JavaScript ES6+ Features",
      author: "Lê Văn C",
      category: "Programming",
      status: "published",
      createdAt: "2024-01-13",
      views: 890,
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      author: "Phạm Thị D",
      category: "Backend",
      status: "published",
      createdAt: "2024-01-12",
      views: 456,
    },
    {
      id: 5,
      title: "Database Design Principles",
      author: "Hoàng Văn E",
      category: "Database",
      status: "draft",
      createdAt: "2024-01-11",
      views: 123,
    },
    {
      id: 6,
      title: "API Design Best Practices",
      author: "Nguyễn Thị F",
      category: "API",
      status: "published",
      createdAt: "2024-01-10",
      views: 789,
    },
    {
      id: 7,
      title: "Mobile App Development",
      author: "Trần Văn G",
      category: "Mobile",
      status: "draft",
      createdAt: "2024-01-09",
      views: 234,
    },
    {
      id: 8,
      title: "Cloud Computing Basics",
      author: "Lê Thị H",
      category: "Cloud",
      status: "published",
      createdAt: "2024-01-08",
      views: 567,
    },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    type: null, // 'add', 'edit', 'view'
    data: null,
  });

  // Filter articles based on search
  const filteredArticles = useMemo(() => {
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        article.author.toLowerCase().includes(searchValue.toLowerCase()) ||
        article.category.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [articles, searchValue]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Column configuration
  const columns = [
    {
      key: "title",
      header: "Tiêu đề",
      render: (item) => (
        <div className="max-w-xs">
          <div className="font-medium text-gray-900 truncate">{item.title}</div>
        </div>
      ),
    },
    {
      key: "author",
      header: "Tác giả",
      render: (item) => (
        <div className="text-sm text-gray-900">{item.author}</div>
      ),
    },
    {
      key: "category",
      header: "Danh mục",
      render: (item) => (
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {item.category}
        </span>
      ),
    },
    {
      key: "status",
      header: "Trạng thái",
      render: (item) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            item.status === "published"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {item.status === "published" ? "Đã xuất bản" : "Bản nháp"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Ngày tạo",
      render: (item) => (
        <div className="text-sm text-gray-900">{item.createdAt}</div>
      ),
    },
    {
      key: "views",
      header: "Lượt xem",
      render: (item) => (
        <div className="text-sm text-gray-900">
          {item.views.toLocaleString()}
        </div>
      ),
    },
  ];

  // Event handlers
  const handleAdd = () => {
    setDialogConfig({
      isOpen: true,
      type: "add",
      data: null,
    });
  };

  const handleEdit = (article) => {
    setDialogConfig({
      isOpen: true,
      type: "edit",
      data: article,
    });
  };

  const handleView = (article) => {
    setDialogConfig({
      isOpen: true,
      type: "view",
      data: article,
    });
  };

  const handleCloseDialog = () => {
    setDialogConfig({
      isOpen: false,
      type: null,
      data: null,
    });
  };

  const handleDelete = (article) => {
    console.log(`Delete article with ID: ${article.id}`);
  };

  const handleFilter = () => {
    console.log("Filter articles based on search criteria");
  };

  const getDialogIcon = (type) => {
    switch (type) {
      case "add":
        return <Plus className="h-5 w-5" />;
      case "edit":
        return <Edit className="h-5 w-5" />;
      case "view":
        return <Eye className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const renderDialogContent = () => {
    const { type, data } = dialogConfig;

    switch (type) {
      case "add":
        return (
          <div className="space-y-6">
            {/* Header với icon */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                {getDialogIcon(type)}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Tạo bài viết mới</h4>
                <p className="text-sm text-gray-600">
                  Điền thông tin để tạo bài viết mới
                </p>
              </div>
            </div>

            {/* Form fields */}
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4" />
                  Tiêu đề bài viết
                </label>
                <input
                  type="text"
                  placeholder="Nhập tiêu đề bài viết..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Tag className="h-4 w-4" />
                  Danh mục
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 bg-white">
                  <option value="">Chọn danh mục</option>
                  <option value="Technology">🔧 Technology</option>
                  <option value="Design">🎨 Design</option>
                  <option value="Programming">💻 Programming</option>
                  <option value="Business">📊 Business</option>
                  <option value="Marketing">📈 Marketing</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4" />
                  Nội dung bài viết
                </label>
                <div className="border border-gray-300 rounded-xl overflow-hidden">
                  <TextEditor
                    value=""
                    onChange={(content) => console.log("New content:", content)}
                    height={500}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Tag className="h-4 w-4" />
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Nhập tags, cách nhau bởi dấu phẩy..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
                <p className="text-xs text-gray-500">
                  Ví dụ: react, javascript, frontend
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={handleCloseDialog}
                className="flex-1 sm:flex-none px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Hủy bỏ
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200">
                <Save className="h-4 w-4" />
                Lưu bài viết
              </button>
            </div>
          </div>
        );

      case "edit":
      case "view":
        const isViewMode = type === "view";
        return (
          <div className="space-y-6">
            {/* Header với icon */}
            <div
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                isViewMode
                  ? "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
                  : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-100"
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  isViewMode ? "bg-gray-100" : "bg-green-100"
                }`}
              >
                {getDialogIcon(type)}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {isViewMode ? "Chi tiết bài viết" : "Chỉnh sửa bài viết"}
                </h4>
                <p className="text-sm text-gray-600">
                  {isViewMode
                    ? "Xem thông tin chi tiết"
                    : "Cập nhật thông tin bài viết"}
                </p>
              </div>
            </div>

            {/* Form fields */}
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4" />
                  Tiêu đề bài viết
                </label>
                <input
                  type="text"
                  defaultValue={data?.title || "Hướng dẫn sử dụng React Hook"}
                  disabled={isViewMode}
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                    isViewMode
                      ? "border-gray-200 bg-gray-50 text-gray-700"
                      : "border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-gray-400"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="h-4 w-4" />
                  Tác giả
                </label>
                <input
                  type="text"
                  defaultValue={data?.author || "Nguyễn Văn A"}
                  disabled={isViewMode}
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                    isViewMode
                      ? "border-gray-200 bg-gray-50 text-gray-700"
                      : "border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-gray-400"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Tag className="h-4 w-4" />
                  Danh mục
                </label>
                <select
                  disabled={isViewMode}
                  defaultValue={data?.category || "Technology"}
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                    isViewMode
                      ? "border-gray-200 bg-gray-50 text-gray-700"
                      : "border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent hover:border-gray-400 bg-white"
                  }`}
                >
                  <option value="Technology">🔧 Technology</option>
                  <option value="Design">🎨 Design</option>
                  <option value="Programming">💻 Programming</option>
                  <option value="Business">📊 Business</option>
                  <option value="Marketing">📈 Marketing</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4" />
                  Nội dung bài viết
                </label>
                <div
                  className={`border rounded-xl overflow-hidden ${
                    isViewMode ? "border-gray-200" : "border-gray-300"
                  }`}
                >
                  <TextEditor
                    value={data?.content}
                    onChange={(content) =>
                      console.log("Updated content:", content)
                    }
                    disabled={isViewMode}
                    height={500}
                  />
                </div>
              </div>

              {isViewMode && (
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Ngày tạo
                    </span>
                    <p className="text-sm text-gray-900 mt-1">15/01/2024</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Lượt xem
                    </span>
                    <p className="text-sm text-gray-900 mt-1">1,234</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={handleCloseDialog}
                className="flex-1 sm:flex-none px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                {isViewMode ? "Đóng" : "Hủy bỏ"}
              </button>
              {!isViewMode && (
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 rounded-xl hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Save className="h-4 w-4" />
                  Cập nhật
                </button>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <TitleManager
          title="Quản lý bài viết"
          subtitle="Quản lý tất cả bài viết trên hệ thống"
        />

        <ListBtnAction
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onAdd={handleAdd}
          onFilter={handleFilter}
          addButtonText="Thêm bài viết"
          searchPlaceholder="Tìm kiếm bài viết..."
        />

        <Table
          columns={columns}
          data={paginatedArticles}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredArticles.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />

        <Dialog
          isOpen={dialogConfig.isOpen}
          onClose={handleCloseDialog}
          title={
            dialogConfig.type === "add"
              ? "Thêm bài viết mới"
              : dialogConfig.type === "edit"
              ? "Chỉnh sửa bài viết"
              : "Chi tiết bài viết"
          }
          maxWidth="6xl"
        >
          {renderDialogContent()}
        </Dialog>
      </div>
    </div>
  );
}

export default ArticleManager;
