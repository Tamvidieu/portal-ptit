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
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft' -- Trạng thái bài viết
);

CREATE TABLE media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    media_type ENUM('thumbnail', 'content', 'gallery') DEFAULT 'content',
    file_size BIGINT,
    alt_text VARCHAR(255),
    article_id INT,
    position INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    INDEX idx_media_article (article_id),
    INDEX idx_media_type (media_type)
);


