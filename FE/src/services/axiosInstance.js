import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // từ biến môi trường
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // nếu cần gửi cookie/token
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // hoặc sessionStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem("token");
      window.location.href = "/login"; // hoặc dùng navigate
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
