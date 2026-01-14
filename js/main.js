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

    // --- 5. FIXED BAR & SMART NAVIGATION (CẬP NHẬT MỚI) ---
    const fixedBar = document.getElementById('fixed-bar');
    const backBtn = document.getElementById('back-to-top');
    const downBtn = document.getElementById('scroll-down'); // Khai báo nút xuống

    // Xử lý sự kiện cuộn
    window.addEventListener('scroll', () => {
        // Nếu cuộn xuống quá 300px
        if (window.scrollY > 300) {
            // Hiện thanh menu cố định
            if (fixedBar) fixedBar.classList.add('visible');

            // Hiện nút Lên - Ẩn nút Xuống
            if (backBtn) backBtn.classList.add('show');
            if (downBtn) downBtn.classList.add('hide');
        } else {
            // Ẩn thanh menu cố định
            if (fixedBar) fixedBar.classList.remove('visible');

            // Ẩn nút Lên - Hiện nút Xuống
            if (backBtn) backBtn.classList.remove('show');
            if (downBtn) downBtn.classList.remove('hide');
        }
    });

    // Hàm lướt lên đầu trang (Gắn vào nút #back-to-top)
    window.scrollToTop = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Hàm lướt xuống đáy trang (Gắn vào nút #scroll-down)
    window.scrollToBottom = function () {
        // Cuộn đến độ cao tối đa của body
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    // Logic nút nhạc (CẬP NHẬT: Thêm hiệu ứng pulse)
    window.toggleMusic = function () {
        const audio = document.getElementById('bg-music');
        const icon = document.querySelector('.music-btn i');
        const btn = document.querySelector('.music-btn');

        if (audio.paused) {
            audio.play();
            icon.classList.remove('fa-play'); icon.classList.add('fa-pause');
            if (btn) btn.classList.add('playing');
        } else {
            audio.pause();
            icon.classList.remove('fa-pause'); icon.classList.add('fa-play');
            if (btn) btn.classList.remove('playing');
        }
    };

    // --- 6. HIỆU ỨNG MƯA TIM (Falling Hearts) ---
    function startFallingHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart-fall');
            heart.innerHTML = '❤';
            heart.style.left = Math.random() * 100 + "vw";
            heart.style.animationDuration = Math.random() * 3 + 2 + "s";
            heart.style.fontSize = Math.random() * 1.5 + 1 + "rem"; // Random size
            document.body.appendChild(heart);

            // Xóa tim sau khi rơi xong để tránh nặng máy
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 500); // 0.5s rơi 1 tim
    }

    // --- 7. LOVE BOX (HỘP QUÀ BÍ MẬT) ---
    window.openLoveBox = function () {
        const modal = document.getElementById('love-modal');
        const msgContent = document.getElementById('love-message');
        if (modal && msgContent && typeof loveMessages !== 'undefined') {
            // Chọn ngẫu nhiên 1 câu
            const randomMsg = loveMessages[Math.floor(Math.random() * loveMessages.length)];
            msgContent.innerText = randomMsg;
            modal.classList.add('active');
        }
    };

    window.closeLoveBox = function () {
        const modal = document.getElementById('love-modal');
        if (modal) modal.classList.remove('active');
    };

    // --- 8. TYPEWRITER EFFECT (HIỆU ỨNG GÕ CHỮ - SEQUENTIAL) ---
    function initTypewriter() {
        const p1 = document.getElementById('letter-p1');
        const p2 = document.getElementById('letter-p2');

        if (p1 && p2) {
            // Chuẩn bị nội dung
            const text1 = p1.innerText.trim();
            const text2 = p2.innerText.trim();

            p1.innerText = "";
            p2.innerText = "";

            p1.style.visibility = 'hidden';
            p2.style.visibility = 'hidden';

            // Chỉ quan sát p1, khi p1 chạy xong thì mới đến p2
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        observer.unobserve(entry.target);
                        p1.style.visibility = 'visible';

                        // Gõ p1 xong thì gọi callback gõ p2
                        typeText(p1, text1, 0, () => {
                            p2.style.visibility = 'visible';
                            typeText(p2, text2, 0, null);
                        });
                    }
                });
            }, { threshold: 0.5 }); // Hiển thị 50% mới bắt đầu chạy

            observer.observe(p1);
        }
    }

    function typeText(element, text, index = 0, callback) {
        element.classList.add('type-cursor');
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            // Tốc độ gõ: 30ms - 50ms (ngẫu nhiên cho giống người)
            const speed = Math.floor(Math.random() * 20) + 30;
            setTimeout(() => typeText(element, text, index + 1, callback), speed);
        } else {
            element.classList.remove('type-cursor');
            // Gọi hàm tiếp theo nếu có
            if (callback) callback();
        }
    }

    // --- 9. LOVE MAP (DẤU ẤN TÌNH YÊU) ---
    const mapContainer = document.getElementById('love-map');
    if (mapContainer && typeof locationData !== 'undefined') {
        let mapHtml = '';
        locationData.forEach((loc, index) => {
            mapHtml += `
                <div class="map-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="map-icon"><i class="fa-solid ${loc.icon}"></i></div>
                    <div class="map-info">
                        <h4>${loc.name}</h4>
                        <p>${loc.desc}</p>
                    </div>
                </div>
            `;
        });
        mapContainer.innerHTML = mapHtml;
    }

    // --- 10. BACKGROUND SLIDESHOW ---
    function initSlideshow() {
        const bgContainer = document.getElementById('hero-bg');

        // CHỈ CHỌN VÀI ẢNH ĐẸP LÀM NỀN (Theo yêu cầu)
        const slideshowImages = [
            "assets/images/anhoi.jpg",
            "assets/images/totinh.jpg"
        ];

        if (bgContainer && slideshowImages.length > 0) {
            slideshowImages.forEach((imgSrc, index) => {
                const slide = document.createElement('div');
                slide.classList.add('hero-slide');
                if (index === 0) slide.classList.add('active'); // Slide đầu tiên hiện
                slide.style.backgroundImage = `url('${imgSrc}')`;
                bgContainer.appendChild(slide);
            });

            // Chuyển slide mỗi 4 giây
            let current = 0;
            const slides = document.querySelectorAll('.hero-slide');
            setInterval(() => {
                if (slides.length > 0) {
                    slides[current].classList.remove('active');
                    current = (current + 1) % slides.length;
                    slides[current].classList.add('active');
                }
            }, 4000);
        }
    }

    // --- 11. CONFETTI EFFECT (PHÁO GIẤY) ---
    function fireConfetti() {
        if (typeof confetti === 'function') {
            const duration = 3000;
            const end = Date.now() + duration;

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 }
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 }
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }

    // UPDATE: Khi mở hộp quà thì bắn pháo hoa
    const originalOpenLoveBox = window.openLoveBox;
    window.openLoveBox = function () {
        originalOpenLoveBox();
        fireConfetti();
    };

    // UPDATE: Khi cuộn xuống cuối trang thì bắn pháo hoa (chỉ 1 lần)
    let footerConfettiFired = false;
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
            if (!footerConfettiFired) {
                fireConfetti();
                footerConfettiFired = true;
            }
        }
    });

    // --- 12. FLOATING MUSIC PLAYER (TRÌNH PHÁT NHẠC MỚI) ---
    function initMusicPlayer() {
        const audio = document.getElementById('bg-music');
        const playBtn = document.querySelector('.mp-play-btn i');
        const progressBar = document.getElementById('mp-progress-bar');
        const progressContainer = document.getElementById('mp-progress-container');

        if (!audio) return;

        audio.addEventListener('timeupdate', () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            if (progressBar) progressBar.style.width = `${percent}%`;
        });

        if (progressContainer) {
            progressContainer.addEventListener('click', (e) => {
                const width = progressContainer.clientWidth;
                const clickX = e.offsetX;
                const duration = audio.duration;
                audio.currentTime = (clickX / width) * duration;
            });
        }

        window.toggleMusic = function () {
            if (audio.paused) {
                audio.play();
                if (playBtn) {
                    playBtn.classList.remove('fa-play');
                    playBtn.classList.add('fa-pause');
                }
            } else {
                audio.pause();
                if (playBtn) {
                    playBtn.classList.remove('fa-pause');
                    playBtn.classList.add('fa-play');
                }
            }
        };
    }

    // UPDATE START APP: Thêm khởi chạy tim rơi & typewriter
    const originalStartApp = window.startApp;
    window.startApp = function () {
        originalStartApp(); // Chạy logic cũ

        // Kích hoạt tính năng mới
        setTimeout(() => {
            startFallingHearts();
            initTypewriter();
            initSlideshow();
            initMusicPlayer();

            // Nếu nhạc tự chạy thì thêm class playing (trên mobile thường chặn autoplay)
            const audio = document.getElementById('bg-music');
            if (audio && !audio.paused) {
                const btn = document.querySelector('.music-player .mp-play-btn i');
                if (btn) {
                    btn.classList.remove('fa-play');
                    btn.classList.add('fa-pause');
                }
            }
        }, 800);
    };

});