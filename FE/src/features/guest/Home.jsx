import React from "react";
import Header from "../../components/guest/Header";
import Footer from "../../components/guest/Footer";
import HomeSlider from "../../ui/HomeSlider";
import ScrollToTop from "../../components/guest/ScrollToTop";
import NewsEventsSection from "../../ui/NewsEventsSection";

const myEvents = [
  {
    id: 1,
    title: "Đại hội Đảng bộ Học viện Công nghệ Bưu chính Viễn thông lần thứ V",
    description:
      "Đại hội Đảng bộ Học viện Công nghệ Bưu chính Viễn thông lần thứ V, nhiệm kỳ 2025-2030 diễn ra với sự tham gia của các đại biểu đại diện cho toàn thể cán bộ, giảng viên và sinh viên của học viện.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    startDate: "2025-06-12T08:00:00",
    endDate: "2025-08-12T12:00:00",
    link: "#",
  },
  {
    id: 2,
    title:
      "Ra mắt Trung tâm Công nghệ chiến lược Úc - Việt và công bố chương trình học bổng",
    description:
      "Sự kiện ra mắt Trung tâm Công nghệ chiến lược Úc - Việt tại PTIT, đánh dấu một bước tiến quan trọng trong hợp tác giáo dục quốc tế và nghiên cứu khoa học công nghệ.",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    startDate: "2025-06-11T08:00:00",
    endDate: "2025-06-11T12:00:00",
    link: "#",
  },
  {
    id: 3,
    title:
      "PTIT tổ chức Lễ tốt nghiệp cho gần 1000 Kỹ sư, Thạc sỹ và Tiến sỹ đợt I năm 2025",
    description:
      "Lễ tốt nghiệp long trọng dành cho gần 1000 tân kỹ sư, thạc sỹ và tiến sỹ tại PTIT, đánh dấu thành quả học tập và nghiên cứu của các sinh viên, học viên xuất sắc.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    startDate: "2025-05-23T08:00:00",
    endDate: "2025-05-23T17:00:00",
    link: "#",
  },
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Main content */}
      <HomeSlider />

      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center p-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Chào mừng đến với Cổng thông tin điện tử PTIT
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Nơi cung cấp thông tin và dịch vụ cho sinh viên, giảng viên và cán
            bộ
          </p>
        </div>
      </div>

      <NewsEventsSection
        title="Tin tức mới nhất"
        subtitle="THÔNG BÁO QUAN TRỌNG"
        events={myEvents}
        onViewMore={() => navigate("/news")}
      />
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Home;
