// vite.config.js (trong thư mục frontend của bạn)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Hoặc @vitejs/plugin-vue nếu bạn dùng Vue

export default defineConfig({
  plugins: [react()], // Đảm bảo plugin của framework bạn đang dùng được thêm vào
  server: {
    proxy: {
      // Khi Vite thấy '/api' trong URL, nó sẽ chuyển hướng
      '/api': {
        target: 'http://localhost:3000', // <-- Đảm bảo đây là **URL và cổng chính xác của Backend**
        changeOrigin: true, // <-- Quan trọng! Thay đổi header 'Origin' của yêu cầu thành 'target' host
        // Ví dụ: yêu cầu từ FE là /api/auth/login sẽ được gửi đến BE là /auth/login
      },
      // Nếu Backend của bạn có các API không bắt đầu bằng '/api'
      // bạn có thể thêm các proxy khác nếu cần
      // '/another-api-path': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/another-api-path/, ''),
      // },
    },
  },
});