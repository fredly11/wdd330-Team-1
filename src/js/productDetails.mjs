import { findProductById } from "./productData.mjs";
import { getLocalStorage, setLocalStorage, qs, updateCartCount } from "./utils.mjs";

let currentProduct = null;

function showProductError(message = "Sorry, this product could not be found.") {
  const detailSection = qs(".product-detail");
  if (!detailSection) return;

  const addContainer = qs(".product-detail__add", detailSection);
  if (addContainer) addContainer.style.display = "none";

  const fieldsToClear = [
    "#productName",
    "#productNameWithoutBrand",
    "#productFinalPrice",
    "#productColorName",
    "#productDescriptionHtmlSimple",
  ];

  fieldsToClear.forEach((selector) => {
    const el = qs(selector, detailSection);
    if (el) el.textContent = "";
  });

  const imageEl = qs("#productImage", detailSection);
  if (imageEl) {
    imageEl.removeAttribute("src");
    imageEl.alt = "";
    imageEl.style.display = "none";
  }

  let errorEl = qs("#productError", detailSection);
  if (!errorEl) {
    errorEl = document.createElement("p");
    errorEl.id = "productError";
    errorEl.className = "product-error";
    detailSection.appendChild(errorEl);
  }

  errorEl.textContent = message;
}

function renderProductDetails(product) {
  if (!product) return;
  qs("#productName").textContent = product.Name || "";
  qs("#productNameWithoutBrand").textContent = product.NameWithoutBrand || "";

  const img = product.Images?.PrimaryLarge || product.Image || "";
  const imageEl = qs("#productImage");
  imageEl.src = img;
  imageEl.alt = product.Name || "product image";

  qs("#productFinalPrice").textContent = `$${product.FinalPrice}`;
  qs("#productColorName").textContent = product.Colors?.[0]?.ColorName || "";
  qs("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple || "";

  const addBtn = qs("#addToCart");
  if (addBtn) addBtn.dataset.id = product.Id || "";

  const detailSection = qs(".product-detail");
  const errorEl = detailSection ? qs("#productError", detailSection) : null;
  if (errorEl) errorEl.remove();

  const addContainer = detailSection ? qs(".product-detail__add", detailSection) : null;
  if (addContainer) addContainer.style.display = "";

  if (imageEl) imageEl.style.display = "";
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
  updateCartCount(true);
}

export default async function productDetails(productId) {
  if (!productId) {
    showProductError("No product was specified.");
    return;
  }
  currentProduct = await findProductById(productId);
  if (!currentProduct) {
    showProductError("Sorry, that product does not exist.");
    return;
  }

  renderProductDetails(currentProduct);

  const addBtn = qs("#addToCart");
  if (addBtn) {
    addBtn.addEventListener("click", addToCart);
  }
}

export { renderProductDetails, addToCart };