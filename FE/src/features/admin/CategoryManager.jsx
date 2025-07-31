import React, { useState, useMemo } from "react";
import TitleManager from "../../ui/admin/TitleManager";
import ListBtnAction from "../../ui/admin/ListBtnAction";
import Table from "../../ui/admin/Table";
import Pagination from "../../ui/admin/Pagination";
import Dialog from "../../ui/admin/Dialog";
import { Edit, Eye, Plus, Tag, FileText, Save, Folder } from "lucide-react";

function CategoryManager() {
  const [categories] = useState([
    {
      id: 1,
      name: "Technology",
      slug: "technology",
      description: "Các bài viết về công nghệ",
      articleCount: 25,
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Programming",
      slug: "programming",
      description: "Lập trình và phát triển phần mềm",
      articleCount: 18,
      status: "active",
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      name: "Design",
      slug: "design",
      description: "UI/UX và thiết kế đồ họa",
      articleCount: 12,
      status: "inactive",
      createdAt: "2024-01-13",
    },
  ]);

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [dialogConfig, setDialogConfig] = useState({
    isOpen: false,
    type: null,
    data: null,
  });

  const filteredCategories = useMemo(() => {
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        category.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [categories, searchValue]);

  const columns = [
    {
      key: "name",
      header: "Tên danh mục",
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Folder className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500">{item.slug}</div>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      header: "Mô tả",
      render: (item) => (
        <div className="max-w-md">
          <div className="text-sm text-gray-600 truncate">
            {item.description}
          </div>
        </div>
      ),
    },
    {
      key: "articleCount",
      header: "Số bài viết",
      render: (item) => (
        <div className="text-sm font-medium text-gray-900">
          {item.articleCount} bài viết
        </div>
      ),
    },
    {
      key: "status",
      header: "Trạng thái",
      render: (item) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            item.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status === "active" ? "Hoạt động" : "Vô hiệu"}
        </span>
      ),
    },
  ];

  const renderDialogContent = () => {
    const { type, data } = dialogConfig;
    const isViewMode = type === "view";

    return (
      <div className="space-y-6">
        {/* Header with icon */}
        <div
          className={`flex items-center gap-3 p-4 rounded-xl border ${
            type === "add"
              ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
              : type === "view"
              ? "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200"
              : "bg-gradient-to-r from-green-50 to-emerald-50 border-green-100"
          }`}
        >
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              type === "add"
                ? "bg-blue-100"
                : type === "view"
                ? "bg-gray-100"
                : "bg-green-100"
            }`}
          >
            {type === "add" ? (
              <Plus className="h-5 w-5" />
            ) : type === "edit" ? (
              <Edit className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">
              {type === "add"
                ? "Thêm danh mục mới"
                : type === "view"
                ? "Chi tiết danh mục"
                : "Chỉnh sửa danh mục"}
            </h4>
            <p className="text-sm text-gray-600">
              {type === "add"
                ? "Điền thông tin để tạo danh mục mới"
                : type === "view"
                ? "Xem thông tin chi tiết danh mục"
                : "Cập nhật thông tin danh mục"}
            </p>
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Tag className="h-4 w-4" />
              Tên danh mục
            </label>
            <input
              type="text"
              defaultValue={data?.name}
              disabled={isViewMode}
              placeholder="Nhập tên danh mục..."
              className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                isViewMode
                  ? "border-gray-200 bg-gray-50"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }`}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FileText className="h-4 w-4" />
              Mô tả
            </label>
            <textarea
              rows={3}
              defaultValue={data?.description}
              disabled={isViewMode}
              placeholder="Nhập mô tả danh mục..."
              className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 ${
                isViewMode
                  ? "border-gray-200 bg-gray-50"
                  : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }`}
            />
          </div>

          {type !== "add" && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Số bài viết
                </span>
                <p className="text-sm text-gray-900 mt-1">
                  {data?.articleCount || 0} bài viết
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Ngày tạo
                </span>
                <p className="text-sm text-gray-900 mt-1">{data?.createdAt}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={() =>
              setDialogConfig({ isOpen: false, type: null, data: null })
            }
            className="flex-1 sm:flex-none px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50"
          >
            {isViewMode ? "Đóng" : "Hủy bỏ"}
          </button>
          {!isViewMode && (
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800">
              <Save className="h-4 w-4" />
              {type === "add" ? "Tạo danh mục" : "Cập nhật"}
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
          title="Quản lý danh mục"
          subtitle="Quản lý tất cả danh mục trên hệ thống"
        />

        <ListBtnAction
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onAdd={() =>
            setDialogConfig({ isOpen: true, type: "add", data: null })
          }
          onFilter={() => console.log("Filter categories")}
          addButtonText="Thêm danh mục"
          searchPlaceholder="Tìm kiếm danh mục..."
        />

        <Table
          columns={columns}
          data={filteredCategories}
          onEdit={(category) =>
            setDialogConfig({ isOpen: true, type: "edit", data: category })
          }
          onDelete={(category) => console.log("Delete category:", category)}
          onView={(category) =>
            setDialogConfig({ isOpen: true, type: "view", data: category })
          }
        />

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredCategories.length / itemsPerPage)}
          totalItems={filteredCategories.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />

        <Dialog
          isOpen={dialogConfig.isOpen}
          onClose={() =>
            setDialogConfig({ isOpen: false, type: null, data: null })
          }
          title={
            dialogConfig.type === "add"
              ? "Thêm danh mục mới"
              : dialogConfig.type === "edit"
              ? "Chỉnh sửa danh mục"
              : "Chi tiết danh mục"
          }
          maxWidth="2xl"
        >
          {renderDialogContent()}
        </Dialog>
      </div>
    </div>
  );
}

export default CategoryManager;
