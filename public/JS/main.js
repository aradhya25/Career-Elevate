document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "./images/mainimage.jpg",
    "./images/mainimage2.jpg",
    "./images/mainimage3.jpg"
];

let currentIndex = 0;
const heroImage = document.getElementById("hero-slider");

function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    heroImage.src = images[currentIndex];
}

setInterval(changeImage, 4000); // Change image every 3 seconds
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu on link click (Event Delegation)
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        mobileMenuBtn.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }

  // Scroll animations using Intersection Observer
  const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach((element) => observer.observe(element));

  // Active navigation link on scroll (Using Debouncing)
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-links a");

  let scrollTimeout;
  const updateActiveNavLink = () => {
    let current = "";
    const scrollY = window.scrollY;
    sections.forEach((section) => {
      if (scrollY >= section.offsetTop - section.clientHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.toggle("active", item.getAttribute("href").slice(1) === current);
    });
  };

  window.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveNavLink, 100);
  });

  // Smooth scroll for anchor links with header offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const href = anchor.getAttribute("href");
      const targetElement = href === "#home" ? document.body : document.querySelector(href);

      if (targetElement) {
        // Adjust the offset value to match your header's height
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Optimized hover effects using CSS classes
  const addHoverEffect = (selector, hoverClass) => {
    document.body.addEventListener("mouseover", (e) => {
      if (e.target.closest(selector)) e.target.closest(selector).classList.add(hoverClass);
    });

    document.body.addEventListener("mouseout", (e) => {
      if (e.target.closest(selector)) e.target.closest(selector).classList.remove(hoverClass);
    });
  };

  addHoverEffect(".btn", "hover-effect");
  addHoverEffect(".service-card", "hover-effect");
});
