document.addEventListener("DOMContentLoaded", () => {

    // ===== 1. Typewriter =====
    const typewriterEl = document.getElementById("typewriter");
    const words = ["Cybersecurity Student", "17-jarige uit Almere", "Gamer", "F1 Fan"];
    let i = 0;
    function typingEffect() {
        if (!typewriterEl) return;
        const chars = words[i].split("");
        (function loopTyping() {
            if (chars.length > 0) { typewriterEl.textContent += chars.shift(); setTimeout(loopTyping, 100); }
            else deletingEffect();
        })();
    }
    function deletingEffect() {
        if (!typewriterEl) return;
        const chars = typewriterEl.textContent.split("");
        (function loopDeleting() {
            if (chars.length > 0) { chars.pop(); typewriterEl.textContent = chars.join(""); setTimeout(loopDeleting, 50); }
            else { i = (i + 1) % words.length; typingEffect(); }
        })();
    }
    typingEffect();

    // ===== 2. F1 Countdown =====
    const raceDate = new Date("November 21, 2026 20:00:00").getTime();
    const raceName = "Grand Prix van Las Vegas";

    const locationEl = document.getElementById("f1-location");
    if (locationEl) locationEl.textContent = "Volgende race: " + raceName;

    const d = document.getElementById("days"),
          h = document.getElementById("hours"),
          m = document.getElementById("minutes"),
          s = document.getElementById("seconds"),
          box = document.getElementById("countdown");

    function updateCountdown() {
        const dist = raceDate - Date.now();
        if (dist < 0) { if (box) box.innerHTML = "<h3>Race is bezig of afgelopen</h3>"; return false; }
        const pad = (n) => (n < 10 ? "0" + n : "" + n);
        if (d) d.textContent = pad(Math.floor(dist / 86400000));
        if (h) h.textContent = pad(Math.floor((dist % 86400000) / 3600000));
        if (m) m.textContent = pad(Math.floor((dist % 3600000) / 60000));
        if (s) s.textContent = pad(Math.floor((dist % 60000) / 1000));
        return true;
    }
    updateCountdown();
    const tick = setInterval(() => { if (!updateCountdown()) clearInterval(tick); }, 1000);

    // ===== 3. Back to top =====
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => backToTopBtn.classList.toggle("show", window.scrollY > 500));
        backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    // ===== 4. GEEN GSAP VOOR HERO — alles direct zichtbaar =====
    // Hero-title, hero-subtitle, scroll-indicator staan gewoon in CSS.
    // Geen animatie = geen kans op zwart scherm.

    // ===== 5. Fade-up via IntersectionObserver (veilig, 1x per element) =====
    const fadeEls = document.querySelectorAll(".fade-up");
    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = "opacity 0.8s ease, transform 0.8s ease";
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeEls.forEach((el) => {
            // Alleen animeren als element NIET al in beeld is bij laden
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.style.opacity = "1";
                el.style.transform = "none";
            } else {
                el.style.opacity = "0";
                el.style.transform = "translateY(40px)";
                io.observe(el);
            }
        });
    } else {
        fadeEls.forEach(el => { el.style.opacity = "1"; el.style.transform = "none"; });
    }
});