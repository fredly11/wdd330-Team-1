function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

const baseURL = import.meta.env.VITE_SERVER_URL;

function buildApiUrl(path) {
  const normalizedBase = (baseURL || "").endsWith("/") ? baseURL : `${baseURL}/`;
  return new URL(path, normalizedBase).toString();
}

export async function getData(category = "tents") {
  const response = await fetch(buildApiUrl(`products/search/${category}`));
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(buildApiUrl(`product/${id}`));
  const data = await convertToJson(response);
  return data.Result;
}
