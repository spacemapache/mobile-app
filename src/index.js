import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-d9762-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingList = ref(database, "shoppingList");

const inputElement = document.getElementById("inputField");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addToCart);

function addToCart() {
  let inputValue = inputElement.value;
  push(shoppingList, inputValue);
  console.log(inputValue);
}
