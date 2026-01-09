document.addEventListener("DOMContentLoaded", () => {

    // --- 1. START APP & PHÁT NHẠC ---
    window.startApp = function () {
        const intro = document.getElementById('intro');

        // Ẩn màn hình chờ
        intro.style.opacity = 0;
        setTimeout(() => {
            intro.style.display = 'none';
            document.getElementById('app').classList.add('show');
            AOS.init({ duration: 800, once: true });
        }, 800);

        // XỬ LÝ NHẠC (Fix lỗi không phát)
        const audio = document.getElementById('bg-music');
        if (audio) {
            audio.volume = 0.5;
            // Trình duyệt yêu cầu phải có tương tác người dùng (click) mới cho phát nhạc
            // Hàm startApp được gọi từ sự kiện onclick nên sẽ hợp lệ
            audio.play().then(() => {
                console.log("Music playing...");
                // Đổi icon nút nhạc sang icon đang phát
                const icon = document.querySelector('.music-btn i');
                if (icon) { icon.classList.remove('fa-play'); icon.classList.add('fa-pause'); }
            }).catch(error => {
                console.log("Autoplay blocked or file not found:", error);
                alert("Không tìm thấy file nhạc hoặc trình duyệt chặn. Hãy bấm nút nhạc ở góc trái.");
            });
        }
    };

    // --- 2. RENDER TIMELINE ---
    const tList = document.getElementById('timeline-list');
    if (tList && typeof timelineData !== 'undefined') {
        let tHtml = '';
        timelineData.forEach(item => {
            tHtml += `
                <div class="t-item" data-aos="fade-left">
                    <div class="t-dot"></div>
                    <div class="t-time">${item.time}</div>
                    <div class="t-title">${item.title}</div>
                    <div class="t-desc">${item.desc}</div>
                </div>`;
        });
        tList.innerHTML = tHtml;
    }

    // --- 3. RENDER GALLERY & FIX CLICK ẢNH ---
    const gList = document.getElementById('gallery-list');
    if (gList && typeof albumData !== 'undefined') {
        let gHtml = '';
        albumData.forEach((img, index) => {
            // Quan trọng: data-fancybox="gallery" phải nằm ở thẻ A bao ngoài IMG
            gHtml += `
                <a href="${img.src}" class="photo-card" data-fancybox="gallery" data-caption="${img.caption}" data-aos="zoom-in" data-aos-delay="${(index % 2) * 100}">
                    <img src="${img.src}" loading="lazy" alt="${img.caption}">
                </a>`;
        });
        gList.innerHTML = gHtml;

        // Khởi tạo Fancybox sau khi đã chèn HTML vào trang
        try {
            Fancybox.bind('[data-fancybox="gallery"]', {
                Thumbs: false,
                Toolbar: { display: ["close"] },
                closeButton: "top",
            });
        } catch (e) { console.error("Fancybox error:", e); }
    }

    // --- 4. BỘ ĐẾM (ĐÃ CẬP NHẬT TÍNH GIÂY) ---
    if (typeof config !== 'undefined') {
        const start = new Date(config.date);

        setInterval(() => {
            const now = new Date();
            const diff = now - start;

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60); // Thêm dòng này

            if (document.getElementById('days')) document.getElementById('days').innerText = d;
            if (document.getElementById('hours')) document.getElementById('hours').innerText = h;
            if (document.getElementById('minutes')) document.getElementById('minutes').innerText = m;
            // Cập nhật giây ra màn hình
            if (document.getElementById('seconds')) document.getElementById('seconds').innerText = s;
        }, 1000);
    }

    // --- 5. BACK TO TOP ---
    const backBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) backBtn.classList.add('show');
        else backBtn.classList.remove('show');
    });
    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- 6. TOGGLE MUSIC ---
    window.toggleMusic = function () {
        const audio = document.getElementById('bg-music');
        const icon = document.querySelector('.music-btn i');
        if (audio.paused) {
            audio.play();
            icon.classList.remove('fa-play'); icon.classList.add('fa-pause');
        } else {
            audio.pause();
            icon.classList.remove('fa-pause'); icon.classList.add('fa-play');
        }
    };

    // --- 7. LOGIC CHO FIXED BAR ---
    const fixedBar = document.getElementById('fixed-bar');
    window.addEventListener('scroll', () => {
        // Khi cuộn xuống quá 300px (qua khỏi phần tên to đùng) thì hiện thanh bar
        if (window.scrollY > 300) {
            fixedBar.classList.add('visible');
        } else {
            fixedBar.classList.remove('visible');
        }
    });
});