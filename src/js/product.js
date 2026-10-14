import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import productList from "./productList.mjs";

const productId = getParam("product");
productDetails(productId);
