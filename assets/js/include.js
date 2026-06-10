/**
 * Dynamic Navbar & Footer Loader
 * Loads shared navbar.html and footer.html on static pages
 */

document.addEventListener("DOMContentLoaded", () => {
    // CORS Diagnostic for local testing (file:// protocol)
    if (window.location.protocol === "file:") {
        const warning = document.createElement("div");
        warning.style.cssText = "background: #e74c3c; color: white; padding: 12px 20px; text-align: center; font-family: system-ui, -apple-system, sans-serif; font-size: 14px; position: fixed; top: 0; left: 0; right: 0; z-index: 99999; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: flex; align-items: center; justify-content: center; gap: 12px;";
        warning.innerHTML = "<span>⚠️ <strong>Local File Protocol (file://) Detected:</strong> Browsers restrict dynamic fetching due to CORS security. Please run a local web server (e.g., VS Code <strong>Live Server</strong> extension or run <code>npx serve</code> in the project folder) to view the Navbar and Footer correctly.</span><button onclick='this.parentElement.remove()' style='background: rgba(255,255,255,0.25); border: none; color: white; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px; font-weight: bold;'>Dismiss</button>";
        document.body.prepend(warning);
        document.body.style.paddingTop = "48px";
    }

    // 1. Load Navbar
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    if (navbarPlaceholder) {
        fetch("navbar.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load navbar.html");
                return response.text();
            })
            .then(html => {
                navbarPlaceholder.innerHTML = html;
                initializeNavbar();
            })
            .catch(error => {
                console.error("Error loading navbar:", error);
            });
    }

    // 2. Load Footer
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
        fetch("footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Failed to load footer.html");
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.error("Error loading footer:", error);
            });
    }
});

function initializeNavbar() {
    // A. Highlight Active Link based on URL
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';

    const navLinks = document.querySelectorAll(".navbar-nav .nav-link, .mega-menu-links a");
    let exactMatched = false;

    // First attempt: Exact match
    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === page) {
            link.classList.add("active");
            exactMatched = true;

            // Highlight parent if inside a dropdown
            const parentDropdown = link.closest(".dropdown");
            if (parentDropdown) {
                const toggle = parentDropdown.querySelector(".dropdown-toggle");
                if (toggle) toggle.classList.add("active");
            }
        }
    });

    // Second attempt: Category-based fallback if no exact match (e.g. nested brand pages or detail views)
    if (!exactMatched) {
        const isTrainingPage = page.includes("training") || page === "detail.html";
        const isVoucherPage = page.includes("voucher");

        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (isTrainingPage && href === "training-list.html") {
                link.classList.add("active");
            } else if (isVoucherPage && href === "vouchers-list.html") {
                link.classList.add("active");
            }
        });
    }

    // B. Sticky Navbar Scroll Listener
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        const topHeader = document.querySelector(".top-header");
        let topHeaderHeight = topHeader ? topHeader.offsetHeight : 0;

        window.addEventListener("scroll", () => {
            if (window.scrollY > (topHeaderHeight || 50)) {
                navbar.classList.add("sticky");
            } else {
                navbar.classList.remove("sticky");
            }
        });
    }

    // C. Mega Menu — Two-Panel Hover/Click Functionality for Mobile & Desktop
    const certNavItems = document.querySelectorAll(".cert-nav-item");
    const certPanels = document.querySelectorAll(".cert-panel");

    if (certNavItems.length > 0 && certPanels.length > 0) {
        const isMobile = () => window.innerWidth < 992;

        certNavItems.forEach((item) => {
            // Hover event for desktop
            item.addEventListener("mouseenter", function () {
                if (!isMobile()) {
                    switchPanel(this);
                }
            });

            // Click event for mobile (prevent navigation, just switch panel)
            item.addEventListener("click", function (e) {
                if (isMobile()) {
                    e.preventDefault();
                    e.stopPropagation();
                    switchPanel(this);
                }
            });

            // Prevent link click inside mega menu left nav (only hover/click to preview)
            item.querySelector("a").addEventListener("click", function (e) {
                if (!isMobile()) {
                    e.preventDefault();
                }
            });
        });

        function switchPanel(activeItem) {
            const targetId = activeItem.getAttribute("data-target");
            const targetPanel = document.getElementById(targetId);
            if (!targetPanel || activeItem.classList.contains("active")) return;

            // Update left nav active state
            certNavItems.forEach((nav) => nav.classList.remove("active"));
            activeItem.classList.add("active");

            // Switch right panel
            certPanels.forEach((panel) => {
                panel.classList.remove("active");
                panel.style.animation = "none";
            });

            targetPanel.classList.add("active");

            if (isMobile()) {
                targetPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
            } else {
                void targetPanel.offsetWidth; // Trigger reflow
                targetPanel.style.animation = "panelSlideIn 0.3s ease forwards";
            }
        }
    }
}
