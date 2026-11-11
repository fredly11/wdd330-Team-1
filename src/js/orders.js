import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import { checkLogin } from "./auth.mjs";
import currentOrders from "./currentOrders.mjs";

async function init() {
  const token = checkLogin();
  if (!token) return;

  await loadHeaderFooter();

  try {
    const orders = await currentOrders.getCurrentOrders(token);
    currentOrders.renderOrders(orders, "#ordersList");
  } catch (err) {
    alertMessage("Unable to load orders right now.");
  }
}

init();
