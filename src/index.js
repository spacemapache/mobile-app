import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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
}

onValue(shoppingListDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());
    clearShoppingList();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      shoppingListItems(currentItem);
    }
  } else {
    shoppingList.innerHTML = "<li>No items yet</li>";
  }
});

function clearShoppingList() {
  shoppingList.innerHTML = "";
}

function clearInput() {
  inputElement.value = "";
}

function shoppingListItems(item) {
  let itemID = item[0];
  let itemValue = item[1];
  let newList = document.createElement("li");
  newList.textContent = itemValue;
  newList.addEventListener("click", function () {
    let exactLocationOfItemDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemDB);
  });
  shoppingList.append(newList);
}
