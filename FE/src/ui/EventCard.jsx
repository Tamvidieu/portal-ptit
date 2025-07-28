import React from "react";
import { FaClock, FaArrowRight } from "react-icons/fa";

// EventCard Component - Có thể tái sử dụng riêng
const EventCard = ({
  event,
  showDateBadge = true,
  showDescription = true,
  showReadMore = true,
  cardSize = "default", // "small", "default", "large"
  layout = "vertical", // "vertical", "horizontal"
  className = "",
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const getDateInfo = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return { day, month };
  };

  const getMonthName = (month) => {
    const months = [
      "TH1",
      "TH2",
      "TH3",
      "TH4",
      "TH5",
      "TH6",
      "TH7",
      "TH8",
      "TH9",
      "TH10",
      "TH11",
      "TH12",
    ];
    return months[month - 1];
  };

  const dateInfo = getDateInfo(event.startDate);

  // Size configurations
  const sizeConfig = {
    small: {
      imageHeight: "h-32",
      padding: "p-4",
      titleSize: "text-sm",
      dateSize: "text-xs",
      descriptionSize: "text-xs",
    },
    default: {
      imageHeight: "h-64",
      padding: "p-6",
      titleSize: "text-xl",
      dateSize: "text-sm",
      descriptionSize: "text-sm",
    },
    large: {
      imageHeight: "h-80",
      padding: "p-8",
      titleSize: "text-2xl",
      dateSize: "text-base",
      descriptionSize: "text-base",
    },
  };

  const config = sizeConfig[cardSize];

  if (layout === "horizontal") {
    return (
      <article
        className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group ${className}`}
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Container */}
          <div className="relative md:w-1/3 overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className={`w-full ${config.imageHeight} md:h-full object-cover group-hover:scale-110 transition-transform duration-500`}
            />

            {showDateBadge && (
              <div className="absolute top-4 left-4 bg-red-600 text-white rounded-lg p-2 text-center shadow-lg">
                <div className="text-lg font-bold leading-none">
                  {dateInfo.day}
                </div>
                <div className="text-xs font-medium">
                  {getMonthName(dateInfo.month)}
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
          </div>

          {/* Content */}
          <div
            className={`md:w-2/3 ${config.padding} flex flex-col justify-center`}
          >
            <div
              className={`flex items-center gap-2 text-red-600 ${config.dateSize} mb-3`}
            >
              <FaClock className="w-3 h-3" />
              <span>
                {formatDate(event.startDate)}
                {event.endDate && ` - ${formatDate(event.endDate)}`}
              </span>
            </div>

            <h3
              className={`${config.titleSize} font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-200`}
            >
              {event.title}
            </h3>

            {showDescription && event.description && (
              <p
                className={`text-gray-600 ${config.descriptionSize} leading-relaxed line-clamp-3 mb-4`}
              >
                {event.description}
              </p>
            )}

            {showReadMore && (
              <a
                className={`inline-flex items-center gap-2 text-red-600 font-medium ${config.descriptionSize} hover:text-red-700 transition-colors duration-200 group/link`}
              >
                Xem chi tiết
                <FaArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200" />
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Vertical layout (default)
  return (
    <article
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group ${className}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className={`w-full ${config.imageHeight} object-cover group-hover:scale-110 transition-transform duration-500`}
        />

        {showDateBadge && (
          <div className="absolute top-4 left-4 bg-red-600 text-white rounded-lg p-3 text-center shadow-lg">
            <div className="text-2xl font-bold leading-none">
              {dateInfo.day}
            </div>
            <div className="text-xs font-medium">
              {getMonthName(dateInfo.month)}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </div>

      {/* Content */}
      <div className={config.padding}>
        <div
          className={`flex items-center gap-2 text-red-600 ${config.dateSize} mb-3`}
        >
          <FaClock className="w-4 h-4" />
          <span>
            {formatDate(event.startDate)}
            {event.endDate && ` - ${formatDate(event.endDate)}`}
          </span>
        </div>

        <h3
          className={`${config.titleSize} font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors duration-200`}
        >
          {event.title}
        </h3>

        {showDescription && event.description && (
          <p
            className={`text-gray-600 ${config.descriptionSize} leading-relaxed line-clamp-3 mb-4`}
          >
            {event.description}
          </p>
        )}

        {showReadMore && (
          <a
            className={`inline-flex items-center gap-2 text-red-600 font-medium ${config.descriptionSize} hover:text-red-700 transition-colors duration-200 group/link`}
          >
            Xem chi tiết
            <FaArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform duration-200" />
          </a>
        )}
      </div>
    </article>
  );
};
export default EventCard;
