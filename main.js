//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// Input
let button = document.querySelector("button");
let last = document.querySelector("#prev");
let next = document.querySelector("#next");
let random = document.querySelector("#random");

// Output
let title = document.querySelector("h2");
let instructions = document.querySelector(".instructions");
let image = document.querySelector("img");
let type = document.querySelector("#drink-type");
let category = document.querySelector("#drink-category");
let glass = document.querySelector("#drink-glass");
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
  } else if (e.code === "Space") {
    getRandomCocktail();
  }

  console.log(e);
});

// Functions
function getCocktail() {
  let userInput = document.querySelector("input").value;
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userInput}`)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      let drinkEl = data.drinks[i];

      title.innerText = drinkEl.strDrink;
      image.src = drinkEl.strDrinkThumb;
      instructions.innerText = drinkEl.strInstructions;
      type.innerText = drinkEl.strAlcoholic;
      category.innerText = drinkEl.strCategory;
      glass.innerText = drinkEl.strGlass;

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
      // console.log(data);

      const randomDrinkEl = data.drinks[0];

      title.innerText = randomDrinkEl.strDrink;
      image.src = randomDrinkEl.strDrinkThumb;
      instructions.innerText = randomDrinkEl.strInstructions;
      type.innerText = randomDrinkEl.strAlcoholic;
      category.innerText = randomDrinkEl.strCategory;
      glass.innerText = randomDrinkEl.strGlass;
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
