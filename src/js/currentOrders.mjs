import { getOrders } from "./externalServices.mjs";

function orderTemplate(order) {
  return `<li class="order-card divider">
    <p><strong>Order #:</strong> ${order.id ?? order._id ?? "n/a"}</p>
    <p><strong>Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
    <p><strong>Total:</strong> $${Number(order.orderTotal ?? 0).toFixed(2)}</p>
    <p><strong>Items:</strong> ${(order.items ?? []).length}</p>
  </li>`;
}

async function getCurrentOrders(token) {
  const orders = await getOrders(token);
  if (Array.isArray(orders)) return orders;
  if (Array.isArray(orders?.result)) return orders.result;
  if (Array.isArray(orders?.Result)) return orders.Result;
  return [];
}

function renderOrders(orders, outputSelector) {
  const listElement = document.querySelector(outputSelector);
  if (!listElement) return;

  if (!orders.length) {
    listElement.innerHTML = "<li class=\"order-card\">No current orders found.</li>";
    return;
  }

  listElement.innerHTML = orders.map(orderTemplate).join("");
}

const currentOrders = {
  getCurrentOrders,
  renderOrders,
};

export default currentOrders;
