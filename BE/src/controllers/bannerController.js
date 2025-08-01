// E:\SeftStudy\LTWEB\portal-ptit\BE\src\controllers\bannerController.js
const bannerService = require('../services/bannerService');

// Lấy tất cả banner công khai (public)
exports.getAllPublishedBanners = async (req, res) => {
    try {
        const banners = await bannerService.getAllPublishedBanners();
        res.status(200).json({ success: true, banners });
    } catch (error) {
        console.error('Error in getAllPublishedBanners controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Lấy tất cả banner (dành cho admin)
exports.getAllBanners = async (req, res) => {
    try {
        const banners = await bannerService.getAllBanners();
        res.status(200).json({ success: true, banners });
    } catch (error) {
        console.error('Error in getAllBanners controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// Tạo banner mới
exports.createBanner = async (req, res) => {
    try {
        const { image_url, title, link_url, status } = req.body;
        if (!image_url) {
            return res.status(400).json({ success: false, message: 'Image URL is required.' });
        }
        const newBannerId = await bannerService.createBanner({ image_url, title, link_url, status });
        res.status(201).json({ success: true, message: 'Banner created successfully', bannerId: newBannerId });
    } catch (error) {
        console.error('Error in createBanner controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Cập nhật banner
exports.updateBanner = async (req, res) => {
    try {
        const { id } = req.params;
        const { image_url, title, link_url, status } = req.body;
        if (!image_url) {
            return res.status(400).json({ success: false, message: 'Image URL is required.' });
        }
        await bannerService.updateBanner(id, { image_url, title, link_url, status });
        res.status(200).json({ success: true, message: 'Banner updated successfully' });
    } catch (error) {
        console.error('Error in updateBanner controller:', error);
        if (error.code === 'NOT_FOUND') {
            return res.status(404).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Xóa banner
exports.deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;
        await bannerService.deleteBanner(id);
        res.status(200).json({ success: true, message: 'Banner deleted successfully' });
    } catch (error) {
        console.error('Error in deleteBanner controller:', error);
        if (error.code === 'NOT_FOUND') {
            return res.status(404).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
