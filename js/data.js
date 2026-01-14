/* CẤU HÌNH */
const config = { date: "2025-01-10T00:00:00" };

/* TIMELINE DATA (Đã thêm trường image) */
/* Nếu mục nào không có ảnh, bạn cứ để image: "" hoặc xóa dòng đó đi */
const timelineData = [
    {
        time: "2023",
        title: "Lần Đầu Gặp Gỡ",
        image: "",
        desc: "Vào giao dịch mua gói mạng cũng xịn xò, lúc đấy thích tốc độ cao thật chứ khum phải sĩ gái đâu vợ ạ 🤣! Xong tối hôm đấy về nhắn tin làm quen luôn hẹ hẹ."
    },
    {
        time: "08/2023",
        title: "Lần đầu tiên tổ chức sinh nhật cho Crush",
        image: "assets/images/landausnvo.jpg",
        desc: "Lần đầu tiên tổ chức sinh nhật cho Crush, vừa vui vừa hồi hộp nè!"
    },
    {
        time: "2024",
        title: "Đi chơi các kiểu",
        image: "assets/images/mocchau.jpg",
        desc: "Nhiều lần được đi chơi cùng nhau, Crush xinh dã man, mỗi tội mình chụp xấu nên thỉnh thoảng mới được mấy cái ảnh tạm ổn 😁"
    },
    {
        time: "08/2024",
        title: "Lần thứ hai tổ chức sinh nhật cho Crush",
        image: "assets/images/lanhaisnvo.jpg",
        desc: "Lần thứ hai tổ chức sinh nhật cho Crush nè, lần này có 2 chúng mình đi thui nên cũng hồi hộp ghê!"
    },
    {
        time: "13/10/2024",
        title: "Lời Tỏ Tình",
        image: "assets/images/totinh.jpg",
        desc: "Anh lấy hết can đảm để nói yêu em, tỏ tình trong ô tô luôn chớ 😂"
    },
    {
        time: "11/2024",
        title: "Được em iu tổ chức sinh nhật",
        image: "assets/images/quasndau.jpg",
        desc: "Buổi sinh nhật đầu tiên sau khi 2 đứa chính thức đến với tình iu :)"
    },
    {
        time: "12/2024",
        title: "Đi chụp ảnh cưới 😍",
        image: "assets/images/chupanhcuoi1.jpg",
        desc: "Tuyệt vời luôn, mà chồng chưa biết diễn nên cười chưa xinh haha."
    },
    {
        time: "12/2024",
        title: "Đi đăng ký kết hôn",
        image: "assets/images/kethon1.jpg",
        desc: "Cầm tờ A4 đời đời ấm no :)"
    },
    {
        time: "09/01/2025",
        title: "Chúng mình tổ chức ăn hỏi",
        image: "assets/images/anhoi.jpg",
        desc: "Vợ chồng mình xinh xỉu luôn, quá ưng 😘"
    },
    {
        time: "10/01/2025",
        title: "Chúng mình chính thức về chung 1 nhà",
        image: "assets/images/cuoi.jpg",
        desc: "Ngày hạnh phúc nhất đời anh. Chúng ta chính thức về chung một nhà."
    },
    {
        time: "04/2025",
        title: "Cưới xong thì làm gì nhờ",
        image: "assets/images/anh4.jpg",
        desc: "Đi chơi với đi trăng mật chứ còn làm gì nữa, chúng mình cứ thế thui hẹ hẹ 😎"
    },
    {
        time: "10/01/2026",
        title: "Kỷ Niệm 1 Năm",
        image: "assets/images/anh3.jpg",
        desc: "1 năm trọn vẹn iu thương!"
    }
];

/* ALBUM DATA (Giữ nguyên) */
const albumData = [
    { src: "assets/images/kethon1.mp4", caption: "Đăng ký kết hôn nè" },
    { src: "assets/images/video.mp4", caption: "Đi Đà Nẵng luôn hẹ hẹ" },
    { src: "assets/images/chupanhcuoi.jpg", caption: "Ảnh cưới nè" },
    { src: "assets/images/chupanhcuoi1.jpg", caption: "Ảnh cưới tiếp nè" },
    { src: "assets/images/quasndau.jpg", caption: "Quà sinh nhật vợ iu tặng anh" },
    { src: "assets/images/kethon1.jpg", caption: "Đăng ký kết hôn nè" },
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

/* LOVE BOX DATA (MỚI) */
const loveMessages = [
    "Cảm ơn em đã đến bên anh!",
    "Mỗi ngày bên em là một niềm vui.",
    "Vợ anh là xinh nhất!",
    "Yêu em nhiều hơn hôm qua, ít hơn ngày mai.",
    "Em là món quà tuyệt vời nhất của anh.",
    "Bữa cơm em nấu là ngon nhất trên đời!",
    "Cùng nhau đi hết cuộc đời nhé!",
    "Anh hứa sẽ luôn lắng nghe em.",
    "Cảm ơn em đã chịu đựng tính xấu của anh hehe.",
    "Hôm nay em đẹp lắm!",
    "Anh nhớ em!",
    "Vợ là số 1!",
    "Hạnh phúc là có em bên cạnh.",
    "Yêu em 3000!",
    "Em cười là anh vui rồi.",
    "Mãi bên nhau bạn nhé!"
];

/* LOVE MAP DATA (MỚI) */
const locationData = [
    {
        name: "Lần đầu gặp gỡ",
        desc: "Nơi định mệnh bắt đầu...",
        icon: "fa-map-marker-alt"
    },
    {
        name: "Nơi tỏ tình",
        desc: "Một góc đường đầy kỷ niệm",
        icon: "fa-heart"
    },
    {
        name: "Lễ Ăn Hỏi & Cưới",
        desc: "Ngày mình về chung một nhà",
        icon: "fa-church"
    }
];