// Home page logic lives in index.html and shared shell scripts.
const form = document.querySelector(".newsletter form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.querySelector('input[type="email"]').value;

    localStorage.setItem("newsletterEmail", email);
    localStorage.setItem("registeredUser", "true");

    alert("Thank you for subscribing!");
    const banner = document.querySelector("#register-banner");

    if (banner) {
       banner.style.display = "none";
} 
    form.reset();
  });
}

const banner = document.querySelector("#register-banner");

if (banner && localStorage.getItem("registeredUser")) {
  banner.style.display = "none";
}