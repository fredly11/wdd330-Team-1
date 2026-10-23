import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const imageSrc = product.Images?.PrimaryMedium || product.Image || "";
  const brand = (product.Brand && product.Brand.Name) || "";
  const name = product.NameWithoutBrand || product.Name || "";
  const price = typeof product.FinalPrice === "number" ? product.FinalPrice.toFixed(2) : product.FinalPrice;
  const discount = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
  return `<li class="product-card"><a href="/product_pages/index.html?product=${product.Id}"><img src="${imageSrc}" alt="Image of ${name}" /><h3 class="card__brand">${brand}</h3><h2 class="card__name">${name}</h2><p class="product-card__price">$${price} (Save $${discount})</p></a></li>`;
}

export default async function productList(category = "tents", selector = ".product-list") {
  const products = await getData(category);
  const filtered = products || [];
  const parent = document.querySelector(selector);
  if (parent) renderListWithTemplate(productCardTemplate, parent, filtered);
  return filtered;
}

export { productCardTemplate };