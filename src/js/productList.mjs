import { getData } from "./productData.mjs";

function productCardTemplate(product) {
  const cleanImage = product.Image.replace(/^\.\.\//, '');
  const imageSrc = `/${cleanImage}`;

  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="${imageSrc}" alt="Image of ${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default async function productList(selector, category) {
  const el = document.querySelector(selector);
  const products = await getData();
  const validIds = ["880RR", "985RF", "985PR", "344YJ"];
  const filteredProducts = products.filter(product => validIds.includes(product.Id));
  
  const htmlStrings = filteredProducts.map(productCardTemplate);
  el.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
}