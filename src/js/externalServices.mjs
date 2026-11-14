const baseURL = "/api/";

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export async function loginRequest(creds) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  };
  
  const response = await fetch(baseURL + "login", options);
  const data = await convertToJson(response);
  return data.accessToken;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  
  const response = await fetch(baseURL + "orders", options);
  return convertToJson(response);
}

export async function createUser(user) {
  const response = await fetch(baseURL + "users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return convertToJson(response);
}