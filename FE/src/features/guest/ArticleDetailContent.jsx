import React, { useState } from "react";
import {
  FaClock,
  FaUser,
  FaEye,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaPrint,
  FaBookmark,
  FaChevronLeft,
  FaChevronRight,
  FaTags,
} from "react-icons/fa";
import EventCard from "../../ui/EventCard";

const ArticleDetailContent = ({ article }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState("medium");

  // Mock article data

  const relatedArticles = [
    {
      id: 2,
      title: "Workshop về Machine Learning cho sinh viên PTIT",
      excerpt: "Cơ hội học hỏi từ các chuyên gia hàng đầu trong lĩnh vực ML",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop",
      date: "2024-08-10",
    },
    {
      id: 3,
      title: "Triển lãm công nghệ PTIT Tech Fair 2024",
      excerpt: "Khám phá những sản phẩm công nghệ mới nhất từ sinh viên PTIT",
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&h=200&fit=crop",
      date: "2024-08-05",
    },
    {
      id: 4,
      title: "Khóa học lập trình Python miễn phí",
      excerpt: "Cơ hội học lập trình Python từ cơ bản đến nâng cao",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop",
      date: "2024-07-28",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article.title;

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        );
        break;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const fontSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Article Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
              {article.category}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setFontSize("small")}
                className={`px-2 py-1 text-xs rounded ${
                  fontSize === "small" ? "bg-red-600 text-white" : "bg-gray-200"
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("medium")}
                className={`px-2 py-1 text-sm rounded ${
                  fontSize === "medium"
                    ? "bg-red-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`px-2 py-1 text-base rounded ${
                  fontSize === "large" ? "bg-red-600 text-white" : "bg-gray-200"
                }`}
              >
                A
              </button>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <FaUser className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="w-4 h-4" />
              <span>{formatDate(article.publishDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEye className="w-4 h-4" />
              <span>{article.views.toLocaleString()} lượt xem</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Article */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-sm p-8">
              {/* Featured Image */}
              <div className="mb-8">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
              </div>

              {/* Article Body */}
              <div
                className={`prose prose-lg max-w-none ${fontSizes[fontSize]} leading-relaxed`}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <FaTags className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    Tags:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full hover:bg-red-100 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              {article.gallery && article.gallery.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">
                    Hình ảnh liên quan
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {article.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(image, "_blank")}
                      />
                    ))}
                  </div>
                </div>
              )}
            </article>
          </div>

          {/* Sidebar - Related Articles */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
                Bài viết liên quan
              </h3>
              <div className="space-y-4">
                {relatedArticles.map((relatedArticle) => (
                  <EventCard
                    key={relatedArticle.id}
                    event={{
                      ...relatedArticle,
                      startDate: relatedArticle.date,
                      description: relatedArticle.excerpt,
                      link: `/articles/${relatedArticle.id}`,
                    }}
                    cardSize="small"
                    layout="horizontal"
                    showDateBadge={false}
                    showDescription={true}
                    showReadMore={false}
                    className="shadow-sm hover:shadow-md"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Share and Actions Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left side - Share buttons */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <FaShare className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">
                  Chia sẻ bài viết:
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaFacebook className="w-4 h-4" />
                  <span className="text-sm">Facebook</span>
                </button>
                <button
                  onClick={() => handleShare("twitter")}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <FaTwitter className="w-4 h-4" />
                  <span className="text-sm">Twitter</span>
                </button>
                <button
                  onClick={() => handleShare("linkedin")}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
                >
                  <FaLinkedin className="w-4 h-4" />
                  <span className="text-sm">LinkedIn</span>
                </button>
              </div>
            </div>

            {/* Right side - Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaBookmark className="w-4 h-4" />
                <span className="text-sm">
                  {isBookmarked ? "Đã lưu" : "Lưu bài"}
                </span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaPrint className="w-4 h-4" />
                <span className="text-sm">In bài</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailContent;
