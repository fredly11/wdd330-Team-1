import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

let currentProduct = null;

function renderProductDetails(product) {
  if (!product) return;
  qs("#productName").textContent = product.Brand?.Name || product.Name || "";
  qs("#productNameWithoutBrand").textContent = product.NameWithoutBrand || "";

  // adjust image path if necessary
  let img = product.Image || "";
  if (img.startsWith("..")) img = img.replace("..", "");
  const imageEl = qs("#productImage");
  imageEl.src = img;
  imageEl.alt = product.Name || "product image";

  qs("#productFinalPrice").textContent = `$${product.FinalPrice}`;
  qs("#productColorName").textContent = product.Colors?.[0]?.ColorName || "";
  qs("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple || "";

  const addBtn = qs("#addToCart");
  if (addBtn) addBtn.dataset.id = product.Id || "";
}

async function addToCart(e) {
  const id = e?.target?.dataset?.id;
  if (!id) return;
  const product = await findProductById(id);
  if (!product) return;

  let cart = getLocalStorage("so-cart");
  if (!Array.isArray(cart)) {
    cart = cart ? [cart] : [];
  }
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

export default async function productDetails(productId) {
  if (!productId) return;
  currentProduct = await findProductById(productId);
  renderProductDetails(currentProduct);

  const addBtn = qs("#addToCart");
  if (addBtn) {
    addBtn.addEventListener("click", addToCart);
  }
}

export { renderProductDetails, addToCart };
