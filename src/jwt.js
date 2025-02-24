import { Login } from "./form.js";
import { DataSowh } from "./fetch.js";
import { login } from "./login.js";

export const select = document.getElementById("section");

const jwtToken = localStorage.getItem("jwt-token");

if (jwtToken) {
  DataSowh(jwtToken);
} else {
  select.innerHTML = Login;
  login();
}
