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
  if (e.code === "ArrowLeft" || e.code === "ArrowDown") {
    goBack();
  } else if (e.code === "ArrowRight" || e.code === "ArrowUp") {
    goNext();
  } else if (e.code === "Enter") {
    getCocktail();
  }

  // console.log(e);
});

// Functions

function swapContent(obj) {
  titleEl.innerText = obj.strDrink;
  imageEl.src = obj.strDrinkThumb;
  instructionsEl.innerText = obj.strInstructions;
  typeEl.innerText = obj.strAlcoholic;
  categoryEl.innerText = obj.strCategory;
  glassEl.innerText = obj.strGlass;
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
      addListItems();

      // console.log(data.drinks[i]);
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function getRandomCocktail() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      // Filter function for filter method
      const filterByProp = (x, str) => x[0].includes(str) && x[1];

      // Main drink object and 2D array of its key:values as elements
      const randomDrinkObj = data.drinks[0];
      const drinkEntries = Object.entries(randomDrinkObj);

      // 2D array of elements that have values and contain Ingredient
      const ingredEntries = drinkEntries.filter((x) =>
        filterByProp(x, "Ingredient")
      );
      // Array of ingredients
      const ingredArr = ingredEntries.map((x) => x[1]);

      // 2D array of elements that have values and contain Measure
      const measureEntries = drinkEntries.filter((x) =>
        filterByProp(x, "Measure")
      );

      // Array of ingredients
      const measureArr = measureEntries.map((x) => x[1]);

      ingredientsEl.innerHTML = "";

      for (i = 0; i < ingredArr.length; i++) {
        if (!measureArr[i]) measureArr[i] = "".trim();
        ingredientsEl.insertAdjacentHTML(
          "beforeend",
          `<li>${measureArr[i]} ${ingredArr[i]}</li>`
        );
      }

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
