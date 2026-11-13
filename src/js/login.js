import { getParam, qs, loadHeaderFooter } from "./utils.mjs";
import { login } from "./auth.mjs";

async function init() {
  await loadHeaderFooter();

  const redirect = getParam("redirect") || "/";
  const form = qs("#loginForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = qs("#email", form)?.value?.trim();
    const password = qs("#password", form)?.value;

    if (!email || !password) return;

    login({ email, password }, redirect);
  });
}

init();
