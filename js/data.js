/* CẤU HÌNH */
const config = { date: "2025-01-10T00:00:00" };

/* TIMELINE DATA (Đã thêm trường image) */
/* Nếu mục nào không có ảnh, bạn cứ để image: "" hoặc xóa dòng đó đi */
const timelineData = [
    {
        time: "2023",
        title: "Lần Đầu Gặp Gỡ",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600", // Thay link ảnh của bạn vào đây
        desc: "Khoảnh khắc ánh mắt ta chạm nhau tại quán cà phê quen thuộc."
    },
    {
        time: "2024",
        title: "Lời Tỏ Tình",
        image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600",
        desc: "Anh lấy hết can đảm để nói yêu em dưới cơn mưa rào mùa hạ."
    },
    {
        time: "10/01/2025",
        title: "Lễ Thành Hôn",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600",
        desc: "Ngày hạnh phúc nhất đời anh. Chúng ta chính thức về chung một nhà."
    },
    {
        time: "10/01/2026",
        title: "Kỷ Niệm 1 Năm",
        image: "", // Ví dụ mốc này chưa có ảnh thì để trống
        desc: "365 ngày trọn vẹn yêu thương và sẻ chia."
    }
];

/* ALBUM DATA (Giữ nguyên) */
const albumData = [
    { src: "assets/images/kethon.mp4", caption: "Đăng ký kết hôn nè"},
    { src: "assets/images/video.mp4", caption: "Đi Đà Nẵng luôn hẹ hẹ" },
    { src: "assets/images/chupanhcuoi.jpg", caption: "Ảnh cưới nè" },
    { src: "assets/images/chupanhcuoi1.jpg", caption: "Ảnh cưới tiếp nè" },
    { src: "assets/images/quasndau.jpg", caption: "Quà sinh nhật vợ iu tặng anh" },
    { src: "assets/images/kethon.jpg", caption: "Đăng ký kết hôn nè" },
    { src: "assets/images/anh1.jpg", caption: "Khoảnh khắc 1" },
    { src: "assets/images/anh2.jpg", caption: "Khoảnh khắc 2" },
    { src: "assets/images/anh3.jpg", caption: "Khoảnh khắc 3" },
    { src: "assets/images/anh4.jpg", caption: "Khoảnh khắc 4" },
    { src: "assets/images/anh5.jpg", caption: "Khoảnh khắc 5" },
    { src: "assets/images/anh6.jpg", caption: "Khoảnh khắc 6" },
    { src: "assets/images/anh7.jpg", caption: "Khoảnh khắc 7" },
    { src: "assets/images/anh8.jpg", caption: "Khoảnh khắc 8" },
    { src: "assets/images/anh9.jpg", caption: "Khoảnh khắc 9" },
    { src: "assets/images/anh10.jpg", caption: "Khoảnh khắc 10" }
];