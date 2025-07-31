import EnhancedBreadcrumb from "../../components/guest/EnhancedBreadcrumb";
import Footer from "../../components/guest/Footer";
import Header from "../../components/guest/Header";
import ScrollToTop from "../../components/guest/ScrollToTop";
import ArticleDetailContent from "./ArticleDetailContent";

function ArticlesDetail() {
  const article = {
    id: 1,
    title: "Hội thảo khoa học quốc tế về Công nghệ thông tin và Truyền thông",
    content: `
      <p>Ngày 15/8/2024, Học viện Công nghệ Bưu chính Viễn thông (PTIT) đã tổ chức thành công Hội thảo khoa học quốc tế về Công nghệ thông tin và Truyền thông với sự tham gia của hơn 200 đại biểu trong và ngoài nước.</p>

      <h3>Mục tiêu của hội thảo</h3>
      <p>Hội thảo nhằm tạo ra một diễn đàn học thuật chất lượng cao, nơi các nhà khoa học, nghiên cứu viên, và chuyên gia trong lĩnh vực CNTT-TT có thể:</p>
      <ul>
        <li>Chia sẻ những nghiên cứu mới nhất và xu hướng phát triển</li>
        <li>Thảo luận về các thách thức và cơ hội trong thời đại số</li>
        <li>Xây dựng mạng lưới hợp tác nghiên cứu quốc tế</li>
        <li>Đề xuất các giải pháp sáng tạo cho các vấn đề thực tiễn</li>
      </ul>

      <h3>Các chủ đề chính</h3>
      <p>Hội thảo tập trung vào các chủ đề nóng như:</p>
      <ol>
        <li><strong>Trí tuệ nhân tạo và Machine Learning:</strong> Ứng dụng AI trong các lĩnh vực giáo dục, y tế, và kinh doanh</li>
        <li><strong>Internet of Things (IoT):</strong> Giải pháp thành phố thông minh và nhà thông minh</li>
        <li><strong>Blockchain và Cryptocurrency:</strong> Bảo mật và ứng dụng trong tài chính số</li>
        <li><strong>Cybersecurity:</strong> Xu hướng tấn công mạng và các biện pháp phòng chống</li>
      </ol>

      <p>Đặc biệt, hội thảo có sự tham gia của nhiều diễn giả quốc tế danh tiếng từ các trường đại học hàng đầu thế giới như MIT, Stanford, và Oxford.</p>

      <blockquote>
        "Hội thảo này không chỉ là nơi chia sẻ kiến thức mà còn là cầu nối quan trọng giữa học thuật và thực tiễn, giữa Việt Nam và thế giới trong lĩnh vực CNTT-TT" - PGS.TS Nguyễn Văn A, Giám đốc Học viện PTIT.
      </blockquote>

      <h3>Kết quả đạt được</h3>
      <p>Sau hai ngày làm việc, hội thảo đã thu được nhiều kết quả tích cực:</p>
      <ul>
        <li>Hơn 50 báo cáo khoa học chất lượng cao được trình bày</li>
        <li>15 thỏa thuận hợp tác nghiên cứu được ký kết</li>
        <li>Ra mắt 3 dự án nghiên cứu chung quốc tế</li>
        <li>Thành lập mạng lưới nghiên cứu ASEAN về CNTT-TT</li>
      </ul>

      <p>Hội thảo khẳng định vị thế của PTIT trong cộng đồng khoa học quốc tế và góp phần thúc đẩy sự phát triển của ngành CNTT-TT tại Việt Nam.</p>
    `,
    author: "Ban Truyền thông PTIT",
    publishDate: "2024-08-15T10:30:00",
    lastUpdate: "2024-08-16T09:15:00",
    views: 1547,
    category: "Hội thảo khoa học",
    tags: [
      "Công nghệ thông tin",
      "Hội thảo quốc tế",
      "AI",
      "IoT",
      "Blockchain",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    ],
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <EnhancedBreadcrumb
        backgroundImage="https://ptit.edu.vn/wp-content/images/empty.png"
        title={article.title}
        breadcrumbItems={[
          { label: "Tin tức", href: null },
          { label: "Chi tiết", href: null },
        ]}
        height="500px"
        overlayOpacity={0.5}
      />

      {/* Main content */}
      <ArticleDetailContent article={article} />
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default ArticlesDetail;
