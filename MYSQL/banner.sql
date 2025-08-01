use portal_ptit;

CREATE TABLE banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_url VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    link_url VARCHAR(255),
    status ENUM('published', 'draft', 'archived') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO banners (image_url, title, link_url, status) VALUES
('https://placehold.co/1200x400/FF5733/ffffff?text=Banner+1', 'Chào mừng đến với PTIT', '/about', 'published'),
('https://placehold.co/1200x400/33FF57/ffffff?text=Banner+2', 'Sự kiện sắp tới', '/events', 'published'),
('https://placehold.co/1200x400/3357FF/ffffff?text=Banner+3', 'Tuyển sinh 2024', '/admissions', 'published'),
('https://placehold.co/1200x400/FF33A1/ffffff?text=Banner+4', 'Banner nháp', '/draft', 'draft');