document.addEventListener("DOMContentLoaded", function () {
  // 1. Sticky Navbar & Back to Top Button
  const navbar = document.querySelector(".navbar");
  const backToTop = document.getElementById("backToTop");
  const topHeaderElements = document.querySelector(".top-header");
  let topHeaderHeight = topHeaderElements ? topHeaderElements.offsetHeight : 0;

  // window.addEventListener("scroll", function () {
  //   if (window.scrollY > topHeaderHeight) {
  //     navbar.classList.add("sticky");
  //   } else {
  //     navbar.classList.remove("sticky");
  //   }


  //   if (window.scrollY > 300) {
  //     backToTop.classList.add("active");
  //   } else {
  //     backToTop.classList.remove("active");
  //   }
  // });

  // 2. Back to Top Click Action
  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 3. Smooth Scrolling for Anchor Links inside nav
  document.querySelectorAll('a.nav-link[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // 4. Voucher Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const filterItems = document.querySelectorAll(".filter-item");

  if (filterBtns.length > 0 && filterItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active from all
        filterBtns.forEach((b) => b.classList.remove("active", "btn-primary"));
        filterBtns.forEach((b) => b.classList.add("btn-outline-primary"));

        // Add active to clicked
        btn.classList.add("active", "btn-primary");
        btn.classList.remove("btn-outline-primary");

        const filterValue = btn.getAttribute("data-filter");

        filterItems.forEach((item) => {
          if (
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
          ) {
            item.style.display = "block";
            // simple animation
            item.style.animation = "scaleUp 0.3s ease-in-out";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // 5. Mega Menu — Two-Panel Hover Functionality
  const certNavItems = document.querySelectorAll(".cert-nav-item");
  const certPanels = document.querySelectorAll(".cert-panel");

  if (certNavItems.length > 0 && certPanels.length > 0) {
    // Determine interaction type based on viewport
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

      // Prevent link click inside mega menu left nav (only hover to preview)
      item.querySelector("a").addEventListener("click", function (e) {
        // On desktop, prevent default so hover just previews the panel
        // User can still navigate via the right-panel course links
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
        // On mobile, scroll to the content panel so the user sees the courses
        targetPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        // On desktop, trigger the slide-in animation
        void targetPanel.offsetWidth;
        targetPanel.style.animation = "panelSlideIn 0.3s ease forwards";
      }
    }
  }



  // 7. Mega Menu Behavior Fixes (One at a time, Click outside)
  const allDropdowns = document.querySelectorAll(".nav-item.dropdown");
  const allDropdownMenus = document.querySelectorAll(".dropdown-menu");

  // Function to close all dropdowns
  // function closeAllDropdowns() {
  //   allDropdowns.forEach((dropdown) => {
  //     dropdown.classList.remove("show");
  //     const menu = dropdown.querySelector(".dropdown-menu");
  //     if (menu) menu.classList.remove("show");
  //   });
  // }

  // allDropdowns.forEach((dropdown) => {
  //   const toggle = dropdown.querySelector(".dropdown-toggle");

  //   toggle.addEventListener("click", function (e) {
  //     if (window.innerWidth < 992) {
  //       e.preventDefault();
  //       e.stopPropagation();

  //       const isOpen = dropdown.classList.contains("show");


  //       closeAllDropdowns();


  //       if (!isOpen) {
  //         dropdown.classList.add("show");
  //         const menu = dropdown.querySelector(".dropdown-menu");
  //         if (menu) menu.classList.add("show");
  //       }
  //     }
  //   });


  //   dropdown.addEventListener("mouseenter", function () {
  //     if (window.innerWidth >= 992) {

  //     }
  //   });
  // });


  // document.addEventListener("click", function (e) {
  //   if (!e.target.closest(".nav-item.dropdown")) {
  //     closeAllDropdowns();
  //   }
  // });

  // allDropdownMenus.forEach((menu) => {
  //   menu.addEventListener("mouseenter", function () {
  //     const parent = this.closest(".dropdown");
  //     if (parent) parent.classList.add("show");
  //   });
  // });


  const naTabs = document.querySelectorAll(".na-tab");
  const naCardItems = document.querySelectorAll(".na-card-item");

  if (naTabs.length > 0 && naCardItems.length > 0) {
    naTabs.forEach((tab) => {
      tab.addEventListener("click", function () {

        naTabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        const filter = this.getAttribute("data-filter");

        naCardItems.forEach((card) => {
          const category = card.getAttribute("data-category");
          if (filter === "all" || category === filter) {
            card.style.display = "";

            card.style.animation = "none";
            void card.offsetWidth;
            card.style.animation = "naCardReveal 0.4s ease forwards";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
});

// Add keyframes for filtering animation dynamically
const style = document.createElement("style");
style.innerHTML = `
@keyframes scaleUp {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
`;
document.head.appendChild(style);

$(".testimonial-slider").owlCarousel({
  loop: true,
  margin: 30,
  nav: false,
  dots: false,
  autoplay: true,
  autoplayTimeout: 4000,
  smartSpeed: 900,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    1200: {
      items: 3,
    },
  },
});
$(".certification-slider").owlCarousel({
  loop: true,
  margin: 25,
  //   padding: 20,
  nav: true,
  dots: true,
  autoplay: false,
  autoplayTimeout: 3500,
  smartSpeed: 800,
  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    1200: {
      items: 4,
    },
  },
});
$(".voucher-slider").owlCarousel({
  loop: true,
  margin: 30,
  nav: false,
  dots: false,
  autoplay: false,
  // autoplayTimeout: 1,
  autoplaySpeed: 10000,
  smartSpeed: 10000,
  slideTransition: "linear",
  autoplayHoverPause: false,
  responsive: {
    0: { items: 1 },
    576: { items: 1 },
    768: { items: 2 },
    992: { items: 3 },
    1200: { items: 4 },
  },
});
$("#newArrivalCarousel").owlCarousel({
  loop: true,
  margin: 30,
  nav: false,
  dots: false,
  autoplay: true,
  // autoplayTimeout: 1,
  autoplaySpeed: 10000,
  smartSpeed: 10000,
  slideTransition: "linear",
  autoplayHoverPause: false,
  responsive: {
    0: { items: 1 },
    576: { items: 1 },
    768: { items: 2 },
    992: { items: 3 },
    1200: { items: 4 },
  },
});

$("#careerPathOwlCarousel").owlCarousel({
  loop: true,
  margin: 20,
  autoplay: false,
  autoplayTimeout: 4000,
  autoplayHoverPause: true,
  dots: true,
  responsive: {
    0: { items: 1 },
    768: { items: 2 },
    1000: { items: 3 },
  },
});

$("#brandsReview").owlCarousel({
  loop: true,
  margin: 20,
  autoplay: true,
  autoplayTimeout: 4000,
  autoplayHoverPause: true,
  dots: true,
  responsive: {
    0: { items: 1 },
    768: { items: 2 },
    1000: { items: 2 },
  },
});



/* -----------------------------
LENIS
----------------------------- */

const lenis = new Lenis({

  duration: 1.8,

  lerp: 0.08,

  wheelMultiplier: 0.9,

  smoothWheel: true,

  smoothTouch: true
});

function raf(time) {

  lenis.raf(time);

  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);



AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-in-out",
});

// SIMPLE COUNTER

// const counters = document.querySelectorAll(".counter");

// counters.forEach((counter) => {
//   counter.innerText = "0";

//   const updateCounter = () => {
//     const target = +counter.getAttribute("data-target") || +counter.innerText;
//     const current = +counter.innerText;
//     const increment = target / 80;

//     if (current < target) {
//       counter.innerText = `${Math.ceil(current + increment)}`;
//       setTimeout(updateCounter, 30);
//     } else {
//       counter.innerText = target;
//     }
//   };

//   const finalValue = counter.innerText;
//   counter.setAttribute("data-target", finalValue);

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         updateCounter();
//         observer.unobserve(counter);
//       }
//     });
//   });

//   observer.observe(counter);
// });