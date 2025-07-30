import { ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";

const MenuItem = ({ item, onClick, isCollapsed, activeItem }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = currentPath === `/admin/${item.id}`;

  const Icon = item.icon;

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

export default MenuItem;
