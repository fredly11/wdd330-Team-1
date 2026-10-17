import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

productList("tents", ".product-list").then((list) => console.log(list));