import React from "react";
import {
  Users,
  FileText,
  FolderOpen,
  Eye,
  TrendingUp,
  Calendar,
  Clock,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

const Dashboard = () => {
  // Sample data
  const stats = [
    {
      title: "Tổng Users",
      value: "2,847",
      change: "+12%",
      changeType: "increase",
      icon: Users,
      color: "blue",
    },
    {
      title: "Tổng Articles",
      value: "1,256",
      change: "+8%",
      changeType: "increase",
      icon: FileText,
      color: "green",
    },
    {
      title: "Categories",
      value: "48",
      change: "+2",
      changeType: "increase",
      icon: FolderOpen,
      color: "purple",
    },
    {
      title: "Lượt xem",
      value: "89,247",
      change: "+24%",
      changeType: "increase",
      icon: Eye,
      color: "orange",
    },
  ];

  const recentArticles = [
    {
      title: "Hướng dẫn sử dụng React Hooks",
      author: "Nguyễn Văn A",
      views: 1245,
      date: "2024-07-28",
      status: "published",
    },
    {
      title: "Tối ưu hiệu suất ứng dụng web",
      author: "Trần Thị B",
      views: 892,
      date: "2024-07-27",
      status: "published",
    },
    {
      title: "Thiết kế responsive với Tailwind CSS",
      author: "Lê Văn C",
      views: 567,
      date: "2024-07-26",
      status: "draft",
    },
    {
      title: "API RESTful với Node.js",
      author: "Phạm Thị D",
      views: 423,
      date: "2024-07-25",
      status: "published",
    },
  ];

  const chartData = [
    { month: "Jan", users: 420, articles: 80 },
    { month: "Feb", users: 510, articles: 95 },
    { month: "Mar", users: 680, articles: 120 },
    { month: "Apr", users: 750, articles: 140 },
    { month: "May", users: 890, articles: 165 },
    { month: "Jun", users: 1100, articles: 190 },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-500 text-white",
      green: "bg-green-500 text-white",
      purple: "bg-purple-500 text-white",
      orange: "bg-orange-500 text-white",
    };
    return colors[color] || "bg-gray-500 text-white";
  };

  const getBgColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 border-blue-200",
      green: "bg-green-50 border-green-200",
      purple: "bg-purple-50 border-purple-200",
      orange: "bg-orange-50 border-orange-200",
    };
    return colors[color] || "bg-gray-50 border-gray-200";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Chào mừng trở lại! Đây là tổng quan về hệ thống của bạn.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`${getBgColorClasses(
                stat.color
              )} rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-lg hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}
                >
                  <Icon size={24} />
                </div>
                <div
                  className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    stat.changeType === "increase"
                      ? "text-green-700 bg-green-100"
                      : "text-red-700 bg-red-100"
                  }`}
                >
                  {stat.change}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 size={20} />
                Thống kê theo tháng
              </h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Articles</span>
                </div>
              </div>
            </div>

            {/* Simple Chart Representation */}
            <div className="space-y-4">
              {chartData.map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 text-sm text-gray-600 font-medium">
                    {data.month}
                  </div>
                  <div className="flex-1 flex gap-2">
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Users: {data.users}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(data.users / 1100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Articles: {data.articles}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(data.articles / 190) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity size={20} />
              Hoạt động hôm nay
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bài viết mới</span>
                <span className="font-semibold text-green-600">+12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Users đăng ký</span>
                <span className="font-semibold text-blue-600">+24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Lượt xem</span>
                <span className="font-semibold text-orange-600">+1,847</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Clock size={20} />
            Bài viết gần đây
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiêu đề
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tác giả
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lượt xem
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentArticles.map((article, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {article.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {article.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Eye size={14} className="text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {article.views.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{article.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        article.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {article.status === "published"
                        ? "Đã xuất bản"
                        : "Bản nháp"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
