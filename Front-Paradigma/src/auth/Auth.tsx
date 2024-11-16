const isAuthenticated = document.cookie
  .split("; ")
  .find((row) => row.startsWith("rw.authenticated="))
  ?.split("=")[1] === "true";

console.log(isAuthenticated); // Devuelve true o false
