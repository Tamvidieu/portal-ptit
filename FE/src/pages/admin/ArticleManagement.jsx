// E:\SeftStudy\LTWEB\portal-ptit\FE\src\pages\admin\ArticleManagement.jsx
import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2, XCircle, Loader2 } from 'lucide-react';
import * as authService from '../../services/authService'; // Import authService
import articleService from '../../services/articleService'; // Import articleService

function ArticleManagement() { // Đổi tên component từ ArticleManagementPage thành ArticleManagement
    const [articles, setArticles] = useState([]);
    const [editingArticle, setEditingArticle] = useState(null); // null: thêm mới, object: sửa
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formError, setFormError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Lấy token từ authService (chỉ để kiểm tra sự tồn tại, logic xác thực chính ở ProtectedRoute)
    const token = authService.isAuthenticated() ? localStorage.getItem('token') : '';

    useEffect(() => {
        // Trong ProtectedRoute, chúng ta biết rằng token đã có.
        // Nếu không có token ở đây, có thể là lỗi hoặc session đã hết hạn.
        if (token) {
            fetchArticlesForAdmin();
        } else {
            setFormError('Bạn cần đăng nhập để quản lý bài viết.');
        }
    }, [token]);

    // --- API Calls (Sử dụng articleService) ---

    const fetchArticlesForAdmin = async () => {
        setIsLoading(true);
        try {
            const data = await articleService.getAllArticlesForAdmin();
            if (data.success) {
                setArticles(data.articles);
            } else {
                setFormError(data.message || 'Không thể tải bài viết quản trị.');
            }
        } catch (error) {
            console.error("Error fetching admin articles in component:", error);
            setFormError(error.message || 'Lỗi kết nối server. Vui lòng kiểm tra kết nối mạng hoặc server.');
            // authService.logout() đã được gọi trong service nếu token hết hạn
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddEditArticle = async (articleData) => {
        setFormError('');
        setIsLoading(true);
        try {
            let data;
            if (editingArticle) {
                data = await articleService.updateArticle(editingArticle.id, articleData);
            } else {
                data = await articleService.createArticle(articleData);
            }

            if (data.success) {
                setIsModalOpen(false);
                setEditingArticle(null);
                fetchArticlesForAdmin(); // Refresh list
            } else {
                setFormError(data.message || 'Thao tác thất bại.');
            }
        } catch (error) {
            console.error("Error adding/editing article in component:", error);
            setFormError(error.message || 'Lỗi kết nối server. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteArticle = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
            return;
        }
        setIsLoading(true);
        try {
            const data = await articleService.deleteArticle(id);
            if (data.success) {
                fetchArticlesForAdmin(); // Refresh list
            } else {
                setFormError(data.message || 'Xóa bài viết thất bại.');
            }
        } catch (error) {
            console.error("Error deleting article in component:", error);
            setFormError(error.message || 'Lỗi kết nối server. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    // --- UI Handlers ---

    const openAddModal = () => {
        setEditingArticle(null);
        setFormError('');
        setIsModalOpen(true);
    };

    const openEditModal = (article) => {
        setEditingArticle(article);
        setFormError('');
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingArticle(null);
        setFormError('');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 font-inter">
            <header className="bg-white shadow-md rounded-lg p-4 mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">Quản lý Bài viết</h1>
                <button
                    onClick={openAddModal}
                    className="flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    <PlusCircle className="mr-2 h-6 w-6" /> Thêm bài viết mới
                </button>
            </header>

            {formError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                    <span className="block sm:inline">{formError}</span>
                </div>
            )}

            {isLoading && (
                <div className="flex justify-center items-center py-8">
                    <Loader2 className="animate-spin h-10 w-10 text-blue-500" />
                    <span className="ml-3 text-gray-700 text-lg">Đang tải bài viết...</span>
                </div>
            )}

            {!isLoading && articles.length === 0 && (
                <div className="text-center py-10 text-gray-600 text-xl">
                    Chưa có bài viết nào.
                </div>
            )}

            {!isLoading && articles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <div key={article.id} className="bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 ease-in-out hover:scale-102 hover:shadow-2xl">
                            {article.thumbnail_url && (
                                <img
                                    src={article.thumbnail_url}
                                    alt={article.title}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://placehold.co/800x450/cccccc/333333?text=No+Image`;
                                    }}
                                />
                            )}
                            <div className="p-5">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h2>
                                <p className="text-sm text-gray-600 mb-3">
                                    <span className="font-medium">Tác giả:</span> {article.author_name || 'N/A'}
                                </p>
                                <p className="text-sm text-gray-600 mb-3">
                                    <span className="font-medium">Ngày đăng:</span> {new Date(article.published_date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-600 mb-3">
                                    <span className="font-medium">Trạng thái:</span>{" "}
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        article.status === 'published' ? 'bg-blue-100 text-blue-800' :
                                        article.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {article.status === 'published' ? 'Đã xuất bản' :
                                         article.status === 'draft' ? 'Nháp' : 'Lưu trữ'}
                                    </span>
                                </p>
                                {article.categories_name && (
                                    <p className="text-sm text-gray-600 mb-4">
                                        <span className="font-medium">Danh mục:</span> {article.categories_name}
                                    </p>
                                )}
                                <div className="flex justify-end space-x-3">
                                    <button
                                        onClick={() => openEditModal(article)}
                                        className="p-2 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200 ease-in-out transform hover:scale-110 shadow-md"
                                        title="Chỉnh sửa"
                                    >
                                        <Edit className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteArticle(article.id)}
                                        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-110 shadow-md"
                                        title="Xóa"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <ArticleModal
                    article={editingArticle}
                    onClose={closeModal}
                    onSubmit={handleAddEditArticle}
                    formError={formError}
                    isLoading={isLoading}
                />
            )}
        </div>
    );
}

// ArticleModal component (không thay đổi, vẫn nằm trong cùng file)
function ArticleModal({ article, onClose, onSubmit, formError, isLoading }) {
    const [title, setTitle] = useState(article?.title || '');
    const [slug, setSlug] = useState(article?.slug || '');
    const [thumbnailUrl, setThumbnailUrl] = useState(article?.thumbnail_url || '');
    const [content, setContent] = useState(article?.content || '');
    const [status, setStatus] = useState(article?.status || 'draft');
    const [categoryIds, setCategoryIds] = useState(article?.category_details?.map(cat => cat.id) || []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, slug, thumbnail_url: thumbnailUrl, content, status, category_ids: categoryIds });
    };

    // Hàm giả lập để lấy danh sách category (trong thực tế sẽ gọi API)
    // TODO: Gọi API để lấy danh sách categories từ backend
    const [categories, setCategories] = useState([
        { id: 1, name: 'Tin tức' },
        { id: 2, name: 'Sự kiện' },
        { id: 3, name: 'Thông báo chung' },
        { id: 4, name: 'PTIT trên báo chí' },
        { id: 5, name: 'Hoạt động sinh viên' },
        { id: 6, name: 'Hợp tác quốc tế' },
    ]);

    const handleCategoryChange = (e) => {
        const value = parseInt(e.target.value);
        if (e.target.checked) {
            setCategoryIds([...categoryIds, value]);
        } else {
            setCategoryIds(categoryIds.filter(id => id !== value));
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition duration-200 ease-in-out"
                >
                    <XCircle className="h-8 w-8" />
                </button>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    {article ? 'Chỉnh sửa Bài viết' : 'Thêm Bài viết mới'}
                </h2>

                {formError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                        <span className="block sm:inline">{formError}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Tiêu đề:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="slug" className="block text-gray-700 text-sm font-semibold mb-2">Slug (URL thân thiện):</label>
                        <input
                            type="text"
                            id="slug"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="thumbnailUrl" className="block text-gray-700 text-sm font-semibold mb-2">URL ảnh Thumbnail:</label>
                        <input
                            type="url"
                            id="thumbnailUrl"
                            value={thumbnailUrl}
                            onChange={(e) => setThumbnailUrl(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-gray-700 text-sm font-semibold mb-2">Nội dung:</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="8"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-y"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-gray-700 text-sm font-semibold mb-2">Trạng thái:</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                        >
                            <option value="draft">Nháp</option>
                            <option value="published">Đã xuất bản</option>
                            <option value="archived">Lưu trữ</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Danh mục:</label>
                        <div className="grid grid-cols-2 gap-2">
                            {categories.map(cat => (
                                <div key={cat.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`category-${cat.id}`}
                                        value={cat.id}
                                        checked={categoryIds.includes(cat.id)}
                                        onChange={handleCategoryChange}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor={`category-${cat.id}`} className="ml-2 text-gray-700">{cat.name}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="animate-spin mr-2 h-5 w-5" /> : null}
                            {article ? 'Cập nhật' : 'Thêm mới'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ArticleManagement;
