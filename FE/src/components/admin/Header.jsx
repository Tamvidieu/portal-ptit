import {
  FaUserCircle,
  FaUsers,
  FaTags,
  FaNewspaper,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("accessToken");
    // window.location.href = "/login";
    console.log("Logout clicked"); // For demo purposes
  };

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setOpenUserMenu(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setOpenMobileMenu(false);
      }
    }

    if (openUserMenu || openMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openUserMenu, openMobileMenu]);

  const mobileMenuItems = [
    { icon: FaUsers, label: "Users", path: "/admin/users" },
    { icon: FaTags, label: "Categories", path: "/admin/categories" },
    { icon: FaNewspaper, label: "Articles", path: "/admin/articles" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-4 md:px-6 z-50 relative">
      {/* Logo & Back to Home */}
      <div className="flex items-center h-full gap-4">
        <img
          src="https://ptit.edu.vn/wp-content/uploads/2024/05/logo-ptit-1.svg"
          alt="Logo"
          className="h-8"
        />

        {/* Back to Home Button */}
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 text-red-700 hover:text-red-800 transition-all duration-200 border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-sm"
          title="Quay về trang chủ"
        >
          <FaHome className="w-4 h-4" />
          <span className="hidden sm:inline text-sm font-medium">
            Trang chủ
          </span>
        </button>
      </div>

      {/* Large Desktop (>= 1024px): User menu only */}
      <div className="hidden lg:flex items-center">
        <div className="relative" ref={userMenuRef}>
          <button
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-red-50 hover:to-red-100 hover:text-red-700 shadow-sm transition-all duration-200 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200"
            onClick={() => setOpenUserMenu((v) => !v)}
          >
            <FaUserCircle className="w-7 h-7 text-gray-600" />
            <span className="font-semibold text-gray-700">Admin</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                openUserMenu ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openUserMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <FaUserCircle className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-700">Admin</p>
                    <p className="text-sm text-gray-500">admin@ptit.edu.vn</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 flex items-center gap-3 transition-all duration-150 font-medium"
              >
                <IoMdLogOut className="w-5 h-5" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tablet & Small Desktop (< 1024px): Extended dropdown menu */}
      <div className="hidden md:flex lg:hidden items-center">
        <div className="relative" ref={userMenuRef}>
          <button
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-red-50 hover:to-red-100 hover:text-red-700 shadow-sm transition-all duration-200 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-200"
            onClick={() => setOpenUserMenu((v) => !v)}
          >
            <FaUserCircle className="w-7 h-7 text-gray-600" />
            <span className="font-semibold text-gray-700">Admin</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                openUserMenu ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {openUserMenu && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-xl py-3 z-50 animate-in slide-in-from-top-2 duration-200">
              {/* User info section */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <FaUserCircle className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-700">Admin</p>
                    <p className="text-sm text-gray-500">admin@ptit.edu.vn</p>
                  </div>
                </div>
              </div>

              {/* Navigation items */}
              <div className="py-2">
                {mobileMenuItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-700 flex items-center gap-3 transition-all duration-150 font-medium"
                    onClick={() => {
                      console.log(`Navigate to ${item.path}`);
                      navigate(item.path);
                      setOpenUserMenu(false);
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Logout section */}
              <div className="border-t border-gray-100 pt-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setOpenUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 transition-all duration-150 font-medium"
                >
                  <IoMdLogOut className="w-5 h-5" />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile (< 768px): Hamburger menu */}
      <div className="md:hidden flex items-center gap-3">
        {/* User avatar */}
        <FaUserCircle className="w-8 h-8 text-gray-600" />

        {/* Mobile menu button */}
        <div className="relative" ref={mobileMenuRef}>
          <button
            className="p-2 rounded-lg bg-gray-50 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-200"
            onClick={() => setOpenMobileMenu((v) => !v)}
          >
            {openMobileMenu ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>

          {openMobileMenu && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-xl py-3 z-50 animate-in slide-in-from-top-2 duration-200">
              {/* User info section */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <FaUserCircle className="w-10 h-10 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-700">Admin</p>
                    <p className="text-sm text-gray-500">admin@ptit.edu.vn</p>
                  </div>
                </div>
              </div>

              {/* Navigation items */}
              <div className="py-2">
                {mobileMenuItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-red-700 flex items-center gap-3 transition-all duration-150 font-medium"
                    onClick={() => {
                      console.log(`Navigate to ${item.path}`);
                      navigate(item.path);
                      setOpenMobileMenu(false);
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Logout section */}
              <div className="border-t border-gray-100 pt-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setOpenMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 flex items-center gap-3 transition-all duration-150 font-medium"
                >
                  <IoMdLogOut className="w-5 h-5" />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
