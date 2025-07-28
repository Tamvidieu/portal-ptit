import React from "react";
import { FaChevronRight, FaHeart, FaHome } from "react-icons/fa";

const EnhancedBreadcrumb = ({
  backgroundImage,
  title,
  subtitle = "",
  breadcrumbItems = [],
  overlayOpacity = 0.6,
  overlayColor = "black", // "black", "blue", "red", "gradient"
  textAlign = "center",
  height = "400px",
  showScrollIndicator = false,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}) => {
  const overlayStyles = {
    black: "bg-black",
    blue: "bg-blue-900",
    red: "bg-red-900",
    gradient: "bg-gradient-to-br from-black via-blue-900 to-black",
  };

  return (
    <div
      className={`relative w-full flex items-center justify-center ${className}`}
      style={{
        minHeight: height,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // Parallax effect
      }}
    >
      {/* Overlay */}
      <div
        className={`absolute inset-0 ${overlayStyles[overlayColor]}`}
        style={{ opacity: overlayOpacity }}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white/30 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-white/10 rounded-full"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className={`mb-8 animate-fade-in ${
            textAlign === "center"
              ? "text-center"
              : textAlign === "right"
              ? "text-right"
              : "text-left"
          }`}
          style={{ animationDelay: "0.4s" }}
        >
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-lg hover:bg-white/20 transition-all duration-300">
            <ul className="flex items-center space-x-3 text-sm text-white/90">
              {/* Home Icon */}
              <li>
                <a
                  href="/"
                  className="flex items-center text-white/80 hover:text-white transition-colors duration-200 p-1 rounded-full hover:bg-white/20"
                  aria-label="Trang chủ"
                >
                  <FaHome className="w-4 h-4" />
                </a>
              </li>

              {/* Breadcrumb Items */}
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={index}>
                  <li className="flex items-center text-white/50">
                    <span className="text-xs">•</span>
                  </li>
                  <li>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white/80 hover:text-white transition-colors duration-200 hover:underline"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span className="text-white font-medium">
                        {item.label}
                      </span>
                    )}
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Title */}
        <div
          className={`animate-fade-in-up ${
            textAlign === "center"
              ? "text-center"
              : textAlign === "right"
              ? "text-right"
              : "text-left"
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          <h1
            className={`text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight max-w-5xl ${
              textAlign === "center" ? "mx-auto" : ""
            } mb-4 ${titleClassName}`}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className={`text-white/80 text-lg md:text-xl max-w-3xl ${
                textAlign === "center" ? "mx-auto" : ""
              } ${subtitleClassName}`}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default EnhancedBreadcrumb;
