/* --- DYNAMIC INTERACTION ENGINE - STUDIO ARCHITECTURE PORTFOLIO --- */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Cinematic Preloader & GSAP Sequence Initializer
    window.addEventListener("load", () => {
        const txtTimeline = gsap.timeline();
        
        txtTimeline.to(".init-text", { opacity: 1, duration: 0.6, letterSpacing: "0.4em", ease: "power2.out" })
                   .to(".init-subtext", { opacity: 1, duration: 0.4, letterSpacing: "0.6em", ease: "power2.out" }, "-=0.2")
                   .to("#preloader", {
                        y: "-100%",
                        duration: 0.8,
                        delay: 0.5,
                        ease: "power4.inOut",
                        onComplete: () => {
                            document.getElementById("preloader").style.display = "none";
                            // Trigger Cinematic Hero Section Entrance
                            gsap.from("#hero-parallax", { scale: 1.2, duration: 2.5, ease: "power3.out" });
                        }
                   });
    });

    // Failsafe Preloader: Force close loading screen if network lag blocks window load
    setTimeout(() => {
        const loader = document.getElementById("preloader");
        if(loader && loader.style.display !== "none") {
            loader.style.transition = "transform 0.6s cubic-bezier(0.77,0,0.175,1)";
            loader.style.transform = "translateY(-100%)";
        }
    }, 2500);

    // 2. Initialize AOS (Animate On Scroll Frame)
    AOS.init({
        duration: 900,
        once: true,
        easing: 'ease-out-cubic'
    });

    // 3. Custom Luxury Dual-Node Cursor tracking system
    const cursor = document.querySelector(".custom-cursor");
    const cursorDot = document.querySelector(".custom-cursor-dot");

    if (cursor && cursorDot) {
        document.addEventListener("mousemove", (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.25, ease: "power2.out" });
            gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.05, ease: "power1.out" });
        });

        // Hover expansions tracking
        document.querySelectorAll("a, button, .project-card").forEach(item => {
            item.addEventListener("mouseenter", () => {
                cursor.style.width = "50px";
                cursor.style.height = "50px";
                cursor.style.borderColor = "#ffffff";
                cursor.style.backgroundColor = "rgba(212, 175, 55, 0.1)";
            });
            item.addEventListener("mouseleave", () => {
                cursor.style.width = "30px";
                cursor.style.height = "30px";
                cursor.style.borderColor = "#D4AF37";
                cursor.style.backgroundColor = "transparent";
            });
        });
    }

    // 4. Parallax Background Processing Matrix for Hero Area
    const heroBg = document.getElementById("hero-parallax");
    if(heroBg) {
        window.addEventListener("scroll", () => {
            const scrollPos = window.scrollY;
            heroBg.style.transform = `translateY(${scrollPos * 0.35}px) scale(1.1)`;
        });
    }

    // 5. Scroll Progress Line Tracker & Sticky Header Transition
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("scroll-progress").style.width = scrolled + "%";
        
        const header = document.querySelector(".header-nav");
        if (window.scrollY > 60) {
            header.classList.add("py-3", "shadow-sm", "bg-white/95", "dark:bg-zinc-950/95");
            header.classList.remove("py-5");
        } else {
            header.classList.remove("py-3", "shadow-sm", "bg-white/95", "dark:bg-zinc-950/95");
            header.classList.add("py-5");
        }
    });

    // 6. Interactive Architecture Statistics Counter Engine
    const counters = document.querySelectorAll(".counter-value");
    const speed = 100;

    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.getAttribute("data-target"));
                let count = 0;
                
                const updateCount = () => {
                    const inc = Math.ceil(value / speed);
                    count += inc;
                    if(count < value) {
                        target.innerText = count + "+";
                        setTimeout(updateCount, 15);
                    } else {
                        target.innerText = value + "+";
                    }
                };
                updateCount();
                observer.unobserve(target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounter, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // 7. Dynamic Mixitup-Style Project Filter Engine
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active", "text-archGold"));
            btn.classList.add("active", "text-archGold");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                if(filterValue === "all" || card.getAttribute("data-category") === filterValue) {
                    gsap.to(card, { opacity: 1, scale: 1, duration: 0.4, display: "block" });
                } else {
                    gsap.to(card, { opacity: 0, scale: 0.9, duration: 0.4, display: "none" });
                }
            });
        });
    });

    // 8. Testimonials Carousel Engine (Swiper.js Framework)
    new Swiper(".testimonialSwiper", {
        loop: true,
        autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        spaceBetween: 30,
        speed: 800
    });

    // 9. Premium Dual Theme Switcher Logic Matrix
    const themeToggleBtn = document.getElementById("theme-toggle");
    const mobileThemeToggleBtn = document.getElementById("mobile-theme-toggle");
    const body = document.body;

    const performToggleTheme = () => {
        body.classList.toggle("dark");
        const isDark = body.classList.contains("dark");
        const targetIconClass = isDark ? "fas fa-sun" : "fas fa-moon";
        
        document.getElementById("theme-icon").className = targetIconClass;
        if(mobileThemeToggleBtn.querySelector("i")) {
            mobileThemeToggleBtn.querySelector("i").className = targetIconClass;
        }
    };

    if(themeToggleBtn) themeToggleBtn.addEventListener("click", performToggleTheme);
    if(mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener("click", performToggleTheme);

    // 10. Drawer Mobile Navigation Layout Manager
    const hamburger = document.getElementById("hamburger");
    const closeMenu = document.getElementById("close-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

    hamburger.addEventListener("click", () => mobileMenu.classList.remove("translate-x-full"));
    closeMenu.addEventListener("click", () => mobileMenu.classList.add("translate-x-full"));
    mobileNavLinks.forEach(lnk => lnk.addEventListener("click", () => mobileMenu.classList.add("translate-x-full")));

    // 11. Core Canvas Structural Geometric Particles (Particles.js configuration)
    if(document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 30, "density": { "enable": true, "value_area": 1000 } },
                "color": { "value": ["#D4AF37", "#666666"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.25, "random": true },
                "size": { "value": 1.5 },
                "line_linked": { "enable": true, "distance": 180, "color": "#8B5A2B", "opacity": 0.08, "width": 1 },
                "move": { "enable": true, "speed": 0.8, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" } },
                "modes": { "grab": { "distance": 150, "line_linked": { "opacity": 0.25 } } }
            },
            "retina_detect": true
        });
    }

    // 12. Interactive Contact Form Submission Confirmation Handler
    document.getElementById("architecture-form").addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Terima kasih, Ringkasan brief proyek Anda telah dikirimkan secara aman ke database Aura Atmadja Studio.");
        e.target.reset();
    });
});

// 13. Global Bootstrap Modal Trigger Management Engine for Project Showcase Popups
function openProjectModal(name, location, year, concept, imageUrl) {
    document.getElementById("modalProjectName").innerText = name;
    document.getElementById("modalProjectLocation").innerText = location;
    document.getElementById("modalProjectYear").innerText = year;
    document.getElementById("modalProjectConcept").innerText = concept;
    document.getElementById("modalProjectImage").src = imageUrl;

    const projectModal = new bootstrap.Modal(document.getElementById('projectDetailModal'));
    projectModal.show();
}