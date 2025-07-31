import React, { useState } from "react";
import EventCard from "./EventCard";
import Pagination from "../components/guest/Pagination";
function ListArticles({
  events = [],
  itemsPerPage = 6,
  layout = "grid", // "grid", "list"
  cardSize = "default",
  cardLayout = "vertical",
  showPagination = true,
  showHeader = true,
  title = "Danh sách sự kiện",
  className = "",
  gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  onEventClick,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(events.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEvents = events.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEventClick = (event) => {
    if (onEventClick) {
      onEventClick(event);
    }
  };

  if (events.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-500 text-lg">
          Không có sự kiện nào để hiển thị
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {showHeader && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <div className="h-1 w-20 bg-red-600 rounded"></div>
          <p className="text-gray-600 mt-4">
            Hiển thị {startIndex + 1}-{Math.min(endIndex, events.length)} trong
            tổng số {events.length} sự kiện
          </p>
        </div>
      )}

      {/* Events Grid/List */}
      {layout === "grid" ? (
        <div className={`grid ${gridCols} gap-6 mb-8`}>
          {currentEvents.map((event, index) => (
            <div
              key={event.id || index}
              onClick={() => handleEventClick(event)}
            >
              <EventCard
                event={event}
                cardSize={cardSize}
                layout={cardLayout}
                className="cursor-pointer"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6 mb-8">
          {currentEvents.map((event, index) => (
            <div
              key={event.id || index}
              onClick={() => handleEventClick(event)}
            >
              <EventCard
                event={event}
                cardSize={cardSize}
                layout="horizontal"
                className="cursor-pointer"
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {showPagination && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-8"
        />
      )}
    </div>
  );
}

export default ListArticles;
