// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getCartCount() {
  const cart = getLocalStorage("so-cart");
  if (!cart) return 0;
  return Array.isArray(cart) ? cart.length : 1;
}

export function animateCartIcon() {
  const cartLink = qs(".cart a");
  if (!cartLink) return;

  cartLink.classList.remove("cart-link--bounce");
  // force reflow so animation can be retriggered
  void cartLink.offsetWidth;
  cartLink.classList.add("cart-link--bounce");

  window.setTimeout(() => {
    cartLink.classList.remove("cart-link--bounce");
  }, 450);
}

export function updateCartCount(animate = false) {
  const cartLink = qs(".cart a");
  if (!cartLink) return;

  let badge = qs(".cart-count", cartLink);
  if (!badge) {
    badge = document.createElement("span");
    badge.className = "cart-count";
    badge.setAttribute("aria-live", "polite");
    badge.setAttribute("aria-label", "Items in cart");
    cartLink.appendChild(badge);
  }

  const count = getCartCount();
  if (count > 0) {
    badge.textContent = String(count);
    badge.classList.add("is-visible");
  } else {
    badge.textContent = "";
    badge.classList.remove("is-visible");
  }

  if (animate) animateCartIcon();
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get a param from the current page's URL (e.g. ?product=880RR)
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  if (clear) parentElement.innerHTML = "";
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export async function renderWithTemplate(templateFn, parentElement, data = null, position = "afterbegin", clear = true, callback) {
  if (clear) parentElement.innerHTML = "";
  let html;
  if (typeof templateFn === "function") {
    const res = templateFn(data);
    html = res && typeof res.then === "function" ? await res : res;
  } else {
    html = templateFn;
  }
  parentElement.insertAdjacentHTML(position, html || "");
  if (callback && typeof callback === "function") callback();
}

export function loadTemplate(path) {
  return async function () {
    const res = await fetch(path);
    if (res.ok) return await res.text();
    return "";
  };
}

export async function loadHeaderFooter() {
  const headerFn = loadTemplate("/partials/header.html");
  const footerFn = loadTemplate("/partials/footer.html");
  const headerEl = document.querySelector("#main-header");
  const footerEl = document.querySelector("#main-footer");
  if (headerEl) {
    const html = await headerFn();
    if (html) headerEl.innerHTML = html;
  }
  if (footerEl) {
    const html = await footerFn();
    if (html) footerEl.innerHTML = html;
  }

  updateCartCount();
}
