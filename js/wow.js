/* ===================================================
   WOW INTERACTIVE ENHANCEMENTS
   =================================================== */
(function () {
    'use strict';

    const isTouchDevice = window.matchMedia('(hover: none)').matches;

/* ===== AURORA BACKGROUND IN HERO ===== */
    function initAurora() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const aurora = document.createElement('div');
        aurora.className = 'hero-aurora';
        aurora.innerHTML =
            '<div class="aurora-orb aurora-orb-1"></div>' +
            '<div class="aurora-orb aurora-orb-2"></div>' +
            '<div class="aurora-orb aurora-orb-3"></div>' +
            '<div class="aurora-orb aurora-orb-4"></div>';

        const bg = hero.querySelector('.hero-background');
        if (bg) bg.prepend(aurora);
        else hero.prepend(aurora);
    }

    /* ===== PROFILE IMAGE SPINNING RINGS ===== */
    function initProfileRings() {
        const profileImg = document.querySelector('.profile-hero-image');
        if (!profileImg) return;

        const ring1 = document.createElement('div');
        ring1.className = 'wow-ring wow-ring-1';
        const ring2 = document.createElement('div');
        ring2.className = 'wow-ring wow-ring-2';

        profileImg.style.position = 'relative';
        profileImg.appendChild(ring1);
        profileImg.appendChild(ring2);
    }

    /* ===== 3D TILT ON CARDS ===== */
    function initTilt() {
        if (isTouchDevice) return;

        const cards = document.querySelectorAll(
            '.project-card, .service-card, .skill-card-modern, .about-card'
        );

        cards.forEach(card => {
            let isHovered = false;

            card.addEventListener('mouseenter', () => { isHovered = true; });

            card.addEventListener('mousemove', (e) => {
                if (!isHovered) return;
                const r = card.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;
                const cx = r.width  / 2;
                const cy = r.height / 2;
                const rotX = ((y - cy) / cy) * -6;
                const rotY = ((x - cx) / cx) *  6;

                card.style.transition = 'transform 0.08s ease';
                card.style.transform =
                    `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', () => {
                isHovered = false;
                card.style.transition = 'transform 0.45s ease';
                card.style.transform = '';
            });
        });
    }

    /* ===== BUTTON RIPPLE ===== */
    function initRipple() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn');
            if (!btn) return;

            const r = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple-wave';
            ripple.style.left = (e.clientX - r.left) + 'px';
            ripple.style.top  = (e.clientY - r.top)  + 'px';

            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    }

    /* ===== STAT NUMBER GLOW ON SCROLL ===== */
    function initStatGlow() {
        const stats = document.querySelectorAll('.stat-number');
        if (!stats.length) return;

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    el.style.transition = 'text-shadow 0.5s ease';
                    el.style.textShadow = '0 0 30px rgba(59, 130, 246, 0.9)';
                    setTimeout(() => {
                        el.style.textShadow = '0 0 18px rgba(59, 130, 246, 0.55)';
                    }, 1200);
                    obs.unobserve(el);
                }
            });
        }, { threshold: 0.7 });

        stats.forEach(n => obs.observe(n));
    }

    /* ===== INIT ===== */
    function init() {
        initAurora();
        initProfileRings();
        initTilt();
        initRipple();
        initStatGlow();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
