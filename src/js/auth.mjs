import { jwtDecode } from "jwt-decode";
import { loginRequest } from "./externalServices.mjs";
import { alertMessage, getLocalStorage, setLocalStorage } from "./utils.mjs";

const tokenKey = "so_token";

export async function login(creds, redirect = "/") {
  try {
    const token = await loginRequest(creds);
    setLocalStorage(tokenKey, token);
    window.location = redirect;
  } catch (err) {
    const message = err?.message?.message || "Login failed. Please check your credentials.";
    alertMessage(message);
  }
}

export function isTokenValid(token) {
  if (!token) return false;

  const rawToken = typeof token === "string" ? token : (token?.accessToken ?? token?.token);
  if (!rawToken) return false;

  try {
    const decoded = jwtDecode(rawToken);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
}

export function checkLogin() {
  const token = getLocalStorage(tokenKey);

  if (!isTokenValid(token)) {
    localStorage.removeItem(tokenKey);
    const redirect = `${window.location.pathname}${window.location.search}`;
    window.location = `/login/index.html?redirect=${encodeURIComponent(redirect)}`;
    return null;
  }

  return token;
}
