// E:\SeftStudy\LTWEB\portal-ptit\BE\src\services\categoryService.js
const connection = require('../config/mysql'); // Cần để tương tác DB

const categoryService = {
    // Lấy tất cả danh mục
    getAllCategories: async () => {
        const [rows] = await connection.execute('SELECT id, name, slug, description FROM categories ORDER BY name ASC');
        return rows;
    },

    // Lấy danh mục theo ID
    getCategoryById: async (id) => {
        const [rows] = await connection.execute('SELECT id, name, slug, description FROM categories WHERE id = ?', [id]);
        const category = rows[0] || null;
        if (!category) {
            const error = new Error('Category not found.');
            error.code = 'NOT_FOUND';
            throw error;
        }
        return category;
    },

    // Hàm mới: Lấy danh mục theo tên hoặc slug
    getCategoryByNameOrSlug: async (identifier) => {
        const [rows] = await connection.execute(
            'SELECT id, name, slug, description FROM categories WHERE name = ? OR slug = ?',
            [identifier, identifier]
        );
        return rows[0] || null; // Trả về đối tượng danh mục hoặc null nếu không tìm thấy
    },

    // Tạo danh mục mới
    createCategory: async (categoryData) => {
        const { name, slug, description } = categoryData;

        // Kiểm tra tên danh mục có tồn tại không
        let [nameRows] = await connection.execute('SELECT id FROM categories WHERE name = ?', [name]);
        if (nameRows.length > 0) {
            const error = new Error('Category name already exists.');
            error.code = 'DUPLICATE_NAME';
            throw error;
        }

        // Kiểm tra slug có tồn tại không
        let [slugRows] = await connection.execute('SELECT id FROM categories WHERE slug = ?', [slug]);
        if (slugRows.length > 0) {
            const error = new Error('Category slug already exists.');
            error.code = 'DUPLICATE_SLUG';
            throw error;
        }

        const [result] = await connection.execute(
            'INSERT INTO categories (name, slug, description) VALUES (?, ?, ?)',
            [name, slug, description]
        );
        return result.insertId;
    },

    // Cập nhật danh mục
    updateCategory: async (id, categoryData) => {
        const { name, slug, description } = categoryData;

        // Kiểm tra tên danh mục có tồn tại không (trừ chính nó)
        let [nameRows] = await connection.execute('SELECT id FROM categories WHERE name = ? AND id != ?', [name, id]);
        if (nameRows.length > 0) {
            const error = new Error('Category name already exists.');
            error.code = 'DUPLICATE_NAME';
            throw error;
        }

        // Kiểm tra slug có tồn tại không (trừ chính nó)
        let [slugRows] = await connection.execute('SELECT id FROM categories WHERE slug = ? AND id != ?', [slug, id]);
        if (slugRows.length > 0) {
            const error = new Error('Category slug already exists.');
            error.code = 'DUPLICATE_SLUG';
            throw error;
        }

        const [result] = await connection.execute(
            'UPDATE categories SET name = ?, slug = ?, description = ? WHERE id = ?',
            [name, slug, description, id]
        );
        const updated = result.affectedRows > 0;
        if (!updated) {
            const error = new Error('Category not found or no changes made.');
            error.code = 'NOT_FOUND';
            throw error;
        }
        return updated;
    },

    // Xóa danh mục
    deleteCategory: async (id) => {
        const [result] = await connection.execute('DELETE FROM categories WHERE id = ?', [id]);
        const deleted = result.affectedRows > 0;
        if (!deleted) {
            const error = new Error('Category not found.');
            error.code = 'NOT_FOUND';
            throw error;
        }
        return deleted;
    }
};

module.exports = categoryService;
