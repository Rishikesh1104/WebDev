// === script.js ===

document.querySelectorAll(".rating-section input").forEach(input => {
  input.addEventListener("input", function () {
    const value = parseFloat(this.value);
    const span = this.nextElementSibling;
    span.textContent = isNaN(value) ? "/ 5" : `⭐ ${value} / 5`;
  });
});

// SEARCH FUNCTION
document.querySelector("input[type='text']").addEventListener("keyup", () => {
  const searchValue = document.querySelector("input[type='text']").value.toLowerCase();
  const profileCards = document.querySelectorAll(".profile-card");

  profileCards.forEach((card) => {
    const skillText = card.querySelector(".skills").textContent.toLowerCase();
    const nameText = card.querySelector("h3").textContent.toLowerCase(); // grabbing the name (e.g., Neha)

    if (skillText.includes(searchValue) || nameText.includes(searchValue)) {
      card.style.display = "flex"; 
    } else {
      card.style.display = "none";
    }
  });
});

