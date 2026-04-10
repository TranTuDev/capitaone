window.addEventListener("load", () => {
    setTimeout(initLineHighlights, 300);   // tăng nhẹ để DOM ổn định hơn

    gsap.registerPlugin(ScrollTrigger);

    // ====================== SPLIT TEXT (dùng cho menu) ======================
    function splitText(el) {
        if (el.dataset.split) return;
        const text = el.textContent.trim();
        const words = text.split(/\s+/);
        let html = "";
        words.forEach((word, wi) => {
            html += `<span class="word">`;
            for (let char of word) {
                html += `<span class="char">${char}</span>`;
            }
            html += `</span>`;
            if (wi < words.length - 1) html += " ";
        });
        el.innerHTML = html;
        el.dataset.split = "true";
    }

 
    // ====================== HEADER MENU ANIMATION ======================
    document.querySelectorAll(".header__menu-link span").forEach(el => {
        splitText(el);
    });

    document.querySelectorAll(".header__menu-link").forEach(link => {
        const chars = link.querySelectorAll(".char");
        if (chars.length === 0) return;

        link.addEventListener("mouseenter", () => {
            gsap.to(chars, { y: -10, stagger: 0.04, duration: 0.3 });
        });
        link.addEventListener("mouseleave", () => {
            gsap.to(chars, { y: 0, stagger: 0.04, duration: 0.3 });
        });
    });

    // ====================== HEADINGS ANIMATION ======================
    document.querySelectorAll(".heading__title, .section-title").forEach(title => {
        splitText(title);
        const chars = title.querySelectorAll(".char");

        gsap.set(chars, { y: 50, opacity: 0, willChange: "transform, opacity" });

        gsap.timeline({
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
                once: true,
                invalidateOnRefresh: true
            }
        }).to(chars, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: { each: 0.015, from: "start" }
        });
    });

    // Chỉ gọi 1 lần
    initLineHighlights();
});