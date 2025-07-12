const formTitle = document.getElementById("form-title");
const toggleLink = document.getElementById("toggle-link");
const emailGroup = document.getElementById("email-group");
const submitBtn = document.getElementById("submit-btn");

let isSignup = false;

// Toggle between Login and Signup
toggleLink.addEventListener("click", () => {
  isSignup = !isSignup;

  if (isSignup) {
    formTitle.textContent = "Signup";
    emailGroup.style.display = "block";
    submitBtn.textContent = "Signup";
    toggleLink.textContent = "Login";
  } else {
    formTitle.textContent = "Login";
    emailGroup.style.display = "none";
    submitBtn.textContent = "Login";
    toggleLink.textContent = "Signup";
  }
});

// Form Submit
document.getElementById("auth-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  if (isSignup) {
    if (!email) {
      alert("Email is required for signup");
      return;
    }

    // Save user info (you can enhance this to save password/email securely later)
    localStorage.setItem("loggedInUser", username);
    localStorage.setItem("userEmail", email);
    alert("Signup successful!");
    window.location.href = "index.html";
  } else {
    // Just log in and redirect
    localStorage.setItem("loggedInUser", username);
    window.location.href = "profile.html";
  }
});