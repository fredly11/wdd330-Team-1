import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);
  
  renderProductDetails();
  
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  let cart = getLocalStorage("so-cart");
  if (!Array.isArray(cart)) {
    cart = [];
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

function renderProductDetails() {
  document.getElementById("productName").innerText = product.Brand.Name;
  document.getElementById("productNameWithoutBrand").innerText = product.NameWithoutBrand;
  document.getElementById("productImage").src = product.Image;
  document.getElementById("productImage").alt = product.Name;
  document.getElementById("productFinalPrice").innerText = `$${product.FinalPrice}`;
  document.getElementById("productColorName").innerText = product.Colors[0].ColorName;
  document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.getElementById("addToCart").dataset.id = product.Id;
}