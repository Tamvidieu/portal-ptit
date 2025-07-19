USE portal_ptit;

-- Dữ liệu cho bảng categories
INSERT INTO categories (name, slug, description) VALUES
('Tin tức', 'tin-tuc', 'Các tin tức chung về trường và các hoạt động.'),
('Sự kiện', 'su-kien', 'Thông tin về các sự kiện sắp diễn ra hoặc đã diễn ra.'),
('Thông báo chung', 'thong-bao-chung', 'Các thông báo quan trọng từ nhà trường.'),
('PTIT trên báo chí', 'ptit-tren-bao-chi', 'Các bài viết về PTIT trên các phương tiện truyền thông.'),
('Hoạt động sinh viên', 'hoat-dong-sinh-vien', 'Tin tức về các hoạt động, câu lạc bộ của sinh viên.'),
('Hợp tác quốc tế', 'hop-tac-quoc-te', 'Các hoạt động hợp tác với các đối tác nước ngoài.');

-- Dữ liệu cho bảng articles (10 bài viết)
-- Giả sử ID của admin là 1 (từ lệnh INSERT users ở trên)
INSERT INTO articles (title, slug, thumbnail_url, content, author_id, status) VALUES
('Đại sứ Phạm Quang Vinh tham gia Hội đồng cố vấn Viện Lãnh đạo', 'dai-su-pham-quang-vinh-tham-gia-hoi-dong-co-van-vien-lanh-dao', 'https://placehold.co/800x450/007bff/ffffff?text=Thumbnail+1', 'Nội dung chi tiết về việc Đại sứ Phạm Quang Vinh tham gia Hội đồng cố vấn Viện Lãnh đạo Quan trị và Quản lý Việt Nam. Đây là một sự kiện quan trọng của PTIT.', 1, 'published'),
('Khai giảng chương trình đào tạo "Lãnh đạo trẻ trong kỷ nguyên số"', 'khai-giang-chuong-trinh-dao-tao-lanh-dao-tre-ky-nguyen-so', 'https://placehold.co/800x450/28a745/ffffff?text=Thumbnail+2', 'PTIT tổ chức lễ khai giảng chương trình đào tạo "Lãnh đạo trẻ trong kỷ nguyên số" với sự tham gia của nhiều chuyên gia và sinh viên.', 1, 'published'),
('Thông báo về lịch thi học kỳ I năm học 2025-2026', 'thong-bao-lich-thi-hoc-ky-i-2025-2026', 'https://placehold.co/800x450/ffc107/000000?text=Thumbnail+3', 'Chi tiết lịch thi học kỳ I, các quy định và lưu ý quan trọng dành cho sinh viên PTIT.', 1, 'published'),
('PTIT được vinh danh trên báo Tuổi Trẻ về đổi mới giáo dục', 'ptit-vinh-danh-bao-tuoi-tre-doi-moi-giao-duc', 'https://placehold.co/800x450/dc3545/ffffff?text=Thumbnail+4', 'Bài viết trên báo Tuổi Trẻ khen ngợi những nỗ lực và thành tựu của PTIT trong việc đổi mới phương pháp giảng dạy và nghiên cứu.', 1, 'published'),
('Cuộc thi "Ý tưởng khởi nghiệp PTIT 2025" chính thức khởi động', 'cuoc-thi-y-tuong-khoi-nghiep-ptit-2025-khoi-dong', 'https://placehold.co/800x450/6f42c1/ffffff?text=Thumbnail+5', 'Thông tin chi tiết về cuộc thi "Ý tưởng khởi nghiệp PTIT 2025" dành cho sinh viên, khuyến khích sự sáng tạo và đổi mới.', 1, 'published'),
('Hội thảo quốc tế về Trí tuệ nhân tạo và ứng dụng', 'hoi-thao-quoc-te-tri-tue-nhan-tao-ung-dung', 'https://placehold.co/800x450/17a2b8/ffffff?text=Thumbnail+6', 'PTIT tổ chức hội thảo quốc tế với sự tham gia của các chuyên gia hàng đầu về AI từ nhiều quốc gia.', 1, 'published'),
('Lễ bế giảng và trao bằng tốt nghiệp năm 2025', 'le-be-giang-trao-bang-tot-nghiep-2025', 'https://placehold.co/800x450/fd7e14/ffffff?text=Thumbnail+7', 'Hình ảnh và thông tin về buổi lễ bế giảng trang trọng, trao bằng tốt nghiệp cho các sinh viên khóa mới.', 1, 'published'),
('Hoạt động tình nguyện "Mùa hè xanh" của sinh viên PTIT', 'hoat-dong-tinh-nguyen-mua-he-xanh-sinh-vien-ptit', 'https://placehold.co/800x450/e83e8c/ffffff?text=Thumbnail+8', 'Sinh viên PTIT tham gia các hoạt động tình nguyện ý nghĩa tại các vùng khó khăn trong chiến dịch Mùa hè xanh.', 1, 'published'),
('Ký kết hợp tác với Đại học XYZ (Nhật Bản)', 'ky-ket-hop-tac-dai-hoc-xyz-nhat-ban', 'https://placehold.co/800x450/6610f2/ffffff?text=Thumbnail+9', 'PTIT và Đại học XYZ (Nhật Bản) ký kết thỏa thuận hợp tác trong lĩnh vực nghiên cứu và trao đổi sinh viên.', 1, 'published'),
('Thông báo tuyển sinh sau đại học năm 2026', 'thong-bao-tuyen-sinh-sau-dai-hoc-2026', 'https://placehold.co/800x450/20c997/ffffff?text=Thumbnail+10', 'Thông tin chi tiết về kỳ tuyển sinh sau đại học năm 2026 của PTIT, bao gồm các ngành và điều kiện dự tuyển.', 1, 'published');


-- Dữ liệu cho bảng article_categories
-- Giả sử:
-- categories: 1=Tin tức, 2=Sự kiện, 3=Thông báo chung, 4=PTIT trên báo chí, 5=Hoạt động sinh viên, 6=Hợp tác quốc tế

INSERT INTO article_categories (article_id, category_id) VALUES
(1, 1), -- Bài 1: Tin tức
(1, 6), -- Bài 1: Hợp tác quốc tế
(2, 2), -- Bài 2: Sự kiện
(2, 1), -- Bài 2: Tin tức
(3, 3), -- Bài 3: Thông báo chung
(4, 4), -- Bài 4: PTIT trên báo chí
(4, 1), -- Bài 4: Tin tức
(5, 5), -- Bài 5: Hoạt động sinh viên
(5, 2), -- Bài 5: Sự kiện
(6, 6), -- Bài 6: Hợp tác quốc tế
(6, 1), -- Bài 6: Tin tức
(7, 2), -- Bài 7: Sự kiện
(7, 3), -- Bài 7: Thông báo chung
(8, 5), -- Bài 8: Hoạt động sinh viên
(8, 1), -- Bài 8: Tin tức
(9, 6), -- Bài 9: Hợp tác quốc tế
(9, 2), -- Bài 9: Sự kiện
(10, 3), -- Bài 10: Thông báo chung
(10, 1); -- Bài 10: Tin tức