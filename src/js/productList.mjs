import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const cleanImage = (product.Image || "").replace(/^\.\.\//, "");
  const imageSrc = `/${cleanImage}`;
  const brand = (product.Brand && product.Brand.Name) || "";
  const name = product.NameWithoutBrand || product.Name || "";
  const price = typeof product.FinalPrice === "number" ? product.FinalPrice.toFixed(2) : product.FinalPrice;
  return `<li class="product-card"><a href="product_pages/index.html?product=${product.Id}"><img src="${imageSrc}" alt="Image of ${name}" /><h3 class="card__brand">${brand}</h3><h2 class="card__name">${name}</h2><p class="product-card__price">$${price}</p></a></li>`;
}

function filterProducts(list) {
  const ids = ["880RR", "985RF", "985PR", "344YJ"];
  return list.filter((p) => ids.includes(p.Id));
}

export default async function productList(category = "tents", selector = ".product-list") {
  const products = await getData(category);
  const filtered = filterProducts(products || []);
  const parent = document.querySelector(selector);
  if (parent) renderListWithTemplate(productCardTemplate, parent, filtered);
  return filtered;
}

export { productCardTemplate };