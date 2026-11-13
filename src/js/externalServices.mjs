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