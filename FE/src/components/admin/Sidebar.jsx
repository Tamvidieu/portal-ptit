import React, { useState } from "react";
import {
  Home,
  Users,
  GraduationCap,
  ChevronRight,
  Menu,
  X,
  FileText,
  FolderOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();
  const mainMenuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
    },
    { id: "users", label: "User", icon: Users },
    {
      id: "categories",
      label: "Categories",
      icon: FolderOpen,
    },
    {
      id: "articles",
      label: "Articles",
      icon: FileText,

      hasSubmenu: true,
    },
  ];

  const MenuItem = ({ item, onClick, isCollapsed }) => {
    const Icon = item.icon;
    const isActive = activeItem === item.id;

    return (
      <div
        onClick={() => onClick(item.id)}
        className={`relative flex items-center ${
          isCollapsed ? "justify-center px-4" : "justify-between px-6"
        } py-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 group ${
          isActive ? "bg-red-50 border-r-3 border-red-500" : ""
        }`}
        title={isCollapsed ? item.label : ""}
      >
        <div className={`flex items-center ${isCollapsed ? "" : "space-x-3"}`}>
          <Icon
            size={18}
            className={`${
              isActive ? "text-red-500" : "text-gray-500"
            } group-hover:text-red-500 transition-colors`}
          />
          {!isCollapsed && (
            <span
              className={`text-sm font-medium ${
                isActive ? "text-red-500" : "text-gray-700"
              } group-hover:text-red-500 transition-colors`}
            >
              {item.label}
            </span>
          )}
        </div>
        {item.hasSubmenu && !isCollapsed && (
          <ChevronRight
            size={14}
            className={`${
              isActive ? "text-red-500" : "text-gray-400"
            } group-hover:text-red-500 transition-colors`}
          />
        )}
        {isActive && (
          <div className="absolute left-0 top-0 w-1 h-full bg-red-500 rounded-r"></div>
        )}
      </div>
    );
  };

  const SectionTitle = ({ title, isCollapsed }) => {
    if (isCollapsed) return <div className="h-4"></div>;

    return (
      <div className="px-6 py-3 border-b border-gray-100">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </h3>
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 shadow-lg transform transition-all duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
        ${isCollapsed ? "w-16" : "w-64"}
      `}
      >
        {/* Header */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center px-4" : "justify-between px-6"
          } h-16 bg-gradient-to-r from-red-500 to-red-900`}
        >
          {!isCollapsed ? (
            <>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-red-500" size={20} />
                </div>
                <h1 className="text-white font-bold text-lg tracking-wide">
                  PTIT AMIN
                </h1>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
              >
                <X size={20} />
              </button>
            </>
          ) : (
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap className="text-red-500" size={20} />
            </div>
          )}
        </div>

        {/* Menu Content */}
        <div className="overflow-y-auto pb-16 bg-white">
          {/* Main Menu */}
          <SectionTitle title="Main Menu" isCollapsed={isCollapsed} />
          <div className="py-2">
            {mainMenuItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                onClick={(clickedItem) => {
                  setActiveItem(clickedItem);
                  navigate(`/admin/${clickedItem}`); // điều hướng ở component cha
                }}
                isCollapsed={isCollapsed}
              />
            ))}
          </div>
        </div>

        {/* Collapse/Expand Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center shadow-md hover:shadow-lg transition-shadow text-gray-500 hover:text-red-500`}
        >
          <ChevronRight
            size={14}
            className={`transform transition-transform ${
              isCollapsed ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-30 lg:hidden bg-red-500 text-white p-2 rounded-lg shadow-lg hover:bg-red-700 transition-colors"
      >
        <Menu size={20} />
      </button>
    </>
  );
};

export default Sidebar;
