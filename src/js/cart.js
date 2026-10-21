import { getLocalStorage, loadHeaderFooter, setLocalStorage, updateCartCount } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const productListEl = document.querySelector(".product-list");
  if (productListEl) {
    productListEl.innerHTML = htmlItems.join("");
  }

  const total = calculateCartTotal(cartItems);
  const totalEl = document.querySelector(".cart-total");
  if (totalEl) totalEl.textContent = `Total: $${total.toFixed(2)}`;

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      removeItem(button.dataset.id);
    });
  });
}


function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>

  <button class="remove-item" data-id="${item.Id}">
    Remove
  </button>
</li>`;

  return newItem;
}
function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => total + Number(item.FinalPrice || 0), 0);
}

function removeItem(productId) {
  const cartItems = getLocalStorage("so-cart") || [];

  const updatedCart = cartItems.filter((item) => item.Id !== productId);

  setLocalStorage("so-cart", updatedCart);
  updateCartCount();

  renderCartContents();
}
renderCartContents();