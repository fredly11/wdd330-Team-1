const baseURL = import.meta.env.VITE_SERVER_URL;
const authURL = "http://server-nodejs.cit.byui.edu:3000/";

async function convertToJson(res) {
  const jsonResponse = await res.json();
  
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  };
  const response = await fetch(baseURL + "checkout", options);
  const data = await convertToJson(response);
  return data;
}

export async function loginRequest() {
  const creds = {
    email: "user1@email.com",
    password: "user1",
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  };

  const response = await fetch(authURL + "login", options);
  return convertToJson(response);
}

export async function getOrders(token) {
  const tokenValue = typeof token === "string" ? token : (token?.accessToken ?? token?.token ?? "");
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenValue}`,
    },
  };

  const response = await fetch(authURL + "orders", options);
  return convertToJson(response);
}