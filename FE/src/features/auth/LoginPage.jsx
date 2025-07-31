import React, { useState } from "react";
import { User, Lock, Home, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setIsLoading(true);

    // Giả lập quá trình đăng nhập
    setTimeout(() => {
      setIsLoading(false);
      alert(`Đăng nhập thành công với username: ${username}`);
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(135deg, #051A53 0%, #BC2626 50%, #051A53 100%)`,
      }}
    >
      <div className="w-full max-w-md">
        {/* Card chính */}
        <div
          className="backdrop-blur-lg rounded-2xl shadow-2xl border p-8 transform hover:scale-105 transition-transform duration-300"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "#FFB6B6",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
              style={{
                backgroundColor: "#BC2626",
              }}
            >
              <User className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: "#051A53" }}
            >
              Đăng nhập
            </h1>
            <p style={{ color: "#7A7A7A" }}>Chào mừng bạn quay trở lại</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Username field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5" style={{ color: "#7A7A7A" }} />
              </div>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderColor: "#FFB6B6",
                  color: "#051A53",
                  focusRingColor: "#BC2626",
                }}
                required
              />
            </div>

            {/* Password field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5" style={{ color: "#7A7A7A" }} />
              </div>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderColor: "#FFB6B6",
                  color: "#051A53",
                  focusRingColor: "#BC2626",
                }}
                required
              />
            </div>

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              style={{
                background: `linear-gradient(135deg, #BC2626 0%, #61CE70 100%)`,
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.background = `linear-gradient(135deg, #a01f1f 0%, #4fb85f 100%)`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.background = `linear-gradient(135deg, #BC2626 0%, #61CE70 100%)`;
                }
              }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Đăng nhập</span>
                </>
              )}
            </button>

            {/* Back to home button */}
            <button
              onClick={() => navigate("/")}
              className="w-full font-semibold py-3 px-6 rounded-xl border backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              style={{
                backgroundColor: "rgba(255, 182, 182, 0.2)",
                borderColor: "#FFB6B6",
                color: "#051A53",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255, 182, 182, 0.3)";
                e.target.style.borderColor = "#BC2626";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(255, 182, 182, 0.2)";
                e.target.style.borderColor = "#FFB6B6";
              }}
            >
              <Home className="w-5 h-5" />
              <span>Quay lại trang chủ</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm" style={{ color: "#7A7A7A" }}>
              Bằng việc đăng nhập, bạn đồng ý với{" "}
              <span
                className="hover:underline cursor-pointer"
                style={{ color: "#BC2626" }}
              >
                điều khoản sử dụng
              </span>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute top-4 left-4 w-20 h-20 rounded-full blur-xl"
          style={{
            backgroundColor: "rgba(255, 182, 182, 0.3)",
          }}
        ></div>
        <div
          className="absolute bottom-4 right-4 w-32 h-32 rounded-full blur-2xl"
          style={{
            backgroundColor: "rgba(97, 206, 112, 0.2)",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-0 w-16 h-16 rounded-full blur-xl"
          style={{
            backgroundColor: "rgba(188, 38, 38, 0.2)",
          }}
        ></div>
      </div>
    </div>
  );
}
