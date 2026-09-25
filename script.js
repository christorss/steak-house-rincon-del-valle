document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const tabBtns = document.querySelectorAll(".tab-btn");
    const menuGrids = document.querySelectorAll(".menu-grid");
    const menuTabs = document.querySelector(".menu-tabs");
    const animatedElements = document.querySelectorAll(".fade-in-up, .fade-in, .slide-in-left, .slide-in-right");

    const setScrolledState = () => {
        navbar?.classList.toggle("scrolled", window.scrollY > 36);
    };

    setScrolledState();
    window.addEventListener("scroll", setScrolledState, { passive: true });

    const closeMobileMenu = () => {
        hamburger?.classList.remove("active");
        navLinks?.classList.remove("active");
        document.body.classList.remove("menu-open");
        hamburger?.setAttribute("aria-expanded", "false");
    };

    hamburger?.setAttribute("aria-label", "Abrir navegacion");
    hamburger?.setAttribute("aria-expanded", "false");
    hamburger?.addEventListener("click", () => {
        const isOpen = hamburger.classList.toggle("active");
        navLinks?.classList.toggle("active", isOpen);
        document.body.classList.toggle("menu-open", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    navItems.forEach((link) => link.addEventListener("click", closeMobileMenu));

    const scrollToMenuStart = (menuGrid) => {
        const firstItem = menuGrid?.querySelector(".menu-item");
        if (!menuTabs || !firstItem) return;

        const navbarHeight = navbar?.getBoundingClientRect().height || 0;
        const selectorHeight = menuTabs.getBoundingClientRect().height;
        const breathingRoom = window.innerWidth <= 760 ? 12 : 18;
        const firstItemTop = window.scrollY + firstItem.getBoundingClientRect().top;
        const targetPosition = Math.max(0, firstItemTop - navbarHeight - selectorHeight - breathingRoom);

        window.scrollTo({
            top: targetPosition,
            behavior: "auto"
        });
    };

    tabBtns.forEach((btn) => {
        btn.setAttribute("aria-controls", btn.dataset.target || "");
        btn.setAttribute("aria-selected", btn.classList.contains("active") ? "true" : "false");

        btn.addEventListener("click", () => {
            const target = btn.dataset.target;

            tabBtns.forEach((button) => {
                button.classList.remove("active");
                button.setAttribute("aria-selected", "false");
            });

            menuGrids.forEach((grid) => grid.classList.remove("active"));

            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");
            const activeGrid = document.getElementById(target);
            activeGrid?.classList.add("active");

            window.setTimeout(() => scrollToMenuStart(activeGrid), 80);
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -60px 0px"
    });

    animatedElements.forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navItems.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, {
        threshold: 0.42
    });

    document.querySelectorAll("section[id], footer[id]").forEach((section) => sectionObserver.observe(section));
});
