import React from "react";

const MobileDrawer = ({ isOpen, onClose, links }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer từ bên trái */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <span className="font-semibold text-gray-700">Menu</span>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-600 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-grow px-4 py-4 overflow-y-auto">
            <div className="space-y-2">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block py-3 px-4 text-gray-700 hover:text-red-700 hover:bg-gray-50 rounded-lg font-medium transition-all duration-200"
                  onClick={onClose}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileDrawer;
