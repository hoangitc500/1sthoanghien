document.addEventListener("DOMContentLoaded", () => {

    // --- 1. START APP & PHÁT NHẠC ---
    window.startApp = function () {
        const intro = document.getElementById('intro');
        const audio = document.getElementById('bg-music');

        // Hiệu ứng mờ dần
        intro.style.opacity = 0;

        // Phát nhạc ngay lập tức khi click (User interaction)
        if (audio) {
            audio.volume = 0.5;
            audio.play().catch((e) => console.log("Audio play error:", e));
        }

        setTimeout(() => {
            intro.style.display = 'none';
            document.getElementById('app').classList.add('show');
            // Khởi tạo AOS cho các phần khác
            AOS.init({ duration: 1000, once: true });
        }, 800);
    };

    // --- 2. RENDER TIMELINE (CÓ ẢNH) ---
    const tList = document.getElementById('timeline-list');
    if (tList && typeof timelineData !== 'undefined') {
        let tHtml = '';
        timelineData.forEach(item => {
            // Kiểm tra nếu có ảnh thì hiển thị
            const imgHtml = item.image ? `<div class="t-image"><img src="${item.image}" loading="lazy" alt="Timeline"></div>` : '';

            tHtml += `
                <div class="t-item" data-aos="fade-up">
                    <div class="t-dot"></div>
                    <div class="t-time">${item.time}</div>
                    <div class="t-title">${item.title}</div>
                    ${imgHtml}
                    <div class="t-desc">${item.desc}</div>
                </div>`;
        });
        tList.innerHTML = tHtml;
    }

    // --- 3. RENDER GALLERY (ĐÃ NÂNG CẤP HỖ TRỢ VIDEO) ---
    const gList = document.getElementById('gallery-list');
    if (gList && typeof albumData !== 'undefined') {
        let gHtml = '';
        albumData.forEach((item, index) => {
            let contentHtml = '';

            // KIỂM TRA: Nếu đường dẫn kết thúc bằng .mp4 thì hiển thị Video Player
            if (item.src.toLowerCase().endsWith('.mp4') || (item.type && item.type === 'video')) {
                contentHtml = `
                    <div class="photo-card video-card">
                        <video controls preload="metadata" style="width: 100%; border-radius: 8px; display: block; background: #000;">
                            <source src="${item.src}#t=0.1" type="video/mp4">
                            Trình duyệt không hỗ trợ video.
                        </video>
                        <div style="text-align: center; font-size: 0.9rem; margin-top: 5px; color: #555; font-style: italic;">
                            ${item.caption}
                        </div>
                    </div>
                `;
            }
            // Nếu là Ảnh thì hiển thị như cũ (có Fancybox)
            else {
                contentHtml = `
                    <a href="${item.src}" class="photo-card" data-fancybox="gallery" data-caption="${item.caption}">
                        <img src="${item.src}" loading="lazy" alt="${item.caption}">
                    </a>
                `;
            }

            gHtml += `
                <div class="photo-wrapper" data-aos="zoom-in" data-aos-delay="${(index % 2) * 100}">
                    ${contentHtml}
                </div>`;
        });
        gList.innerHTML = gHtml;

        // Khởi tạo Fancybox cho ảnh
        try { Fancybox.bind('[data-fancybox="gallery"]', { Thumbs: false, Toolbar: { display: { right: ["close"] } }, Hash: false }); } catch (e) { }
    }

    // --- 4. BỘ ĐẾM (CÓ GIÂY) ---
    if (typeof config !== 'undefined') {
        const start = new Date(config.date);
        setInterval(() => {
            const now = new Date();
            const diff = now - start;

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);

            if (document.getElementById('days')) document.getElementById('days').innerText = d;
            if (document.getElementById('hours')) document.getElementById('hours').innerText = h;
            if (document.getElementById('minutes')) document.getElementById('minutes').innerText = m;
            if (document.getElementById('seconds')) document.getElementById('seconds').innerText = s;
        }, 1000);
    }

    // --- 5. FIXED BAR & BACK TO TOP ---
    const fixedBar = document.getElementById('fixed-bar');
    const backBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            fixedBar.classList.add('visible');
            backBtn.classList.add('show');
        } else {
            fixedBar.classList.remove('visible');
            backBtn.classList.remove('show');
        }
    });

    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
});