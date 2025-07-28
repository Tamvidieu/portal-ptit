import React, { useState } from "react";
import { FaSearch, FaSortAmountDown, FaFilter } from "react-icons/fa";

const Search = ({
  placeholder = "Tìm kiếm...",
  searchValue = "",
  sortValue = "",
  sortOptions = [
    { value: "", label: "Sắp xếp theo" },
    { value: "date-desc", label: "Mới nhất" },
    { value: "date-asc", label: "Cũ nhất" },
    { value: "title-asc", label: "Tên A-Z" },
    { value: "title-desc", label: "Tên Z-A" },
  ],
  onSearch,
  onSortChange,
  searchButtonText = "Tìm kiếm",
  disabled = false,
  size = "default", // "small", "default", "large"
  variant = "default", // "default", "outlined", "filled"
  className = "",
}) => {
  const [searchInput, setSearchInput] = useState(searchValue);
  const [sortInput, setSortInput] = useState(sortValue);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        searchTerm: searchInput,
        sortBy: sortInput,
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSortChange = (value) => {
    setSortInput(value);
    if (onSortChange) {
      onSortChange(value);
    }
  };

  // Size configurations
  const sizeConfig = {
    small: {
      height: "h-9",
      padding: "px-3 py-2",
      text: "text-sm",
      button: "px-4 py-2 text-sm",
    },
    default: {
      height: "h-11",
      padding: "px-4 py-3",
      text: "text-base",
      button: "px-6 py-3 text-base",
    },
    large: {
      height: "h-13",
      padding: "px-5 py-4",
      text: "text-lg",
      button: "px-8 py-4 text-lg",
    },
  };

  // Variant configurations
  const variantConfig = {
    default: {
      input:
        "border border-gray-300 bg-white focus:border-red-500 focus:ring-red-200",
      select:
        "border border-gray-300 bg-white focus:border-red-500 focus:ring-red-200",
      button: "bg-red-600 hover:bg-red-700 text-white",
    },
    outlined: {
      input:
        "border-2 border-gray-400 bg-transparent focus:border-red-500 focus:ring-red-100",
      select:
        "border-2 border-gray-400 bg-transparent focus:border-red-500 focus:ring-red-100",
      button:
        "border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
    },
    filled: {
      input:
        "border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-200",
      select:
        "border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-200",
      button: "bg-red-600 hover:bg-red-700 text-white",
    },
  };

  const config = sizeConfig[size];
  const styles = variantConfig[variant];

  return (
    <div className={`w-full pa ${className}`}>
      <div className="px-6 py-6 flex items-center gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="relative">
            <input
              type="text"
              placeholder={placeholder}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={disabled}
              className={`
                w-full ${config.height} ${config.padding} ${config.text}
                ${styles.input}
                rounded-lg transition-all duration-200
                focus:outline-none focus:ring-2
                disabled:opacity-50 disabled:cursor-not-allowed
                pr-10
              `}
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        {/* Sort Select */}
        <div className="flex-1 sm:w-48">
          <div className="relative">
            <select
              value={sortInput}
              onChange={(e) => handleSortChange(e.target.value)}
              disabled={disabled}
              className={`
                w-full ${config.height} ${config.padding} ${config.text}
                ${styles.select}
                rounded-lg transition-all duration-200
                focus:outline-none focus:ring-2
                disabled:opacity-50 disabled:cursor-not-allowed
                appearance-none pr-10
              `}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FaSortAmountDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={disabled}
          className={`
            ${config.height} ${config.button}
            ${styles.button}
            rounded-lg font-medium transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-red-200
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:shadow-lg transform hover:-translate-y-0.5
            flex items-center justify-center gap-2 whitespace-nowrap
            min-w-fit
          `}
        >
          <FaSearch className="w-4 h-4" />
          <span className="hidden sm:inline">{searchButtonText}</span>
        </button>
      </div>
    </div>
  );
};

export default Search;
