// Home page logic lives in index.html and shared shell scripts.
const form = document.querySelector(".newsletter form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = form.querySelector("input").value;

    localStorage.setItem("newsletterEmail", email);

    alert("Thank you for subscribing!");

    form.reset();
  });
}