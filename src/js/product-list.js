import { getParam } from "./utils.mjs";
import productList from "./productList.mjs";

const category = getParam("category") || "tents";

function formatCategoryTitle(rawCategory) {
  const words = rawCategory.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(" ");
}

const titleEl = document.querySelector("#category-title");
if (titleEl) {
  titleEl.textContent = `Top Products: ${formatCategoryTitle(category)}`;
}

productList(category, ".product-list");
