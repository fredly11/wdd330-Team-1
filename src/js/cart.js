import { getLocalStorage, loadHeaderFooter } from "./utils.mjs"; // Ajusta la ruta a ../utils.mjs si está dentro de una subcarpeta como /cart/

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || []; // Prevenir error si el carrito está vacío
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  const productListEl = document.querySelector(".product-list");
  if (productListEl) {
    productListEl.innerHTML = htmlItems.join("");
  }
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
</li>`;

  return newItem;
}

renderCartContents();