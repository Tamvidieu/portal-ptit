import React, { useState } from "react";
import MobileDrawer from "../../ui/MobileDrawer";
import {
  FaFacebookF,
  FaYoutube,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUtilityOpen, setIsUtilityOpen] = useState(false);

  const utilityLinks = [
    { name: "Giáo vụ", href: "#" },
    { name: "Khảo thí", href: "#" },
    { name: "Sau đại học", href: "#" },
    { name: "Cựu sinh viên", href: "#" },
    { name: "Tuyển dụng", href: "#" },
    { name: "Thư viện", href: "#" },
    { name: "Email", href: "#" },
    { name: "Cổng cán bộ", href: "#" },
  ];

  const mainNavLinks = [
    { name: "Trang chủ", href: "#" },
    { name: "Giới thiệu", href: "#" },
    { name: "Tin tức & Sự kiện", href: "#" },
    { name: "Đào tạo", href: "#" },
    { name: "Tuyển sinh", href: "#" },
    { name: "Khoa học công nghệ", href: "#" },
    { name: "Hợp tác quốc tế", href: "#" },
    { name: "Sinh viên", href: "#" },
  ];

  return (
    <header className="w-full shadow-lg sticky top-0 z-50 bg-white">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-red-800 to-red-700 border-b border-red-900/20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-red-100 text-xs hidden sm:inline">
                Kết nối với chúng tôi:
              </span>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-red-400 transition-colors duration-200 p-1 rounded-full hover:bg-white/10"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Utility Navigation */}
            <div className="relative">
              {/* Desktop Utility Links */}
              <div className="hidden lg:flex items-center gap-4 text-white text-sm">
                {utilityLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="hover:text-blue-300 transition-colors duration-200 py-1 px-2 rounded hover:bg-white/10"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Mobile Utility Dropdown */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsUtilityOpen(!isUtilityOpen)}
                  className="flex items-center gap-1 text-white text-sm hover:text-blue-300 transition-colors duration-200 py-1 px-2 rounded hover:bg-white/10"
                >
                  Tiện ích
                  <FaChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isUtilityOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isUtilityOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border py-2 min-w-48 z-50">
                    {utilityLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
                        onClick={() => setIsUtilityOpen(false)}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="https://ptit.edu.vn/wp-content/uploads/2024/05/logo-ptit-1.svg"
                alt="PTIT Logo"
                className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {mainNavLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-700 hover:text-red-700 font-medium transition-colors duration-200 py-2 px-1 border-b-2 border-transparent hover:border-red-700 relative group"
                >
                  {link.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-red-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileDrawer
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          links={mainNavLinks}
        />
      </div>

      {/* Overlay for mobile dropdowns */}
      {(isMenuOpen || isUtilityOpen) && (
        <div
          className="fixed inset-0 opacity-50 z-40 lg:hidden"
          style={{ backgroundColor: "var(--color-blue-400)" }}
          onClick={() => {
            setIsMenuOpen(false);
            setIsUtilityOpen(false);
          }}
        ></div>
      )}
    </header>
  );
}
