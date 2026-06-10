document.addEventListener("DOMContentLoaded", function () {
  // 1. Back to Top Button Setup
  const backToTop = document.getElementById("backToTop");

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
  margin: 20,
  autoplay: true,
  autoplayTimeout: 4000,
  smartSpeed: 2000,
  center: true,
  autoplayHoverPause: true,
  dots: false,


  responsive: {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
    1200: {
      items: 2,
    },
  },
});
$(".certification-slider").owlCarousel({
  loop: true,
  margin: 25,
  //   padding: 20,
  nav: true,
  dots: false,
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
  nav: true,
  dots: false,
  autoplay: false,

  autoplayTimeout: 3500,
  smartSpeed: 800,
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


// $("#careerPathOwlCarousel").owlCarousel({
//   loop: true,
//   margin: 20,
//   autoplay: false,
//   autoplayTimeout: 4000,
//   autoplayHoverPause: true,
//   dots: true,
//   responsive: {
//     0: { items: 1 },
//     768: { items: 2 },
//     1000: { items: 3 },
//   },
// });
$("#trainingPathOwlCarousel").owlCarousel({
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

$(".brands_review").owlCarousel({
  loop: true,
  margin: 20,
  autoplay: true,
  autoplayTimeout: 4000,
  smartSpeed: 2000,
  center: true,
  autoplayHoverPause: true,
  dots: true,
  responsive: {
    0: { items: 1 },
    768: { items: 2 },
    1200: { items: 2 },
  },
});


const trustedSlider = $(".trusted-brands-slider");

trustedSlider.owlCarousel({
  loop: true,
  autoplay: true,
  autoplaySpeed: 10000,
  smartSpeed: 10000,
  slideTransition: "linear",
  autoplayHoverPause: true,
  dots: false,
  nav: false,
  margin: 20,
  smartSpeed: 800,
  responsive: {
    0: { items: 2 },
    576: { items: 3 },
    768: { items: 4 },
    992: { items: 5 },
    1200: { items: 6 }
  }
});

/* -----------LENIS--------- */
const lenis = new Lenis({
  duration: 1.8,

  lerp: 0.08,

  wheelMultiplier: 0.9,

  smoothWheel: true,

  smoothTouch: true,
});

function raf(time) {
  lenis.raf(time);

  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
lenis.on("scroll", ScrollTrigger.update);
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




