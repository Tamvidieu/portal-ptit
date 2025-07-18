USE portal_ptit;

-- Tạo bảng admin với thêm cột token
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    token VARCHAR(255), -- Thêm cột token
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Thêm dữ liệu vào bảng admin (chưa có token)
INSERT INTO admin (username, password, email)
VALUES ('admin', '123456', 'admin@ptit.edu.vn');

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL, -- Slug cho URL thân thiện
    description VARCHAR(500)
);

USE portal_ptit;

CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL, -- URL thân thiện, ví dụ: 'dai-su-pham-quang-vinh-tham-gia-hoi-dong-co-van'
    thumbnail_url VARCHAR(255), -- Đường dẫn URL đến ảnh đại diện
    content TEXT NOT NULL, -- Nội dung dài của bài viết
    author_id INT, -- ID của tác giả
    published_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft', -- Trạng thái bài viết
    FOREIGN KEY (author_id) REFERENCES admin(id) ON DELETE SET NULL
);

CREATE TABLE article_categories (
    article_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (article_id, category_id), -- Khóa chính kép, đảm bảo mỗi cặp là duy nhất
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE, -- Xóa liên kết nếu bài viết bị xóa
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE -- Xóa liên kết nếu danh mục bị xóa
);


