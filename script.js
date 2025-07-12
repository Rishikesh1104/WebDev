const formTitle = document.getElementById("form-title");
const emailGroup = document.getElementById("email-group");
const submitBtn = document.getElementById("submit-btn");
const toggleText = document.querySelector(".toggle-text");

let isSignup = false;

// Event delegation: listen on the container, not the link
toggleText.addEventListener("click", (e) => {
  if (e.target.id === "toggle-link") {
    isSignup = !isSignup;

    formTitle.textContent = isSignup ? "Signup" : "Login";
    submitBtn.textContent = isSignup ? "Signup" : "Login";
    emailGroup.style.display = isSignup ? "block" : "none";

  toggleText.innerHTML = isSignup
    ? 'Already have an account? <span id="toggle-link">Login</span>'
    : 'Don\'t have an account? <span id="toggle-link">Signup</span>';
  }
});

// (CSS code removed; keep only JavaScript in this file)