import { createUser } from "./externalServices.mjs";

document.querySelector("#registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const user = {
    name: document.querySelector("#name").value,
    address: document.querySelector("#address").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };

 try {
  const result = await createUser(user);
  console.log(result);

  alert("Account created successfully!");
  document.querySelector("#registerForm").reset();

} catch (err) {
  console.log(err);
  alert("Unable to create account.");
}
});