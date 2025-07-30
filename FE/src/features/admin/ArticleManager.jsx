import React, { useState, useMemo } from "react";
import TitleManager from "../../ui/admin/TitleManager";
import ListBtnAction from "../../ui/admin/ListBtnAction";
import Table from "../../ui/admin/Table";
import Pagination from "../../ui/admin/Pagination";

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
    console.log("Thêm bài viết mới");
  };

  const handleFilter = () => {
    console.log("Mở bộ lọc");
  };

  const handleEdit = (article) => {
    console.log("Sửa bài viết:", article);
  };

  const handleDelete = (article) => {
    console.log("Xóa bài viết:", article);
  };

  const handleView = (article) => {
    console.log("Xem bài viết:", article);
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
      </div>
    </div>
  );
}

export default ArticleManager;
