// === Swiper ===
function initSwiper() {
    if (document.querySelector(".mySwiper")) {
      new Swiper(".mySwiper", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        autoplay: { delay: 2000, disableOnInteraction: false },
        breakpoints: {
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        },
      });
    }
  }
  
  // === Counters ===
  function initCounters() {
    const section = document.querySelector(".stats-section");
    if (!section) return;
  
    const options = { duration: 5 };
    const counter1 = new countUp.CountUp("counter1", 2000, options);
    const counter2 = new countUp.CountUp("counter2", 10, options);
    const counter3 = new countUp.CountUp("counter3", 800, options);
    const counter4 = new countUp.CountUp("counter4", 1000000, options);
  
    function animateCounters() {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        counter1.start();
        counter2.start();
        counter3.start();
        counter4.start();
        window.removeEventListener("scroll", animateCounters);
      }
    }
  
    window.addEventListener("scroll", animateCounters);
  }
  
  // === AOS ===
  function initAOS() {
    if (window.AOS) {
      AOS.init({
        duration: 1200,
        once: true,
      });
    }
  }
  
  // === Lenis Smooth Scroll ===
  function initLenis() {
    if (window.Lenis) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 5),
        smoothWheel: true,
      });
  
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }
  
  // === Navbar Toggle ===
  function initNavbar() {
    const logoBtn = document.getElementById("logo-btn");
    const navbar = document.getElementById("navbar");
  
    if (logoBtn && navbar) {
      logoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navbar.classList.toggle("expanded");
      });
  
      document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target)) {
          navbar.classList.remove("expanded");
        }
      });
    }
  }
  
  // === Services Hover Effect ===
  function initServicesHover() {
    const serviceItems = document.querySelectorAll(".service-item");
    const mainImg = document.querySelector(".main-img");
  
    if (serviceItems.length && mainImg) {
      serviceItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          serviceItems.forEach((el) => el.classList.remove("active"));
          item.classList.add("active");
  
          const newSrc = item.getAttribute("data-img");
          if (mainImg.getAttribute("src") !== newSrc) {
            mainImg.classList.add("fade-out");
            setTimeout(() => {
              mainImg.setAttribute("src", newSrc);
              mainImg.classList.remove("fade-out");
            }, 300);
          }
        });
      });
    }
  }
  
  // === Contact Form ===
  function initContactForm() {
    const form = document.getElementById("contactForm");
    const btn = document.getElementById("submitBtn");
  
    if (!form || !btn) return;
  
    const btnText = btn.querySelector(".btn-text");
    const btnLoading = btn.querySelector(".btn-loading");
    let submitted = false;
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // منع Reload الصفحة
      submitted = true;
      btn.disabled = true;
      btnText.style.display = "none";
      btnLoading.style.display = "inline-flex";
  
      setTimeout(() => {
        if (submitted) {
          form.reset();
          btn.disabled = false;
          btnText.style.display = "inline";
          btnLoading.style.display = "none";
          submitted = false;
  
          if (window.Swal) {
            Swal.fire({
              icon: "success",
              title: "Thank you for your message!",
              text: "We will get back to you as soon as possible.",
              background: "black",
              borderColor: "#2b2b2b",
              color: "white",
              showConfirmButton: false,
              timer: 3000,
            });
          }
        }
      }, 1500);
    });
  }
  
  // === Hero Image Lazy Load ===
  function initHeroImage() {
    const heroImg = document.querySelector(".hero-bg");
    if (!heroImg) return;
  
    const fullRes = heroImg.getAttribute("data-src");
    if (!fullRes) return;
  
    const img = new Image();
    img.src = fullRes;
    img.onload = () => {
      heroImg.src = fullRes;
      heroImg.classList.add("loaded");
    };
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    initSwiper();
    initCounters();
    initAOS();
    initLenis();
    initNavbar();
    initServicesHover();
    initContactForm();
    initHeroImage();
  });