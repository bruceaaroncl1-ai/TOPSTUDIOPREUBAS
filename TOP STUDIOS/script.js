console.log("TOP STUDIOS cargado");
console.log("TOP STUDIOS website loaded");

const cards = document.querySelectorAll(".card, .price-card, .pricing-box, .equipment div");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

cards.forEach(card => {
  card.classList.add("hidden");
  observer.observe(card);
});