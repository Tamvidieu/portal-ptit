// E:\SeftStudy\LTWEB\portal-ptit\BE\src\services\bannerService.js
const bannerModel = require('../models/bannerModel');

const bannerService = {
    // Lấy tất cả banner công khai
    getAllPublishedBanners: async () => {
        return await bannerModel.findAllPublished();
    },

    // Lấy tất cả banner (dành cho admin)
    getAllBanners: async () => {
        return await bannerModel.findAll();
    },

    // Tạo banner mới
    createBanner: async (bannerData) => {
        // Có thể thêm logic kiểm tra dữ liệu đầu vào ở đây nếu cần
        return await bannerModel.createBanner(bannerData);
    },

    // Cập nhật banner (Đã thêm lại)
    updateBanner: async (id, bannerData) => {
        const updated = await bannerModel.updateBanner(id, bannerData);
        if (!updated) {
            const error = new Error('Banner not found or no changes made.');
            error.code = 'NOT_FOUND';
            throw error;
        }
        return updated;
    },

    // Xóa banner
    deleteBanner: async (id) => {
        const deleted = await bannerModel.deleteBanner(id);
        if (!deleted) {
            const error = new Error('Banner not found.');
            error.code = 'NOT_FOUND';
            throw error;
        }
        return deleted;
    }
};

module.exports = bannerService;
