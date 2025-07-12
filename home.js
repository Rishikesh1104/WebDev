// === script.js ===

document.querySelectorAll(".rating-section input").forEach(input => {
  input.addEventListener("input", function () {
    const value = parseFloat(this.value);
    const span = this.nextElementSibling;
    span.textContent = isNaN(value) ? "/ 5" : `⭐ ${value} / 5`;
  });
});