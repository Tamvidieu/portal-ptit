// E:\SeftStudy\LTWEB\portal-ptit\BE\src\controllers\categoryController.js
const categoryService = require('../services/categoryService');

// Lấy tất cả danh mục
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({ success: true, categories });
    } catch (error) {
        console.error('Error in getAllCategories controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Lấy danh mục theo ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(id);
        res.status(200).json({ success: true, category });
    } catch (error) {
        console.error('Error in getCategoryById controller:', error);
        if (error.code === 'NOT_FOUND') {
            return res.status(404).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Tạo danh mục mới
exports.createCategory = async (req, res) => {
    try {
        const { name, slug, description } = req.body;
        if (!name || !slug) {
            return res.status(400).json({ success: false, message: 'Name and slug are required.' });
        }
        const newCategoryId = await categoryService.createCategory({ name, slug, description });
        res.status(201).json({ success: true, message: 'Category created successfully', categoryId: newCategoryId });
    } catch (error) {
        console.error('Error in createCategory controller:', error);
        if (error.code === 'DUPLICATE_NAME' || error.code === 'DUPLICATE_SLUG') {
            return res.status(409).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Cập nhật danh mục
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, description } = req.body;
        if (!name || !slug) {
            return res.status(400).json({ success: false, message: 'Name and slug are required.' });
        }
        await categoryService.updateCategory(id, { name, slug, description });
        res.status(200).json({ success: true, message: 'Category updated successfully' });
    } catch (error) {
        console.error('Error in updateCategory controller:', error);
        if (error.code === 'NOT_FOUND') {
            return res.status(404).json({ success: false, message: error.message });
        }
        if (error.code === 'DUPLICATE_NAME' || error.code === 'DUPLICATE_SLUG') {
            return res.status(409).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Xóa danh mục
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategory(id);
        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error in deleteCategory controller:', error);
        if (error.code === 'NOT_FOUND') {
            return res.status(404).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
