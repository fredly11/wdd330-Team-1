import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  product = await findProductById(productId);
  
  if (product) {
    renderProductDetails();
    document.getElementById("addToCart").addEventListener("click", addToCart);
  } else {
    console.error("Product not found");
  }
}

function renderProductDetails() {
  document.getElementById("productName").innerText = product.Brand.Name;
  document.getElementById("productNameWithoutBrand").innerText = product.NameWithoutBrand;
  
  const imgElement = document.getElementById("productImage");
  imgElement.src = product.Image;
  imgElement.alt = product.Name;
  
  document.getElementById("productFinalPrice").innerText = `$${product.FinalPrice}`;
  
  if (product.Colors && product.Colors.length > 0) {
    document.getElementById("productColorName").innerText = product.Colors[0].ColorName;
  }
  
  document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id", product.Id);
}

function addToCart() {
  let cartItems = getLocalStorage("so-cart") || [];
  
  if (!Array.isArray(cartItems)) {
    cartItems = [cartItems];
  }
  
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}
