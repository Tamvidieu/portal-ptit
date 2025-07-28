import React, { Component } from "react";
import Header from "../../components/guest/Header";
import Footer from "../../components/guest/Footer";
import EnhancedBreadcrumb from "../../components/guest/EnhancedBreadcrumb";
import Search from "../../components/guest/Search";
import ListArticles from "../../ui/ListArticles";
import { useState } from "react";

const sampleEvents = [
  {
    id: 1,
    title: "Hội thảo công nghệ AI 2024",
    description:
      "Khám phá những xu hướng mới nhất trong trí tuệ nhân tạo và machine learning. Tham gia cùng các chuyên gia hàng đầu trong lĩnh vực.",
    startDate: "2024-08-15T09:00:00",
    endDate: "2024-08-15T17:00:00",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300&fit=crop",
    link: "#",
  },
  {
    id: 2,
    title: "Workshop thiết kế UX/UI",
    description:
      "Học cách thiết kế giao diện người dùng hiệu quả và trải nghiệm người dùng tuyệt vời từ những designer chuyên nghiệp.",
    startDate: "2024-08-20T14:00:00",
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&h=300&fit=crop",
    link: "#",
  },
  {
    id: 3,
    title: "Triển lãm Startup Việt Nam",
    description:
      "Cơ hội gặp gỡ và kết nối với các startup hàng đầu Việt Nam, tìm hiểu về các ý tưởng kinh doanh sáng tạo.",
    startDate: "2024-08-25T10:00:00",
    endDate: "2024-08-27T18:00:00",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop",
    link: "#",
  },
  // Thêm nhiều events để test pagination
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 4,
    title: `Sự kiện mẫu ${i + 4}`,
    description: `Mô tả cho sự kiện mẫu số ${
      i + 4
    }. Đây là một sự kiện thú vị mà bạn không nên bỏ lỡ.`,
    startDate: `2024-09-${String(i + 1).padStart(2, "0")}T10:00:00`,
    image: `https://images.unsplash.com/photo-${
      1500000000000 + i
    }?w=500&h=300&fit=crop`,
    link: "#",
  })),
];

function Articles() {
  const [layout, setLayout] = useState("grid");
  const [cardSize, setCardSize] = useState("default");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main content */}
      <EnhancedBreadcrumb
        backgroundImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAF3jvkhiHrC4W-Vu9J_0A1kvni4C5qZrj1w&s"
        title="Tin tức"
        breadcrumbItems={[{ label: "Tin tức", href: null }]}
        height="500px"
        overlayOpacity={0.7}
      />

      <div className="w-6xl flex-grow mx-auto flex items-center justify-center bg-gray-100">
        <Search
          placeholder="Tìm kiếm tin tức, sự kiện..."
          sortOptions={[
            { value: "date-desc", label: "Mới nhất" },
            { value: "views", label: "Xem nhiều nhất" },
          ]}
        />
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls */}
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Cài đặt hiển thị</h3>
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Layout:
                </label>
                <select
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="grid">Grid</option>
                  <option value="list">List</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Size:
                </label>
                <select
                  value={cardSize}
                  onChange={(e) => setCardSize(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="small">Small</option>
                  <option value="default">Default</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* Event List */}
          <ListArticles
            events={sampleEvents}
            itemsPerPage={6}
            layout={layout}
            cardSize={cardSize}
            title="Danh sách tin tức"
            onEventClick={(event) => alert(`Clicked on: ${event.title}`)}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Articles;
