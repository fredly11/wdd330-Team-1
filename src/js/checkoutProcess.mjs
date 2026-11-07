import { getLocalStorage } from "./utils.mjs";
import * as externalServices from "./externalServices.mjs";

const checkoutProcess = {
  key: "",
  outputSelector: "",
  list: [],
  itemTotal: 0,
  shipping: 0,
  tax: 0,
  orderTotal: 0,
  
  init: function (key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = getLocalStorage(key);
    this.calculateItemSummary();
  },

calculateItemSummary: function() {
    // Calculate and display the total amount of the items in the cart, and the number of items.
    const summaryElement = document.querySelector(`${this.outputSelector} #cartTotal`);
    const itemNumElement = document.querySelector(`${this.outputSelector} #num-items`);
    
    this.itemTotal = this.list.reduce((sum, item) => {
      const price = item.FinalPrice || item.ListPrice || 0;
      const qty = item.Quantity || 1;
      return sum + (price * qty);
    }, 0);

    if (summaryElement) {
      summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
    if (itemNumElement) {
      itemNumElement.innerText = this.list.reduce((sum, item) => sum + (item.Quantity || 1), 0);
    }
  },

  calculateOrdertotal: function() {
    // Calculate the shipping and tax amounts. Then use them along with the cart total to figure out the order total.
    const numItems = this.list.reduce((sum, item) => sum + (item.Quantity || 1), 0);
    // Shipping: $10 for the first item plus $2 for each additional item
    this.shipping = numItems > 0 ? 10 + (numItems - 1) * 2 : 0;
    
    // Tax: 6% of the item subtotal
    this.tax = Number((this.itemTotal * 0.06).toFixed(2));
    
    // Order total calculation
    this.orderTotal = (Number(this.itemTotal) + Number(this.shipping) + Number(this.tax)).toFixed(2);
    
    this.displayOrderTotals();
  },

  displayOrderTotals: function() {
    // Once the totals are all calculated, display them in the order summary page.
    const shippingel = document.querySelector(`${this.outputSelector} #shipping`);
    const taxel = document.querySelector(`${this.outputSelector} #tax`);
    const ordertotalel = document.querySelector(`${this.outputSelector} #orderTotal`);

    if (shippingel) shippingel.innerText = `$${this.shipping.toFixed(2)}`;
    if (taxel) taxel.innerText = `$${this.tax.toFixed(2)}`;
    if (ordertotalel) ordertotalel.innerText = `$${this.orderTotal}`;
  },

  async checkout(form) {
    // Build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const formData = formDataToJSON(form);

    const json = {
      orderDate: new Date().toISOString(),
      ...formData,
      items: packageItems(this.list),
      orderTotal: this.orderTotal,
      shipping: this.shipping,
      tax: this.tax
    };

    try {
      // Call the checkout method in our externalServices module and send it our data object.
      const res = await externalServices.checkout(json);
      console.log(res);
      
      localStorage.removeItem(this.key);
      
      window.location.href = "success.html";
    } catch (err) {
      console.log(err);
    }
  }
};

// Takes the items currently stored in the cart (localStorage) and returns them in a simplified form.
function packageItems(items) {
  return items.map(item => ({
    id: item.Id || item.id,
    name: item.Name || item.name,
    price: item.FinalPrice || item.ListPrice || item.price,
    quantity: item.Quantity || 1
  }));
}

// Takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export default checkoutProcess;