import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-red-700 to-red-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Logo & Contact Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <img
                  src="https://ptit.edu.vn/wp-content/uploads/2023/06/logo-footer-svg.svg"
                  alt="PTIT Logo"
                  className="h-12 mb-4 filter brightness-0 invert"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaPhone className="text-red-200 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-red-100 text-sm">Điện thoại liên hệ</p>
                    <p className="font-semibold text-white">024 3756 2186</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-red-200 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-red-100 text-sm">Email</p>
                    <p className="font-semibold text-white">ctsv@ptit.edu.vn</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-3 mt-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="text-white" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                  aria-label="YouTube"
                >
                  <FaYoutube className="text-white" />
                </a>
              </div>
            </div>

            {/* Campus Locations */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-200" />
                Địa chỉ các cơ sở
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/15 transition-all duration-300">
                  <h4 className="font-semibold text-white mb-2">
                    Trụ sở chính
                  </h4>
                  <p className="text-red-100 text-sm leading-relaxed">
                    Số 122 Hoàng Quốc Việt, phường Nghĩa Đô, thành phố Hà Nội
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/15 transition-all duration-300">
                  <h4 className="font-semibold text-white mb-2">
                    Cơ sở đào tạo tại Hà Nội
                  </h4>
                  <p className="text-red-100 text-sm leading-relaxed">
                    Số 96A Trần Phú, phường Hà Đông, thành phố Hà Nội
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/15 transition-all duration-300">
                  <h4 className="font-semibold text-white mb-2">
                    Học viện cơ sở tại TP. Hồ Chí Minh
                  </h4>
                  <p className="text-red-100 text-sm leading-relaxed">
                    Số 11 Nguyễn Đình Chiểu, phường Sài Gòn, TP. Hồ Chí Minh
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/15 transition-all duration-300">
                  <h4 className="font-semibold text-white mb-2">
                    Cơ sở đào tạo tại TP Hồ Chí Minh
                  </h4>
                  <p className="text-red-100 text-sm leading-relaxed">
                    Số 97 Man Thiện, phường Tăng Nhơn Phú, TP. Hồ Chí Minh
                  </p>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold text-white mb-6">
                Liên kết hữu ích
              </h3>

              <div className="space-y-3">
                {[
                  "Bộ Khoa học và Công nghệ",
                  "Viện Khoa học Kỹ thuật Bưu điện",
                  "Viện Kinh tế Bưu điện",
                  "Viện Công nghệ Thông tin và Truyền thông CDIT",
                  "Học viện Cơ sở TP. Hồ Chí Minh",
                  "Trung tâm Đào tạo Bưu chính Viễn thông",
                  "Trung tâm Đào tạo quốc tế",
                  "Cổng thông tin Đào tạo",
                  "Cổng thông tin Khoa học Công nghệ",
                  "Cổng thông tin Hợp tác quốc tế",
                ].map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-red-100 text-sm hover:text-white hover:pl-2 transition-all duration-200 py-1"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-red-600/30"></div>

        {/* Copyright */}
        <div className="py-6 text-center">
          <p className="text-red-200 text-sm mb-2">
            © Copyright 2024 Học viện Công nghệ Bưu chính Viễn thông. All rights
            reserved.
          </p>
          <p className="text-red-300 text-xs">
            Học viện Công nghệ Bưu chính Viễn thông giữ bản quyền nội dung trên
            website này
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
