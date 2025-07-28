import React from "react";
import Header from "../../components/guest/Header";
import Footer from "../../components/guest/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Nội dung trang chính */}
      <main className="flex-grow bg-white text-gray-900">
        <div className="max-w-screen-xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-4">Chào mừng đến PTIT</h1>
          <p className="text-lg">
            Đây là nội dung trang chủ. Bạn có thể chỉnh sửa hoặc thay thế bằng
            component layout khác.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
