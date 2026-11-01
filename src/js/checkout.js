import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

// Load header and footer dynamically
loadHeaderFooter();

// Initialize the checkout process with the cart key and the summary container selector
checkoutProcess.init("so-cart", "#checkout-summary");

// Calculate order total when the user leaves the zip code input field (blur event)
document
  .querySelector("#zip")
  .addEventListener("blur", checkoutProcess.calculateOrdertotal.bind(checkoutProcess));

// Listen to the form submit event to send the order data to the server
document.querySelector("#checkout").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const myForm = document.forms["checkout"];
  // Validate the form natively and process checkout if valid
  if (myForm.checkValidity()) {
    checkoutProcess.checkout(myForm);
  } else {
    myForm.reportValidity();
  }
});