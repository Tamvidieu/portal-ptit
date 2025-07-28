import React from "react";
import { FaClock, FaArrowRight } from "react-icons/fa";
import EventCard from "./EventCard";

const NewsEventsSection = ({
  title = "Sự kiện",
  subtitle = "TIN TỨC SỰ KIỆN",
  events = [],
  viewMoreText = "Xem thêm",
  onViewMore,
  cardSize = "default",
  cardLayout = "vertical",
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

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block">
            <p className="text-red-600 text-sm font-medium tracking-wider uppercase mb-2">
              {subtitle}
            </p>
            <div className="w-12 h-0.5 bg-red-600 mx-auto mb-4"></div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">{title}</h2>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <EventCard
              key={event.id || index}
              event={event}
              cardSize={cardSize}
              layout={cardLayout}
            />
          ))}
        </div>

        {/* View More Button */}
        {onViewMore && (
          <div className="text-center">
            <button
              onClick={onViewMore}
              className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {viewMoreText}
              <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        )}

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">Chưa có sự kiện nào</p>
          </div>
        )}
      </div>
    </section>
  );
};
export default NewsEventsSection;
