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
const shoppingListDB = ref(database, "shoppingList");

const inputElement = document.getElementById("inputField");
const addBtn = document.getElementById("addBtn");
const shoppingList = document.getElementById("shopping-list");

addBtn.addEventListener("click", addToCart);

function addToCart() {
  let inputValue = inputElement.value;
  push(shoppingListDB, inputValue);
  clearInput();
  shoppingListItems(inputValue);
}

function clearInput() {
  inputElement.value = " ";
}

function shoppingListItems(item) {
  shoppingList.innerHTML += `
  <li>${item}</li>`;
}
