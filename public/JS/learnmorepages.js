// Add smooth scrolling for all buttons
// document.querySelectorAll(".cta-button").forEach((button) => {
//   button.addEventListener("click", () => {
//     // In a real application, this would open a booking form or redirect to a booking page
//     alert("Redirecting to enrollment form..");
//   });
// });

// Add hover animation for path cards
document.querySelectorAll(".path-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
    card.style.transition = "transform 0.3s ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// Add intersection observer for fade-in animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});
