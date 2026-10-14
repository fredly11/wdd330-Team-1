import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
	return `
		<li class="product-card">
			<a href="product_pages/index.html?product=${product.Id}">
				<img src="${product.Image}" alt="${product.NameWithoutBrand}" />
				<h3 class="card__brand">${product.Brand.Name}</h3>
				<h2 class="card__name">${product.NameWithoutBrand}</h2>
				<p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
			</a>
		</li>
	`;
}

function filterProducts(list) {
	const ids = ["880RR", "985RF", "985PR", "344YJ"];
	return list.filter((p) => ids.includes(p.Id));
}

export default async function productList(category = "tents", selector = ".product-list") {
	const products = await getData(category);
	const filtered = filterProducts(products);
	const parent = document.querySelector(selector);
	if (parent) {
		renderListWithTemplate(productCardTemplate, parent, filtered);
	}
	return filtered;
}

export { productCardTemplate };