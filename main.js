//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// Input
let button = document.querySelector("button");
let last = document.querySelector("#prev");
let next = document.querySelector("#next");
let random = document.querySelector("#random");

// Output
const titleEl = document.querySelector("h2");
const instructionsEl = document.querySelector(".instructions");
const imageEl = document.querySelector("img");
const typeEl = document.querySelector("#drink-type");
const categoryEl = document.querySelector("#drink-category");
const glassEl = document.querySelector("#drink-glass");
const ingredientsEl = document.querySelector("ul");

let i = 0;

// Events on load
window.addEventListener("load", getRandomCocktail);

// Events on click
button.addEventListener("click", getCocktail);
last.addEventListener("click", goBack);
next.addEventListener("click", goNext);
random.addEventListener("click", getRandomCocktail);

// Keyup events
document.addEventListener("keyup", function (e) {
  if (e.code === "ArrowLeft") {
    goBack();
  } else if (e.code === "ArrowRight") {
    goNext();
  } else if (e.code === "ArrowDown" || e.code === "ArrowUp") {
    getRandomCocktail();
  } else if (e.code === "Enter") {
    getCocktail();
  }
});

// Functions

// Returns array for certain object values, based on their property name
function getObjValues(obj, str) {
  // Filter function for filter method
  const filterByProp = (x, str) => x[0].includes(str) && x[1];

  const arrOfValuePairs = Object.entries(obj);
  const requestedPairs = arrOfValuePairs.filter((x) => filterByProp(x, str));
  const requestedValues = requestedPairs.map((x) => x[1]);
  return requestedValues;
}

// clears UL inner HTML and adds each <ingredient> as li element
function addIngredListItems(obj) {
  const ingredArr = getObjValues(obj, "Ingredient");
  const measureArr = getObjValues(obj, "Measure");

  ingredientsEl.innerHTML = "";

  for (i = 0; i < ingredArr.length; i++) {
    if (!measureArr[i]) measureArr[i] = "".trim();
    ingredientsEl.insertAdjacentHTML(
      "beforeend",
      `<li>${measureArr[i]} ${ingredArr[i]}</li>`
    );
  }
}

// Swaps out all DOM content
function swapContent(obj) {
  titleEl.innerText = obj.strDrink;
  imageEl.src = obj.strDrinkThumb;
  instructionsEl.innerText = obj.strInstructions;
  typeEl.innerText = obj.strAlcoholic;
  categoryEl.innerText = obj.strCategory;
  glassEl.innerText = obj.strGlass;

  addIngredListItems(obj);
}

function getCocktail() {
  let userInput = document.querySelector("input").value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userInput}`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      if (i < 0) {
        i = data.drinks.length - 1;
      } else if (i > data.drinks.length - 1) {
        i = 0;
      }

      const drinkObj = data.drinks[i];
      swapContent(drinkObj);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function getRandomCocktail() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      // Main drink object
      const randomDrinkObj = data.drinks[0];
      swapContent(randomDrinkObj);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function goBack() {
  i--;
  getCocktail();
}

function goNext() {
  i++;
  getCocktail();
}
